import React, { useContext } from "react";
import { AppContext } from "../App";
import { FaChartBar } from 'react-icons/fa';

const StatisticsButton = () => {
    const { isOpen, setIsOpen } = useContext(AppContext);

  const handleClick = () => {
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={handleClick}>
      <FaChartBar /> Statistics <FaChartBar />
      </button>
      {isOpen && (
        <div className="modal-overlay">
        <div className="modal">
          <h2>Statistics</h2>
          <p>Games played: 10</p>
          <p>Games won: 5</p>
          <p>Win rate: 50%</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </div>
      )}
    </>
  );
};

export default StatisticsButton;
