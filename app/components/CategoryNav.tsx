'use client';

import { useState, useEffect } from 'react';

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 游戏类别列表
  const categories = [
    '全部',
    '益智',
    '动作',
    '策略', 
    '冒险',
    '射击',
    '角色扮演',
    '模拟',
    '休闲',
    '卡牌',
    '体育'
  ];
  
  // 监听滚动，设置粘性导航
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 处理类别变化
  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`${
      isSticky 
        ? 'sticky top-0 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md py-3' 
        : 'py-4'
      } transition-all duration-300`}
    >
      {/* 桌面导航 */}
      <div className="hidden md:flex overflow-x-auto space-x-4 pb-1 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all
              ${activeCategory === category 
                ? 'bg-accent-purple text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
            `}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* 移动端导航 */}
      <div className="md:hidden relative">
        <div className="flex justify-between items-center">
          <button
            className="flex items-center space-x-1 bg-accent-purple text-white px-4 py-2 rounded-full text-sm font-medium"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span>{activeCategory}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            轻触选择类别
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-2 z-40 border border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${activeCategory === category 
                    ? 'bg-accent-purple text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
} 