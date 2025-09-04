
import React, { useState } from 'react';
import { ContentItem, Ambiance } from '../types';
import { beautifyContent } from '../services/geminiService';
import StarIcon from './icons/StarIcon';
import LoadingSpinner from './LoadingSpinner';
import AmbianceDisplay from './AmbianceDisplay';

interface ContentDetailsProps {
  item: ContentItem;
  onBack: () => void;
}

const ContentDetails: React.FC<ContentDetailsProps> = ({ item, onBack }) => {
  const [ambiance, setAmbiance] = useState<Ambiance | null>(null);
  const [isBeautifying, setIsBeautifying] = useState(false);
  const [beautifyError, setBeautifyError] = useState<string | null>(null);

  const handleBeautify = async () => {
    setIsBeautifying(true);
    setBeautifyError(null);
    setAmbiance(null);
    try {
      const result = await beautifyContent(item.title, item.synopsis, item.genres);
      setAmbiance(result);
    } catch (err) {
      setBeautifyError('Could not generate ambiance. Please try again.');
      console.error(err);
    } finally {
      setIsBeautifying(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">
        &larr; Back to Search
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex-shrink-0">
          <img src={item.posterUrl} alt={item.title} className="w-full rounded-lg shadow-lg shadow-black/30" />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-4xl font-bold text-white">{item.title} <span className="text-2xl font-light text-slate-400">({item.year})</span></h2>
          
          <div className="flex items-center gap-4 my-4">
            <div className="flex items-center text-amber-400 text-xl">
              <StarIcon className="w-6 h-6 mr-2" />
              <span className="font-bold">{item.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal text-sm">/10</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.genres.map(genre => (
                <span key={genre} className="bg-slate-700 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full">{genre}</span>
              ))}
            </div>
          </div>
          
          <p className="text-slate-300 leading-relaxed">{item.synopsis}</p>

          <div className="mt-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="text-xl font-semibold text-sky-400">Beautify Your Watch</h3>
            <p className="text-slate-400 mt-2 mb-4">Let AI create the perfect viewing ambiance for this title.</p>
            <button 
              onClick={handleBeautify}
              disabled={isBeautifying}
              className="bg-sky-600 hover:bg-sky-700 disabled:bg-sky-800 disabled:cursor-not-allowed text-white font-bold py-2 px-5 rounded-md transition-colors duration-200 w-full sm:w-auto"
            >
              {isBeautifying ? <LoadingSpinner size="sm" /> : '✨ Generate Ambiance'}
            </button>
            {beautifyError && <p className="text-red-400 mt-3 text-sm">{beautifyError}</p>}
            {ambiance && <AmbianceDisplay ambiance={ambiance} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
