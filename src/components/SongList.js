import React from "react";
const images = require.context('../../public/img', true);

function SongList({ songs, setCurrentSong,currentSong, searchTerm, setSearchTerm, activeTab }) {
  return (
    <div className="w-full md:w-1/3 bg-black p-4 overflow-y-auto md:ml-10 h-full max-h-screen">
      <h2 className="text-2xl font-bold mb-4 capitalize">{activeTab}</h2>
      
      <input
        type="text"
        placeholder="Search song..."
        className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li
          key={index}
          onClick={() => setCurrentSong(song)}
          className={`flex items-center p-2 rounded cursor-pointer 
                      ${currentSong?.title === song.title ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
          >
            <img
              src={images(song.thumbnail)}
              alt={song.title}
              className="w-12 h-12 mr-3 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold truncate">{song.title}</p>
              <p className="text-sm text-gray-400 truncate">{song.artistName}</p>
            </div>
            <span className="text-sm text-gray-300 ml-2 shrink-0">
              {song.duration}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
