import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Set initial volume to 20%
      audioRef.current.loop = true;
      
      // Add event listeners
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      
      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('play', () => setIsPlaying(true));
          audioRef.current.removeEventListener('pause', () => setIsPlaying(false));
        }
      };
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/nymano  - i wish i could sleep.mp3"
        autoPlay
      />
      <AnimatePresence>
        <motion.button
          className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg
            ${isMuted ? 'bg-gray-500' : 'bg-accent'} 
            hover:bg-opacity-80 text-white
            transition-colors duration-300`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={toggleMute}
        >
          {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
        </motion.button>
      </AnimatePresence>
    </>
  );
};

export default AudioPlayer;
