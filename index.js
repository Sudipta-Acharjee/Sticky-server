const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://notesDipto:cZPfVsH3R8zSbVXA@cluster0.f3vnz.mongodb.net/stickyNotes?retryWrites=true&w=majority";
console.log(process.env.DB_USER);

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true });
client.connect(err => {
  const notes = client.db("stickyNotes").collection("notes");
  
  app.post('/addNotes',(req,res)=>{
      const note = req.body;
      console.log(note);
     notes.insertMany(note) 
      .then(result=>{
          console.log(result);
      })
  })
});

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port);