// Setup empty JS object to act as endpoint for all routes
let projectData = [];

/* Dependencies */
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
let port = 3000;
// Callback to debug
let listen = () => {
    console.log(`server running`);
    console.log(`listening on port ${port}`);
};

const server = app.listen(port, listen);

// Callback function to complete GET '/all'
const getData = (req, res) => {
    //reply with DB object projectData
    res.send(projectData[projectData.length - 1]);
}

const postData = (req, res) => {
    // get object sent from client side
    let data = req.body;
    // update DB
    projectData.push(data);
    res.send(projectData);
}

// Initialize all route with a callback function
app.get('/getLatest', getData);

// Post Route
app.post('/update', postData);

