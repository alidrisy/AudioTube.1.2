/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { CircleX } from 'lucide-react';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import FakeTrack from './FakeTrack';
import VolumeBar from './VolumeBar';
import axios from '@/api';
import { toast } from 'react-toastify';

const MusicPlayer = ({currentIndex, setCurrentIndex, currentSongs}) => {

  const [isPlaying, setIsPlaying] = useState(false)
  const [isActive, setIsActive] = useState({})
  const [activeSong, setActiveSong] = useState(null);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    const playingAudio = async () => {
      try {
        setIsActive(false)
        setIsPlaying(false)
        setActiveSong(null)
        setDuration(0)
        setSeekTime(0)
        setAppTime(0)
        const video = currentSongs[currentIndex];
        const response = await axios.get(`audios/${video.id}`);
        setActiveSong({...response.data, title: video.title, image: video.thumbnails[video.thumbnails.length - 1].url, channelName: video.channel.name});
        setIsActive(true);
      } catch(e) {
        toast.error("Oops! We're having trouble playing the audio. Please try playing it again.")
        setCurrentIndex(null)
        console.log(e.message)
      }
    }

    playingAudio();
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    setIsPlaying(false);

    if (!shuffle) {
      setCurrentIndex((currentIndex + 1) % currentSongs.length);
    } else {
      setCurrentIndex(Math.floor(Math.random() * currentSongs.length));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      setCurrentIndex(currentSongs.length - 1);
    } else if (shuffle) {
      setCurrentIndex(Math.floor(Math.random() * currentSongs.length));
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  return (
    <div
      className="hover:relative sm:px-12 px-8 w-full flex items-center justify-between"
    >
      <button onClick={() => setCurrentIndex(null)} className='absolute duration-1000 -top-[30px] end-6 bg-gray-500/70 rounded-t-full h-[30px] w-9.5 transition-transform translate-h-0 ease-in-out'><CircleX className='h-9 mt-[0px] w-9' color="black" strokeWidth={1.5} /></button>
      {activeSong ? <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} /> : <FakeTrack />}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          setIsPlaying={setIsPlaying}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;
