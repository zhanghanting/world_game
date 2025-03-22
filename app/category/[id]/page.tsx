'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import GameCard from '../../components/GameCard';
import { categories, games, Category, Game } from '../../data/games';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 找到当前分类
    const category = categories.find(cat => cat.id === categoryId);
    setCurrentCategory(category || null);

    // 过滤该分类的游戏
    const categoryGames = categoryId === 'all' 
      ? games 
      : games.filter(game => 
          game.categories && game.categories.includes(categoryId)
        );
    
    setFilteredGames(categoryGames);
    setIsLoaded(true);
  }, [categoryId]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* 分类头部 */}
      <section className="relative py-16 overflow-hidden">
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-purple-900/30 z-0"></div>
        
        {/* 内容 */}
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            返回首页
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center">
            {currentCategory && (
              <span className="mr-3 text-4xl">{currentCategory.icon}</span>
            )}
            {currentCategory ? currentCategory.name : '所有'} 游戏
          </h1>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl">
            {categoryId === 'all' 
              ? '浏览我们所有精选的免费在线游戏，可以直接在浏览器中玩！' 
              : `浏览我们所有的${currentCategory?.name || ''}游戏，无需下载，即刻开始！`
            }
          </p>
          
          {/* 分类导航 */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link 
              href="/category/all" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categoryId === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              🌟 所有
            </Link>
            
            {categories.filter(cat => cat.id !== 'all').slice(0, 10).map(category => (
              <Link 
                key={category.id}
                href={`/category/${category.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoryId === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.icon} {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 游戏列表 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game, index) => (
                <GameCard key={game.id} game={game} priority={index < 8} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">😢</div>
              <h3 className="text-2xl font-semibold text-white mb-2">暂无游戏</h3>
              <p className="text-gray-400 mb-8">
                该分类下暂时没有游戏，请稍后再来或选择其他分类。
              </p>
              <Link 
                href="/category/all" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
              >
                浏览所有游戏
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
