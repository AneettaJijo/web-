'use client';
import React from 'react';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';

export default function TasksContent() {
  const tasks = [
    { id: 1, title: 'Complete project documentation', completed: false, dueDate: '2025-06-02' },
    { id: 2, title: 'Review team progress', completed: true, dueDate: '2025-06-01' },
    { id: 3, title: 'Prepare presentation slides', completed: false, dueDate: '2025-06-03' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <Filter size={18} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={18} className="mr-2" />
          Add Task
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {tasks.map(task => (
          <div key={task.id} className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  readOnly
                  className="mr-3 rounded"
                />
                <div className="flex-1">
                  <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Due: {task.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <Edit size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}