'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface GuessNumberGameProps {
  onExit: () => void;
}

const GuessNumberGame: React.FC<GuessNumberGameProps> = ({ onExit }) => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [maxAttempts, setMaxAttempts] = useState<number>(10);
  const [range, setRange] = useState<{ min: number; max: number }>({ min: 1, max: 100 });

  // 初始化游戏
  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const startNewGame = () => {
    const ranges = {
      easy: { min: 1, max: 100, attempts: 10 },
      medium: { min: 1, max: 500, attempts: 8 },
      hard: { min: 1, max: 1000, attempts: 6 },
    };
    
    const selectedRange = ranges[difficulty];
    setRange({ min: selectedRange.min, max: selectedRange.max });
    setMaxAttempts(selectedRange.attempts);
    
    const newTarget = Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
    setTargetNumber(newTarget);
    setUserGuess('');
    setFeedback('请猜一个数字！');
    setAttempts(0);
    setGameState('playing');
    
    console.log(`游戏开始！目标数字是: ${newTarget}`); // 用于开发调试
  };

  const handleGuess = () => {
    const guess = parseInt(userGuess);
    
    if (isNaN(guess)) {
      setFeedback('请输入有效的数字！');
      return;
    }
    
    if (guess < range.min || guess > range.max) {
      setFeedback(`请输入一个在 ${range.min} 到 ${range.max} 之间的数字！`);
      return;
    }
    
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    if (guess === targetNumber) {
      setFeedback(`恭喜！你猜对了！答案就是 ${targetNumber}。用了 ${newAttempts} 次尝试。`);
      setGameState('won');
    } else if (newAttempts >= maxAttempts) {
      setFeedback(`游戏结束！你已用完所有 ${maxAttempts} 次尝试。正确答案是 ${targetNumber}。`);
      setGameState('lost');
    } else if (guess < targetNumber) {
      setFeedback(`太小了！还剩 ${maxAttempts - newAttempts} 次尝试。`);
    } else {
      setFeedback(`太大了！还剩 ${maxAttempts - newAttempts} 次尝试。`);
    }
    
    setUserGuess('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && gameState === 'playing') {
      handleGuess();
    }
  };

  return (
    <motion.div 
      className="w-full h-full flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 text-white p-4 rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onExit}
          className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-center">猜数字游戏</h1>
        <div className="w-10"></div> {/* 为了平衡布局 */}
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="bg-white/10 rounded-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-sm text-white/70 mb-1">难度: {difficulty}</div>
            <div className="text-lg mb-1">猜一个 {range.min} 到 {range.max} 之间的数字</div>
            <div className="text-sm text-white/70">尝试次数: {attempts}/{maxAttempts}</div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg mb-6">
            <p className={`text-center text-lg mb-2 ${
              feedback.includes('恭喜') ? 'text-green-300' : 
              feedback.includes('游戏结束') ? 'text-red-300' : 'text-white'
            }`}>
              {feedback}
            </p>
          </div>
          
          {gameState === 'playing' ? (
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={userGuess}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={`${range.min}-${range.max}`}
                  min={range.min}
                  max={range.max}
                />
                <button
                  onClick={handleGuess}
                  className="bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded-lg"
                >
                  猜!
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-6">
              <button
                onClick={startNewGame}
                className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-2 rounded-lg"
              >
                再玩一次
              </button>
            </div>
          )}
          
          {gameState === 'playing' && (
            <div className="flex justify-center gap-3 mb-6">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    difficulty === level 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-white/80'
                  }`}
                >
                  {level === 'easy' ? '简单' : level === 'medium' ? '中等' : '困难'}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-white/50 text-sm mt-8 text-center">
          <p>提示：游戏的目标是用最少的尝试次数猜出正确的数字。</p>
          <p>每次猜测后，系统会提示你的猜测是太高还是太低。</p>
        </div>
      </div>
    </motion.div>
  );
};

export default GuessNumberGame; 