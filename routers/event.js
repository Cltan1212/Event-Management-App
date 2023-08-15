const express = require("express");
const eventRoute = express.Router();
const path = require("path");
let Event = require("../models/event");

let events = [];

let event1 = new Event("Event1",undefined,"1","60",true,undefined,60,0,123);
let event2 = new Event("Event2",undefined,"1333","60",true,undefined,60,60,124);

events.push(event1);
events.push(event2);

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
