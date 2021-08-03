const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://notesDipto:cZPfVsH3R8zSbVXA@cluster0.f3vnz.mongodb.net/stickyNotes?retryWrites=true&w=majority`; //Database ,password ,name should be hide.

const app = express()
const port = 5000;
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config()

console.log(process.env.DB_USER);

const client = new MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true });
client.connect(err => {
    const notes = client.db("stickyNotes").collection("notes");

    app.post('/addNotes', (req, res) => {
        const note = req.body;
        console.log(note);
        notes.insertMany(note)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    })
    app.get('/noteGetUser', (req, res) => {
        notes.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    app.get('/deleteNote', (req, res) => {
        notes.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
});

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(process.env.PORT || port);