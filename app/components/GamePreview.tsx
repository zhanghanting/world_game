'use client';

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Game } from '../data/games';
import { Dialog, Transition } from '@headlessui/react';

interface GamePreviewProps {
  game: Game;
  onClose: () => void;
}

export default function GamePreview({ game, onClose }: GamePreviewProps) {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    // 在预览加载完成后3秒显示播放按钮，引导用户注意
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowPlayButton(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  // 当图片加载失败时的处理函数
  const handleImageError = () => {
    console.error(`Error loading preview image for ${game.title}`);
    
    // 最多尝试加载1次
    if (retryCount < 1) {
      console.log(`Retrying image load for ${game.title}, attempt ${retryCount + 1}`);
      setRetryCount(retryCount + 1);
      // 短暂延迟后重试
      setTimeout(() => {
        const imgElement = document.getElementById(`preview-img-${game.id}`) as HTMLImageElement;
        if (imgElement) {
          imgElement.src = game.coverImage.replace('400x240', '800x450') + `&_=${Date.now()}`;
        }
      }, 500);
    } else {
      setImgError(true);
      setIsLoading(false);
    }
  };
  
  // 当图片加载完成时的处理函数
  const handleImageLoad = () => {
    console.log(`Preview image loaded successfully for ${game.title}`);
    setIsLoading(false);
  };
  
  // 从游戏URL中提取域名，用于显示
  const getGameDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch (e) {
      return '游戏网站';
    }
  };
  
  // 提取主色调，在加载失败时提供更好的视觉体验
  const getColorFromUrl = () => {
    try {
      // 从原始URL尝试提取颜色代码
      const colorMatch = game.coverImage.match(/\/([0-9A-Fa-f]{6})\//);
      return colorMatch ? `#${colorMatch[1]}` : '#5c6ac4';
    } catch (e) {
      return '#5c6ac4'; // 默认颜色
    }
  };
  
  // 预览图片URL - 使用游戏封面图作为预览，但使用更高质量版本
  const previewImageUrl = imgError
    ? `https://placehold.co/800x450/5c6ac4/ffffff?text=${encodeURIComponent(game.title + '预览')}`
    : game.coverImage.replace('400x240', '800x450');
  
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-2 flex items-center justify-between"
                >
                  <span>{game.title} 预览</span>
                  <button 
                    onClick={onClose} 
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="关闭预览"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </Dialog.Title>
                
                <div className="mt-2 aspect-video relative rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-900 group">
                  {/* 背景色块 */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ 
                      backgroundColor: getColorFromUrl(),
                      opacity: isLoading ? 1 : 0
                    }}
                  />
                  
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                  )}
                  
                  <img 
                    id={`preview-img-${game.id}`}
                    src={previewImageUrl}
                    alt={`${game.title} 预览`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    style={{ display: isLoading && imgError ? 'none' : 'block' }}
                  />
                  
                  {/* 播放图标悬浮在图片上 */}
                  <div className={`absolute inset-0 flex items-center justify-center ${showPlayButton ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 z-20`}>
                    <Link
                      href={`/game/${game.id}`}
                      className="bg-accent-purple bg-opacity-80 hover:bg-opacity-100 text-white p-4 rounded-full shadow-lg transform transition-transform hover:scale-110"
                      onClick={onClose}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                  
                  {/* 图片加载失败时显示的错误提示 */}
                  {imgError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                      <div className="text-center p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-white font-medium">图片加载失败</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {game.description}
                    </p>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">来源: {getGameDomain(game.gameUrl)}</p>
                      <div className="flex flex-wrap gap-1">
                        {game.categories.map(category => (
                          <span 
                            key={category}
                            className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">游戏玩法：</h4>
                    <ul className="list-disc pl-5 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {game.howToPlay.map((tip, index) => (
                        <li key={index} className="pb-1">{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 dark:bg-gray-600 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mr-3"
                    onClick={onClose}
                  >
                    关闭预览
                  </button>
                  <Link
                    href={`/game/${game.id}`}
                    className="inline-flex justify-center rounded-md border border-transparent bg-accent-purple px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    开始游戏
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
