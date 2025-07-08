'use client';
import React from 'react';
import { BarChart3, Heart } from 'lucide-react';

export default function StatsContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Tasks Completed', value: '127', change: '+12%' },
          { label: 'Focus Hours', value: '48.5', change: '+8%' },
          { label: 'Streak Days', value: '12', change: '+2%' },
          { label: 'Avg. Daily Tasks', value: '4.2', change: '+15%' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-green-600">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Progress</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
            <BarChart3 className="text-gray-400" size={64} />
            <span className="ml-2 text-gray-500">Chart placeholder</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mood Trends</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
            <Heart className="text-gray-400" size={64} />
            <span className="ml-2 text-gray-500">Chart placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}