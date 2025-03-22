'use client';

import { useState, useEffect } from 'react';
import { Game } from '../data/games';
import Link from 'next/link';
import Image from 'next/image';

interface TopGamesProps {
  games: Game[];
  onGameClick?: (id: string, name: string) => void; // 添加游戏点击回调函数
}

export default function TopGames({ games, onGameClick }: TopGamesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [topGames, setTopGames] = useState<Game[]>([]);
  
  // 仅在组件挂载时加载一次
  useEffect(() => {
    // 确保games是数组且不为空
    if (!games || !Array.isArray(games) || games.length === 0) {
      setTopGames([]);
      return;
    }
    
    try {
      // 根据流行度获取热门游戏
      const sortedGames = [...games]
        .sort((a, b) => {
          // 检查popularity属性是否存在
          const popularityA = a.popularity || 0;
          const popularityB = b.popularity || 0;
          return popularityB - popularityA;
        })
        .slice(0, 6); // 取前6个最受欢迎的游戏
      
      setTopGames(sortedGames);
    } catch (error) {
      console.error('排序游戏时出错:', error);
      setTopGames([]);
    }
    
    // 使用IntersectionObserver检测组件是否在视口中
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // 当10%的组件可见时触发
    );
    
    const topGamesSection = document.getElementById('top-games-section');
    if (topGamesSection) {
      observer.observe(topGamesSection);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [games]);
  
  // 获取一个更具吸引力的游戏封面图
  const getGameImage = (game: Game): string => {
    return game.image || '/images/game-placeholder.jpg';
  };

  // 处理游戏点击
  const handleGameClick = (game: Game) => {
    if (onGameClick) {
      onGameClick(game.id, game.name);
    }
  };

  // 如果没有游戏数据，不渲染组件
  if (topGames.length === 0) {
    return null;
  }

  return (
    <section 
      id="top-games-section" 
      className={`bg-gradient-to-r from-blue-700 to-green-600 p-6 rounded-2xl shadow-lg transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h2 className="text-2xl font-bold text-white mb-4">热门推荐</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {topGames.map((game) => (
          <div 
            key={game.id}
            className="relative overflow-hidden rounded-lg group aspect-[4/3] block cursor-pointer"
            onClick={() => handleGameClick(game)}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${getGameImage(game)})` }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs text-center transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-black/80 to-transparent">
              <span className="font-medium">{game.name}</span>
            </div>
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
              热门
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button 
          className="text-white text-sm font-medium hover:underline flex items-center justify-center mx-auto"
        >
          查看全部游戏
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
} 