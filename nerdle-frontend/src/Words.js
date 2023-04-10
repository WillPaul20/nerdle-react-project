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
	let todaysWord;
	await fetch(words)
		.then((response) => response.text())
		.then((result) => {
			const wordList = result.split("\n");
			todaysWord = wordList[Math.floor(Math.random() * wordList.length)];
			wordSet = new Set(wordList);
		});

	return { wordSet, todaysWord };
};
