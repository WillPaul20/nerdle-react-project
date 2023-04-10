import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
	const { attempt, gameOver, solution } = useContext(AppContext);

	return (
		<div className='gameOver'>
			<h3>
				{gameOver.guessedWord
					? "You have answered the Nerdle correctly!"
					: "Sorry, that's incorrect!"}
			</h3>
			<h1>Correct: {solution.toUpperCase()}</h1>
			{gameOver.guessedWord && (
				<h3> You guessed in {attempt.attemptNumber} attempts.</h3>
			)}
		</div>
	);
}

export default GameOver;
