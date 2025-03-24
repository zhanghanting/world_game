'use client';

import React, { useEffect, useState, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface TrailPoint {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

interface MouseFollowEffectProps {
  color?: string;
  trailLength?: number;
  minSize?: number;
  maxSize?: number;
  opacity?: number;
  blur?: number;
  speed?: number;
}

const MouseFollowEffect: React.FC<MouseFollowEffectProps> = ({
  color = 'rgba(99, 102, 241, 0.8)', // 默认靛蓝色
  trailLength = 8, // 尾迹长度
  minSize = 5, // 最小粒子尺寸
  maxSize = 35, // 最大粒子尺寸
  opacity = 0.7,
  blur = 8,
  speed = 0.3, // 跟随速度系数 (0-1)，越小越平滑
}) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const [cursorVisible, setCursorVisible] = useState(false);
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  
  // 初始化尾迹点
  useEffect(() => {
    const initialPoints: TrailPoint[] = Array(trailLength).fill(null).map((_, i) => ({
      x: 0,
      y: 0,
      size: maxSize - ((maxSize - minSize) / trailLength) * i,
      opacity: opacity - (opacity * 0.7 * (i / trailLength)),
      color: getColorWithOpacity(color, opacity - (opacity * 0.7 * (i / trailLength)))
    }));
    setTrailPoints(initialPoints);
  }, [trailLength, minSize, maxSize, opacity, color]);
  
  // 动画循环，更新尾迹点位置
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      // 更新尾迹点位置
      setTrailPoints(prevPoints => {
        if (!prevPoints.length) return prevPoints;
        
        const newPoints = [...prevPoints];
        
        // 第一个点直接跟随鼠标，但有平滑过渡
        const dx0 = mousePosition.x - newPoints[0].x;
        const dy0 = mousePosition.y - newPoints[0].y;
        newPoints[0] = {
          ...newPoints[0],
          x: newPoints[0].x + dx0 * speed,
          y: newPoints[0].y + dy0 * speed
        };
        
        // 其余点跟随前一个点
        for (let i = 1; i < newPoints.length; i++) {
          const dx = newPoints[i-1].x - newPoints[i].x;
          const dy = newPoints[i-1].y - newPoints[i].y;
          const speedFactor = speed * (1 - 0.04 * i); // 后面的点移动更慢
          
          newPoints[i] = {
            ...newPoints[i],
            x: newPoints[i].x + dx * speedFactor,
            y: newPoints[i].y + dy * speedFactor
          };
        }
        
        return newPoints;
      });
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  
  // 启动动画循环
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [mousePosition]);
  
  // 处理鼠标事件
  useEffect(() => {
    // 节流函数，避免过于频繁的更新
    let lastUpdate = 0;
    const throttleTime = 5; // 毫秒
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate > throttleTime) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        lastUpdate = now;
      }
      if (!cursorVisible) setCursorVisible(true);
    };
    
    // 处理鼠标离开页面的情况
    const handleMouseLeave = () => {
      setCursorVisible(false);
    };
    
    // 处理鼠标进入页面的情况
    const handleMouseEnter = () => {
      setCursorVisible(true);
    };
    
    // 添加事件监听器
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // 清理事件监听器
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorVisible]);
  
  // 辅助函数：根据基础颜色和透明度生成新颜色
  const getColorWithOpacity = (baseColor: string, newOpacity: number): string => {
    // 假设传入的是rgba格式
    if (baseColor.startsWith('rgba')) {
      const matches = baseColor.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)/);
      if (matches && matches.length >= 4) {
        return `rgba(${matches[1]}, ${matches[2]}, ${matches[3]}, ${newOpacity})`;
      }
    }
    // 如果是rgb格式
    if (baseColor.startsWith('rgb(')) {
      const matches = baseColor.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
      if (matches && matches.length >= 4) {
        return `rgba(${matches[1]}, ${matches[2]}, ${matches[3]}, ${newOpacity})`;
      }
    }
    // 默认返回带透明度的蓝色
    return `rgba(99, 102, 241, ${newOpacity})`;
  };
  
  // 如果尾迹点未初始化，不渲染任何内容
  if (!trailPoints.length) return null;
  
  return (
    <>
      {trailPoints.map((point, index) => (
        <div 
          key={index}
          className="pointer-events-none fixed z-50"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: point.color,
            borderRadius: '50%',
            opacity: cursorVisible ? point.opacity : 0,
            mixBlendMode: 'screen',
            filter: `blur(${blur * (index === 0 ? 0.8 : 1 + index * 0.2)}px)`,
            transition: 'opacity 0.3s ease',
          }}
        />
      ))}
    </>
  );
};

export default MouseFollowEffect; 