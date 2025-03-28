'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import { CSSTransition } from 'react-transition-group';
import GuessNumberGame from '../components/games/GuessNumberGame';
import MemoryCardGame from '../components/games/MemoryCardGame';
import BasicGame from '../components/games/BasicGame';
import { getGameById } from '../utils/gameUtils'; // 导入getGameById函数

// 分离出使用useSearchParams的组件
function GameContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get('id');
  const gameName = searchParams.get('name') || '游戏';
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gameError, setGameError] = useState<string | null>(null);
  const [gameData, setGameData] = useState<any>(null);

  useEffect(() => {
    // 验证游戏ID并加载游戏数据
    const loadGameData = async () => {
      setIsLoading(true);
      
      if (!gameId) {
        setGameError('游戏ID不存在，请返回首页选择游戏');
        setIsLoading(false);
        return;
      }
      
      // 尝试获取游戏数据
      const game = getGameById(gameId);
      
      if (!game) {
        setGameError(`找不到ID为 ${gameId} 的游戏，可能已被移除或链接无效`);
        setIsLoading(false);
        return;
      }
      
      setGameData(game);
      setIsLoading(false);
    };
    
    loadGameData();
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
    if (!gameId || !gameData) return null;
    
    // 这里可以根据gameId动态加载不同的游戏组件
    switch(gameId) {
      case '1':
        return <GuessNumberGame onExit={handleBack} />;
      case '2':
        return <MemoryCardGame onExit={handleBack} />;
      default:
        // 对于其他游戏ID，使用BasicGame组件，它会显示游戏的基本信息
        // 并提示玩家游戏正在开发中
        return <BasicGame gameId={gameId} onExit={handleBack} />;
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
          
          <h1 className="text-xl font-bold">{gameData?.name || gameName}</h1>
          
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
}

// 主游戏页面组件，使用Suspense包裹GameContent
const GamePage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">加载游戏中...</p>
        </div>
      </div>
    }>
      <GameContent />
    </Suspense>
  );
};

export default GamePage; 