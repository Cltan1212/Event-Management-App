const express = require("express");
const path = require("path");
const eventRoute = require('./routers/event'); // import event's router
const morgan = require("morgan"); // middleware

const app = express();

app.listen(8080);
app.use(morgan('tiny'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,"views","index.html"));
})

// endpoints for events (Part II)
app.use('/events', eventRoute)
app.use('/sold-out-events', eventRoute);
app.use('/categoty/:categoryid', eventRoute);
app.use('/delete-event', eventRoute);