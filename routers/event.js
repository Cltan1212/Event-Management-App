const express = require("express");
const eventRoute = express.Router();
const path = require("path");
// let Event = require("./models/event.js");

let events = [];

eventRoute.get('/events', function(req, res) {
    console.log("hello")
    res.sendFile(path.join(__dirname, "../views", "event-add.html"));
});

eventRoute.post('/events', function(req, res) {
    res.redirect('/events/event-list');
})

eventRoute.get('/event-list', function(req, res) {
    const filePath = path.join(__dirname, "../views", "event-list.html");
    res.sendFile(filePath);
});

eventRoute.get('/sold-out-events', function(req, res) {
    res.sendFile(path.join(__dirname, "../views", "event-list.html"))
});

eventRoute.get('/categoty/:categoryid', function(req, res) {
    res.sendFile(path.join(__dirname, "../views", "category.html"))
});

eventRoute.get('/delete-event', function(req, res) {
    res.redirect(path.join(__dirname, "../views", "event-list.html"));
});

module.exports = eventRoute;

