const express = require("express");
const eventRoute = express.Router();
const path = require("path");
let Event = require("../models/event");

let events = [];

// Example event data
const event1 = new Event("Example Event 1",
    "This is the first example event.",
    "2023-08-20T15:00",
    120,
    "2023-08-20T17:00",
    true,
    "example-image-1.jpg",
    100,
    "cat-1"
    )

events.push(event1);

eventRoute.get('/add-event', function(req, res) {
    res.sendFile(path.join(__dirname, "../views", "/event-add.html"));
});

eventRoute.post('/add-event', function(req, res) {
    const eventData = req.body;

    // Calculate endDateTime based on startDateTime and duration
    const startDateTime = new Date(eventData.startDateTime);
    const duration = parseInt(eventData.duration);
    const endDateTime = new Date(startDateTime.getTime() + (duration * 60000)); // Convert duration to milliseconds

    const newEvent = new Event(
        eventData.name,
        eventData.description, 
        startDateTime, 
        duration, 
        endDateTime,
        eventData.isActive,
        eventData.image,
        eventData.capacity,
        eventData.categoryID
    )
    events.push(newEvent);
    console.log(events)
    res.redirect(path.join(req.baseUrl, '/events'));
})

eventRoute.get('/events', function(req, res) {
    res.render('event-list', { name: "Event List", events: events });
    res.sendFile(path.join(__dirname, "../views", "event-list.html"));
})

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

/**
 * Sold out event
 */
eventRoute.get('/sold-out-events', function(req, res) {
    let soldOutList = events.filter((event) => event.ticketsAvailable == 0);
    res.render('event-list', { name:"Sold Out List", events: soldOutList });
    res.redirect("/ChunLing/events");
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
