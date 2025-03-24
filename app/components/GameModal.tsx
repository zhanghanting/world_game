'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Game } from './GameCard';
import { useEffects } from '../providers';

interface GameModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ game, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  
  // 获取3D效果控制
  const { tiltEffectsEnabled, mouseEffectsEnabled, toggleTiltEffects } = useEffects();
  
  // 保存之前的效果状态
  const [previousTiltState, setPreviousTiltState] = useState(true);

  // 监听模态框打开/关闭状态
  useEffect(() => {
    // 只在状态变化时执行
    if (isOpen) {
      // 打开时：保存当前状态并禁用3D效果
      console.log('Modal opened: Disabling tilt effects');
      setPreviousTiltState(tiltEffectsEnabled);
      toggleTiltEffects(false);
      
      // 防止滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 关闭时：恢复之前的状态
      console.log('Modal closed: Restoring tilt effects to', previousTiltState);
      toggleTiltEffects(previousTiltState);
      
      // 恢复滚动
      document.body.style.overflow = 'auto';
    }
    
    // 组件卸载时也恢复状态
    return () => {
      if (isOpen) {
        console.log('Component unmounting: Restoring tilt effects');
        toggleTiltEffects(previousTiltState);
        document.body.style.overflow = 'auto';
      }
    };
  }, [isOpen, toggleTiltEffects, previousTiltState]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setLoadError(false);
    // Force iframe reload by updating a key or src
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };
  
  // 使用useCallback包装handleClose，避免每次渲染都重新创建
  const handleClose = useCallback(() => {
    onClose();
    // 不在这里设置状态，由useEffect监听isOpen变化来处理
  }, [onClose]);

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  if (!game) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center" 
      style={{ perspective: 'none' }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      {/* Modal Container - 完全扁平化设计，无任何3D效果 */}
      <div 
        className={`relative bg-gray-900 rounded-lg overflow-hidden z-10 flex flex-col ${
          fullscreen ? 'w-screen h-screen rounded-none' : 'w-[95%] max-w-6xl h-[90vh] max-h-[800px]'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          transform: 'none',
          perspective: 'none',
          transformStyle: 'flat',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 shrink-0">
          <h3 className="text-xl font-semibold text-white">
            {game.title || game.name}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="text-gray-400 hover:text-white p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {fullscreen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                )}
              </svg>
            </button>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white p-1"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Game Content */}
        <div className="relative flex-grow w-full bg-black">
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
              <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300">Loading game...</p>
            </div>
          )}
          
          {/* Error Message */}
          {loadError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
              <div className="text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Failed to load game</h3>
              <p className="text-gray-400 mb-4 text-center max-w-md px-4">
                This game cannot be embedded directly. You may need to open it in a new tab.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleRetry}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  Retry
                </button>
                {game.gameUrl && (
                  <a
                    href={game.gameUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                    Open in New Tab
                  </a>
                )}
              </div>
            </div>
          )}
          
          {/* Game iframe - 确保完全平面化显示 */}
          {game.embedUrl && game.isEmbeddable !== false ? (
            <div 
              className="w-full h-full"
              style={{ 
                transform: 'none',
                perspective: 'none',
                transformStyle: 'flat',
                overflow: 'hidden'
              }}
            >
              <iframe
                id="game-iframe"
                src={game.embedUrl}
                className="w-full h-full"
                style={{ 
                  transform: 'none',
                  perspective: 'none',
                  transformStyle: 'flat',
                  border: 'none',
                  display: 'block'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              ></iframe>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
              <div className="text-blue-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">外部游戏</h3>
              <p className="text-gray-400 mb-4 text-center max-w-md px-4">
                此游戏需要在外部网站上玩，点击下方按钮在新标签页中打开游戏。
              </p>
              <a
                href={game.gameUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full"
                style={{ transform: 'none' }}
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                在新标签页中打开
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};