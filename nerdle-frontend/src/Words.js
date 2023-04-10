import words from "./nerdleBank.txt";

export const boardDefault = [
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
];

export const wordSetGenerator = async () => {
	let wordSet = new Set();
	await fetch(words)
		.then((response) => response.text())
		.then((result) => {
			const wordList = result.split("\n");
			wordSet = new Set(wordList);
		});

	return { wordSet };
};
