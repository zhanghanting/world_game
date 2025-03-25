'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
}

// 将十六进制颜色转换为rgba格式
function hexToRgba(hex: string, opacity: number): string {
  let r = 0, g = 0, b = 0;
  
  // 3位十六进制颜色
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 6位十六进制颜色
  else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

interface ParticleBackgroundProps {
  count?: number;        // 粒子数量
  minSize?: number;      // 最小粒子尺寸
  maxSize?: number;      // 最大粒子尺寸
  minSpeed?: number;     // 最小上升速度
  maxSpeed?: number;     // 最大上升速度
  colors?: string[];     // 粒子颜色数组
  baseOpacity?: number;  // 基础透明度
  debug?: boolean;       // 是否启用调试模式
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 120,
  minSize = 1.5,     // 轻微增加最小大小
  maxSize = 3,       // 增加最大大小
  minSpeed = 0.1,
  maxSpeed = 0.3,
  colors = ['#6366f1', '#3b82f6', '#4f46e5', '#8b5cf6'], // 添加一些紫色回来
  baseOpacity = 0.5, // 增加基础不透明度
  debug = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [fallbackParticles, setFallbackParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 监听粒子效果开关的变化
  useEffect(() => {
    const handleParticleEffectsChanged = (event: any) => {
      if (!event.detail.enabled) {
        // 如果效果被禁用，立即清除粒子
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = 0;
        }
      } else {
        // 如果效果被启用，重新初始化动画
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            initParticles();
            if (!animationFrameRef.current) {
              animationFrameRef.current = requestAnimationFrame(animate);
            }
          }
        }
      }
    };

    window.addEventListener('particleEffectsChanged', handleParticleEffectsChanged);
    
    return () => {
      window.removeEventListener('particleEffectsChanged', handleParticleEffectsChanged);
    };
  }, []);
  
  // 创建更均匀分布的粒子
  const initParticles = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    
    // 重置粒子数组
    particlesRef.current = [];
    
    // 计算网格大小以实现更均匀的分布
    const gridCols = Math.ceil(Math.sqrt(count));
    const gridRows = Math.ceil(count / gridCols);
    const cellWidth = width / gridCols;
    const cellHeight = height / gridRows;
    
    let particleCount = 0;
    for (let i = 0; i < gridRows && particleCount < count; i++) {
      for (let j = 0; j < gridCols && particleCount < count; j++) {
        // 在每个单元格内随机放置一个粒子
        const x = (j * cellWidth) + (Math.random() * cellWidth);
        const y = (i * cellHeight) + (Math.random() * cellHeight);
        
        particlesRef.current.push({
          x,
          y,
          size: minSize + Math.random() * (maxSize - minSize),
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
          opacity: baseOpacity * (0.6 + Math.random() * 0.4) // 降低随机透明度范围
        });
        
        particleCount++;
      }
    }
  };
  
  // 动画循环函数 - 定义在外部以便在事件监听器中调用
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 如果处于调试模式，绘制调试信息
    if (debug) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(`粒子数量: ${particlesRef.current.length}`, canvas.width / 2, 20);
    }
    
    particlesRef.current.forEach(particle => {
      // 绘制粒子
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(particle.color, particle.opacity);
      ctx.fill();
      
      // 更新粒子位置
      particle.y -= particle.speed;
      
      // 如果粒子到达顶部，则从底部重新开始
      if (particle.y < -particle.size) {
        particle.y = canvas.height + particle.size;
        particle.x = Math.random() * canvas.width;
      }
    });
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // 创建DOM粒子的备用方法
  useEffect(() => {
    if (!fallbackMode) return;
    
    // 创建DOM粒子
    const newParticles: Particle[] = [];
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // 使用网格系统创建更均匀分布的粒子
    const gridCols = Math.ceil(Math.sqrt(Math.min(count, 100)));
    const gridRows = Math.ceil(Math.min(count, 100) / gridCols);
    const cellWidth = containerWidth / gridCols;
    const cellHeight = containerHeight / gridRows;
    
    let particleCount = 0;
    for (let i = 0; i < gridRows && particleCount < Math.min(count, 100); i++) {
      for (let j = 0; j < gridCols && particleCount < Math.min(count, 100); j++) {
        // 在每个单元格内随机放置一个粒子
        const x = (j * cellWidth) + (Math.random() * cellWidth);
        const y = (i * cellHeight) + (Math.random() * cellHeight);
        
        newParticles.push({
          x,
          y,
          size: minSize + Math.random() * (maxSize - minSize),
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
          opacity: baseOpacity * (0.6 + Math.random() * 0.4)
        });
        
        particleCount++;
      }
    }
    
    setFallbackParticles(newParticles);
    
    // 创建动画
    const moveParticles = () => {
      setFallbackParticles(prev => 
        prev.map(particle => {
          // 更新Y坐标
          let newY = particle.y - particle.speed;
          
          // 如果到达顶部，重新从底部开始
          if (newY < -particle.size) {
            newY = containerHeight + particle.size;
            particle.x = Math.random() * containerWidth;
          }
          
          return {
            ...particle,
            y: newY
          };
        })
      );
    };
    
    const animationInterval = setInterval(moveParticles, 16); // ~60fps
    
    return () => clearInterval(animationInterval);
  }, [fallbackMode, count, minSize, maxSize, minSpeed, maxSpeed, colors, baseOpacity]);

  // Canvas实现
  useEffect(() => {
    if (fallbackMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) {
      setFallbackMode(true);
      return;
    }

    let ctx;
    try {
      ctx = canvas.getContext('2d');
      if (!ctx) {
        setFallbackMode(true);
        return;
      }
    } catch (error) {
      setFallbackMode(true);
      return;
    }

    // 设置canvas尺寸为窗口大小
    const setCanvasSize = () => {
      try {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      } catch (error) {
        setFallbackMode(true);
      }
    };

    // 窗口调整大小时重新设置canvas尺寸和粒子
    const handleResize = () => {
      try {
        setCanvasSize();
        initParticles();
      } catch (error) {
        setFallbackMode(true);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // 初始化
    setCanvasSize();
    initParticles();
    animationFrameRef.current = requestAnimationFrame(animate);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [fallbackMode]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }} // 改为正数，确保在背景之上
    >
      {debug && (
        <div className="fixed top-0 left-0 bg-red-800 text-white p-2 z-50">
          粒子背景调试模式 - {particlesRef.current.length}个粒子
        </div>
      )}
      
      {!fallbackMode ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      ) : (
        <>
          {debug && (
            <div className="fixed top-0 left-0 bg-blue-800 text-white p-2 z-50">
              DOM备用模式 - {fallbackParticles.length}个粒子
            </div>
          )}
          
          {fallbackParticles.map((particle, index) => (
            <div
              key={index}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: hexToRgba(particle.color, particle.opacity),
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ParticleBackground; 