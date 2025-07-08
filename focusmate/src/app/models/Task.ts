import mongoose, { Schema, models } from 'mongoose';

const TaskSchema = new Schema({
  title: String,
  completed:  Boolean,
  dueDate: Date,
}, { timestamps: true });

export default models.Task || mongoose.model("Task", TaskSchema);