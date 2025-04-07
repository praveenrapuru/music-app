import React, { useState } from "react";
import { Menu } from "lucide-react";

function Sidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const tabs = ["For You", "Top Tracks", "Favourites", "Recently Played"];

  return (
    <>
     
      <div className="md:hidden p-4">
        <Menu className="text-white" onClick={() => setIsOpen(!isOpen)} />
      </div>

      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } md:block bg-black md:bg-transparent space-y-2 ml-5 w-60 md:w-auto fixed md:static top-0 left-0 h-full md:h-auto z-50 p-4`}
      >
        <div className="text-2xl font-bold mb-4">
          <span className="text-green-500">Spotify</span>
        </div>
        <ul className="text-gray-400 space-y-3">
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsOpen(false); 
              }}
              className={`cursor-pointer hover:text-white ${
                activeTab === tab ? "text-white font-bold" : ""
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>

        <div className="absolute bottom-6 left-6 flex items-center gap-3 text-gray-300">
          <div className="w-8 h-8 rounded-full bg-gray-700" />
          <span className="text-sm">User Profile</span>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
