
import React from 'react';
import { ContentItem } from '../types';
import StarIcon from './icons/StarIcon';

interface ContentCardProps {
  item: ContentItem;
  onSelect: (item: ContentItem) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-slate-800 rounded-lg overflow-hidden cursor-pointer group transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300"
    >
      <div className="relative">
        <img src={item.posterUrl} alt={item.title} className="w-full h-auto aspect-[2/3] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-2 left-2 right-2">
           <h3 className="font-bold text-white text-sm leading-tight">{item.title}</h3>
           <div className="flex items-center text-xs text-amber-400 mt-1">
             <StarIcon className="w-4 h-4 mr-1"/>
             <span>{item.rating.toFixed(1)}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
