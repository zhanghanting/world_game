'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, MoonIcon, SunIcon } from './Icons';

// 使用动态导入和错误处理来优雅地处理缺少的依赖
let useTheme: () => { theme: string | undefined; setTheme: (theme: string) => void };

// 定义一个备用的简单主题实现
const useFallbackTheme = () => {
  const [theme, setThemeState] = useState<string | undefined>('light');
  
  useEffect(() => {
    // 在客户端初始化检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme') || 'light';
    setThemeState(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);
  
  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  return { theme, setTheme };
};

// 尝试导入next-themes，如果失败则使用备用实现
try {
  const nextThemes = require('next-themes');
  useTheme = nextThemes.useTheme;
  console.log('Successfully loaded next-themes');
} catch (error) {
  console.warn('next-themes not available, using fallback implementation');
  useTheme = useFallbackTheme;
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <header className="py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-accent-blue">
          WorldGame<span className="text-accent-green">.World</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search games..."
              className="input-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </div>
          </form>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
} 