import * as socket from 'socket.io';
import { UsersService } from '../service/User';

export default (server: any) => {
  const io = socket(server);
  const usersService = new UsersService();

  io.on('connection', socket => {
    socket.on('connected', user => {
      usersService.addUser(user);
      io.emit('connected', usersService.getUsers());
    });

    socket.on('disconnect', () => {
      usersService.disconnectUser(socket.id);
      io.emit('connected', usersService.getUsers());
    });

    socket.on('leave', id => {
      usersService.removeUser(id);
      io.emit('connected', usersService.getUsers());
    });

    socket.on('sendMessage', data => {
      io.emit('reciveMessage', data);
    });
  });
};
