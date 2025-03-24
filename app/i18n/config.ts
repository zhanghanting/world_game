export interface Language {
  code: string;
  name: string;
  localName: string;
  flag?: string;
}

export const defaultLocale = 'en';

// 支持的语言列表，按优先级排序（减少到10种）
export const languages: Language[] = [
  { code: 'en', name: 'English', localName: 'English', flag: '🇬🇧' },
  { code: 'zh-CN', name: 'Simplified Chinese', localName: '简体中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', localName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', localName: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Spanish', localName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', localName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', localName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', localName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', localName: 'Русский', flag: '🇷🇺' },
  { code: 'it', name: 'Italian', localName: 'Italiano', flag: '🇮🇹' },
];

// 获取支持的语言代码列表
export const locales = languages.map(lang => lang.code);

// 根据语言代码获取语言信息
export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find(lang => lang.code === code);
};

// 检查是否是有效的语言代码
export const isValidLocale = (locale: string): boolean => {
  return locales.includes(locale);
}; 