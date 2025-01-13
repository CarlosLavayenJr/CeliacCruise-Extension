import React, { useState, useEffect, useCallback } from 'react';

const DeckViewer = () => {
  const [currentDeckIndex, setCurrentDeckIndex] = useState(3); // Piano Deck
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const VIEWPORT_HEIGHT = 200;
  const VIEWPORT_WIDTH = 800;

  // Expanded deck configuration with room data for each deck
  const decks = [
    {
      name: 'Sun',
      floor: '4th floor',
      file: '/Sun_deck.svg',
      rooms: [
        { id: 'A401', price: '$5299', type: '190 Sq ft - Balcony' },
        { id: 'A402', price: '$5299', type: '190 Sq ft - Balcony' },
        // Add more rooms for Sun deck
      ]
    },
    {
      name: 'Violin',
      floor: '3rd floor',
      file: '/Violin_deck.svg',
      rooms: [
        { id: 'B301', price: '$4899', type: '180 Sq ft - Window' },
        { id: 'B302', price: '$4899', type: '180 Sq ft - Window' },
        // Add more rooms for Violin deck
      ]
    },
    {
      name: 'Cello',
      floor: '2nd floor',
      file: '/Cello_deck.svg',
      rooms: [
        { id: 'D201', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D202', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D203', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D204', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D205', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D206', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D207', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D208', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D209', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D210', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D211', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D212', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D213', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D214', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D215', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D216', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D217', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D218', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D219', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D220', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D221', price: '$5799', type: '140 Sq ft - French (Single)' },
        { id: 'D222', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D223', price: '$5799', type: '140 Sq ft - French (Single)' },
        { id: 'D224', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D225', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D226', price: '$5799', type: '170 Sq ft - French' },
        { id: 'D227', price: '$5499', type: '170 Sq ft - French' },
        { id: 'D228', price: '$5499', type: '170 Sq ft - French' },
        { id: 'D229', price: '$5499', type: '170 Sq ft - French' },
        { id: 'D230', price: '$5499', type: '170 Sq ft - French' },
        { id: 'D231', price: '$5499', type: '170 Sq ft - French' },
        { id: 'D232', price: '$5499', type: '170 Sq ft - French' },
        { id: 'D233', price: '$5499', type: '170 Sq ft - French' }
      ]
    },
    {
      name: 'Piano',
      floor: '1st floor',
      file: '/Piano_deck.svg',
      rooms: [
        { id: 'D101', price: '$4599', type: '170 Sq ft - Window' },
        { id: 'D102', price: '$4599', type: '170 Sq ft - Window' },
        { id: 'D103', price: '$4599', type: '170 Sq ft - Window' },
        { id: 'D104', price: '$4599', type: '170 Sq ft - Window' },
        { id: 'D105', price: '$4599', type: '170 Sq ft - Window' },
        { id: 'D106', price: '$4599', type: '170 Sq ft - Window' },
        { id: 'D107', price: '$4599', type: '170 Sq ft - Window' },
        { id: 'D108', price: '$4599', type: '170 Sq ft - Window' },
        { id: 'D109', price: '$4599', type: '170 Sq ft - Window' },
        { id: 'D110', price: '$4599', type: '170 Sq ft - Window' },
        { id: 'D111', price: '$4599', type: '170 Sq ft - Window' }
      ]
    }
  ];

  // Get current deck's room data
  const getCurrentDeckRooms = useCallback(() => {
    return decks[currentDeckIndex]?.rooms || [];
  }, [currentDeckIndex]);

  // Load SVG content when the deck changes
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

  // Memoized room click handler
  const handleRoomClick = useCallback((roomId, event) => {
    const currentRooms = getCurrentDeckRooms();
    const room = currentRooms.find((room) => room.id === roomId);
    if (room) {
      const rect = event.target.getBoundingClientRect();
      setSelectedRoom({
        ...room,
        position: {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY
        },
      });
    }
  }, [getCurrentDeckRooms]);

  // Global click handler to close modal when clicking outside
  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (selectedRoom && !event.target.closest('.room-modal')) {
        setSelectedRoom(null);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [selectedRoom]);

  // Check if clicked element ID matches any room in current deck
  const isValidRoomId = useCallback((id) => {
    const currentRooms = getCurrentDeckRooms();
    return currentRooms.some(room => room.id === id);
  }, [getCurrentDeckRooms]);

  return (
    <div className="flex gap-6">
      {/* Deck Selector */}
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

      {/* SVG Viewer */}
      <div className="flex-1">
        <div
          className="relative bg-white border-2 border-gray-200 rounded-lg overflow-hidden"
          style={{
            height: `${VIEWPORT_HEIGHT}px`,
            maxWidth: `${VIEWPORT_WIDTH}px`,
            margin: '0 auto',
          }}
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div
              className="w-full h-full overflow-x-auto overflow-y-hidden"
              onClick={(e) => {
                const roomId = e.target.id;
                if (roomId && isValidRoomId(roomId)) {
                  handleRoomClick(roomId, e);
                }
              }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          )}
        </div>
      </div>

      {/* Room Details Modal */}
      {selectedRoom && (
        <div
          className="room-modal fixed bg-white p-4 rounded-lg shadow-lg z-50 text-black"
          style={{
            top: `${selectedRoom.position.y}px`,
            left: `${selectedRoom.position.x}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-bold">Room Details</h3>
          <p>
            <strong>Room ID:</strong> {selectedRoom.id}
          </p>
          <p>
            <strong>Price:</strong> {selectedRoom.price}
          </p>
          <p>
            <strong>Type:</strong> {selectedRoom.type}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRoom(null);
            }}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default DeckViewer;