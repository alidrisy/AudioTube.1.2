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
    <div className="flex-1 flex items-center space-x-4">
      <div ref={container} className='h-[80px] w-[80px] rounded-full border-gray-500  p-[1px] border'>
        <img src={activeSong?.image} ref={imgRef} alt="cover art" className="play_image h-full w-full rounded-full object-cover" />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg" dir="auto">
          {activeSong?.title ?  activeSong.title.length <= 25 ? activeSong.title : `${activeSong.title.slice(0, 25)}...` : 'No active Song'}
        </p>
        <p className="truncate text-gray-300" dir="auto">
          {activeSong?.channelName ? activeSong.channelName <= 20 ? activeSong.channelName : `${activeSong.channelName.slice(0, 20)}...` : 'No active Song'}
        </p>
      </div>
    </div>
  );
}

export default Track;
