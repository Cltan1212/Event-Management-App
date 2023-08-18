/**
 * Tasks Group 2 (student #2)
 * Author: Tan Chun Ling
 */
const express = require("express");
const eventRoute = express.Router();
const cat = require('./category.js');
const path = require("path");
let Event = require("../models/event");
let Category = require("../models/event-category")

const data = require("../data"); //Uyen testing
const events = data.events; //Uyen testing
const categoryDb = data.categoryDb;

// <------------------------------------------- Testing Variables ------------------------------------------------>
/**
 * For testing purpose
 */
//let events = [] //Uyen testing
//let categoryDb = cat.getCategoryDb; //Uyen testing

let firstCategoryID = categoryDb[0].id; //Uyen testing

const event1 = new Event("Example Event 1",
    "This is the first example event.",
    "2023-08-20T15:00",
    120,
    "2023-08-20T17:00",
    false,
    "example-image-1.jpg",
    100,
    firstCategoryID
    )

    const event2 = new Event("Example Event 2",
    "This is the second example event.",
    "2023-08-20T17:00",
    120,
    "2023-08-20T19:00",
    true,
    "example-image-2.jpg",
    1000,
    firstCategoryID
    )

events.push(event1);
events.push(event2);

// <------------------------------------------- Task I: Add event ------------------------------------------------>
/**
 * Add event page
 * http://localhost:8080/ChunLing/add-event
 * 
 */
eventRoute.get('/add-event', function(req, res) {
    console.log(categoryDb); // testing purpose
    res.render("event-add", { categoryDb: categoryDb});
});

/**
 * Receive data from user, add into event list
 * and redirect to event-list page
 */
eventRoute.post('/add-event', function(req, res) {
    const eventData = req.body;

    // Check if the provided category ID exists in the categoryDb array
    const categoryExists = categoryDb.some(category => category.id === eventData.categoryID);
    if (!categoryExists) {
        res.redirect("../*");
    }

    const categoryID = categoryDb.find(category => category.id === eventData.categoryID)?.id || "";

    // Calculate endDateTime based on startDateTime and duration
    const startDateTime = new Date(eventData.startDateTime);
    const duration = parseInt(eventData.duration);
    const endDateTime = new Date(startDateTime.getTime() + (duration * 60000)); // Convert duration to milliseconds

    // create new event from body
    const newEvent = new Event(
        eventData.name,
        eventData.description, 
        startDateTime, 
        duration, 
        endDateTime,
        eventData.isActive,
        eventData.image,
        eventData.capacity,
        categoryID
    )
    events.push(newEvent);
    console.log(events)
    res.redirect(path.join(req.baseUrl, '/events'));
})

// <------------------------------------------- Task II: List All Events ------------------------------------------------>
/**
 * List all events
 */
eventRoute.get('/events', function(req, res) {
    res.render('event-list', { name: "Event List", events: events });
})

// <------------------------------------------- Task III: List Sold-out events ------------------------------------------------>
/**
 * Sold out event
 */
eventRoute.get('/sold-out-events', function(req, res) {
    let soldOutList = events.filter((event) => event.ticketsAvailable == 0);
    res.render('event-list', { name:"Sold Out List", events: soldOutList });
    res.redirect("/ChunLing/events");
})

// <------------------------------------------- Task IV: List Sold-out events ------------------------------------------------>
/**
 * Display category details by
 */
eventRoute.get('/category/:categoryId', function(req, res) {
    // check if this is an existing category ID
    if (!categoryDb.some(category => category.id === req.params.categoryId)){
        res.render('404.html');
    }

    // get all the events with the same category ID
    let sameCategoryEvents = events.filter((event) => event.categoryID == req.params.categoryId);
    console.log(sameCategoryEvents);

    // find current category in category DB
    const currentCategory = categoryDb.find(category => category.id === req.params.categoryId);

    res.render('category', { category: currentCategory, events: sameCategoryEvents})
});


// <------------------------------------------- Task V: Delete Event By ID ------------------------------------------------>
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
 * Delete event by EventId
 */
eventRoute.post('/delete-event', function(req, res) {
    let eventId = req.body.id
    for (let i = 0;i < events.length; i++) {
        if (events[i].id == eventId) {
            events.splice(i,1);
            break;
        }
    }
    res.redirect("/ChunLing/events");
})

// <------------------------------------------- Extra Part ------------------------------------------------>
/**
 * User choose to delete from the main page
 */
eventRoute.get('/delete', function(req, res) {
    res.render('event-delete', { events: events });
})

// // <------------------------------------------- Utility ------------------------------------------------>
// /**
//  * Returns event database export to other file
//  * @returns an array of events database
//  */
// function getEvents(){
//     return events;
// }

// // exports rounter
// module.exports = {
//     eventRoute: eventRoute,
//     getEvents: getEvents()
// };

module.exports = eventRoute;
