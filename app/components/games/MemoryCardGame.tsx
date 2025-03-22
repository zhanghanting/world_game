'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface MemoryCardGameProps {
  onExit: () => void;
}

// 定义卡片类型
interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryCardGame: React.FC<MemoryCardGameProps> = ({ onExit }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  // 卡片内容（表情符号）
  const cardValues = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
    '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐘'
  ];

  // 根据难度创建卡片
  const createCards = (diff: 'easy' | 'medium' | 'hard') => {
    let pairsCount = 0;
    switch (diff) {
      case 'easy':
        pairsCount = 6;
        break;
      case 'medium':
        pairsCount = 8;
        break;
      case 'hard':
        pairsCount = 12;
        break;
    }

    // 选择对应数量的卡片值
    const selectedValues = cardValues.slice(0, pairsCount);
    
    // 创建卡片对（每个值两张卡片）
    let cardPairs: Card[] = [];
    selectedValues.forEach((value, index) => {
      // 创建两张具有相同值的卡片
      cardPairs.push({ id: index * 2, value, flipped: false, matched: false });
      cardPairs.push({ id: index * 2 + 1, value, flipped: false, matched: false });
    });

    // 随机排序卡片
    return cardPairs.sort(() => Math.random() - 0.5);
  };

  // 初始化游戏
  const initGame = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff);
    setCards(createCards(diff));
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameStarted(true);
    setGameComplete(false);
  };

  // 游戏启动时初始化
  useEffect(() => {
    initGame(difficulty);
  }, []);

  // 处理卡片点击
  const handleCardClick = (id: number) => {
    // 如果已经匹配或已经翻转或已经有两张卡片翻转，则不处理
    if (
      cards.find(card => card.id === id)?.matched ||
      flippedCards.includes(id) ||
      flippedCards.length === 2
    ) {
      return;
    }

    // 添加到已翻转卡片列表
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // 检查是否有两张卡片翻转，如果有，检查是否匹配
    if (newFlippedCards.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      
      const card1 = cards.find(card => card.id === newFlippedCards[0]);
      const card2 = cards.find(card => card.id === newFlippedCards[1]);

      if (card1?.value === card2?.value) {
        // 匹配成功，更新状态
        setCards(prevCards =>
          prevCards.map(card =>
            newFlippedCards.includes(card.id) ? { ...card, matched: true } : card
          )
        );
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
        
        // 检查游戏是否完成
        if (matchedPairs + 1 === cards.length / 2) {
          setGameComplete(true);
        }
      } else {
        // 不匹配，延迟翻转回去
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // 渲染卡片网格
  const renderCards = () => {
    const gridClass = 
      difficulty === 'easy' ? 'grid-cols-3' :
      difficulty === 'medium' ? 'grid-cols-4' : 'grid-cols-6';

    return (
      <div className={`grid ${gridClass} gap-2`}>
        {cards.map(card => (
          <motion.div
            key={card.id}
            className={`aspect-square rounded-lg overflow-hidden cursor-pointer shadow-md ${
              card.matched ? 'bg-green-100 dark:bg-green-900' : 'bg-white/10'
            }`}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ scale: card.matched || flippedCards.includes(card.id) ? 1 : 1.05 }}
            animate={{
              rotateY: card.matched || flippedCards.includes(card.id) ? 180 : 0,
              backgroundColor: card.matched ? 'rgba(167, 243, 208, 0.2)' : 'rgba(255, 255, 255, 0.1)'
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full h-full">
              {/* 卡片背面 */}
              <div
                className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-700 text-white text-opacity-80 transition-opacity duration-300 ${
                  card.matched || flippedCards.includes(card.id) ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span className="text-xl">?</span>
              </div>
              
              {/* 卡片正面 */}
              <div
                className={`absolute inset-0 flex items-center justify-center text-2xl rounded-lg transition-opacity duration-300 ${
                  card.matched || flippedCards.includes(card.id) ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transform: 'rotateY(180deg)' }}
              >
                {card.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      className="w-full h-full flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-4 rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-3">
        <button 
          onClick={onExit}
          className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-center">记忆翻牌</h1>
        <div className="w-10"></div> {/* 为了平衡布局 */}
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-start overflow-y-auto p-2 max-h-full">
        <div className="bg-white/10 rounded-xl p-4 w-full max-w-2xl">
          {!gameStarted ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-6">选择难度</h2>
              <div className="flex justify-center gap-3 mb-6">
                {['easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => initGame(level as 'easy' | 'medium' | 'hard')}
                    className="px-6 py-3 text-lg rounded-lg transition-colors bg-white/10 hover:bg-white/20"
                  >
                    {level === 'easy' ? '简单' : level === 'medium' ? '中等' : '困难'}
                  </button>
                ))}
              </div>
              <p className="text-white/70 mt-4">
                记忆翻牌游戏：翻转卡片，找到所有匹配的对子。记住卡片的位置来减少尝试次数！
              </p>
            </div>
          ) : gameComplete ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">恭喜！</h2>
              <p className="mb-6">你完成了游戏，总共用了 {moves} 步。</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => initGame(difficulty)}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  再玩一次
                </button>
                <button
                  onClick={() => setGameStarted(false)}
                  className="px-6 py-3 bg-accent-purple hover:bg-purple-700 rounded-lg transition-colors"
                >
                  更换难度
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-sm text-white/70">难度：</span>
                  <span className="ml-1 font-medium">
                    {difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '中等' : '困难'}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-white/70">步数：</span>
                  <span className="ml-1 font-medium">{moves}</span>
                </div>
                <div>
                  <span className="text-sm text-white/70">匹配：</span>
                  <span className="ml-1 font-medium">{matchedPairs}/{cards.length/2}</span>
                </div>
              </div>
              
              <div className="overflow-y-auto mt-1 pt-1">
                {renderCards()}
              </div>
              
              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => initGame(difficulty)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  重新开始
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryCardGame; 