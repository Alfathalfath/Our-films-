
import React from 'react';
import { Ambiance } from '../types';

interface AmbianceDisplayProps {
  ambiance: Ambiance;
}

const AmbianceDisplay: React.FC<AmbianceDisplayProps> = ({ ambiance }) => {
  return (
    <div className="mt-6 p-4 bg-slate-900/50 rounded-lg animate-fade-in border border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Mood</h4>
          <p className="text-lg font-medium text-white capitalize">{ambiance.mood}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Soundtrack</h4>
          <p className="text-lg font-medium text-white">{ambiance.musicSuggestion}</p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Color Palette</h4>
        <div className="flex space-x-2">
          {[ambiance.primaryColor, ambiance.secondaryColor, ambiance.accentColor].map((color, index) => (
            <div key={index} className="flex-1 flex items-center justify-center p-2 rounded-md border border-slate-600" style={{ backgroundColor: color }}>
              <span className="text-sm font-mono mix-blend-difference text-white">{color}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmbianceDisplay;
