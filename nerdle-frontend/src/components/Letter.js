import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPosition, attemptValue }) {
	const { board, solution, attempt, setDisabled } = useContext(AppContext);
	const letter = board[attemptValue][letterPosition];

	// is the guessed letter correct?
	const correctLetter = solution.toUpperCase()[letterPosition] === letter;
	// is the guessed letter in the solution but in the wrong position?
	const incorrectLocation =
		!correctLetter && letter !== "" && solution.toUpperCase().includes(letter);

	const letterState =
		attempt.attemptNumber > attemptValue &&
		(correctLetter
			? "correct-letter"
			: incorrectLocation
			? "incorrect-location"
			: "default");

	useEffect(() => {
		if (letter !== "" && !correctLetter && !incorrectLocation) {
			setDisabled((prev) => [...prev, letter]);
		}
	}, [attempt.attemptNumber]);

	return (
		<div className='letter' id={letterState}>
			{letter}
		</div>
	);
}

export default Letter;
