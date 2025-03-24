'use client';

import { ThemeProvider } from 'next-themes';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageProvider';

// 创建一个效果上下文，分别控制3D效果和鼠标跟随效果
export const EffectsContext = createContext({
  effectsEnabled: true,      // 总开关
  tiltEffectsEnabled: true,  // 3D倾斜效果开关
  mouseEffectsEnabled: true, // 鼠标跟随效果开关
  toggleEffects: (enabled: boolean) => {},
  toggleTiltEffects: (enabled: boolean) => {},
  toggleMouseEffects: (enabled: boolean) => {}
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
  const [mounted, setMounted] = useState(false);

  // 从本地存储中加载效果状态
  useEffect(() => {
    setMounted(true);
    const savedSetting = localStorage.getItem('3dEffectsEnabled');
    if (savedSetting !== null) {
      setEffectsEnabled(savedSetting === 'true');
      setTiltEffectsEnabled(savedSetting === 'true');
    }
    
    const savedMouseSetting = localStorage.getItem('mouseEffectsEnabled');
    if (savedMouseSetting !== null) {
      setMouseEffectsEnabled(savedMouseSetting === 'true');
    }
  }, []);

  // 总开关：同时控制所有效果
  const toggleEffects = (enabled: boolean) => {
    setEffectsEnabled(enabled);
    localStorage.setItem('3dEffectsEnabled', String(enabled));
  };
  
  // 3D倾斜效果开关
  const toggleTiltEffects = (enabled: boolean) => {
    console.log('Toggle Tilt Effects:', enabled);
    setTiltEffectsEnabled(enabled);
    // 注意：这里只影响tiltEffectsEnabled，不影响mouseEffectsEnabled
  };
  
  // 鼠标跟随效果开关
  const toggleMouseEffects = (enabled: boolean) => {
    console.log('Toggle Mouse Effects:', enabled);
    setMouseEffectsEnabled(enabled);
    localStorage.setItem('mouseEffectsEnabled', String(enabled));
  };

  // 只有在客户端渲染后才提供效果状态，以避免SSR不匹配
  const effectsValue = {
    effectsEnabled: mounted ? effectsEnabled : true,
    tiltEffectsEnabled: mounted ? tiltEffectsEnabled && effectsEnabled : true,
    mouseEffectsEnabled: mounted ? mouseEffectsEnabled && effectsEnabled : true,
    toggleEffects,
    toggleTiltEffects,
    toggleMouseEffects
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