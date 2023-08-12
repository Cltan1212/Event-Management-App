// Declare
const express = require("express");
const path = require("path");
const morgan = require("morgan"); // middleware

// Creating express server
const app = express();

// Importing all the routes
const routerCategory = require("./routers/category.js");
const eventRoute = require('./routers/event'); // import event's router

app.listen(8080);
app.use(morgan('tiny'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,"views","index.html"));
})

// Handling routes request (Group 1)
app.use('/29678854', routerCategory);

// Handling routes request (Group 2)
app.use('/events', eventRoute)
app.use('/sold-out-events', eventRoute);
app.use('/categoty/:categoryid', eventRoute);
app.use('/delete-event', eventRoute);