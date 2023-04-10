import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyValue, bigKey, disabledKey }) {
	const {
		onEnter,
		onDelete,
		onLetterSelect,
	} = useContext(AppContext);

	const letterSelect = () => {
		if (keyValue === "ENTER") {
			onEnter();
		} else if (keyValue === "DELETE") {
			onDelete();
		} else {
			onLetterSelect(keyValue);
		}
	};

	return (
		<div className='key' id={bigKey ? "wide-key" : disabledKey && "disabled-key"} onClick={letterSelect}>
			{keyValue}
		</div>
	);
}

export default Key;
