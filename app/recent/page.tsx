'use client';

import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// 最近游戏数据 - 在实际应用中，这些数据应该通过用户会话或本地存储获取
const recentGames = [
  {
    id: '7',
    name: 'Snake',
    title: 'Snake',
    description: 'Guide the snake to eat food and grow without hitting the walls or itself.',
    image: '/images/snake.svg',
    coverImage: '/images/snake.svg',
    rating: 4.2,
    category: 'Arcade',
    embedUrl: '/games/snake/index.html',
    isEmbeddable: true,
    lastPlayed: '2023-03-22T10:30:00Z'
  },
  {
    id: '8',
    name: 'Sudoku',
    title: 'Sudoku',
    description: 'Fill the grid so each column, row, and 3×3 box contain numbers 1-9.',
    image: '/images/sudoku.svg',
    coverImage: '/images/sudoku.svg',
    rating: 4.5,
    category: 'Puzzle',
    embedUrl: '/games/sudoku/index.html',
    isEmbeddable: true,
    lastPlayed: '2023-03-21T15:45:00Z'
  },
  {
    id: '5',
    name: 'Bubble Shooter',
    title: 'Bubble Shooter',
    description: 'Shoot bubbles to create groups of 3 or more matching colors.',
    image: '/images/bubble-shooter.svg',
    coverImage: '/images/bubble-shooter.svg',
    rating: 4.6,
    category: 'Arcade',
    embedUrl: '/games/bubble-shooter/index.html',
    isEmbeddable: true,
    lastPlayed: '2023-03-20T09:15:00Z'
  },
  {
    id: '1',
    name: 'Number Guessing',
    title: 'Number Guessing',
    description: 'Test your intuition by guessing a number between 1 and 100.',
    image: '/images/number-guessing.svg',
    coverImage: '/images/number-guessing.svg',
    rating: 4.7,
    category: 'Puzzle',
    embedUrl: '/games/number-guessing/index.html',
    isEmbeddable: true,
    lastPlayed: '2023-03-19T14:20:00Z'
  },
  {
    id: '6',
    name: 'Chess',
    title: 'Chess',
    description: 'The classic game of strategy and intellect.',
    image: '/images/chess.svg',
    coverImage: '/images/chess.svg',
    rating: 4.8,
    category: 'Board',
    embedUrl: '/games/chess/index.html',
    isEmbeddable: true,
    lastPlayed: '2023-03-18T18:30:00Z'
  }
];

// 游戏分类
const categories = [
  'All', 'Arcade', 'Puzzle', 'Board'
];

export default function RecentGames() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredGames, setFilteredGames] = useState(recentGames);

  useEffect(() => {
    setIsLoaded(true);
    
    // 根据所选分类筛选游戏
    if (selectedCategory === 'All') {
      setFilteredGames(recentGames);
    } else {
      setFilteredGames(recentGames.filter(game => game.category === selectedCategory));
    }
  }, [selectedCategory]);

  // 格式化最近玩过的时间
  const formatLastPlayed = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return '今天';
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="container mx-auto">
        {/* 页面标题和返回按钮 */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link 
            href="/" 
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors w-fit"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            <span>返回首页</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white">最近玩过的游戏</h1>
        </div>
        
        {/* 分类过滤器 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* 游戏列表 */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          {filteredGames.map((game, index) => (
            <div key={game.id} className="relative">
              <GameCard game={game} priority={index < 4} />
              <div className="absolute top-2 right-2 bg-gray-800/80 text-white text-xs px-2 py-1 rounded-full">
                {formatLastPlayed((game as any).lastPlayed)}
              </div>
            </div>
          ))}
        </div>
        
        {/* 无游戏时显示 */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">该分类下暂无最近玩过的游戏</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              查看所有最近游戏
            </button>
          </div>
        )}
        
        {/* 如果没有最近玩过的游戏 */}
        {recentGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">您还没有玩过任何游戏</p>
            <Link 
              href="/"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
            >
              浏览游戏
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 