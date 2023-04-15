const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
const { fileURLToPath } = require('url');
const mongoose = require('mongoose');
dotenv.config()

mongoose.connect(process.env.MONGO_CONNECT +'/nerdleDB');

const app = express()
const port = 8000
//here is a change
app.use(express.urlencoded({ extended: false }));



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



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  