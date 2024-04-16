import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume, VolumeX, SkipForward, SkipBack, Shuffle, RefreshCcw } from 'lucide-react';

const AudioPlayer = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);

  const playerRef = useRef(null);
  const imageRef = useRef(null);

  const playPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      const interval = setInterval(() => {
        setRotationDegree(prevDegree => prevDegree + 1);
      }, 90);
      return () => clearInterval(interval);
    }
  };

  const playNext = () => {
    if (isShuffle) {
      setCurrentSongIndex(Math.floor(Math.random() * songs.length));
    } else if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else if (isRepeat) {
      setCurrentSongIndex(0);
    }
    setRotationDegree(0);
  };

  const playPrevious = () => {
    if (isShuffle) {
      setCurrentSongIndex(Math.floor(Math.random() * songs.length));
    } else if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else if (isRepeat) {
      setCurrentSongIndex(songs.length - 1);
    }
    setRotationDegree(0);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  useEffect(() => {
    if (!isPlaying) {
      const interval = setInterval(() => {
        imageRef.current.style.transform = `rotate(${rotationDegree}deg)`;
      }, 50);
      return () => clearInterval(interval);
    } else {
      imageRef.current.style.transform = `rotate(${rotationDegree}deg)`;
    }
  }, [isPlaying, rotationDegree]);

  return (
    <div className="fixed bottom-0 w-full h- bg-gray-200/70 p-4 rounded-lg">
      <div className="relative w-32 h-32 rounded-full overflow-hidden">
      <img
          ref={imageRef}
          src={"https://i.ytimg.com/vi/K5wOdaVU7XA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAGcdqS2YzeqHmdmPKiO6bY_5Y_BQ"}
          alt="Song"
          className="w-full ease-in duration-20 h-full object-cover transition-transform transform"
        />
        <ReactPlayer
          ref={playerRef}
          url="https://rr11---sn-vh5ouxa-hjuk.googlevideo.com/videoplayback?expire=1712787715&ei=o7wWZoXWILGKvdIPgK6zgA4&ip=185.71.135.126&id=o-AHNSbsS2LULJIYYVgI1cErrwM4hZ0tt8boiUOaCsho3k&itag=249&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=MT&mm=31%2C29&mn=sn-vh5ouxa-hjuk%2Csn-hju7enll&ms=au%2Crdu&mv=m&mvi=11&pl=24&initcwndbps=68750&bui=AaUN6a3kBqP71AmgVguv1TfBUAAFbDgKy39EOjsXgj07oQtK0JcvuCxvVV_2kTFPEOY2wjDxWQ7Pcul3&spc=UWF9fwO-bwa340RP_CByWIedFeoXjzakMCeBoceL2G9H3OZtlmdOGFIWgQ&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=8tXNtxYF5yh2_zfIy94T9CAQ&gir=yes&clen=2525931&dur=388.541&lmt=1712684521467175&mt=1712765813&fvip=1&keepalive=yes&c=WEB&sefc=1&txp=6308224&n=lPFkZmwwl6dynAcF4&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAI7Z8OU6SJn7QBjcyeSZLyaNoeP2JUBm-6KN6uvrJNz5AiEAmIDVK3LSBzpKIx7FG1gtvjdChMB9YvYA5iW9JtuG0Aw%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ALClDIEwRAIgYtaPvXBpnS0c97ieaohjakC-kWRa6fAFq5d7JRPXXYECIAZUiw0Y4d2Ls0YpZq2BLwzF3JLMAucX-Jn9INT0bqOz"
          playing={isPlaying}
          volume={volume}
          onEnded={playNext}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
      </div>

      <div className="flex justify-center items-center space-x-4 mt-4">
        <button onClick={playPrevious}>
          <SkipBack size={32} />
        </button>

        {isPlaying ? (
          <button onClick={playPause}>
            <Pause size={32} />
          </button>
        ) : (
          <button onClick={playPause}>
            <Play size={32} />
          </button>
        )}

        <button onClick={playNext}>
          <SkipForward size={32} />
        </button>
      </div>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <button onClick={() => setIsShuffle(!isShuffle)}>
          <Shuffle size={24} className={`${isShuffle ? 'text-blue-500' : ''}`} />
        </button>

        <button onClick={() => setIsRepeat(!isRepeat)}>
          <RefreshCcw size={24} className={`${isRepeat ? 'text-blue-500' : ''}`} />
        </button>

        <button onClick={() => setVolume(volume - 0.1)}>
          <VolumeX size={24} />
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="w-24"
        />

        <button onClick={() => setVolume(volume + 0.1)}>
          <Volume size={24} />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;