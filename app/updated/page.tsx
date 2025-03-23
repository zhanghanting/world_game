'use client';

import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// 更新游戏数据
const updatedGames = [
  {
    id: '4',
    name: 'Tetris',
    title: 'Tetris',
    description: 'The classic block-stacking game of strategy and quick thinking. Now with new levels!',
    image: '/images/tetris.svg',
    coverImage: '/images/tetris.svg',
    rating: 4.9,
    category: 'Arcade',
    embedUrl: '/games/tetris/index.html',
    isEmbeddable: true,
    isUpdated: true,
    updateDate: '2023-03-21T14:30:00Z',
    updateInfo: '新增难度级别和主题'
  },
  {
    id: '1',
    name: 'Number Guessing',
    title: 'Number Guessing',
    description: 'Test your intuition by guessing a number between 1 and 100. Now with hints!',
    image: '/images/number-guessing.svg',
    coverImage: '/images/number-guessing.svg',
    rating: 4.8,
    category: 'Puzzle',
    embedUrl: '/games/number-guessing/index.html',
    isEmbeddable: true,
    isUpdated: true,
    updateDate: '2023-03-20T09:45:00Z',
    updateInfo: '添加提示系统和计分板'
  },
  {
    id: '6',
    name: 'Chess',
    title: 'Chess',
    description: 'The classic game of strategy and intellect. Now with improved AI!',
    image: '/images/chess.svg',
    coverImage: '/images/chess.svg',
    rating: 4.9,
    category: 'Board',
    embedUrl: '/games/chess/index.html',
    isEmbeddable: true,
    isUpdated: true,
    updateDate: '2023-03-18T16:20:00Z',
    updateInfo: '改进AI难度和新增教程'
  },
  {
    id: '2',
    name: 'Card Match',
    title: 'Card Match',
    description: 'Find matching pairs of cards in this classic memory game. New card designs!',
    image: '/images/card-match.svg', 
    coverImage: '/images/card-match.svg',
    rating: 4.6,
    category: 'Memory',
    embedUrl: '/games/card-match/index.html',
    isEmbeddable: true,
    isUpdated: true,
    updateDate: '2023-03-15T11:10:00Z',
    updateInfo: '新增卡片主题和模式'
  }
];

// 游戏分类
const categories = [
  'All', 'Arcade', 'Puzzle', 'Board', 'Memory'
];

export default function UpdatedGames() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredGames, setFilteredGames] = useState(updatedGames);

  useEffect(() => {
    setIsLoaded(true);
    
    // 根据所选分类筛选游戏
    if (selectedCategory === 'All') {
      setFilteredGames(updatedGames);
    } else {
      setFilteredGames(updatedGames.filter(game => game.category === selectedCategory));
    }
  }, [selectedCategory]);

  // 格式化更新时间
  const formatUpdateDate = (dateString: string): string => {
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
          
          <h1 className="text-3xl md:text-4xl font-bold text-white">最近更新的游戏</h1>
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
            <div key={game.id} className="group relative">
              <GameCard game={game} priority={index < 4} />
              <div className="absolute top-2 right-2 bg-green-600/90 text-white text-xs px-2 py-1 rounded-full">
                更新于 {formatUpdateDate((game as any).updateDate)}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm">
                  <span className="font-semibold">更新内容:</span> {(game as any).updateInfo}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* 无游戏时显示 */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">该分类下暂无更新游戏</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              查看所有更新游戏
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 