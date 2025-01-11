"use client";

import React, { useState, useEffect } from 'react';

const DeckViewer = () => {
  const [currentDeckIndex, setCurrentDeckIndex] = useState(0);
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const VIEWPORT_HEIGHT = 200;
  const VIEWPORT_WIDTH = 800;

  const decks = [
    { name: 'Sun', floor: '4th floor', file: '/Sun_deck.svg' },
    { name: 'Violin', floor: '3rd floor', file: '/Violin_deck.svg' },
    { name: 'Cello', floor: '2nd floor', file: '/Cello_deck.svg' },
    { name: 'Piano', floor: '1st floor', file: '/Piano_deck.svg' }
  ];

  useEffect(() => {
    const loadSVG = async () => {
      setIsLoading(true);
      setSvgContent('');
      
      try {
        const response = await fetch(decks[currentDeckIndex].file);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error loading SVG:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSVG();
  }, [currentDeckIndex]);

  return (
    <div className="flex gap-6">
      {/* Vertical deck selector */}
      <div className="w-48 bg-gradient-to-b from-teal-500 to-blue-900 rounded-lg p-4 shadow-lg">
        {decks.map((deck, index) => (
          <button
            key={index}
            onClick={() => setCurrentDeckIndex(index)}
            className={`w-full text-left px-4 py-3 rounded-md transition-colors mb-1 ${
              currentDeckIndex === index 
                ? 'bg-blue-500 text-white' 
                : 'text-white hover:bg-blue-600/50'
            }`}
          >
            <div className="text-sm font-medium">
              {deck.name} Deck ({deck.floor})
            </div>
          </button>
        ))}
      </div>

      {/* SVG viewer */}
      <div className="flex-1">
        <div className="relative bg-white border-2 border-gray-200 rounded-lg overflow-hidden"
             style={{ 
               height: `${VIEWPORT_HEIGHT}px`,
               maxWidth: `${VIEWPORT_WIDTH}px`,
               margin: '0 auto'
             }}>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="w-full h-full overflow-x-auto overflow-y-hidden">
              <div className="h-full"
                   dangerouslySetInnerHTML={{ __html: svgContent }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeckViewer;