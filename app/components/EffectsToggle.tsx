'use client';

import React, { useState, useEffect } from 'react';
import { CubeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useEffects } from '../providers';

interface EffectsToggleProps {
  defaultEnabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

const EffectsToggle: React.FC<EffectsToggleProps> = ({
  defaultEnabled = true,
  onToggle
}) => {
  const { 
    particleEffectsEnabled, 
    toggleParticleEffects, 
    tiltEffectsEnabled, 
    toggleTiltEffects 
  } = useEffects();
  
  const [showControls, setShowControls] = useState(false);
  
  // 检查本地存储中的设置
  useEffect(() => {
    // 检查粒子效果的设置
    const savedParticleSetting = localStorage.getItem('particleEffectsEnabled');
    if (savedParticleSetting === null) {
      // 如果没有设置，默认开启粒子效果
      localStorage.setItem('particleEffectsEnabled', 'true');
      toggleParticleEffects(true);
    }
  }, [toggleParticleEffects]);
  
  const handleTiltToggle = () => {
    // 直接使用context中的toggleTiltEffects方法
    toggleTiltEffects(!tiltEffectsEnabled);
  };

  const handleParticleToggle = () => {
    toggleParticleEffects(!particleEffectsEnabled);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2 pointer-events-auto">
      {/* 额外控制面板 */}
      {showControls && (
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 shadow-lg flex flex-col gap-2 mb-2">
          <button
            onClick={handleParticleToggle}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700/70 transition-all duration-300"
            title={particleEffectsEnabled ? '禁用粒子背景' : '启用粒子背景'}
          >
            <SparklesIcon 
              className={`h-5 w-5 ${particleEffectsEnabled ? 'text-purple-400' : 'text-gray-400'}`} 
            />
            <span className="text-sm whitespace-nowrap">
              {particleEffectsEnabled ? '粒子背景：开' : '粒子背景：关'}
            </span>
          </button>
          
          <button
            onClick={handleTiltToggle}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700/70 transition-all duration-300"
            title={tiltEffectsEnabled ? '禁用3D效果' : '启用3D效果'}
          >
            <CubeIcon 
              className={`h-5 w-5 ${tiltEffectsEnabled ? 'text-blue-400' : 'text-gray-400'}`} 
            />
            <span className="text-sm whitespace-nowrap">
              {tiltEffectsEnabled ? '3D效果：开' : '3D效果：关'}
            </span>
          </button>
        </div>
      )}
      
      {/* 主按钮 */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="flex items-center justify-center p-2 rounded-full bg-gray-800/70 backdrop-blur-sm text-white shadow-lg hover:bg-gray-700/70 transition-all duration-300"
        title="特效控制面板"
      >
        <CubeIcon className="h-6 w-6 text-blue-400" />
      </button>
    </div>
  );
};

export default EffectsToggle; 