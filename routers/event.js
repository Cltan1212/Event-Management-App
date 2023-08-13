const express = require("express");
const eventRoute = express.Router();
const path = require("path");
let Event = require("../models/event");

let events = [];

eventRoute.get('/add-event', function(req, res) {
    res.sendFile(path.join(__dirname, "../views", "/event-add.html"));
});

eventRoute.post('/add-event', function(req, res) {
    const eventData = req.body;
    const newEvent = new Event(
        eventData.name,
        eventData.description,
        eventData.image,
        eventData.startDateTime,
        eventData.duration,
        eventData.isActive === 'on', // Convert checkbox value to a boolean
        eventData.capacity,
        eventData.ticketsAvailable,
        eventData.categoryID
    )
    events.push(newEvent);
    res.redirect(path.join(req.baseUrl, '/events'));
})

eventRoute.get('/events', function(req, res) {
    res.render('event-list', { events: events });
    res.sendFile(path.join(__dirname, "../views", "event-list.html"));
})

eventRoute.get('/sold-out-events', function(req, res) {
    res.sendFile(path.join(__dirname, "../views", "event-delete.html"))
});

eventRoute.get('/categoty/:categoryid', function(req, res) {
    res.sendFile(path.join(__dirname, "../views", "category.html"))
});

eventRoute.get('/delete-event', function(req, res) {
    res.redirect('/events');
});

module.exports = eventRoute;

