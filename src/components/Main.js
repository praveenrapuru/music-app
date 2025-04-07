import React, { useState, useRef } from "react";
import songs from "./data/songs";
import Sidebar from "./Sidebar";
import MusicPlayer from "./MusicPlayer";
import SongList from "./SongList";

export default function Main() {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("For You");
  const audioRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);


const handleSkipForward = () => {
  const nextIndex = (currentIndex + 1) % songs.length;
  setCurrentIndex(nextIndex);
  setCurrentSong(songs[nextIndex]);
};

const handleSkipBack = () => {
  const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
  setCurrentIndex(prevIndex);
  setCurrentSong(songs[prevIndex]);
};


  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  return (
    <div className="flex h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Sidebar
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    

    {activeTab === "For You" && (
      
      <SongList
        songs={filteredSongs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab="For You"
      />
    
    )}
    <MusicPlayer song={currentSong} audioRef={audioRef} onSkipForward={handleSkipForward} onSkipBack={handleSkipBack} />
    </div>
  );
}
