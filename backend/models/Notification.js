import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', notificationSchema);
