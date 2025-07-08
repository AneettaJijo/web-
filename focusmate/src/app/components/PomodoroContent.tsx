'use client';
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function PomodoroContent() {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, pomodoroTime]);

  const resetTimer = () => {
    setPomodoroTime(25 * 60);
    setIsTimerRunning(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto border-8 border-blue-200 dark:border-blue-800 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl font-mono text-gray-900 dark:text-white">
              {formatTime(pomodoroTime)}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Focus Session</p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button 
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isTimerRunning ? <Pause size={20} className="mr-2" /> : <Play size={20} className="mr-2" />}
            {isTimerRunning ? 'Pause' : 'Start'}
          </button>
          <button 
            onClick={resetTimer}
            className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <RotateCcw size={20} className="mr-2" />
            Reset
          </button>
        </div>

        <div className="flex justify-center space-x-4 text-sm">
          <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
            25 min
          </button>
          <button className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            15 min
          </button>
          <button className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            45 min
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Today's Sessions</h3>
        <div className="flex space-x-2">
          {[1,2,3,4].map(i => (
            <div key={i} className={`w-4 h-4 rounded-full ${i <= 2 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">2 of 4 sessions completed</p>
      </div>
    </div>
  );
}