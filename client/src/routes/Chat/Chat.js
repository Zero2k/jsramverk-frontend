import React from 'react';
import io from 'socket.io-client';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MessageList from '../../components/Chat/MessageList';
import { inject, observer } from 'mobx-react';

const WS_HOST =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BACKEND_WS
    : 'http://localhost:4000';

let socket;

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '25px'
  },
  button: {
    margin: theme.spacing(1)
  },
  messages: {
    display: 'flex',
    flexDirection: 'column-reverse',
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: '320px',
    overflowY: 'scroll',
    verticalAlign: 'bottom'
  },
  users: {
    height: '320px',
    overflowY: 'auto',
    verticalAlign: 'bottom'
  }
});

@inject('authStore')
@observer
class Chat extends React.Component {
  componentDidMount() {
    socket = io(WS_HOST);

    socket.on('connected', users => {
      this.setState({ users });
    });

    socket.on('reciveMessage', data => {
      this.addMessage(data);
    });
  }

  componentWillUnmount() {
    socket.emit('disconnect');
    socket.disconnect();
  }

  state = {
    messages: [
      {
        id: 1,
        sender: 'Shun',
        senderAvatar: 'https://i.pravatar.cc/150?img=32',
        msg: 'Hello 👋'
      },
      {
        id: 2,
        sender: 'Gabe',
        senderAvatar: 'https://i.pravatar.cc/150?img=56',
        msg: 'Hey!'
      },
      {
        id: 3,
        sender: 'Gabe',
        senderAvatar: 'https://i.pravatar.cc/150?img=56',
        msg: 'How are you?'
      },
      {
        id: 4,
        sender: 'Shun',
        senderAvatar: 'https://i.pravatar.cc/150?img=32',
        msg: "Great! It's been a while... 🙃"
      },
      {
        id: 5,
        sender: 'Gabe',
        senderAvatar: 'https://i.pravatar.cc/150?img=56',
        msg: "Indeed.... We're gonna have to fix that. 🌮🍻"
      }
    ],
    users: [],
    text: '',
    join: false
  };

  handleChange = e => {
    const { value } = e.target;

    this.setState({
      text: value
    });
  };

  submit = () => {
    const { text } = this.state;

    socket.emit('sendMessage', {
      id: new Date().toDateString(),
      sender: this.props.authStore.user.username,
      senderAvatar: 'https://i.pravatar.cc/150?img=32',
      msg: text
    });

    this.setState({
      text: ''
    });
  };

  addMessage = data => {
    this.setState({ messages: [...this.state.messages, data] });
  };

  joinChat = () => {
    socket.emit('connected', {
      socketId: socket.id,
      id: this.props.authStore.user.id,
      sender: this.props.authStore.user.username,
      senderAvatar: 'https://i.pravatar.cc/150?img=32'
    });
    this.setState({ join: !this.state.join });
  };

  leaveChat = () => {
    socket.emit('leave', this.props.authStore.user.id);
    this.setState({ join: !this.state.join });
  };

  render() {
    const { classes } = this.props;
    const { messages, text, users, join } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          {!join ? (
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: '16px' }}
              onClick={this.joinChat}
              fullWidth={true}
            >
              Join Chat
            </Button>
          ) : (
            <>
              <Grid item xs={12} md={9}>
                <Paper className={classes.messages}>
                  <MessageList messages={messages} />
                </Paper>
                <TextField
                  id="standard-full-width"
                  placeholder="Message"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        className={classes.button}
                        disabled={!text}
                        onClick={this.submit}
                      >
                        SEND
                      </Button>
                    )
                  }}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      this.submit();
                    }
                  }}
                  onChange={this.handleChange}
                  value={text}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper className={classes.users}>
                  <List dense={true}>
                    {users.map((user, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar src={user.senderAvatar} />
                        </ListItemAvatar>
                        <ListItemText primary={user.sender} />
                        {user.id === this.props.authStore.user.id ? (
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={this.leaveChat}
                            >
                              <ExitToAppIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        ) : null}
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Chat);
