const express = require("express");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
const { fileURLToPath } = require("url");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
dotenv.config();

mongoose.connect('mongodb+srv://DBConnection:abawDhzO4jW6Ly1s@serversideproject.ekr3df0.mongodb.net');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).+/, (req, res) => {
	res.sendFile(path.join(__dirname, "../build/index.html"));
});

const connectDB = async () => {
	try {
		const client = await MongoClient.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		return client;
	} catch (error) {
		console.log(error);
	}
};

app.get("/api/getRandomWord", async (req, res) => {
	const today = new Date().toDateString();
	const lastPulled = req.cookies.lastPulled;
	const wordOfLastPulled = req.cookies.wordOfLastPulled;

	const client = new MongoClient('mongodb+srv://DBConnection:abawDhzO4jW6Ly1s@serversideproject.ekr3df0.mongodb.net');

	await client.connect();

	const db = client.db("NerdleDB");

	const collection = db.collection("nerdle");

	console.log("Connected to nerdleDB");
	console.log("Getting random word");

	if (today !== lastPulled) {
		const randomWord = await collection
			.aggregate([{ $sample: { size: 1 } }])
			.toArray();

		console.log(randomWord);
		res.cookie("lastPulled", today);
        res.cookie("wordOfLastPulled", randomWord);
		res.json(randomWord);
	} else {
        console.log("Word of last pulled: " + wordOfLastPulled[0].word)
		res.json(wordOfLastPulled);
	}
});

app.get("/api/getAllWords", async (req, res) => {
	//res.json(movieData)
	const client = new MongoClient('mongodb+srv://DBConnection:abawDhzO4jW6Ly1s@serversideproject.ekr3df0.mongodb.net');

	await client.connect();

	const db = client.db("NerdleDB");

	const collection = db.collection("nerdle");

	console.log("Connected to nerdleDB");
	console.log("Getting all words");

	const allWords = await collection.find().toArray();

	console.log(allWords);
	res.json(allWords.map((word) => word.word));
});

app.post("/api/addWord", async (req, res) => {
    const client = new MongoClient('mongodb+srv://DBConnection:abawDhzO4jW6Ly1s@serversideproject.ekr3df0.mongodb.net');

    await client.connect();

    const db = client.db("NerdleDB");

    const collection = db.collection("nerdle");

    console.log("Connected to nerdleDB");
    console.log("Adding word");

    // Require autentication to add words
    if (req.body.password !== process.env.PASSWORD) {
        console.log("Wrong password");
        res.status(401);
    }

    console.log(req.body.password);
    console.log(req.body.word);

    if (req.body.word.length == 6 && req.body.word !== "") {
        try {
            await collection.insertOne({ word: req.body.word });
            res.status(200).send("Word inserted successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send("Error inserting word");
        }
    } else {
        // Send error response
        res.status(400).send("Word must be exactly 6 characters long");
    }
});

// create a route that can add a JSON file of words to the database with authentication and all words must be 6 characters long
app.post("/api/addWordsJSON", async (req, res) => {
    const client = new MongoClient('mongodb+srv://DBConnection:abawDhzO4jW6Ly1s@serversideproject.ekr3df0.mongodb.net');

    await client.connect();

    const db = client.db("NerdleDB");

    const collection = db.collection("nerdle");

    console.log("Connected to nerdleDB");

    // Require autentication to add words
    if (req.body.password !== process.env.PASSWORD) {
        res.status(401).send("Unauthorized");
        return;
    }

    try {
        // If word is exactly 6 characters long, add it to the database, otherwise return an error code
        if (req.body.words.length > 0) {
            await collection.insertMany(req.body.words);

            res.status(200).send("Words inserted successfully");
            return;
        }
        res.status(400).send("Bad request");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting words");
    }
});

// create a route that will delete all entries in the database
app.delete("/api/deleteAllWords", async (req, res) => {
    const client = new MongoClient('mongodb+srv://DBConnection:abawDhzO4jW6Ly1s@serversideproject.ekr3df0.mongodb.net');

    await client.connect();

    const db = client.db("NerdleDB");

    const collection = db.collection("nerdle");

    console.log("Connected to nerdleDB");

    try {
        // Require autentication to delete words
        if (req.body.password !== process.env.PASSWORD) {
            console.log(req.body.password);
            res.status(401).send("Unauthorized");
            return;
        }

        await collection.deleteMany({});
        res.status(200).send("Words deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting words");
    }
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
