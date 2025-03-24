'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  MagnifyingGlassIcon, 
  Bars3Icon, 
  UserCircleIcon,
  XMarkIcon,
  HomeIcon,
  ClockIcon,
  SparklesIcon,
  FireIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../i18n/useTranslation';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Mobile navigation items
  const mobileNavItems = [
    { name: t('nav.home'), icon: <HomeIcon className="w-5 h-5" />, href: '/' },
    { name: t('nav.recent'), icon: <ClockIcon className="w-5 h-5" />, href: '/recent' },
    { name: t('nav.new'), icon: <SparklesIcon className="w-5 h-5" />, href: '/new' },
    { name: t('nav.trending'), icon: <FireIcon className="w-5 h-5" />, href: '/trending' },
    { name: t('nav.updated'), icon: <ArrowPathIcon className="w-5 h-5" />, href: '/updated' },
  ];

  // Detect scroll to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? 'bg-gray-900 shadow-lg' : 'bg-gray-900 md:bg-transparent'}
          ${pathname === '/' && !scrolled ? 'md:bg-gradient-to-b md:from-black md:to-transparent' : ''}
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo (visible on mobile only) */}
            <div className="flex md:hidden">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                  <span className="text-xl">🎮</span>
                </div>
                <div className="text-xl font-bold text-white">
                  <span className="text-blue-400">World</span>
                  <span className="text-green-400"> Games</span>
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Empty space for alignment on mobile */}
            <div className="md:hidden"></div>

            {/* Search bar (centered on desktop) */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-4">
              <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('nav.search')}
                  className="w-full py-2 pl-10 pr-4 text-sm bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </form>
            </div>

            {/* Language Selector & User Profile */}
            <div className="hidden md:flex items-center">
              <LanguageSelector />
              <Link 
                href="/profile" 
                className="ml-4 text-gray-300 hover:text-white flex items-center"
              >
                <UserCircleIcon className="h-8 w-8 mr-2" />
                <span>Guest</span>
              </Link>
            </div>
          </div>

          {/* Search bar for mobile (below navbar) */}
          <div className="pb-3 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.search')}
                className="w-full py-2 pl-10 pr-4 text-sm bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <Transition
        show={mobileMenuOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-80 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="absolute top-16 right-0 bottom-0 w-64 bg-gray-900 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-2 pt-2 pb-3 h-full overflow-y-auto">
              {/* Mobile navigation links */}
              {mobileNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 my-1 rounded-md transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              
              {/* Divider */}
              <div className="mx-3 my-2 border-b border-gray-800"></div>
              
              {/* Language Selector for mobile */}
              <div className="px-3 py-2 my-1">
                <LanguageSelector />
              </div>
              
              {/* User profile for mobile */}
              <Link
                href="/profile"
                className="flex items-center px-3 py-2 my-1 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserCircleIcon className="w-5 h-5 mr-3" />
                <span className="font-medium">Guest</span>
              </Link>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Navbar; 