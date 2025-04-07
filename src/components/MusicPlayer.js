import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  MoreHorizontal,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";

const images = require.context("../../public/img", true);

function MusicPlayer({ song, audioRef, onSkipForward, onSkipBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      const handleLoadedMetadata = () => setDuration(audio.duration);
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.pause();
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
      audio.load();

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [song]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = Number(e.target.value);
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full md:w-2/3 p-4 flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-sm mb-4 text-left">
        <h2 className="text-xl font-bold truncate text-white">{song.title}</h2>
        <p className="text-sm text-gray-400 truncate">{song.artistName}</p>
      </div>

      <img
        src={images(song.thumbnail)}
        alt={song.title}
        className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg shadow-xl mb-4"
      />

      <div className="w-full max-w-md flex flex-col items-center">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full mb-1 accent-white"
        />
        <div className="flex justify-between text-xs w-full text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-w-sm px-4 mt-4 gap-4">
        <MoreHorizontal className="cursor-pointer" />
        <SkipBack onClick={onSkipBack} className="cursor-pointer" />
        <button
          onClick={togglePlay}
          className="bg-white text-black rounded-full p-4 hover:scale-110 transition"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <SkipForward onClick={onSkipForward} className="cursor-pointer" />
        <button onClick={toggleMute}>
          {isMuted ? (
            <VolumeX className="cursor-pointer" />
          ) : (
            <Volume2 className="cursor-pointer" />
          )}
        </button>
      </div>

      <audio ref={audioRef} src={song.musicUrl} />
    </div>
  );
}

export default MusicPlayer;
