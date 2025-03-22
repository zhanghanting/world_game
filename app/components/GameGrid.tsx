'use client';

import { useState, useEffect } from 'react';
import { Game } from '../data/games';
import GameCard from './GameCard';
import GamePreview from './GamePreview';

interface GameGridProps {
  games: Game[];
  selectedCategory: string;
  onGameClick?: (id: string, name: string) => void; // 可选的游戏点击回调
}

export default function GameGrid({ games, selectedCategory, onGameClick }: GameGridProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 筛选并排序游戏，按照类别和流行度
  useEffect(() => {
    setIsLoading(true);
    
    // 模拟网络延迟，给用户提供更明显的加载反馈
    const timer = setTimeout(() => {
      let filteredGames = games;
      
      // 如果选择了特定类别，则筛选
      if (selectedCategory !== '全部') {
        filteredGames = games.filter(game => 
          game.categories.includes(selectedCategory)
        );
      }
      
      // 按照流行度排序，并限制显示前9个游戏
      const sortedGames = [...filteredGames].sort((a, b) => {
        const popularityA = a.popularity || 0;
        const popularityB = b.popularity || 0;
        return popularityB - popularityA;
      });
      
      setVisibleGames(sortedGames);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [games, selectedCategory]);

  // 处理游戏卡片点击事件
  const handleGameClick = (game: Game) => {
    // 如果提供了外部点击回调，则调用它
    if (onGameClick) {
      onGameClick(game.id, game.name);
      return;
    }
    
    // 否则使用内部预览逻辑
    setSelectedGame(game);
    // 记录用户浏览历史，方便后续推荐
    try {
      const viewHistory = JSON.parse(localStorage.getItem('gameViewHistory') || '[]');
      if (!viewHistory.includes(game.id)) {
        viewHistory.unshift(game.id);
        // 只保留最近10个记录
        if (viewHistory.length > 10) {
          viewHistory.pop();
        }
        localStorage.setItem('gameViewHistory', JSON.stringify(viewHistory));
      }
    } catch (e) {
      console.error('Failed to save view history:', e);
    }
  };

  // 关闭游戏预览
  const handleClosePreview = () => {
    setSelectedGame(null);
  };

  // 加载状态组件
  const renderLoading = () => (
    <div className="col-span-full flex justify-center items-center py-12">
      <div className="animate-pulse flex flex-col items-center">
        <div className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 h-12 w-12 mb-4 animate-spin"></div>
        <p className="text-gray-500 dark:text-gray-400">正在加载游戏数据...</p>
      </div>
    </div>
  );

  // 没有游戏时的提示
  const renderNoGames = () => (
    <div className="col-span-full text-center py-16">
      <div className="inline-block p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">没有找到相关游戏</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        当前类别"{selectedCategory}"下没有游戏。请尝试选择其他类别，或稍后再来查看。
      </p>
    </div>
  );

  return (
    <div className="relative">
      {isLoading ? (
        renderLoading()
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleGames.length > 0 ? (
            visibleGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => handleGameClick(game)}
              />
            ))
          ) : (
            renderNoGames()
          )}
        </div>
      )}
      
      {/* 只有在没有外部处理程序时才显示内部预览 */}
      {!onGameClick && selectedGame && (
        <GamePreview
          game={selectedGame}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
} 