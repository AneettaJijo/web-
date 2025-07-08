'use client';
import React, { useEffect, useState } from 'react';
import { Calendar, Edit2, Trash2 } from 'lucide-react';

interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export default function JournalContent() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/journal');
      const result = await res.json();
      if (result.success) {
        setEntries(result.data);
      } else {
        setError(result.error);
      }
    } catch {
      setError('Failed to fetch journal entries.');
    }
  };

  const handleSubmit = async () => {
    const method = editingEntry ? 'PUT' : 'POST';
    const url = editingEntry ? `/api/journal/${editingEntry._id}` : '/api/journal';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        await fetchEntries();
        resetForm();
      } else {
        setError(result.error);
      }
    } catch {
      setError('Error saving entry.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const res = await fetch(`/api/journal/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        await fetchEntries();
      } else {
        setError(result.error);
      }
    } catch {
      setError('Error deleting entry.');
    }
  };

  const getLocalDate = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split('T')[0];
};

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      content: entry.content,
      date: entry.date.split('T')[0],
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
    });
    setEditingEntry(null);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Today's Journal
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(formData.date)}
          </span>
        </div>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Title"
        />
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Write about your day, thoughts, or reflections..."
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          rows={6}
        />
        <div className="flex justify-between items-center mt-4">
          
          <div className="space-x-2">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingEntry ? 'Update Entry' : 'Save Entry'}
            </button>
            {editingEntry && (
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-400 bg-red-900/30 px-4 py-3 rounded-lg border border-red-600">
          {error}
        </div>
      )}

      {/* Recent Entries */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Entries
        </h3>
        <div className="space-y-3">
          {entries.length === 0 ? (
            <p className="text-gray-400">No entries found.</p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry._id}
                className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold">{entry.title}</p>
                    <p className="text-gray-500 text-sm">{formatDate(entry.date)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2 truncate">
                  {entry.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
