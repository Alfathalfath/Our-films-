
import React, { useState, useCallback } from 'react';
import { ContentItem, ContentType, View } from './types';
import { searchContent } from './services/geminiService';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ContentGrid from './components/ContentGrid';
import ContentDetails from './components/ContentDetails';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.HOME);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [introVisible, setIntroVisible] = useState<boolean>(true);

  const handleSearch = useCallback(async (query: string, type: ContentType) => {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setIntroVisible(false);
    setContent([]);

    try {
      const results = await searchContent(query, type);
      setContent(results);
    } catch (err) {
      setError('Failed to fetch content. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectContent = (item: ContentItem) => {
    setSelectedContent(item);
    setView(View.DETAILS);
  };

  const handleBack = () => {
    setSelectedContent(null);
    setView(View.HOME);
  };

  const renderContent = () => {
    switch (view) {
      case View.DETAILS:
        return selectedContent && <ContentDetails item={selectedContent} onBack={handleBack} />;
      case View.HOME:
      default:
        return (
          <>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {isLoading && <div className="flex justify-center mt-16"><LoadingSpinner /></div>}
            {error && <p className="text-center text-red-400 mt-8">{error}</p>}
            {!isLoading && introVisible && (
              <div className="text-center text-slate-400 mt-16 animate-fade-in">
                <p className="text-2xl">Welcome to AI Movie Night</p>
                <p className="mt-2">Use the search bar above to discover your next obsession.</p>
                <p className="mt-1">AI will generate fictional content based on your prompt!</p>
              </div>
            )}
            {!isLoading && !error && content.length > 0 && (
              <ContentGrid items={content} onSelect={handleSelectContent} />
            )}
            {!isLoading && !introVisible && content.length === 0 && !error && (
                 <div className="text-center text-slate-400 mt-16">
                    <p>No results found. Try a different search term.</p>
                 </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 md:p-8 text-slate-100">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main>{renderContent()}</main>
      </div>
    </div>
  );
};

export default App;
