'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import { CSSTransition } from 'react-transition-group';
import GuessNumberGame from '../components/games/GuessNumberGame';
import MemoryCardGame from '../components/games/MemoryCardGame';
import BasicGame from '../components/games/BasicGame';

const GamePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get('id');
  const gameName = searchParams.get('name') || '游戏';
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gameError, setGameError] = useState<string | null>(null);

  useEffect(() => {
    // 模拟游戏加载
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!gameId) {
        setGameError('游戏ID不存在，请返回首页选择游戏');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [gameId]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`全屏模式出错: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // 监听全屏变化
  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    
    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, []);

  // 处理返回
  const handleBack = () => {
    router.push('/');
  };

  // 根据游戏ID加载对应游戏组件
  const renderGameComponent = () => {
    // 这里可以根据gameId动态加载不同的游戏组件
    switch(gameId) {
      case '1':
        return <GuessNumberGame onExit={handleBack} />;
      case '2':
        return <MemoryCardGame onExit={handleBack} />;
      default:
        // 对于其他游戏ID，使用BasicGame组件，它会显示游戏的基本信息
        // 并提示玩家游戏正在开发中
        return <BasicGame gameId={gameId || undefined} onExit={handleBack} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* 游戏内容容器 */}
      <div className="container mx-auto px-4 py-6">
        {/* 顶部导航栏 */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            <span>返回</span>
          </button>
          
          <h1 className="text-xl font-bold">{gameName}</h1>
          
          <button 
            onClick={toggleFullscreen}
            className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isFullscreen ? '退出全屏' : '全屏模式'}
          >
            {isFullscreen ? (
              <ArrowsPointingInIcon className="h-5 w-5" />
            ) : (
              <ArrowsPointingOutIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* 游戏主界面 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden h-[calc(100vh-8rem)]">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 border-4 border-accent-purple border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg">加载游戏中...</p>
            </div>
          ) : gameError ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="text-red-500 text-xl mb-4">❌ 错误</div>
              <p className="mb-6">{gameError}</p>
              <button 
                onClick={handleBack}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                返回首页
              </button>
            </div>
          ) : (
            <CSSTransition
              in={!isLoading}
              timeout={300}
              classNames={{
                enter: 'game-fullscreen-enter',
                enterActive: 'game-fullscreen-enter-active',
                exit: 'game-fullscreen-exit',
                exitActive: 'game-fullscreen-exit-active',
              }}
              unmountOnExit
            >
              <div className="w-full h-full">
                {renderGameComponent()}
              </div>
            </CSSTransition>
          )}
        </div>
        
        {/* 底部提示信息 */}
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>提示：按 F11 或点击右上角按钮可进入/退出全屏模式</p>
        </div>
      </div>
    </div>
  );
};

export default GamePage; 