'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon, 
  ClockIcon, 
  SparklesIcon,
  FireIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // 主导航项目
  const mainNavItems = [
    { name: '首页', icon: <HomeIcon className="w-5 h-5" />, href: '/' },
    { name: '最近玩过', icon: <ClockIcon className="w-5 h-5" />, href: '/recent' },
    { name: '新游戏', icon: <SparklesIcon className="w-5 h-5" />, href: '/new' },
    { name: '热门游戏', icon: <FireIcon className="w-5 h-5" />, href: '/trending' },
    { name: '更新游戏', icon: <ArrowPathIcon className="w-5 h-5" />, href: '/updated' },
  ];
  
  // 游戏分类（精简版，移动端只显示常用分类）
  const categories = [
    { name: '原创游戏', icon: '🎮', href: '/category/originals' },
    { name: '多人游戏', icon: '👥', href: '/category/multiplayer' },
    { name: '双人游戏', icon: '👫', href: '/category/2player' },
    { name: '动作游戏', icon: '⚔️', href: '/category/action' },
    { name: '冒险游戏', icon: '🗺️', href: '/category/adventure' },
    { name: '卡牌游戏', icon: '🃏', href: '/category/card' },
    { name: '休闲游戏', icon: '🎲', href: '/category/casual' },
  ];

  return (
    <>
      {/* 移动导航触发按钮 */}
      <button 
        onClick={toggleMenu}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 p-2 rounded-lg shadow-md hover:bg-gray-800 transition-colors"
        aria-label="菜单"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-white" />
        )}
      </button>
      
      {/* 移动导航抽屉 */}
      <div className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:hidden`}>
        {/* 背景遮罩 */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        {/* 导航内容 */}
        <div className="absolute left-0 top-0 h-full w-64 bg-gray-900 shadow-xl overflow-y-auto">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                <span className="text-xl">🎮</span>
              </div>
              <div className="text-xl font-bold text-white">
                <span className="text-blue-400">World</span>
                <span className="text-green-400"> Relax</span>
              </div>
            </div>
          </div>
          
          {/* 主导航菜单 */}
          <nav className="p-2">
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 my-1 rounded-md transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* 分隔线 */}
          <div className="mx-3 my-2 border-b border-gray-800"></div>
          
          {/* 游戏分类 */}
          <div className="p-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`flex items-center px-3 py-2 my-1 rounded-md transition-colors ${
                  pathname === category.href
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="w-5 h-5 flex items-center justify-center mr-3">
                  {category.icon}
                </span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav; 