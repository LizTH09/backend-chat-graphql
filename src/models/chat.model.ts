import { Schema, Types } from 'mongoose';
import { connectionMongo } from '../configs';

const ChatSchema = new Schema({
  status: { type: String },
  userIds: { type: [ Types.ObjectId ] }
}, { timestamps: true });

const ChatModel = connectionMongo.model('chat', ChatSchema);

export default ChatModel;