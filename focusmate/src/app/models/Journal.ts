import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
 id: String,
  title: String,
  content: String,
  date: Date
  
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);