/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { TimelineMax } from 'gsap/gsap-core';

const Track = ({ isPlaying, activeSong }) => {
  const container = useRef()
  const imgRef = useRef()
  const tl = useRef()

  useGSAP(() => {
      tl.current = new TimelineMax();
      console.log('create');
      tl.current.to('.play_image', {
        rotation: 360,
        repeat: -1,
        duration: 4,
        ease: 'none',
      }, '-=0.2');
    tl.current.pause();     
  });

  useEffect(() => {
      console.log('ready');
      if (isPlaying) {
        tl.current.resume();
        console.log('play');
      } else {
        tl.current.pause();
        console.log('pause');
      }
  }, [isPlaying])

  return (
    <div className="flex-1 flex items-center justify-start sm:space-x-6 max-sm:w-[50%]">
      <div ref={container} className='hidden sm:block h-[80px] w-[80px] rounded-full'>
        <img src={activeSong?.image} ref={imgRef} alt="cover art" className="play_image hidden sm:block border-gray-500 border p-[1px] h-full w-full rounded-full object-cover" />
      </div>
      <div className="w-[90%] sm:w-[50%]">
        <p className="truncate w-[90%] text-white font-bold text-lg" dir="auto">
          {activeSong?.title ?  activeSong.title.length <= 25 ? activeSong.title : `${activeSong.title.slice(0, 25)}...` : 'No active Song'}
        </p>
        <p className="truncate w-[80%] text-gray-300" dir="auto">
          {activeSong?.channelName ? activeSong.channelName <= 20 ? activeSong.channelName : `${activeSong.channelName.slice(0, 20)}...` : 'No active Song'}
        </p>
      </div>
    </div>
  );
}

export default Track;
