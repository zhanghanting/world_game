'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { useEffects } from '../providers';

interface ParallaxEffectProps {
  children: ReactNode;
  sensitivity?: number;
  className?: string;
  layers?: number[];  // 层级的深度系数，数值越大移动越慢
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  children,
  sensitivity = 0.05,
  className = '',
  layers = [10, 20, 30, 40]  // 默认4层，移动速度递减
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children);
  // 获取效果状态
  const { effectsEnabled } = useEffects();
  
  // 确保子元素数量不超过层级数量
  const validChildren = childrenArray.slice(0, layers.length);
  
  // 如果没有提供足够的子元素，使用最后一个子元素填充
  while (validChildren.length < layers.length && childrenArray.length > 0) {
    validChildren.push(childrenArray[childrenArray.length - 1]);
  }
  
  useEffect(() => {
    // 如果效果被禁用，不添加事件监听器
    if (!effectsEnabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }
    
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      
      // 计算鼠标在容器内的相对位置 (-1 到 1 的范围)
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      
      setPosition({ x, y });
    };
    
    // 添加鼠标移动事件监听器到容器
    container.addEventListener('mousemove', handleMouseMove);
    
    // 鼠标离开容器时重置位置
    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };
    
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [effectsEnabled]);
  
  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
    >
      {validChildren.map((child, index) => {
        // 如果效果被禁用，所有层级都不移动
        if (!effectsEnabled) {
          return (
            <div key={index} className="absolute inset-0" style={{ zIndex: layers.length - index }}>
              {child}
            </div>
          );
        }
        
        // 根据层级深度计算移动量
        const depth = layers[index];
        const translateX = position.x * sensitivity * 100 / depth;
        const translateY = position.y * sensitivity * 100 / depth;
        
        return (
          <div 
            key={index}
            className="absolute inset-0 transition-transform duration-300"
            style={{ 
              transform: `translate(${translateX}px, ${translateY}px)`,
              zIndex: layers.length - index  // 更深层的元素在底部
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default ParallaxEffect; 