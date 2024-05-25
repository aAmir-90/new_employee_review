const express = require('express');
require('dotenv').config();
const db = require('./configs/db')
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const localStrategy = require('./configs/passport-local-strategy');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const PORT = process.env.ERS_PORT || 3000;
const app = express();

app.use(express.json()); // convert json into javascript object
app.use(express.urlencoded({ extended: true })); // decode encoded url request from client
app.use(cookieParser());

// session setup
app.use(session({
    name: 'ERS',
    secret: process.env.ERS_SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
        mongoUrl: process.env.ERS_DB_URI,
        collectionName: 'session',
        autoRemove: 'native'
    })
}));

// passport middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(express.static(path.join(__dirname, 'Practical'))); // practical | static file 

// ejs setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// extract scripts and styles from webpage body
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use('/', require('./routes/index')); // setting up routing file

app.listen(PORT, ()=>{
    console.log(`Server is Listening on port: ${PORT}`)
})