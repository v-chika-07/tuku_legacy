import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute, FaPlay } from 'react-icons/fa';

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.loop = true;

      const handlePlay = () => {
        console.log('Audio started playing');
        setIsPlaying(true);
        setHasInteracted(true);
      };

      const handlePause = () => {
        console.log('Audio paused');
        setIsPlaying(false);
      };

      const handleError = (e) => {
        console.error('Audio error:', e);
      };

      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
      audioRef.current.addEventListener('error', handleError);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('play', handlePlay);
          audioRef.current.removeEventListener('pause', handlePause);
          audioRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, []);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play().catch(e => {
          console.error('Play failed:', e);
        });
      } else {
        audioRef.current.pause();
      }
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      console.log('Mute toggled:', !isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/nymano  - i wish i could sleep.mp3"
        preload="auto"
      />
      <AnimatePresence>
        <div className="fixed bottom-8 right-8 z-50 flex gap-2">
          {/* Play/Pause Button */}
          <motion.button
            className={`p-4 rounded-full shadow-lg
              ${isPlaying ? 'bg-accent' : 'bg-gray-500'} 
              hover:bg-opacity-80 text-white
              transition-colors duration-300`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={togglePlayback}
            title={!hasInteracted ? 'Click to start music' : (isPlaying ? 'Pause' : 'Play')}
          >
            <FaPlay size={24} className={isPlaying ? 'animate-pulse' : ''} />
          </motion.button>

          {/* Volume Button - Only show after first interaction */}
          {hasInteracted && (
            <motion.button
              className={`p-4 rounded-full shadow-lg
                ${isMuted ? 'bg-gray-500' : 'bg-accent'} 
                hover:bg-opacity-80 text-white
                transition-colors duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
            </motion.button>
          )}
        </div>
      </AnimatePresence>
    </>
  );
};

export default AudioPlayer;
