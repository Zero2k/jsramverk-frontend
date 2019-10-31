import * as socket from 'socket.io';
import { UsersService } from '../service/User';
import { Message } from '../entity/Message';

export default (server: any) => {
  const io = socket(server);
  const usersService = new UsersService();

  io.on('connection', socket => {
    socket.on('connected', async user => {
      usersService.addUser(user);
      io.emit('connected', usersService.getUsers());

      try {
        const oldMessages = await Message.find({
          order: {
            createdAt: 'ASC'
          }
        });

        io.emit('oldMessages', oldMessages);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
      usersService.disconnectUser(socket.id);
      io.emit('connected', usersService.getUsers());
    });

    socket.on('leave', id => {
      usersService.removeUser(id);
      io.emit('connected', usersService.getUsers());
    });

    socket.on('sendMessage', async data => {
      try {
        const message = await Message.create(data).save();

        io.emit('reciveMessage', message);
      } catch (error) {
        console.log(error);
        io.emit('reciveMessage', data);
      }
    });
  });
};
