import { Schema, Types } from 'mongoose';
import { connectionMongo } from '../configs';

const MessageSchema = new Schema({
  chatId: { type: Types.ObjectId },
  content: { type: String },
  userId: { type: Types.ObjectId },
}, { timestamps: true });

const MessageModel = connectionMongo.model('message', MessageSchema);

export default MessageModel;