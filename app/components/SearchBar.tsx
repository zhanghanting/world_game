'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search games...' 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 pl-4 pr-10 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <button 
        type="submit"
        className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar; 