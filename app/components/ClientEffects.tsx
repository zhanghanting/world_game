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
  // 强制确保组件重新渲染一次
  const [forceRender, setForceRender] = useState(false);
  
  useEffect(() => {
    // 页面加载后强制重新渲染一次，确保特效正确应用
    const timer = setTimeout(() => {
      setForceRender(true);
      console.log('Force re-render ClientEffects');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <EffectsToggleWithContext key={`toggle-${forceRender}`} />
      <MouseFollowWithContext key={`mouse-${forceRender}`} />
    </>
  );
}

// 这些组件需要使用context，所以定义在同一个文件中
const MouseFollowWithContext = () => {
  // 强制确保特效显示
  const [forceShow, setForceShow] = useState(false);
  
  useEffect(() => {
    // 页面完全加载后强制显示特效
    const timer = setTimeout(() => {
      setForceShow(true);
      console.log('Force show mouse effect');
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ClientOnly>
      <MouseFollowEffectWrapper forceShow={forceShow} />
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

interface MouseFollowEffectWrapperProps {
  forceShow?: boolean;
}

const MouseFollowEffectWrapper = ({ forceShow = false }: MouseFollowEffectWrapperProps) => {
  const { mouseEffectsEnabled, effectsEnabled } = useEffects();
  const [mounted, setMounted] = useState(false);
  
  // 在组件挂载后再检查效果状态
  useEffect(() => {
    setMounted(true);
    console.log('MouseFollowEffect mounted, status:', { 
      mouseEffectsEnabled, 
      effectsEnabled,
      forceShow,
      shouldShow: (mouseEffectsEnabled || forceShow) && mounted
    });
  }, [mouseEffectsEnabled, effectsEnabled, forceShow]);

  // 如果鼠标效果被禁用并且没有强制显示，或者组件未挂载，不渲染任何内容
  if ((!mouseEffectsEnabled && !forceShow) || !mounted) {
    console.log('MouseFollowEffect not rendering', { mouseEffectsEnabled, forceShow, mounted });
    return null;
  }
  
  console.log('Rendering MouseFollowEffect');
  return (
    // 最高z-index确保鼠标效果始终显示在最上层
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <MouseFollowEffect 
        color="rgba(99, 102, 241, 0.8)" 
        trailLength={12} 
        minSize={6} 
        maxSize={30} 
        blur={12}
        speed={0.25}
        opacity={0.75}
      />
    </div>
  );
};

const EffectsToggleWrapper = () => {
  const { effectsEnabled, toggleEffects } = useEffects();
  
  return <EffectsToggle defaultEnabled={effectsEnabled} onToggle={toggleEffects} />;
}; 