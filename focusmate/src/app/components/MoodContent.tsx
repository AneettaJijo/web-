'use client';
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function MoodContent() {
  const moodOptions = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😰', label: 'Stressed', value: 'stressed' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '🚀', label: 'Excited', value: 'excited' }
  ];

  const [selectedMood, setSelectedMood] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How are you feeling today?</h3>
        <div className="grid grid-cols-5 gap-4 mb-4">
          {moodOptions.map(mood => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-4 rounded-lg border-2 transition-colors text-center ${
                selectedMood === mood.value 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{mood.label}</div>
            </button>
          ))}
        </div>
        <textarea 
          placeholder="Add a note about your mood (optional)..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          rows={3}
        />
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Mood
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mood History</h3>
        <div className="space-y-3">
          {['Yesterday: 😊 Happy', 'May 29: 😐 Neutral', 'May 28: 🚀 Excited'].map((entry, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-900 dark:text-white">{entry}</span>
              <Calendar size={16} className="text-gray-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}