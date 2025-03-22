import React from 'react';
import { Game } from '../data/games';
import Link from 'next/link';

interface GameInfoProps {
  game: Game;
}

export default function GameInfo({ game }: GameInfoProps) {
  return (
    <div className="space-y-4">
      {/* 游戏分类 */}
      <div>
        <h3 className="text-sm font-medium mb-2">游戏分类</h3>
        <div className="flex flex-wrap gap-2">
          {game.categories.map((category, index) => (
            <Link
              key={index}
              href={`/category/${category}`}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
      
      {/* 游戏提示 */}
      {game.howToPlay && game.howToPlay.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">如何玩</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {game.howToPlay.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* 游戏技巧 */}
      {game.tips && game.tips.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">游戏技巧</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {game.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* 游戏属性 */}
      <div>
        <h3 className="text-sm font-medium mb-2">游戏属性</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-gray-500 dark:text-gray-400">难度</div>
          <div className="text-right">
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              game.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
              game.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : 
              'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              {game.difficulty === 'easy' ? '简单' : 
               game.difficulty === 'medium' ? '中等' : '困难'}
            </span>
          </div>
          
          {game.popularity !== undefined && (
            <>
              <div className="text-gray-500 dark:text-gray-400">流行度</div>
              <div className="text-right">
                <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden inline-block mr-2">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${game.popularity}%` }}
                  ></div>
                </div>
                <span>{game.popularity}/100</span>
              </div>
            </>
          )}
          
          <div className="text-gray-500 dark:text-gray-400">来源</div>
          <div className="text-right">{game.source || '未知'}</div>
        </div>
      </div>
      
      {/* 游戏标签 */}
      <div className="flex flex-wrap gap-2 mt-2">
        {game.isFeatured && (
          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded-full">
            精选
          </span>
        )}
        {game.isNew && (
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
            新游戏
          </span>
        )}
        {game.isTrending && (
          <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-0.5 rounded-full">
            热门
          </span>
        )}
      </div>
    </div>
  );
} 