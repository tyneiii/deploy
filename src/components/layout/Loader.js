'use client';

import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/GlobalStateContext";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [zoomingIn, setZoomingIn] = useState(false);
  const { alreadyEntered, setAlreadyEntered, setIsMuted, setIsPlaying } = useGlobalState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  const handleEnter = () => {
    setZoomingIn(true);
    
    setTimeout(() => {
      setAlreadyEntered(true);
      setIsMuted(false);
      setIsPlaying(true);
    }, 1000);
  };

  return (
    <button
      className={`h-full w-full flex flex-col gap-6 items-center justify-center relative ${loading ? 'pointer-events-none' : ''}`}
      onClick={!loading ? handleEnter : null}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className={`absolute left-1/2 top-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 object-cover pointer-events-none z-0 transition-transform duration-1000 ease-in-out ${zoomingIn ? 'scale-[30] -translate-y-[900%]' : '-translate-y-1/2'}`}
      >
        <source src="/videos/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {loading && !alreadyEntered && (
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && !alreadyEntered && (
        <div className="text-white text-shadow-black text-xl xxs:text-2xl xs:text-3xl sm:text-4xl font-bold fade-in-out">
          Start your quest
        </div>
      )}
    </button>
  );
};

export default Loader;