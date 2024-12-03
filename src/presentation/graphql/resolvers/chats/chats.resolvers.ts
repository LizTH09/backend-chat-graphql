import chatController, { CreateChat } from '../../../../controllers/chats';

const Query = {
  getChats: async (_: any, { userId }: { userId: string }) =>
    await chatController.getChats(userId),
};

const Mutation = {
  createChat: async (_: any, args: CreateChat) =>
    await chatController.createChat(args),
};

export { Mutation, Query };