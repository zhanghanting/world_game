'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { defaultLocale, isValidLocale } from './config';

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLocale,
  setLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<string>(defaultLocale);
  
  // 加载保存的语言设置
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && isValidLocale(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // 尝试使用浏览器的语言设置
      const browserLocale = navigator.language;
      if (isValidLocale(browserLocale)) {
        setLocaleState(browserLocale);
      } else if (browserLocale.includes('-')) {
        // 尝试匹配主语言代码 (例如，en-US -> en)
        const mainCode = browserLocale.split('-')[0];
        if (isValidLocale(mainCode)) {
          setLocaleState(mainCode);
        }
      }
    }
  }, []);
  
  // 设置语言并保存到本地存储
  const setLocale = (newLocale: string) => {
    if (isValidLocale(newLocale)) {
      localStorage.setItem('locale', newLocale);
      setLocaleState(newLocale);
      
      // 设置文档的语言属性
      document.documentElement.lang = newLocale;
      
      // 添加根据语言方向设置文本方向
      if (newLocale === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  };
  
  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
} 