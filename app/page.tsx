'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GameCard from './components/GameCard';
import TiltEffect from './components/TiltEffect';
import ParallaxEffect from './components/ParallaxEffect';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from './i18n/useTranslation';

// Placeholder data for games
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
    isEmbeddable: true
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
    isEmbeddable: true
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
    isEmbeddable: true
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
    isEmbeddable: true
  }
];

const popularGames = [
  {
    id: 'gomoku',
    name: 'Gomoku',
    title: 'Gomoku (Five in a Row)',
    description: 'Connect five stones in a row (horizontally, vertically, or diagonally) to win in this classic strategy board game.',
    image: '/images/gomoku.svg',
    coverImage: '/images/gomoku.svg',
    categories: ['strategy', 'board', '2player'],
    difficulty: 'medium',
    rating: 4.7,
    category: 'Strategy',
    embedUrl: '/games/gomoku/index.html',
    canEmbed: true,
    isImplemented: true
  },
  {
    id: '10',
    name: 'Sudoku',
    title: 'Sudoku',
    description: 'Fill the 9x9 grid so each row, column, and 3x3 box contains all numbers from 1 to 9. A puzzle game that challenges your logic.',
    image: '/images/sudoku.svg',
    coverImage: '/images/sudoku.svg',
    rating: 4.9,
    category: 'Puzzle',
    embedUrl: '/games/sudoku/index.html',
    isEmbeddable: true
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
    isEmbeddable: true
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
    isEmbeddable: true
  }
];

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
    isEmbeddable: true
  }
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-40 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-purple-900/30 z-0"></div>
        
        {/* Parallax Background Elements */}
        <ParallaxEffect 
          className="absolute inset-0 z-0 pointer-events-none" 
          sensitivity={0.03}
          layers={[20, 40, 60]}
        >
          {/* 第一层：远景紫色光圈 */}
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          
          {/* 第二层：中景蓝色光圈 */}
          <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
          
          {/* 第三层：近景亮光点 */}
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        </ParallaxEffect>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {t('home.hero.title')} <br/>
                <span className="text-blue-400">{t('home.hero.subtitle')}</span>
              </h1>
              <p className="text-lg text-gray-300 mb-6 max-w-lg">
                {t('home.hero.description')}
              </p>
              
              {/* 新增统计数据部分 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
                  <div className="text-2xl font-bold text-blue-400">500+</div>
                  <div className="text-sm text-gray-400">{t('home.totalGames')}</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
                  <div className="text-2xl font-bold text-purple-400">10K+</div>
                  <div className="text-sm text-gray-400">{t('home.activeUsers')}</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-sm text-gray-400">{t('home.free')}</div>
                </div>
              </div>
              
              {/* 新增热门类别标签 */}
              <div className="mb-8">
                <p className="text-sm text-gray-400 mb-2">{t('home.popularCategories')}:</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/category/puzzle" className="text-xs bg-blue-900/50 hover:bg-blue-800/60 text-blue-300 px-3 py-1 rounded-full border border-blue-800/50 transition-colors duration-200">
                    🧩 {t('categories.puzzle')}
                  </Link>
                  <Link href="/category/action" className="text-xs bg-red-900/50 hover:bg-red-800/60 text-red-300 px-3 py-1 rounded-full border border-red-800/50 transition-colors duration-200">
                    ⚡️ {t('categories.action')}
                  </Link>
                  <Link href="/category/strategy" className="text-xs bg-green-900/50 hover:bg-green-800/60 text-green-300 px-3 py-1 rounded-full border border-green-800/50 transition-colors duration-200">
                    🧠 {t('categories.strategy')}
                  </Link>
                  <Link href="/category/arcade" className="text-xs bg-yellow-900/50 hover:bg-yellow-800/60 text-yellow-300 px-3 py-1 rounded-full border border-yellow-800/50 transition-colors duration-200">
                    🕹️ {t('home.arcade')}
                  </Link>
                  <Link href="/category/card" className="text-xs bg-purple-900/50 hover:bg-purple-800/60 text-purple-300 px-3 py-1 rounded-full border border-purple-800/50 transition-colors duration-200">
                    🃏 {t('categories.card')}
                  </Link>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/new" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  {t('home.explore')}
                </Link>
                <Link 
                  href="/trending" 
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 border border-gray-700 hover:border-gray-600"
                >
                  {t('home.popular')}
                </Link>
              </div>
            </div>
            
            <div className={`flex justify-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <TiltEffect options={{ max: 15, speed: 400, glare: true, "max-glare": 0.3 }}>
                <div className="relative w-full max-w-md aspect-square">
                  <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-xl border border-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 aspect-square">
                        <Image 
                          src="/images/number-guessing.svg" 
                          alt="Number Game" 
                          width={200} 
                          height={200} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 aspect-square">
                        <Image 
                          src="/images/card-match.svg" 
                          alt="Card Game" 
                          width={200} 
                          height={200} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 aspect-square">
                        <Image 
                          src="/images/tetris.svg" 
                          alt="Tetris" 
                          width={200} 
                          height={200} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 aspect-square">
                        <Image 
                          src="/images/snake.svg" 
                          alt="Snake Game" 
                          width={200} 
                          height={200} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TiltEffect>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t('home.featured')}</h2>
            <Link 
              href="/featured" 
              className="text-blue-400 hover:text-blue-300 flex items-center"
            >
              {t('home.viewAll')} <ChevronRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map((game, index) => (
              <TiltEffect 
                key={game.id} 
                options={{ 
                  max: 10, 
                  speed: 400,
                  scale: 1.02,
                  glare: true, 
                  "max-glare": 0.2,
                  perspective: 1000
                }}
                className="h-full"
              >
                <GameCard game={game} priority={index < 4} />
              </TiltEffect>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-12 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t('home.popular')}</h2>
            <Link 
              href="/trending" 
              className="text-blue-400 hover:text-blue-300 flex items-center"
            >
              {t('home.viewAll')} <ChevronRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGames.map((game, index) => (
              <TiltEffect 
                key={game.id} 
                options={{ 
                  max: 10, 
                  speed: 400,
                  scale: 1.02,
                  glare: true, 
                  "max-glare": 0.2,
                  perspective: 1000
                }}
                className="h-full"
              >
                <GameCard game={game} priority={index < 4} />
              </TiltEffect>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Games Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t('home.recent')}</h2>
            <Link 
              href="/recent" 
              className="text-blue-400 hover:text-blue-300 flex items-center"
            >
              {t('home.viewAll')} <ChevronRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentGames.map((game, index) => (
              <TiltEffect 
                key={game.id} 
                options={{ 
                  max: 10, 
                  speed: 400,
                  scale: 1.02,
                  glare: true, 
                  "max-glare": 0.2,
                  perspective: 1000
                }}
                className="h-full"
              >
                <GameCard game={game} />
              </TiltEffect>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Game Categories</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: '🎮', name: 'Arcade' },
              { icon: '🧩', name: 'Puzzle' },
              { icon: '🏎️', name: 'Racing' },
              { icon: '🎯', name: 'Sports' },
              { icon: '🎲', name: 'Board Games' },
              { icon: '🔤', name: 'Word Games' },
              { icon: '🧠', name: 'Strategy' },
              { icon: '🎨', name: 'Creative' },
              { icon: '👾', name: 'Retro' },
              { icon: '🎭', name: 'Adventure' },
              { icon: '⚔️', name: 'Action' },
              { icon: '🧮', name: 'Educational' },
            ].map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className="bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 rounded-lg p-4 text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <span className="text-white">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for Endless Gaming Fun?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of players enjoying our collection of free browser games. 
              No downloads required, start playing right away!
            </p>
            <Link 
              href="/new" 
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Start Playing Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                  <span className="text-xl">🎮</span>
                </div>
                <div className="text-xl font-bold text-white">
                  <span className="text-blue-400">World</span>
                  <span className="text-green-400"> Games</span>
                </div>
              </div>
              <p className="mb-4">
                The best place to play free online games. No downloads, just fun!
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Game Categories</h3>
              <ul className="space-y-2">
                <li><Link href="/category/arcade" className="hover:text-white">Arcade Games</Link></li>
                <li><Link href="/category/puzzle" className="hover:text-white">Puzzle Games</Link></li>
                <li><Link href="/category/action" className="hover:text-white">Action Games</Link></li>
                <li><Link href="/category/racing" className="hover:text-white">Racing Games</Link></li>
                <li><Link href="/category/sports" className="hover:text-white">Sports Games</Link></li>
                <li><Link href="/category/strategy" className="hover:text-white">Strategy Games</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/trending" className="hover:text-white">Trending Games</Link></li>
                <li><Link href="/new" className="hover:text-white">New Games</Link></li>
                <li><Link href="/recent" className="hover:text-white">Recently Played</Link></li>
                <li><Link href="/updated" className="hover:text-white">Updated Games</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Information</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© 2023 World Games. All rights reserved.</p>
            <p className="mt-2 text-sm">
              All games are property of their respective owners and may be subject to copyright.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
} 