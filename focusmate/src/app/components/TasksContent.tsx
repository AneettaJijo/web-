'use client';

import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export default function TasksContent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    dueDate: new Date().toISOString().split('T')[0],
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/task');
      const result = await res.json();
      if (result.success) setTasks(result.data);
      else setError(result.error);
    } catch {
      setError('Failed to fetch tasks.');
    }
  };

  const handleSubmit = async () => {
    const method = editingTask ? 'PUT' : 'POST';
    const url = editingTask ? `/api/task/${editingTask._id}` : '/api/task';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        await fetchTasks();
        resetForm();
      } else setError(result.error);
    } catch {
      setError('Error saving task.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      const res = await fetch(`/api/task/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) fetchTasks();
      else setError(result.error);
    } catch {
      setError('Error deleting task.');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      dueDate: task.dueDate.split('T')[0],
    });
  };

  const toggleComplete = async (task: Task) => {
    try {
      const res = await fetch(`/api/task/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const result = await res.json();
      if (result.success) fetchTasks();
    } catch {
      setError('Failed to update task status.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      dueDate: new Date().toISOString().split('T')[0],
    });
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
      </div>

      {/* Add / Edit Task Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </div>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Task title"
          className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-400 bg-red-900/30 px-4 py-3 rounded-lg border border-red-600">
          {error}
        </div>
      )}

      {/* Task List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {tasks.length === 0 ? (
          <p className="p-4 text-gray-500 dark:text-gray-400">No tasks available.</p>
        ) : (
          tasks.map(task => (
            <div key={task._id} className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    className="mr-3 rounded"
                  />
                  <div className="flex-1">
                    <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                      {task.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Due: {task.dueDate.split('T')[0]}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEdit(task)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Edit size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button onClick={() => handleDelete(task._id)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
