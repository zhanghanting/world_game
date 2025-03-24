'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useEffects } from '../providers';

// 使用动态导入确保组件只在客户端渲染
const MouseFollowEffect = dynamic(
  () => import('./MouseFollowEffect'),
  { ssr: false }
);

const EffectsToggle = dynamic(
  () => import('./EffectsToggle'),
  { ssr: false }
);

export default function ClientEffects() {
  return (
    <>
      <EffectsToggleWithContext />
      <MouseFollowWithContext />
    </>
  );
}

// 这些组件需要使用context，所以定义在同一个文件中
const MouseFollowWithContext = () => {
  return (
    <ClientOnly>
      <MouseFollowEffectWrapper />
    </ClientOnly>
  );
};

const EffectsToggleWithContext = () => {
  return (
    <ClientOnly>
      <EffectsToggleWrapper />
    </ClientOnly>
  );
};

// 包裹组件以确保仅在客户端渲染
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return <>{children}</>;
};

const MouseFollowEffectWrapper = () => {
  const { effectsEnabled } = useEffects();
  
  if (!effectsEnabled) return null;
  
  return (
    <MouseFollowEffect 
      color="rgba(99, 102, 241, 0.8)" 
      trailLength={12} 
      minSize={6} 
      maxSize={30} 
      blur={12}
      speed={0.25}
      opacity={0.75}
    />
  );
};

const EffectsToggleWrapper = () => {
  const { effectsEnabled, toggleEffects } = useEffects();
  
  return <EffectsToggle defaultEnabled={effectsEnabled} onToggle={toggleEffects} />;
}; 