'use client';

import { useLanguage } from './LanguageProvider';
import { createTranslator } from './translations';

export function useTranslation() {
  const { locale } = useLanguage();
  
  // 创建翻译函数
  const t = createTranslator(locale);
  
  return {
    t,
    locale
  };
} 