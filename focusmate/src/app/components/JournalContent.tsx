'use client';
import React from 'react';
import { Calendar } from 'lucide-react';

export default function JournalContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Journal</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">May 31, 2025</span>
        </div>
        <textarea 
          placeholder="Write about your day, thoughts, or reflections..."
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          rows={8}
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Auto-saved 2 minutes ago</span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Entry
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Entries</h3>
        <div className="space-y-3">
          {[
            'May 30: Productive day working on the project...',
            'May 29: Feeling motivated about the upcoming presentation...',
            'May 28: Team meeting went well, everyone is on track...'
          ].map((entry, i) => (
            <div key={i} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <p className="text-gray-900 dark:text-white truncate">{entry}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}