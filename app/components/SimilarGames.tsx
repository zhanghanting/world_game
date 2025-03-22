import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '../data/games';

interface SimilarGamesProps {
  games: Game[];
}

export default function SimilarGames({ games }: SimilarGamesProps) {
  if (!games || games.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">没有找到相似游戏</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((game) => (
        <Link 
          href={`/game/${game.id}`} 
          key={game.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden flex flex-col"
        >
          <div className="relative h-40 w-full">
            <Image 
              src={game.coverImage || game.image || '/images/default-game.jpg'} 
              alt={game.title || game.name || '游戏预览'} 
              fill
              className="object-cover"
            />
            {game.isNew && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                新游戏
              </span>
            )}
            {game.isTrending && !game.isNew && (
              <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                热门
              </span>
            )}
          </div>
          
          <div className="p-3 flex-grow">
            <h3 className="font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">
              {game.title || game.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
              {game.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mt-auto">
              {game.categories.slice(0, 3).map((category, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 