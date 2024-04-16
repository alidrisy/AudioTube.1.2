/* eslint-disable react/prop-types */
import { useRef, useEffect, useMemo } from 'react';

const Player = ({ activeSong, isPlaying, setIsPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);

  useMemo(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying])
  
  
  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  useEffect(() => {
    if (!activeSong) ref.current.pause();
  }, [activeSong]);

  return (
    <audio
      src={activeSong?.url}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
      onPlay={() => setIsPlaying(true)}
      autoPlay
    />
  );
};

export default Player;
