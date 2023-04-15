const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
const { fileURLToPath } = require('url');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config()

mongoose.connect(process.env.MONGO_CONNECT +'/nerdleDB');


const app = express()
const port = 8000

app.use(cors());
//here is a change
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  });

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        return client
    } catch (error) {
        console.log(error)
    }
}


app.get('/api/getRandomWord', async (req, res) => {

    //res.json(movieData)
    const client = new MongoClient(process.env.MONGO_CONNECT);
    
    await client.connect();

    const db = client.db('NerdleDB');

    const collection = db.collection('nerdle'); 

    console.log("Connected to nerdleDB");
    console.log("Getting random word");

    const randomWord = await collection.aggregate([{$sample: {size: 1}}]).toArray();
    
    console.log(randomWord);
    res.json(randomWord);
})

app.get('/api/getAllWords', async (req, res) => {
    
        //res.json(movieData)
        const client = new MongoClient(process.env.MONGO_CONNECT);
        
        await client.connect();
    
        const db = client.db('NerdleDB');
    
        const collection = db.collection('nerdle'); 
    
        console.log("Connected to nerdleDB");
        console.log("Getting all words");
    
        const allWords = await collection.find().toArray();
        
        console.log(allWords);
        res.json(allWords.map(word => word.word));
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  