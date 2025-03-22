'use client';

import { useState } from 'react';
import CategoryNav from '../../components/CategoryNav';
import GameGrid from '../../components/GameGrid';
import TopGames from '../../components/TopGames';
import { GameModal } from '../../components/GameModal';
import { categories, games, Game } from '../../data/games';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showGameModal, setShowGameModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('全部');

  // 处理游戏点击
  const handleGameClick = (id: string, name: string) => {
    const game = games.find(g => g.id === id);
    setSelectedGame(game || null);
    setShowGameModal(true);
  };

  // 处理游戏模态框关闭
  const handleCloseGame = () => {
    setShowGameModal(false);
  };

  // 处理类别变化
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  // Check if category exists
  useEffect(() => {
    const categoryExists = categories.some(cat => cat.id === params.id);
    if (!categoryExists) {
      notFound();
    }
    
    // 设置当前活动类别
    const category = categories.find(cat => cat.id === params.id);
    if (category) {
      setActiveCategory(category.name);
    }
  }, [params.id]);

  // 根据类别筛选游戏
  const filteredGames = games.filter(game => {
    if (activeCategory === '全部') return true;
    return game.categories.includes(params.id);
  });
  
  return (
    <div>
      <CategoryNav 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <GameGrid 
            games={filteredGames} 
            selectedCategory={activeCategory} 
          />
        </div>
        
        <div className="w-full lg:w-1/3 space-y-6">
          <TopGames games={games} onGameClick={handleGameClick} />
        </div>
      </div>

      {/* 游戏模态框 */}
      <GameModal 
        isOpen={showGameModal}
        game={selectedGame}
        onClose={handleCloseGame}
      />
    </div>
  );
} 