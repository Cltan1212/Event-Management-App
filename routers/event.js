/**
 * Tasks Group 2 (student #2)
 * Author: Tan Chun Ling
 */
const express = require("express");
const eventRoute = express.Router();
const path = require("path");
let Event = require("../models/event"); // TESTING PURPOSE

// <------------------------------------------- Database ------------------------------------------------>
const data = require("../data"); 
const events = data.events; 
const categoryDb = data.categoryDb;

// <------------------------------------------- Testing Variables ------------------------------------------------>
/**
 * For testing purpose
 */

let firstCategoryID = categoryDb[0].id; 

const event1 = new Event("Example Event 1",
    "This is the first example event.",
    "2023-08-20T15:00",
    120,
    false,
    "example-image-1.jpg",
    100,
    100,
    firstCategoryID
    )

const event2 = new Event("Example Event 2",
    "This is the second example event.",
    "2023-08-20T17:00",
    150,
    true,
    "example-image-2.jpg",
    1000,
    0,
    firstCategoryID
)

event1.id = 'EAB-1234'; // FIXED ID 
events.push(event1);
events.push(event2);

// <------------------------------------------- Task I: Add event ------------------------------------------------>
/**
 * Render the add event page.
 * @route GET /ChunLing/add-event
 */
eventRoute.get('/add-event', function(req, res) {
    console.log(categoryDb); // testing purpose
    res.render("event-add", { categoryDb: categoryDb});
});

/**
 * Receive data from user, add into event list, and redirect to event-list page.
 * @route POST /ChunLing/add-event
 */
eventRoute.post('/add-event', function(req, res) {
    const eventData = req.body;
    console.log(eventData.ticketsAvailable)

    // Check if the provided category ID exists in the categoryDb array
    const categoryExists = categoryDb.some(category => category.id === eventData.categoryID);
    if (!categoryExists) {
        res.render('404.html');
    }

    const categoryID = categoryDb.find(category => category.id === eventData.categoryID)?.id || "";

    // create new event from body
    const newEvent = new Event(
        eventData.name,
        eventData.description, 
        eventData.startDateTime, 
        eventData.duration, 
        eventData.isActive,
        eventData.image,
        eventData.capacity,
        eventData.ticketsAvailable,
        categoryID
    )
    events.push(newEvent);
    res.redirect('/ChunLing/events');
})

// <------------------------------------------- Task II: List All Events ------------------------------------------------>
/**
 * Render the list of all events.
 * @route GET /ChunLing/events
 */
eventRoute.get('/events', function(req, res) {
    res.render('event-list', { name: "Event List", events: events });
})

// <------------------------------------------- Task III: List Sold-out events ------------------------------------------------>
/**
 * Render the list of sold-out events.
 * @route GET /ChunLing/sold-out-events
 */
eventRoute.get('/sold-out-events', function(req, res) {
    let soldOutList = events.filter((event) => event.ticketsAvailable == 0);
    res.render('event-list', { name:"Sold Out List", events: soldOutList });
})

// <------------------------------------------- Task IV: Category Details page ------------------------------------------------>
/**
 * Render the list of events belonging to a specific category.
 * @route GET /ChunLing/category/:categoryId
 */
eventRoute.get('/category/:categoryId', function(req, res) {
    // check if this is an existing category ID
    if (!categoryDb.some(category => category.id === req.params.categoryId)){
        res.render('404.html');
    }

    // get all the events with the same category ID
    let sameCategoryEvents = events.filter((event) => event.categoryID == req.params.categoryId);

    // find current category in category DB
    const currentCategory = categoryDb.find(category => category.id === req.params.categoryId);
    
    // default background pic
    const backgroundPic = currentCategory.image == undefined ? '/event-list.jpeg' : currentCategory.image

    res.render('category', { backgroundImage: `${backgroundPic}`, category: currentCategory, events: sameCategoryEvents})
});


// <------------------------------------------- Task V: Delete Event By ID ------------------------------------------------>
/**
 * Handle deleting an event by its event ID.
 * @route GET /ChunLing/delete-event
 */
eventRoute.get('/delete-event', function(req, res) {
    const eventIndex = events.findIndex(event => event.id === req.query.eventId);
    eventIndex === -1 ? res.render('404.html') : events.splice(eventIndex, 1);
    res.redirect("/ChunLing/events");
});

/**
 * Handle deleting an event by its event ID using a POST request.
 * @route POST /ChunLing/delete-event
 */
eventRoute.post('/delete-event', function(req, res) {
    const eventIndex = events.findIndex(event => event.id === req.body.id);
    eventIndex === -1 ? res.render('404.html') : events.splice(eventIndex, 1);
    res.redirect("/ChunLing/events");
})

// <------------------------------------------- Extra Part ------------------------------------------------>
/**
 * Render the page for choosing events to delete.
 * @route GET /ChunLing/delete
 */
eventRoute.get('/delete', function(req, res) {
    res.render('event-delete', { events: events });
})

/**
 * Render the page for instruction.
 * @route GET /ChunLing/instruction
 */
eventRoute.get('/instruction', function(req, res) {
    res.render('instruction-group-II');
})

// // <------------------------------------------- Utility ------------------------------------------------>

module.exports = eventRoute;
