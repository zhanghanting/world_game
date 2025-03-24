'use client';

import React, { useState, useEffect } from 'react';
import { CubeIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';

interface EffectsToggleProps {
  defaultEnabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

const EffectsToggle: React.FC<EffectsToggleProps> = ({
  defaultEnabled = true,
  onToggle
}) => {
  const [effectsEnabled, setEffectsEnabled] = useState(defaultEnabled);
  
  // 检查本地存储中的设置
  useEffect(() => {
    const savedSetting = localStorage.getItem('3dEffectsEnabled');
    if (savedSetting !== null) {
      const enabled = savedSetting === 'true';
      setEffectsEnabled(enabled);
      if (onToggle) onToggle(enabled);
    }
  }, [onToggle]);
  
  const toggleEffects = () => {
    const newValue = !effectsEnabled;
    setEffectsEnabled(newValue);
    localStorage.setItem('3dEffectsEnabled', newValue.toString());
    if (onToggle) onToggle(newValue);
  };
  
  return (
    <button
      onClick={toggleEffects}
      className="fixed bottom-4 right-4 z-50 flex items-center justify-center p-2 rounded-full bg-gray-800/70 backdrop-blur-sm text-white shadow-lg hover:bg-gray-700/70 transition-all duration-300"
      title={effectsEnabled ? '禁用3D效果' : '启用3D效果'}
    >
      {effectsEnabled ? (
        <CubeIcon className="h-6 w-6 text-blue-400" />
      ) : (
        <CubeTransparentIcon className="h-6 w-6 text-gray-400" />
      )}
    </button>
  );
};

export default EffectsToggle; 