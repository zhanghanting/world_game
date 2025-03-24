'use client';

import { ThemeProvider } from 'next-themes';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageProvider';

// 创建一个3D效果上下文
export const EffectsContext = createContext({
  effectsEnabled: true,
  toggleEffects: (enabled: boolean) => {}
});

// 自定义钩子，方便在组件中使用
export const useEffects = () => useContext(EffectsContext);

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  // 从本地存储中加载效果状态
  useEffect(() => {
    setMounted(true);
    const savedSetting = localStorage.getItem('3dEffectsEnabled');
    if (savedSetting !== null) {
      setEffectsEnabled(savedSetting === 'true');
    }
  }, []);

  // 切换效果的函数
  const toggleEffects = (enabled: boolean) => {
    setEffectsEnabled(enabled);
  };

  // 只有在客户端渲染后才提供效果状态，以避免SSR不匹配
  const effectsValue = {
    effectsEnabled: mounted ? effectsEnabled : true,
    toggleEffects
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