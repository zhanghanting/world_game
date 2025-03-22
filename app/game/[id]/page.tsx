"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Spinner } from '../../components/Spinner';
import { GameModal } from '../../components/GameModal';
import SimilarGames from '../../components/SimilarGames';
import GameInfo from '../../components/GameInfo';
import { Game } from '../../data/games';
import { extractGameIdFromUrl, getDomainFromUrl, isGameEmbeddable, getProxiedGameUrl } from '../../utils/gameUtils';
import { getGameById, findSimilarGames } from '../../utils/gameUtils';

export default function GamePage({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<Game | null>(null);
  const [similarGames, setSimilarGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [gameError, setGameError] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [gameResource, setGameResource] = useState("");
  const [useAlternativeLoading, setUseAlternativeLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        const fetchedGame = getGameById(params.id);
        
        if (fetchedGame) {
          setGame(fetchedGame);
          
          // 提取游戏资源信息
          if (fetchedGame.embedUrl) {
            setGameResource(fetchedGame.embedUrl);
          } else if (fetchedGame.gameUrl) {
            setGameResource(fetchedGame.gameUrl);
          }
          
          // 找到相似游戏
          const similar = findSimilarGames(fetchedGame, 5);
          setSimilarGames(similar);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching game data:", error);
        setLoading(false);
      }
    };

    fetchGameData();
  }, [params.id]);

  // 获取游戏域名
  const getGameDomain = () => {
    if (!game) return '';

    const urlToUse = game.embedUrl || game.gameUrl || '';
    try {
      return getDomainFromUrl(urlToUse);
    } catch (error) {
      console.error('Error extracting domain:', error);
      return '';
    }
  };

  // 获取正确的游戏URL
  const getProperGameUrl = () => {
    if (!game) return '';
    
    if (useAlternativeLoading) {
      // 使用直接URL通过代理加载
      const gameDirectUrl = game.gameUrl || game.embedUrl || '';
      if (!gameDirectUrl) return '';
      
      // 确认游戏URL包含http协议
      const url = gameDirectUrl.startsWith('http') 
        ? gameDirectUrl 
        : `https://${gameDirectUrl}`;
        
      return `/api/gameproxy?url=${encodeURIComponent(url)}`;
    } else {
      // 使用嵌入URL通过代理加载
      const embedUrl = game.embedUrl || '';
      if (!embedUrl) return '';
      
      // 确认嵌入URL包含http协议
      const url = embedUrl.startsWith('http') 
        ? embedUrl 
        : `https://${embedUrl}`;
        
      return `/api/gameproxy?url=${encodeURIComponent(url)}`;
    }
  };

  // 处理游戏加载事件
  const handleGameLoad = () => {
    console.log("Game loaded successfully");
    setGameError(false);
  };

  // 处理游戏加载错误
  const handleGameError = () => {
    console.error("Game failed to load");
    // 如果还没有使用替代加载方式且加载尝试次数小于最大尝试次数
    if (!useAlternativeLoading && loadAttempts < 2) {
      // 尝试使用替代加载方式
      setUseAlternativeLoading(true);
      setLoadAttempts(prev => prev + 1);
      setGameError(false);
    } else {
      setGameError(true);
      setGameStarted(false); // 重置游戏状态，显示启动界面
    }
  };

  // 切换全屏模式
  const toggleFullscreen = () => {
    setFullscreenMode(!fullscreenMode);
  };

  // 重新加载游戏
  const reloadGame = () => {
    setGameError(false);
    setLoadAttempts(0);
    setUseAlternativeLoading(false);
    setGameStarted(true);
    
    if (iframeRef.current) {
      iframeRef.current.src = getProperGameUrl();
    }
  };

  // Start game
  const startGame = () => {
    console.log("Starting game...");
    setGameStarted(true);
    
    // Add a small delay to ensure the iframe loads correctly
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.src = getProperGameUrl();
      }
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
        <span className="ml-3 text-lg font-medium">Loading game...</span>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center p-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the game you requested. The link may be invalid or the game has been removed.</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto p-4 ${fullscreenMode ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {!fullscreenMode && (
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6 text-blue-600 hover:underline">
              &larr; Back to Home
            </Link>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="relative w-full h-60 mb-4">
                <Image
                  src={game.coverImage || game.image || '/images/default-game.jpg'}
                  alt={game.title || game.name || 'Game Preview'}
                  fill
                  className="rounded-md object-cover"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold mb-2">{game.title || game.name}</h1>
              <div className="flex items-center mb-4">
                <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-2">
                  {getGameDomain()}
                </span>
                <span className={`text-sm px-2 py-1 rounded ${
                  game.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                  game.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                  'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {game.difficulty === 'easy' ? 'Easy' : 
                   game.difficulty === 'medium' ? 'Medium' : 'Hard'}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{game.description}</p>
              <GameInfo game={game} />
            </div>
          </div>
        )}

        <div className={`${fullscreenMode ? 'w-full h-full' : 'lg:col-span-8'}`}>
          <div 
            ref={gameContainerRef}
            className={`bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden ${
              fullscreenMode ? 'w-full h-full flex justify-center items-center' : 'aspect-video'
            }`}
          >
            {gameError ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-2">Game Resources Unavailable</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Unable to load this game. This might be due to temporarily unavailable game resources or cross-origin restrictions.
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={reloadGame}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg transition-colors"
                  >
                    Open Game Link
                  </button>
                </div>
              </div>
            ) : !gameStarted ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="relative w-24 h-24 mb-6 md:w-32 md:h-32">
                  <Image
                    src={game.coverImage || game.image || '/images/default-game.jpg'}
                    alt={game.title || game.name || 'Game Preview'}
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                    priority
                  />
                </div>
                <h2 className="text-3xl font-bold mb-3 text-white drop-shadow-md">
                  {game.title || game.name}
                </h2>
                <p className="text-blue-100 mb-8 max-w-md">
                  Ready to take on this exciting game? Click the button below to start playing!
                </p>
                <div className="space-y-4">
                  <button 
                    onClick={startGame}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Play Game
                  </button>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => setFullscreenMode(true)}
                      className="text-blue-200 hover:text-white flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                      Fullscreen Mode
                    </button>
                    <button 
                      onClick={() => setShowModal(true)}
                      className="text-blue-200 hover:text-white flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open in New Window
                    </button>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {game.categories && game.categories.map((category: string, index: number) => (
                    <span key={index} className="bg-blue-800 bg-opacity-50 text-blue-100 text-xs px-3 py-1 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={getProperGameUrl()}
                className={`w-full ${fullscreenMode ? 'h-full' : 'aspect-video'}`}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onLoad={handleGameLoad}
                onError={handleGameError}
                sandbox="allow-forms allow-scripts allow-same-origin allow-modals allow-orientation-lock allow-pointer-lock allow-popups"
              />
            )}
          </div>

          {gameStarted && (
            <div className="mt-4 flex justify-between items-center">
              <button 
                onClick={toggleFullscreen}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg transition-colors"
              >
                {fullscreenMode ? 'Exit Fullscreen' : 'Fullscreen Mode'}
              </button>
              <button 
                onClick={() => setGameStarted(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Back to Game Menu
              </button>
            </div>
          )}

          {!fullscreenMode && !gameStarted && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Similar Games</h2>
              <SimilarGames games={similarGames} />
            </div>
          )}
        </div>
      </div>

      <GameModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        game={game}
      />
    </div>
  );
} 