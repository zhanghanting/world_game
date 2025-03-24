'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { useEffects } from '../providers';

interface TiltEffectProps {
  children: ReactNode;
  options?: {
    max?: number;          // 最大倾斜角度
    speed?: number;        // 倾斜转换的速度
    glare?: boolean;       // 是否启用眩光效果
    "max-glare"?: number;  // 最大眩光不透明度
    scale?: number;        // 缩放效果
    perspective?: number;  // 透视效果
    reverse?: boolean;     // 是否反转效果方向
    reset?: boolean;       // 鼠标离开时是否重置
    ['mouse-event-element']?: string; // 定义触发鼠标事件的元素
    gyroscope?: boolean;   // 是否启用陀螺仪
  };
  className?: string;
}

const defaultOptions = {
  max: 15,             // 最大倾斜角度
  speed: 500,          // 动画速度
  glare: true,         // 启用眩光效果
  "max-glare": 0.2,    // 眩光不透明度
  scale: 1.05,         // 轻微放大效果
  perspective: 1000,   // 透视值
  reverse: false,      // 不反转效果
  reset: true,         // 鼠标离开时重置
  gyroscope: false,    // 默认不启用陀螺仪
};

const TiltEffect: React.FC<TiltEffectProps> = ({ 
  children, 
  options = {}, 
  className = "" 
}) => {
  const tiltRef = useRef<HTMLDivElement>(null);
  // 获取效果状态
  const { effectsEnabled } = useEffects();
  
  useEffect(() => {
    const tiltElement = tiltRef.current;
    
    // 只有当effectsEnabled为true且组件已挂载时才应用效果
    if (tiltElement && effectsEnabled) {
      // 合并默认选项和用户提供的选项
      const tiltOptions = {
        ...defaultOptions,
        ...options,
      };
      
      // 初始化tilt效果
      VanillaTilt.init(tiltElement, tiltOptions);
      
      // 组件卸载或效果禁用时清理
      return () => {
        if ((tiltElement as any).vanillaTilt) {
          (tiltElement as any).vanillaTilt.destroy();
        }
      };
    }
  }, [options, effectsEnabled]);
  
  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  );
};

export default TiltEffect; 