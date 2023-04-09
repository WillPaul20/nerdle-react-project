import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import React, { createContext, useState } from "react";
import { boardDefault } from "./Words";

// Allow states to be passed throughout the application using context API
export const AppContext = createContext();

function App() {
	const [board, setBoard] = useState(boardDefault);
	const [attempt, setAttempt] = useState({
		attemptNumber: 0,
		letterPosition: 0,
	});

	const onEnter = () => {
		// If the letter position is not 6, end the function
		if (attempt.letterPosition !== 6) return;
		// Set the attempt number to the next attempt and the letter position to 0
		setAttempt({ attemptNumber: attempt.attemptNumber + 1, letterPosition: 0 });
	};

	const onDelete = () => {
		// If the letter position is 0, end the function
		if (attempt.letterPosition === 0) return;

		// Get the current board state from the context
		const newBoardState = [...board];
		// Change the first letter of the first attempt to the key value
		newBoardState[attempt.attemptNumber][attempt.letterPosition - 1] = "";
		// Set the board state to the new board state
		setBoard(newBoardState);
		// Set the attempt letter position to the previous letter
		setAttempt({ ...attempt, letterPosition: attempt.letterPosition - 1 });
	};

	const onLetterSelect = (keyValue) => {
		if (attempt.letterPosition > 5) return; // If the letter position is greater than 5, return
		// Get the current board state from the context
		const newBoardState = [...board];
		// Change the first letter of the first attempt to the key value
		newBoardState[attempt.attemptNumber][attempt.letterPosition] = keyValue;
		// Set the board state to the new board state
		setBoard(newBoardState);
		// Set the attempt letter position to the next letter
		setAttempt({ ...attempt, letterPosition: attempt.letterPosition + 1 });
	};

	return (
		<div className='App'>
			<nav>
				<h1>Nerdle</h1>
			</nav>

			<AppContext.Provider
				value={{
					board,
					setBoard,
					attempt,
					setAttempt,
					onDelete,
					onEnter,
					onLetterSelect,
				}}
			>
				<div className='game'>
					<Board />
					<Keyboard />
				</div>
			</AppContext.Provider>
		</div>
	);
}

export default App;
