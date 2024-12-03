import { keyBy } from 'es-toolkit';
import ChatModel from '../../models/chat.model';
import MessageModel from '../../models/message.model';
import UserModel from '../../models/user.model';

export interface Message {
  id: string,
  userId: string,
  content: string,
  chatId: string;
}

export interface CreateMessage {
  content: string,
  userId: string,
  chatId: string;
}


class MessageController {
  
  async createMessage(data: CreateMessage) {
    const chat = await ChatModel.findById(data.chatId).lean();

    if(!chat?.userIds.map((el) => String(el)).includes(data.userId))
      await ChatModel.updateOne({ _id: data.chatId }, { $addToSet: { userIds: data.userId } });

    return await MessageModel.create(data);
  }

  async getMessages({ chatId }: {chatId: string}) {
    const messages = await MessageModel.find({ chatId }).lean();
    const userIds = messages.map((el) => el.userId);
    const userIdUniques = [ ...new Set(userIds) ];
    const users = await UserModel.find({ _id: { $in: userIdUniques } });
    const userBy = keyBy(users, ({ _id }) => String(_id));

    return messages.map((el) => ({ ...el, user: userBy[String(el.userId)] })); 
  }
}
  
const messageController = new MessageController();
  
export default messageController;
  