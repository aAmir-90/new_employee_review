//MongoDB Connection
const mongoose = require('mongoose');
require('dotenv').config()


const mongoURL = process.env.ERS_DB_URI;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MongoDB Server');
});

db.on('error', (err)=>{
    console.log('Error to connected in MongoDB Server', err);
});

db.on('disconnected', ()=>{
    console.log('Disconnected to MongoDB Server');
});

module.exports = db;