import mongoose, { Schema, models} from 'mongoose';

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String
});

export default models.User || mongoose.model('User', UserSchema);