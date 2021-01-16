class UsersService {
  users = [
    {
      name: 'Lera',
      login: 'lerasipakova',
      password: 'qazwsx',
      id: 1610824049600
    },
    {
      name: 'Anna',
      login: 'annapetrova',
      password: 'edcrfv',
      id: 1610824049700
    }
  ]

  getUsers = () => {;
    return this.users;
  }

  addUser = (user) => {
    user.id = Date.now();
    this.users.push(user);
    return this.users;
  }

  updateUser = (updateUser, id) => {
    const index = this.users.findIndex(user => user.id === id);
        this.users[index] = {
          ...this.users[index],
          ...updateUser
        }
        return this.users;
  }

  deleteUser = (id) => {
        this.users = this.users.filter((user) => user.id !== id);
        return this.users;
  }
};

module.exports = new UsersService();
