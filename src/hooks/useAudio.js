import { useEffect, useRef, useState } from 'react';

export default function useAudio(audioFile, isMuted = false) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(audioFile);
    audioRef.current = audio;

    audio.muted = isMuted;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioFile]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = isMuted;
  }, [isMuted]);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.log('Playback prevented', err);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const restartAudio = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.log('Playback prevented', err);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  return {
    togglePlay,
    restartAudio,
    stopAudio,
  };
}