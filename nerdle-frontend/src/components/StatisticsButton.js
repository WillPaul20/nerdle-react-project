import React, { useContext } from "react";
import { AppContext } from "../App";
import { FaChartBar } from 'react-icons/fa';

const StatisticsButton = () => {
    const { isOpen, setIsOpen, gamesPlayed, gamesWon } = useContext(AppContext);

    const handleClick = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
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
