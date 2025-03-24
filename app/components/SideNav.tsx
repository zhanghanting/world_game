'use client';

import React from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  ClockIcon, 
  SparklesIcon,
  FireIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from '../i18n/useTranslation';

const SideNav: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  
  // Main navigation items
  const mainNavItems = [
    { name: t('nav.home'), icon: <HomeIcon className="w-5 h-5" />, href: '/' },
    { name: t('nav.recent'), icon: <ClockIcon className="w-5 h-5" />, href: '/recent' },
    { name: t('nav.new'), icon: <SparklesIcon className="w-5 h-5" />, href: '/new' },
    { name: t('nav.trending'), icon: <FireIcon className="w-5 h-5" />, href: '/trending' },
    { name: t('nav.updated'), icon: <ArrowPathIcon className="w-5 h-5" />, href: '/updated' },
  ];
  
  // Game categories
  const categories = [
    { name: t('categories.originals'), icon: '🎮', href: '/category/originals' },
    { name: t('categories.multiplayer'), icon: '👥', href: '/category/multiplayer' },
    { name: t('categories.twoPlayer'), icon: '👫', href: '/category/2player' },
    { name: t('categories.action'), icon: '⚔️', href: '/category/action' },
    { name: t('categories.adventure'), icon: '🗺️', href: '/category/adventure' },
    { name: t('categories.basketball'), icon: '🏀', href: '/category/basketball' },
    { name: t('categories.beauty'), icon: '💄', href: '/category/beauty' },
    { name: t('categories.bike'), icon: '🚲', href: '/category/bike' },
    { name: t('categories.car'), icon: '🚗', href: '/category/car' },
    { name: t('categories.card'), icon: '🃏', href: '/category/card' },
    { name: t('categories.casual'), icon: '🎲', href: '/category/casual' },
    { name: t('categories.clicker'), icon: '👆', href: '/category/clicker' },
    { name: t('categories.controller'), icon: '🎮', href: '/category/controller' },
    { name: t('categories.dressUp'), icon: '👗', href: '/category/dressup' },
    { name: t('categories.driving'), icon: '🚦', href: '/category/driving' },
    { name: t('categories.escape'), icon: '🚪', href: '/category/escape' },
    { name: t('categories.flash'), icon: '⚡', href: '/category/flash' },
    { name: t('categories.fps'), icon: '🔫', href: '/category/fps' },
    { name: t('categories.horror'), icon: '👻', href: '/category/horror' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 shadow-md z-30 transition-all duration-300 transform md:translate-x-0 hidden md:block">
      <div className="flex flex-col h-full text-white">
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-gray-800">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
              <span className="text-xl">🎮</span>
            </div>
            <div className="text-xl font-bold text-white">
              <span className="text-blue-400">World</span>
              <span className="text-green-400"> Relax</span>
            </div>
          </Link>
        </div>
        
        {/* Main navigation menu */}
        <nav className="px-2 py-3">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 my-1 rounded-md transition-colors ${
                pathname === item.href
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        {/* Divider */}
        <div className="mx-3 my-2 border-b border-gray-800"></div>
        
        {/* Game categories */}
        <div className="flex-1 overflow-y-auto px-2 pb-10">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`flex items-center px-3 py-2 my-1 rounded-md transition-colors ${
                pathname === category.href
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
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
  );
};

export default SideNav; 