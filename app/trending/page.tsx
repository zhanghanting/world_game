'use client';

import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// 扩展热门游戏数据
const trendingGames = [
  {
    id: '8',
    name: 'Sudoku',
    title: 'Sudoku',
    description: 'Fill the 9x9 grid so each row, column, and 3x3 box contains all numbers from 1 to 9. A puzzle game that challenges your logic.',
    image: '/images/sudoku.svg',
    coverImage: '/images/sudoku.svg',
    rating: 4.9,
    category: 'Puzzle',
    embedUrl: '/games/sudoku/index.html',
    isEmbeddable: true,
    isTrending: true
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
    isTrending: true
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
    isTrending: true
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
    isTrending: true
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
    isTrending: true
  },
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
    isTrending: true
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
    isTrending: true
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
    isTrending: true
  },
  {
    id: 'klotski',
    name: 'Klotski',
    title: 'Sliding Block Puzzle',
    description: 'Klotski is an ancient sliding block puzzle game. Move the blocks to help the large red block escape through the exit. This game tests your spatial thinking and planning skills.',
    image: '/images/klotski.svg',
    coverImage: '/images/klotski.svg',
    categories: ['puzzle', 'strategy'],
    difficulty: 'medium',
    embedUrl: '/games/klotski/index.html',
    canEmbed: true,
    isImplemented: true
  }
];

// 游戏分类
const categories = [
  'All', 'Action', 'Arcade', 'Puzzle', 'Board', 'Memory', 'Word', 'Strategy', 'Racing'
];

export default function TrendingGames() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredGames, setFilteredGames] = useState(trendingGames);

  useEffect(() => {
    setIsLoaded(true);
    
    // 根据所选分类筛选游戏
    if (selectedCategory === 'All') {
      setFilteredGames(trendingGames);
    } else {
      setFilteredGames(trendingGames.filter(game => game.category === selectedCategory));
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
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white">Popular Games</h1>
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
            <p className="text-gray-400 text-lg">No games in this category yet</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Games
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 