'use client';

import { ThemeProvider } from 'next-themes';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageProvider';

// 创建一个效果上下文，分别控制3D效果、鼠标跟随效果和背景粒子效果
export const EffectsContext = createContext({
  effectsEnabled: true,          // 总开关
  tiltEffectsEnabled: true,      // 3D倾斜效果开关
  mouseEffectsEnabled: true,     // 鼠标跟随效果开关
  particleEffectsEnabled: true,  // 背景粒子效果开关
  toggleEffects: (enabled: boolean) => {},
  toggleTiltEffects: (enabled: boolean) => {},
  toggleMouseEffects: (enabled: boolean) => {},
  toggleParticleEffects: (enabled: boolean) => {}
});

// 自定义钩子，方便在组件中使用
export const useEffects = () => useContext(EffectsContext);

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [tiltEffectsEnabled, setTiltEffectsEnabled] = useState(true);
  const [mouseEffectsEnabled, setMouseEffectsEnabled] = useState(true);
  const [particleEffectsEnabled, setParticleEffectsEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  // 从本地存储中加载效果状态
  useEffect(() => {
    setMounted(true);
    console.log('Providers组件已挂载');
    
    try {
      // 读取总开关设置
      const savedSetting = localStorage.getItem('3dEffectsEnabled');
      console.log('加载总开关设置:', savedSetting);
      if (savedSetting !== null) {
        setEffectsEnabled(savedSetting === 'true');
      }
      
      // 读取3D倾斜效果设置
      const savedTiltSetting = localStorage.getItem('tiltEffectsEnabled');
      console.log('加载3D倾斜效果设置:', savedTiltSetting);
      if (savedTiltSetting !== null) {
        setTiltEffectsEnabled(savedTiltSetting === 'true');
      } else {
        // 如果没有保存的设置，默认为启用并保存
        localStorage.setItem('tiltEffectsEnabled', 'true');
      }
      
      const savedMouseSetting = localStorage.getItem('mouseEffectsEnabled');
      console.log('加载鼠标效果设置:', savedMouseSetting);
      if (savedMouseSetting !== null) {
        setMouseEffectsEnabled(savedMouseSetting === 'true');
      }

      const savedParticleSetting = localStorage.getItem('particleEffectsEnabled');
      console.log('加载粒子效果设置:', savedParticleSetting);
      if (savedParticleSetting !== null) {
        setParticleEffectsEnabled(savedParticleSetting === 'true');
      } else {
        // 如果没有保存的设置，设置为启用并保存
        console.log('粒子效果设置不存在，设置为启用');
        localStorage.setItem('particleEffectsEnabled', 'true');
      }
    } catch (error) {
      console.error('读取localStorage时出错:', error);
    }
  }, []);

  // 总开关：同时控制所有效果
  const toggleEffects = (enabled: boolean) => {
    console.log('Toggle All Effects:', enabled);
    setEffectsEnabled(enabled);
    localStorage.setItem('3dEffectsEnabled', String(enabled));
  };
  
  // 3D倾斜效果开关
  const toggleTiltEffects = (enabled: boolean) => {
    console.log('Toggle Tilt Effects:', enabled);
    setTiltEffectsEnabled(enabled);
    // 只保存3D特效的状态，不影响总开关
    localStorage.setItem('tiltEffectsEnabled', String(enabled));
  };
  
  // 鼠标跟随效果开关
  const toggleMouseEffects = (enabled: boolean) => {
    console.log('Toggle Mouse Effects:', enabled);
    setMouseEffectsEnabled(enabled);
    localStorage.setItem('mouseEffectsEnabled', String(enabled));
  };

  // 背景粒子效果开关
  const toggleParticleEffects = (enabled: boolean) => {
    console.log('Toggle Particle Effects:', enabled);
    setParticleEffectsEnabled(enabled);
    localStorage.setItem('particleEffectsEnabled', String(enabled));

    // 立即应用更改，确保视觉反馈
    if (typeof window !== 'undefined') {
      try {
        // 触发一个自定义事件，通知粒子背景组件状态已更改
        const event = new CustomEvent('particleEffectsChanged', { detail: { enabled } });
        window.dispatchEvent(event);
        console.log('已触发particleEffectsChanged事件:', { enabled });
      } catch (error) {
        console.error('触发事件时出错:', error);
      }
    }
  };

  // 立即触发一次粒子效果变更事件，确保初始状态正确
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        console.log('初始化时触发粒子效果事件:', { enabled: particleEffectsEnabled });
        const event = new CustomEvent('particleEffectsChanged', { 
          detail: { enabled: particleEffectsEnabled } 
        });
        window.dispatchEvent(event);
      } catch (error) {
        console.error('触发初始化事件时出错:', error);
      }
    }
  }, [mounted, particleEffectsEnabled]);

  // 只有在客户端渲染后才提供效果状态，以避免SSR不匹配
  const effectsValue = {
    effectsEnabled: mounted ? effectsEnabled : true,
    tiltEffectsEnabled: mounted ? tiltEffectsEnabled : true,
    mouseEffectsEnabled: mounted ? mouseEffectsEnabled && effectsEnabled : true,
    particleEffectsEnabled: mounted ? particleEffectsEnabled && effectsEnabled : true,
    toggleEffects,
    toggleTiltEffects,
    toggleMouseEffects,
    toggleParticleEffects
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>
        <EffectsContext.Provider value={effectsValue}>
          {children}
        </EffectsContext.Provider>
      </LanguageProvider>
    </ThemeProvider>
  );
} 