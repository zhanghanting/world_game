'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { GameModal } from './GameModal';

// Define the Game type if it doesn't exist
export interface Game {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  coverImage?: string;
  image?: string;
  category?: string;
  categories?: string[];
  rating?: number;
  gameUrl?: string;
  embedUrl?: string;
  isEmbeddable?: boolean;
  difficulty?: string;
  isNew?: boolean;
  isTrending?: boolean;
  isImplemented?: boolean;
}

interface GameCardProps {
  game: Game;
  priority?: boolean;
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, priority = false, onClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Default image if game image not found - 使用已有的默认图片
  const fallbackImage = '/images/default.svg';
  
  // Calculate rating stars (filled and outline)
  const rating = game.rating || 4.5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // 处理卡片点击，如果提供了onClick则调用它
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowModal(true);
    }
  };

  // 生成正确的游戏链接
  const gameLink = `/game?id=${game.id}&name=${encodeURIComponent(game.title || game.name || 'Game')}`;

  return (
    <>
      <div 
        className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Game Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={game.coverImage || game.image || fallbackImage}
            alt={game.title || game.name || 'Game Preview'}
            width={640}
            height={360}
            className="object-cover w-full h-full transition-transform duration-700 transform group-hover:scale-110"
            priority={priority}
            onError={(e) => {
              // 当图片加载失败时，替换为默认图片
              const imgElement = e.currentTarget as HTMLImageElement;
              if (imgElement.src !== fallbackImage) {
                imgElement.src = fallbackImage;
              }
            }}
          />
          
          {/* Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={handleCardClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full flex items-center transition-transform duration-300 transform hover:scale-105"
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                <span>Play Now</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Game Details */}
        <div className="p-4">
          <Link href={gameLink}>
            <h3 className="text-lg font-semibold text-white truncate hover:text-blue-400 transition-colors">
              {game.title || game.name}
            </h3>
          </Link>
          
          <div className="flex items-center mt-1">
            {/* Rating stars */}
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => {
                if (i < filledStars) {
                  return <StarIcon key={i} className="h-4 w-4 text-yellow-400" />;
                } else if (i === filledStars && hasHalfStar) {
                  return <StarIcon key={i} className="h-4 w-4 text-yellow-400" />; // Ideally we'd have a half-star icon
                } else {
                  return <StarOutlineIcon key={i} className="h-4 w-4 text-yellow-400" />;
                }
              })}
            </div>
            <span className="text-sm text-gray-400">{rating.toFixed(1)}</span>
            
            {/* Category tags */}
            <div className="ml-auto">
              {game.category && (
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                  {game.category}
                </span>
              )}
            </div>
          </div>
          
          {/* Game description - truncated */}
          <p className="mt-2 text-sm text-gray-400 line-clamp-2">
            {game.description || "Enjoy this exciting game with amazing graphics and gameplay!"}
          </p>
          
          {/* Play and info links */}
          <div className="flex mt-4 justify-between">
            <button 
              onClick={handleCardClick}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
            >
              <PlayIcon className="h-4 w-4 mr-1" />
              <span>Play</span>
            </button>
            
            <Link 
              href={gameLink}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              More Info
            </Link>
          </div>
        </div>
      </div>
      
      {/* Game Modal */}
      {showModal && (
        <GameModal 
          game={game} 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

export default GameCard;
