import React from "react";

function Key({ keyValue, bigKey }) {
	return <div className='key' id={bigKey && "big"}>{keyValue}</div>;
}

export default Key;
