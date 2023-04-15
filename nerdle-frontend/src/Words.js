import words from "./nerdleBank.txt";

export const boardDefault = [
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
	["", "", "", "", "", ""],
];

const getWords = async () => {

	// const response = await fetch('http://localhost:8000/api/getAllWords').then;
	// const data = await response.json();

	const listOfWords = [];
	await fetch('http://localhost:8000/api/getAllWords')
	.then((response) => response.json())
	.then(data =>  {
		data.forEach((word) => {
			listOfWords.push(word);
		});

	});
	return listOfWords;
};

export const wordSetGenerator = async () => {
	let wordSet = new Set();
	let todaysWord;
	const wordList = await getWords();
	await fetch('http://localhost:8000/api/getRandomWord')
		.then((response) => response.json())
		.then(data =>  {
			todaysWord = data[0].word;
			console.log("Todays word is: " + todaysWord);

			wordSet = new Set(wordList);
		});

	return { wordSet, todaysWord };
};
