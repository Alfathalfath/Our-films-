
import React, { useState } from 'react';
import { ContentType } from '../types';

interface SearchBarProps {
  onSearch: (query: string, type: ContentType) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<ContentType>(ContentType.MOVIES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query, activeType);
    }
  };

  const handleTypeChange = (type: ContentType) => {
    setActiveType(type);
    if (query.trim() && !isLoading) {
      onSearch(query, type);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a theme, e.g., 'cyberpunk detectives'..."
          className="flex-grow bg-slate-800 border border-slate-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200 text-slate-100"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      <div className="flex justify-center gap-2 sm:gap-4 mt-4">
        {Object.values(ContentType).map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`capitalize px-4 py-2 text-sm sm:text-base rounded-full transition-colors duration-200 ${
              activeType === type
                ? 'bg-sky-500 text-white font-semibold'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
