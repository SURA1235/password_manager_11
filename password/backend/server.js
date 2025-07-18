const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const   cors = require('cors')
const { ObjectId } = require('mongodb');

dotenv.config()

// this is clint
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// this is DB
const dbName = 'password'; 
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

client.connect()
.then(()=>{
    console.log("connect")
})
.catch((err)=>{
    console.log(err)
})

// get api
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();

    res.json(findResult)
})

// post api
app.post('/', async (req, res) => {
    const pass= req.body
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(pass);
    res.send({success: true, result:findResult})
})


// delete api

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const db = client.db(dbName);
    const collection = db.collection('documents');

    try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            res.status(200).json({ success: true, message: 'Deleted' });
        } else {
            res.status(404).json({ success: false, message: 'Not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
