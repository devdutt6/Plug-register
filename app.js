const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

var port = process.env.PORT;

var connection_string = `mongodb://localhost:27017/${process.env.NAME}`

mongoose.connect(connection_string , { useUrlParser: true,useUnifiedTopology: true })
.then(data => {
    console.log('DataBase connected');
    console.log(data);
})
.catch(err => {
    console.error(err , err.message , err.stack);
})

app.use(express.json());
app.use(cors());

app.use('/', user);

app.listen(port ,() => {
    console.log(`Up & running on ${port}`);
})