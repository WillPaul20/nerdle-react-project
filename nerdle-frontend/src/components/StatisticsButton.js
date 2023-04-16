import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { FaChartBar } from 'react-icons/fa';

const StatisticsButton = () => {
    const { isOpen, setIsOpen } = useContext(AppContext);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [gamesWon, setGamesWon] = useState(0);
  
    useEffect(() => {
      // Read from sessionStorage on mount
      const played = sessionStorage.getItem('gamesPlayed');
      const won = sessionStorage.getItem('gamesWon');
  
      if (played) {
        setGamesPlayed(parseInt(played));
      }
  
      if (won) {
        setGamesWon(parseInt(won));
      }
    }, []);

    const handleClick = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      // Write to sessionStorage before closing
      sessionStorage.setItem('gamesPlayed', gamesPlayed.toString());
      sessionStorage.setItem('gamesWon', gamesWon.toString());
      setIsOpen(false);
    };

  return (
    <>
      <button onClick={handleClick}>
      <FaChartBar /> Statistics <FaChartBar />
      </button>
      {isOpen && (
        <div className="modal-overlay">
        <div className="modal">
          <h2>Statistics</h2>
          <p>Games played: {gamesPlayed}</p>
          <p>Games won: {gamesWon}</p>
          <p>Win rate: {gamesPlayed > 0 ? `${Math.round((gamesWon / gamesPlayed) * 100)}%` : '-'}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
      )}
    </>
  );
};

export default StatisticsButton;
