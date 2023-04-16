import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import React, { createContext, useEffect, useState } from "react";
import { boardDefault, wordSetGenerator } from "./Words";
import StatisticsButton from "./components/StatisticsButton";

// Allow states to be passed throughout the application using context API
export const AppContext = createContext();

function App() {
	const [board, setBoard] = useState(boardDefault);
	const [attempt, setAttempt] = useState({
		attemptNumber: 0,
		letterPosition: 0,
	});
	const [solutionSet, setSolutionSet] = useState(new Set());
	const [disabled, setDisabled] = useState([]);
	const [solution, setSolution] = useState("");
	const [gameOver, setGameOver] = useState({
		isGameOver: false,
		guessedWord: false,
	});
	const [isOpen, setIsOpen] = useState(false);
	const [gamesPlayed, setGamesPlayed] = useState(0);
    const [gamesWon, setGamesWon] = useState(0);
  
    useEffect(() => {
      // Write to sessionStorage whenever gamesPlayed or gamesWon change
      sessionStorage.setItem('gamesPlayed', gamesPlayed.toString());
      sessionStorage.setItem('gamesWon', gamesWon.toString());
    }, [gamesPlayed, gamesWon]);

	useEffect(() => {
		wordSetGenerator().then((words) => {
			setSolutionSet(words.wordSet);
			setSolution(words.todaysWord);
		});
	}, []);

	const onEnter = () => {
		// If the letter position is not 6, end the function
		if (attempt.letterPosition !== 6) return;

		let currentWord = "";
		for (let i = 0; i < 6; i++) {
			currentWord += board[attempt.attemptNumber][i];
		}

		if (solutionSet.has(currentWord.toLowerCase())) {
			// Set the attempt number to the next attempt and the letter position to 0
			setAttempt({
				attemptNumber: attempt.attemptNumber + 1,
				letterPosition: 0,
			});
		} else {
			alert("Word Not Found!");
		}

		if (currentWord.toLowerCase() === solution) {
			setGameOver({ isGameOver: true, guessedWord: true });
			setGamesPlayed(gamesPlayed + 1);
			setGamesWon(gamesWon + 1);
			return;
		}

		if (attempt.attemptNumber === 5) {
			setGameOver({ isGameOver: true, guessedWord: false });
			setGamesPlayed(gamesPlayed + 1);
			return;
		}
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
			<AppContext.Provider
				value={{
					attempt,
					board,
					disabled,
					gameOver,
					gamesPlayed,
					gamesWon,
					isOpen,
					onDelete,
					onEnter,
					onLetterSelect,
					setAttempt,
					setBoard,
					setDisabled,
					setGameOver,
					setGamesPlayed,
					setGamesWon,
					setIsOpen,
					setSolution,
					solution,
					solutionSet,
				}}
			>
				<nav>
					<h1>Nerdle</h1>
				</nav>

				<div className='game'>
					<Board />
					<div className='stats'>
						<StatisticsButton />
					</div>
					{gameOver.isGameOver ? <GameOver /> : <Keyboard />}
				</div>
			</AppContext.Provider>
		</div>
	);
}

export default App;
