//Server related variables
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan"); // middleware

//Category related variables
const Category = require("./models/event-category");

//Event related variables
const eventRoute = require('./routers/event'); // import event's router

app.listen(8080);
app.use(morgan('tiny'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,"views","index.html"));
})

//endpoints for category (Part I)


// endpoints for events (Part II)
app.use('/events', eventRoute)
app.use('/sold-out-events', eventRoute);
app.use('/categoty/:categoryid', eventRoute);
app.use('/delete-event', eventRoute);