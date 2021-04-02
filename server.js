const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3003;
const mongodbURI = process.env.MONGODBURI

const whitelist = ['aws links go here']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors())
app.use(express.urlencoded({ extended: true })) 
app.use(express.json());


mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('disconnected', () => console.log ('mongo is disconnected'));
//conections
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('mongoose is working');
});

const listController = require('./controllers/list')
app.use('/list', listController)

app.listen(PORT, ()=> {
    console.log('using port', PORT);
  });