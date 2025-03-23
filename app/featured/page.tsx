'use client';

import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// 精选游戏数据
const featuredGames = [
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
    isFeatured: true
  },
  {
    id: '2',
    name: 'Card Match',
    title: 'Card Match',
    description: 'Find matching pairs of cards in this classic memory game.',
    image: '/images/card-match.svg', 
    coverImage: '/images/card-match.svg',
    rating: 4.5,
    category: 'Memory',
    embedUrl: '/games/card-match/index.html',
    isEmbeddable: true,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Word Scramble',
    title: 'Word Scramble',
    description: 'Unscramble words against the clock in this challenging word game.',
    image: '/images/word-scramble.svg',
    coverImage: '/images/word-scramble.svg',
    rating: 4.3,
    category: 'Word',
    embedUrl: '/games/word-scramble/index.html',
    isEmbeddable: true,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Tetris',
    title: 'Tetris',
    description: 'The classic block-stacking game of strategy and quick thinking.',
    image: '/images/tetris.svg',
    coverImage: '/images/tetris.svg',
    rating: 4.9,
    category: 'Arcade',
    embedUrl: '/games/tetris/index.html',
    isEmbeddable: true,
    isFeatured: true
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
    isFeatured: true
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
    isFeatured: true
  }
];

// 游戏分类
const categories = [
  'All', 'Arcade', 'Puzzle', 'Board', 'Memory', 'Word'
];

export default function FeaturedGames() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredGames, setFilteredGames] = useState(featuredGames);

  useEffect(() => {
    setIsLoaded(true);
    
    // 根据所选分类筛选游戏
    if (selectedCategory === 'All') {
      setFilteredGames(featuredGames);
    } else {
      setFilteredGames(featuredGames.filter(game => game.category === selectedCategory));
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
          
          <h1 className="text-3xl md:text-4xl font-bold text-white">精选游戏</h1>
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
              <div className="absolute top-2 right-2 bg-blue-600/90 text-white text-xs px-2 py-1 rounded-full">
                精选
              </div>
            </div>
          ))}
        </div>
        
        {/* 无游戏时显示 */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">该分类下暂无精选游戏</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              查看所有精选游戏
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 