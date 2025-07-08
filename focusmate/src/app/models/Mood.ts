import mongoose, { Schema, models } from 'mongoose';

const MoodSchema = new Schema(
  {
    mood:  String,
    note:  String,
    date:  Date,
  },
  { timestamps: true }
);

export default models.Mood || mongoose.model('Mood', MoodSchema);
