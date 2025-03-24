'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { languages } from '../i18n/config';
import { useLanguage } from '../i18n/LanguageProvider';
import { useTranslation } from '../i18n/useTranslation';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];
  
  // 切换下拉菜单开关
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // 选择语言并关闭下拉菜单
  const selectLanguage = (languageCode: string) => {
    setLocale(languageCode);
    setIsOpen(false);
  };
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 text-gray-300 hover:text-white rounded-md px-2 py-1.5"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {currentLanguage.flag ? (
          <span className="text-xl mr-1">{currentLanguage.flag}</span>
        ) : (
          <GlobeAltIcon className="h-5 w-5 mr-1" />
        )}
        <span className="hidden sm:inline">{currentLanguage.localName}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md overflow-hidden shadow-lg z-50">
          <div className="p-2">
            <h3 className="text-gray-400 text-xs uppercase font-semibold mb-1 px-3 pt-1">
              {t('language')}
            </h3>
            <div className="max-h-96 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between rounded-md ${
                    locale === language.code
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => selectLanguage(language.code)}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{language.flag}</span>
                    <span>{language.localName}</span>
                  </div>
                  {locale === language.code && (
                    <CheckIcon className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 