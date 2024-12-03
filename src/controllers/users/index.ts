import UserModel from '../../models/user.model';

export interface User{ 
    id: string,
    avatar: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
}

class UserController {
  async getUserById({ id }: User) {
    return await UserModel.findById(id).lean();
  }

  async createNewUser(data: Partial<Omit<User, '_id'>>) {
    return await UserModel.create({ ...data, avatar: `https://robohash.org/${data.email}` });
  }
}

const userController = new UserController();

export default userController;
