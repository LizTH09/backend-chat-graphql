import ChatModel from '../../models/chat.model';

export interface Chat{ 
  id: string,
  status: string,
  userId: string[]
}

export interface CreateChat{
  status: string,
  userIds: string[]
}

class ChatController {
  async createChat(data: CreateChat) {

    return await ChatModel.create({ status: 'DOING', userIds: data.userIds });
  }

  async getChats(userId: string) {

    return await ChatModel.find({ userIds: { $in: [ userId ] } }).lean();
  }
}

const chatController = new ChatController();

export default chatController;