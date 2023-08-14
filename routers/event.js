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


/**
 * User could delete event by using query string
 * For example:
 * http://localhost:8080/ChunLing/delete-event?eventId=EXX-XXX
 */
eventRoute.get('/delete-event', function(req, res) {
    let eventId = req.query.eventId
    for (let i = 0;i < events.length; i++) {
        if (events[i].id == eventId) {
            events.splice(i,1);
            break;
        }
    }
    res.redirect("/ChunLing/events");
});

/**
 * User choose to delete from the main page
 */
eventRoute.get('/delete', function(req, res) {
    res.render('event-delete', { events: events });
    res.sendFile(path.join(__dirname, "../views", "event-delete.html"))
})

eventRoute.post('/delete-event', function(req, res) {
    let eventId = req.body.eventId
    for (let i = 0;i < events.length; i++) {
        if (events[i].id == eventId) {
            events.splice(i,1);
            break;
        }
    }
    res.redirect("/ChunLing/events");
})

module.exports = eventRoute;
