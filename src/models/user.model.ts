import { Schema } from 'mongoose';
import { connectionMongo } from '../configs';

const UserSchema = new Schema({
  avatar: { type: String },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
}, { timestamps: true });

const UserModel = connectionMongo.model('user', UserSchema);

export default UserModel;