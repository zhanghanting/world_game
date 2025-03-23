'use client';

import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// 新游戏数据
const newGames = [
  {
    id: '9',
    name: 'Space Invaders',
    title: 'Space Invaders',
    description: '经典的太空射击游戏，击败从天而降的外星人。',
    image: '/images/tetris.svg', // 暂用现有图片
    coverImage: '/images/tetris.svg',
    rating: 4.7,
    category: 'Arcade',
    embedUrl: '/games/space-invaders/index.html',
    isEmbeddable: true,
    isNew: true
  },
  {
    id: '10',
    name: '2048',
    title: '2048',
    description: '合并数字方块，创建2048方块的益智游戏。',
    image: '/images/number-guessing.svg', // 暂用现有图片
    coverImage: '/images/number-guessing.svg',
    rating: 4.8,
    category: 'Puzzle',
    embedUrl: '/games/2048/index.html',
    isEmbeddable: true,
    isNew: true
  },
  {
    id: '11',
    name: 'Minesweeper',
    title: 'Minesweeper',
    description: '经典的扫雷游戏，避开地雷找出所有安全格子。',
    image: '/images/sudoku.svg', // 暂用现有图片
    coverImage: '/images/sudoku.svg',
    rating: 4.5,
    category: 'Puzzle',
    embedUrl: '/games/minesweeper/index.html',
    isEmbeddable: true,
    isNew: true
  },
  {
    id: '12',
    name: 'Ping Pong',
    title: 'Ping Pong',
    description: '经典乒乓球游戏，尝试击败电脑对手。',
    image: '/images/snake.svg', // 暂用现有图片
    coverImage: '/images/snake.svg',
    rating: 4.4,
    category: 'Sports',
    embedUrl: '/games/ping-pong/index.html',
    isEmbeddable: true,
    isNew: true
  },
  {
    id: '13',
    name: 'Hangman',
    title: 'Hangman',
    description: '猜单词游戏，在绞刑架完成前猜出隐藏的单词。',
    image: '/images/word-scramble.svg', // 暂用现有图片
    coverImage: '/images/word-scramble.svg',
    rating: 4.3,
    category: 'Word',
    embedUrl: '/games/hangman/index.html',
    isEmbeddable: true,
    isNew: true
  },
  {
    id: '14',
    name: 'Tower Defense',
    title: 'Tower Defense',
    description: '建造防御塔阻止敌人入侵的策略游戏。',
    image: '/images/card-match.svg', // 暂用现有图片
    coverImage: '/images/card-match.svg',
    rating: 4.6,
    category: 'Strategy',
    embedUrl: '/games/tower-defense/index.html',
    isEmbeddable: true,
    isNew: true
  }
];

// 游戏分类
const categories = [
  'All', 'Arcade', 'Puzzle', 'Sports', 'Word', 'Strategy'
];

export default function NewGames() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredGames, setFilteredGames] = useState(newGames);

  useEffect(() => {
    setIsLoaded(true);
    
    // 根据所选分类筛选游戏
    if (selectedCategory === 'All') {
      setFilteredGames(newGames);
    } else {
      setFilteredGames(newGames.filter(game => game.category === selectedCategory));
    }
  }, [selectedCategory]);

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
          
          <h1 className="text-3xl md:text-4xl font-bold text-white">新游戏</h1>
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
            <GameCard key={game.id} game={game} priority={index < 4} />
          ))}
        </div>
        
        {/* 无游戏时显示 */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">该分类下暂无游戏</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              查看所有游戏
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 