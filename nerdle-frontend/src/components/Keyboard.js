import React from "react";
import Key from "./Key";

function Keyboard() {
	// We create a keyboard with the following keys:
	const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

	return (
		<div className='keyboard'>
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
