'use client';

import React, { useState, useEffect, useRef } from 'react';
import { XCircleIcon, ArrowPathIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import { games } from '../../data/games';
import { gameResources } from '../../data/gameResources';

interface BasicGameProps {
  gameId?: string;
  onExit: () => void;
}

const BasicGame: React.FC<BasicGameProps> = ({ gameId = '3', onExit }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [gameData, setGameData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // 根据gameId获取游戏数据
  useEffect(() => {
    // 先查找本地游戏数据
    const localGame = games.find(g => g.id === gameId);
    
    // 然后查找外部游戏资源
    const externalGame = gameResources.find(g => g.id === gameId);
    
    if (localGame) {
      // 查找对应的外部游戏资源以获取embedUrl
      const matchingExternalGame = gameResources.find(g => g.id === gameId || g.id === localGame.id);
      
      setGameData({
        ...localGame,
        source: 'local',
        embedUrl: matchingExternalGame?.embedUrl || null
      });
    } else if (externalGame) {
      setGameData({
        ...externalGame,
        source: externalGame.source,
      });
    } else {
      setError(`无法找到ID为 ${gameId} 的游戏数据`);
    }
    
    // 模拟加载
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [gameId]);

  // 处理开始游戏
  const handleStartGame = () => {
    setShowPlaceholder(false);
    setIframeLoading(true);
    setIframeError(null);
  };
  
  // 处理游戏重新加载
  const handleReload = () => {
    if (!showPlaceholder) {
      // 重新加载iframe
      setIframeLoading(true);
      setIframeError(null);
      if (iframeRef.current && iframeRef.current.src) {
        iframeRef.current.src = iframeRef.current.src;
      }
    } else {
      // 重新加载游戏数据
      setIsLoading(true);
      setError(null);
      setShowPlaceholder(true);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  
  // 处理iframe加载完成
  const handleIframeLoad = () => {
    setIframeLoading(false);
  };
  
  // 处理iframe加载错误
  const handleIframeError = () => {
    setIframeLoading(false);
    setIframeError('游戏加载失败，请检查网络连接或稍后再试。');
  };
  
  // 添加iframe加载超时处理
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (!showPlaceholder && gameData?.embedUrl) {
      // 设置30秒超时，如果iframe超过这个时间还没加载完毕，认为是加载失败
      timeoutId = setTimeout(() => {
        if (iframeLoading) {
          setIframeLoading(false);
          setIframeError('游戏加载超时，可能是网络问题或游戏源不可用。请尝试刷新或选择其他游戏。');
        }
      }, 30000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showPlaceholder, iframeLoading, gameData?.embedUrl]);
  
  // 切换全屏模式
  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    
    if (!document.fullscreenElement) {
      iframeRef.current.requestFullscreen().catch(err => {
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

  // 渲染游戏加载状态
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gray-800 text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-xl font-bold mb-2">加载游戏中...</h3>
        <p className="text-gray-400">请稍候，我们正在准备您的游戏体验</p>
      </div>
    );
  }

  // 渲染错误状态
  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gray-800 text-white">
        <XCircleIcon className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">游戏加载失败</h3>
        <p className="text-gray-400 mb-4">{error}</p>
        <div className="flex space-x-4">
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center"
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            重试
          </button>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  // 如果没有游戏数据
  if (!gameData) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gray-800 text-white">
        <XCircleIcon className="w-16 h-16 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">游戏不可用</h3>
        <p className="text-gray-400 mb-4">该游戏目前不可用，请尝试其他游戏。</p>
        <button
          onClick={onExit}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
        >
          返回
        </button>
      </div>
    );
  }

  // 渲染游戏占位符
  if (showPlaceholder) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gray-800 text-white">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">{gameData.categories?.[0] === 'puzzle' ? '🧩' : gameData.categories?.[0] === 'action' ? '⚔️' : '🎮'}</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">{gameData.name || gameData.title}</h2>
          <p className="text-gray-400 mb-6">{gameData.description}</p>
          
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-2">游戏信息</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">类别:</div>
              <div className="text-right">{Array.isArray(gameData.categories) ? gameData.categories.join(', ') : '未分类'}</div>
              
              <div className="text-gray-400">难度:</div>
              <div className="text-right">{gameData.difficulty || '中等'}</div>
              
              <div className="text-gray-400">来源:</div>
              <div className="text-right">{gameData.source || '本地游戏'}</div>
            </div>
          </div>
          
          <button
            onClick={handleStartGame}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-medium text-white hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-700/20"
            disabled={!gameData.embedUrl}
          >
            {gameData.embedUrl ? '开始游戏' : '游戏暂不可用'}
          </button>
          
          <button
            onClick={onExit}
            className="w-full mt-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-gray-300 transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  // 检查是否有嵌入URL
  if (!gameData.embedUrl) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gray-800 text-white">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">🚧</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">游戏开发中</h2>
          <p className="text-gray-400 mb-6">
            《{gameData.name || gameData.title}》正在开发中，敬请期待完整版本！
          </p>
          
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-2">开发进度</h3>
            <div className="w-full bg-gray-600 rounded-full h-2.5 mb-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <p className="text-sm text-gray-400">完成度约35%，预计很快发布</p>
          </div>
          
          <button
            onClick={onExit}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-medium text-white hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-700/20"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  // 渲染游戏iframe
  return (
    <div className="w-full h-full relative bg-gray-900">
      {/* 顶部控制栏 */}
      <div className="absolute top-0 left-0 right-0 bg-gray-800 bg-opacity-70 backdrop-blur-sm z-10 flex justify-between items-center p-3">
        <h3 className="text-white font-bold truncate max-w-[60%]">{gameData.name || gameData.title}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={handleReload}
            className="p-2 text-white hover:text-blue-400 transition-colors"
            title="重新加载"
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="p-2 text-white hover:text-blue-400 transition-colors"
            title={isFullscreen ? '退出全屏' : '全屏模式'}
          >
            {isFullscreen ? <ArrowsPointingInIcon className="w-5 h-5" /> : <ArrowsPointingOutIcon className="w-5 h-5" />}
          </button>
          <button 
            onClick={onExit}
            className="p-2 text-white hover:text-blue-400 transition-colors"
            title="返回"
          >
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* iframe加载状态 */}
      {iframeLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 z-5">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white">加载游戏中...</p>
          <p className="text-gray-400 text-sm mt-2">这可能需要一些时间，具体取决于游戏大小和网络速度</p>
        </div>
      )}
      
      {/* iframe错误状态 */}
      {iframeError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 z-5">
          <XCircleIcon className="w-16 h-16 text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">加载失败</h3>
          <p className="text-gray-300 mb-4 text-center max-w-md">{iframeError}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleReload}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              重试
            </button>
            <button
              onClick={() => setShowPlaceholder(true)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              返回游戏信息
            </button>
          </div>
        </div>
      )}
      
      {/* 游戏iframe */}
      {gameData.source === 'CrazyGames' ? (
        <iframe
          ref={iframeRef}
          src={gameData.embedUrl}
          className="w-full h-full border-0"
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-pointer-lock"
          loading="eager"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{
            border: 'none',
            display: iframeLoading ? 'none' : 'block',
            touchAction: 'auto'
          }}
        ></iframe>
      ) : (
        // 使用GameDistribution格式的嵌入方式，这个平台专门设计用于嵌入
        <iframe
          ref={iframeRef}
          src={`https://html5.gamedistribution.com/${gameData.embedUrl.split('/').pop() || 'rvvASMiM'}`}
          className="w-full h-full border-0"
          scrolling="none"
          frameBorder="0"
          allow="fullscreen"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{
            border: 'none',
            display: iframeLoading ? 'none' : 'block'
          }}
        ></iframe>
      )}
      
      {/* 直接游戏链接提示 */}
      <div className="absolute bottom-4 right-4 z-10">
        <a 
          href={gameData.gameUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center px-3 py-2 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-opacity-90 transition-all"
        >
          <span>游戏无法加载？尝试直接访问</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default BasicGame; 