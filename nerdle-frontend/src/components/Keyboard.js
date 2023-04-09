import React, { useCallback, useContext, useEffect } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
	// Load the context
	const { onEnter, onDelete, onLetterSelect } = useContext(AppContext);

	// We create a keyboard with the following keys:
	const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

	//TODO: Fix Keyboard keypresses not moving to next attempt

	// We create a function that will handle the key press
	const handleKeyPress = useCallback((event) => {
		if (event.key === "Enter") {
			console.log("Enter key pressed");
			onEnter();
		} else if (event.key === "Backspace") {
			console.log("Backspace key pressed");
			onDelete();
		} else {
			console.log("Key pressed: " + event.key);
			keys1.forEach((key) => {
				if (event.key.toLowerCase() === key.toLowerCase()) {
					onLetterSelect(key);
				}
			});
			keys2.forEach((key) => {
				if (event.key.toLowerCase() === key.toLowerCase()) {
					onLetterSelect(key);
				}
			});
			keys3.forEach((key) => {
				if (event.key.toLowerCase() === key.toLowerCase()) {
					onLetterSelect(key);
				}
			});
		}
	});

	// We create a function that will handle the key press and detect keyboard input
	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, handleKeyPress);

	return (
		<div className='keyboard' onKeyDown={handleKeyPress}>
			<div className='keyRow1'>
				{keys1.map((key) => {
					return <Key keyValue={key} />;
				})}
			</div>
			<div className='keyRow2'>
				{keys2.map((key) => {
					return <Key keyValue={key} />;
				})}
			</div>
			<div className='keyRow3'>
				<Key keyValue={"ENTER"} bigKey />
				{keys3.map((key) => {
					return <Key keyValue={key} />;
				})}
				<Key keyValue={"DELETE"} bigKey />
			</div>
		</div>
	);
}

export default Keyboard;
