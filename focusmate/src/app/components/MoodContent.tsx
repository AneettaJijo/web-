'use client';
import React, { useEffect, useState } from 'react';
import { Calendar, Edit2, Trash2 } from 'lucide-react';

interface MoodEntry {
  _id: string;
  mood: string;
  emoji: string;
  note: string;
  date: string;
}

export default function MoodContent() {
  const moodOptions = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😐", label: "Neutral", value: "neutral" },
    { emoji: "😰", label: "Stressed", value: "stressed" },
    { emoji: "😴", label: "Tired", value: "tired" },
    { emoji: "🚀", label: "Excited", value: "excited" },
  ];

  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const getLocalDate = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split('T')[0];
  };

  const [date, setDate] = useState(getLocalDate());

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const res = await fetch('/api/mood');
    const data = await res.json();
    if (data.success) {
      setMoodEntries(data.data);
    }
  };

  const handleSave = async () => {
    if (!selectedMood) return;

    const emoji = moodOptions.find((m) => m.value === selectedMood)?.emoji || '';
    const payload = { mood: selectedMood, emoji, note, date };

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/mood/${editingId}` : '/api/mood';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) {
      fetchEntries();
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedMood('');
    setNote('');
    setDate(getLocalDate());
    setEditingId(null);
  };

  const handleEdit = (entry: MoodEntry) => {
    setSelectedMood(entry.mood);
    setNote(entry.note);
    setDate(entry.date.split('T')[0]);
    setEditingId(entry._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this mood entry?')) return;
    const res = await fetch(`/api/mood/${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      fetchEntries();
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="space-y-6">
      {/* Mood Selector */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          How are you feeling today?
        </h3>
        <div className="grid grid-cols-5 gap-4 mb-4">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-4 rounded-lg border-2 text-center transition-colors ${
                selectedMood === mood.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{mood.label}</div>
            </button>
          ))}
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about your mood..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          rows={3}
        />
        <button
          onClick={handleSave}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {editingId ? 'Update Mood' : 'Save Mood'}
        </button>
      </div>

      {/* Mood History */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Mood History
        </h3>
        <div className="space-y-3">
          {moodEntries.length === 0 ? (
            <p className="text-gray-400">No mood entries found.</p>
          ) : (
            moodEntries.map((entry) => (
              <div
                key={entry._id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <span className="text-xl mr-2">{entry.emoji}</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{entry.note}</p>
                  <p className="text-xs text-gray-400">{formatDate(entry.date)}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(entry)} className="text-blue-400 hover:text-blue-600">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(entry._id)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
