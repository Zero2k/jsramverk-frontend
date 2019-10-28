export interface User {
  socketId: string;
  id: string;
  sender: string;
  senderAvatar: string;
}

export class UsersService {
  private users: Array<User> = [];

  addUser(user: User) {
    // add users with new userId only.
    if (!!this.users.find(u => u.id === user.id)) return;

    this.users.push(user);
  }

  removeUser(userId: string) {
    this.users = this.users.filter(user => user.id !== userId);
  }

  disconnectUser(socketId: string) {
    this.users = this.users.filter(user => user.socketId !== socketId);
  }

  getUsers(): Array<User> {
    return this.users.slice();
  }
}
