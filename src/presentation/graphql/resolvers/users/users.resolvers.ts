import userController, { User } from '../../../../controllers/users';

const Mutation = {
  createUser: async (_: any, args: Partial<Omit<User, '_id'>>) => await userController.createNewUser(args)
};

export  { Mutation };