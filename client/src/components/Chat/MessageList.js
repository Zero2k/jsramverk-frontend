import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

class MessageList extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <div>
        <List dense={true}>
          {messages.slice(0).map(message => (
            <ListItem key={message.id}>
              <ListItemAvatar>
                <Avatar src={message.senderAvatar} />
              </ListItemAvatar>
              <ListItemText primary={message.sender} secondary={message.msg} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default MessageList;
