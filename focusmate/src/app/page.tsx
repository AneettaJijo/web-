'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import TasksContent from './components/TasksContent';
import PomodoroContent from './components/PomodoroContent';
import MoodContent from './components/MoodContent';
import JournalContent from './components/JournalContent';
import StatsContent from './components/StatsContent';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include', // to send cookies
        });
        const data = await res.json();
        if (!data.success) {
          router.push('/login');
        } else {
          setUsername(data.username);
          setIsLoading(false);
        }
      } catch (error) {
        router.push('/login');
      }
    }
    checkAuth();
  }, [router]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent username={username} />;
      case 'tasks':
        return <TasksContent />;
      case 'pomodoro':
        return <PomodoroContent />;
      case 'mood':
        return <MoodContent />;
      case 'journal':
        return <JournalContent />;
      case 'stats':
        return <StatsContent />;
      default:
        return <DashboardContent username={username} />;
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  async function handleLogout() {
  try {
    const res = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      router.push('/login');
    } else {
      alert('Logout failed');
    }
  } catch (error) {
    alert('Logout error');
  }
}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">Loading...</div>
      ) : (
        <>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="lg:ml-64">
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onLogout={handleLogout}
            />
            <main className="p-6">{renderContent()}</main>
          </div>
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
