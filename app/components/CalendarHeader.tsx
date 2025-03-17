import React from 'react';
import { useEffect } from 'react';
import { useDarkMode } from '@/app/hooks/useDarkMode';

export const CalendarHeader = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    console.log("Dark mode is:", darkMode);
    console.log("Dark class is present:", document.documentElement.classList.contains('dark'));
  }, [darkMode]);

  return (
    <nav className="flex justify-between items-center mb-2 border-b border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center">
        <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <h1 className="font-bold text-lg text-gray-800 dark:text-white">PampaTime</h1>
      </div>
      
      <button
        className="toggle-dark-button rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
        title="Toggle dark mode"
        onClick={toggleDarkMode}
      >
        {!darkMode ? (
          <svg className="light h-5 w-5 text-gray-600 dark:text-white" focusable="false" viewBox="0 0 28 28">
            <path
              d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z"
              fill="currentColor"
            ></path>
            <path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path>
            <path d="M2 15.005h5v2H2z" fill="currentColor"></path>
            <path
              d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z"
              fill="currentColor"
            ></path>
            <path d="M15 25.005h2v5h-2z" fill="currentColor"></path>
            <path
              d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z"
              fill="currentColor"
            ></path>
            <path d="M25 15.005h5v2h-5z" fill="currentColor"></path>
            <path
              d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z"
              fill="currentColor"
            ></path>
            <path d="M15 2.005h2v5h-2z" fill="currentColor"></path>
          </svg>
        ) : (
          <svg className="dark h-5 w-5 text-gray-400 dark:text-white" focusable="false" viewBox="0 0 32 32">
            <path
              d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z"
              fill="currentColor"
            ></path>
          </svg>
        )}
      </button>
    </nav>
  );
};