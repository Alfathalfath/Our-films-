
import React from 'react';
import { ContentItem } from '../types';
import ContentCard from './ContentCard';

interface ContentGridProps {
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ items, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 animate-fade-in">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ContentGrid;
