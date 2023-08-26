/**
 * Tasks Group 1 (student #1 29678854)
 * @author Uyen Vu <uvuu0001@student.monash.edu>
 */

/**
 * Express module
 * @const
 */
const express = require("express");

/**
 * Express router providing user related routes.
 * @module express
 */
const router = express.Router();

/**
 * Import Node.js path module
 * @module express
 */
const path = require("path");

/**
 * Import Category model
 * @typedef {Object} Category
 * @see {@link models\event-category.js}
 */
const Category = require("../models/event-category");

/**
 * Import global data.js providing access to category and event data
 * @see {@link data.js}
 */
const data = require("../data");

/**
 * An array containing category objects.
 * @type {Array.<Category>}
 */
const categoryDb = data.categoryDb;

/**
 * An array containing event objects.
 * @type {Array.<Event>}
 */
const events = data.events;

//---------------------------------Create a specific category with a fixed ID---------------------------------

/**
 * Represents a category object with specific ID, always categoryDb[0]
 * @type {Category}
 */
const fixedCategory = new Category(
    "Melbourne Moomba Festival 2023",
    "Melbourne's longest-running, iconic festival, takes place every March. It's Australia's largest free community festival. The Melburnian tradition is celebrated over four days",
    "/moomba.jpg"
);
fixedCategory.id = "CME-1234"; // Overwrite the auto generated ID with fixed ID

// Push the fixed category to the category array
categoryDb.push(fixedCategory);

//---------------------------------Adding filler categories---------------------------------
let category1 = new Category("THE LUME Melbourne Connection","Connection is a showcase of breathtaking stories through First Nations art and music. Spanning 3,000 square metres of immersive gallery space, with projections four storeys high","/lume-melbourne.jpg");
let category2 = new Category("RMIT Law Ball 2023","RMIT Law Students' Society presents RMIT Law Ball 2023. Seating RSVP - Friday, 8 September 2023 | Saturday, 9 September 2023 at Cargo Hall", "/graduation-ball.jpg")
let category3 = new Category("Van Gogh and the Seasons","MELBOURNE WINTER MASTERPIECES 2023. The exhibition includes 36 paintings and 13 works on paper which span the artist’s entire career. Many of the artworks in this exhibition depict important places in the artist’s life","/van-gogh.jpg")
categoryDb.push(category1);
categoryDb.push(category2);
categoryDb.push(category3);

/**
 * Route handler for the root URL. Renders the "index.html" template as response
 * @name GET /29678854
 * @function
 * @param {string} req - Express request path
 * @param {Function} res - Express response call
 */
router.get("/", function(req, res) {
    res.render('index.html')
});

//---------------------------------Add Category feature---------------------------------

/**
 * Route handler for displaying the category add page
 * 
 * Handle GET request and renders the "category-add.html" template
 * @name GET /29678854/add-category
 * @function
 * @param {string} req - Express request path
 * @param {Function} res - Express response call
 */
// Handle GET request to show the "Add Category" form
router.get("/add-category", function(req, res) {
    res.render("category-add.html")
});

/**
 * Route handler for processing a submitted form to add a new category
 * 
 * Handles a POST request to add a new category to the global categoryDb array
 * After adding the new category, redirects the user to the "event-categories" page
 *
 * @name POST /29678854/add-category
 * @function
 * @param {string} req - Express request path
 * @param {Function} res - Express response call
 */
// Handle POST request when the form is submitted
router.post("/add-category", function(req, res) {
    let reqBody = req.body;
    let newCategory = new Category(
        reqBody.name,
        reqBody.description,
        reqBody.image
        );
    categoryDb.push(newCategory);
    res.redirect("/29678854/event-categories"); 
});

// ---------------------------------List all categories in tabular format---------------------------------
/**
 * Route handler for the list of event categories
 * 
 * Handles a GET request to display all categories using the "category-list.html" template.
 * Passes the entire categoryDb array to the template
 *
 * @name GET /event-categories
 * @function
 * @param {string} req - Express request path
 * @param {Function} res - Express response call
 */
router.get("/event-categories", function(req, res) { // WIP
    res.render('category-list',{allCategories: categoryDb});
});

// ---------------------------------List categories by keyword---------------------------------

/**
 * Route handler for searching event categories by keyword using Query String (case-insensitive search)
 *
 * Handles a GET request to search event categories based on a provided keyword
 * If a keyword is not provided, renders the "instruction-search-category" template
 * Otherwise, filters the categoryDb array based on the keyword 
 * Passes the filtered categories to the template and render "category-list (filter)" template
 *
 * @name GET /29678854/search-category
 * @function
 * @param {string} req - Express request path
 * @param {Function} res - Express response call
 */

/** Query String
 * http://localhost:8080/29678854/search-category?keyword=Melbourne
 */

router.get("/search-category", function(req, res) {
    //Getting keyword to filter on query string
    let keyword = req.query.keyword;
    if(keyword == null){
        res.render('instruction-search-category');
    }
    //Array of filtered categories based on provided Query String keyword
    let filteredKeyword = categoryDb.filter(category => 
        category.description.toLowerCase().includes(keyword.toLowerCase())
    )
    res.render("category-list (filter)", { filteredCategories: filteredKeyword,  keyword: keyword});
    console.log("Filtered Count:", filteredKeyword.length);

});

// ---------------------------------Show events details---------------------------------
/**
 * Route handler for specific event
 *
 * Handles a GET request to displaying specific event detail using "event-page.html" template
 * with a fixed event ID ("EAB-1234").
 *
 * @name GET /29678854/event/EAB-1234
 * @function
 * @param {string} req - Express request path
 * @param {Function} res - Express response call
 */
router.get("/event/EAB-1234", function(req, res) {
    res.render('event-page', {event :events[0]})
});

/**
 * Route handler for displaying a selected event 
 * 
 * Handles a GET request displaying details of an event based on
 * the provided event ID in the URL parameter. Renders the "event-page.html" template
 *
 * @name GET /29678854/event/:id
 * @function
 * @param {string} req - Express request path
 * @param {Function} res - Express response call
 */
router.get("/event/:id", function(req, res) { 
    const eventID = req.params.id;
    for (let i = 0; i < events.length; i++) {
		if (events[i].id === eventID) {
            console.log(events[i]);
			res.render('event-page', {event: events[i]});
            break;
		}
	}
});

// ---------------------------------Delete a category by ID---------------------------------
/**
 * Route handler for providing a form to delete a category
 *
 * Handles a GET request to render the "category-delete.html" template
 *
 * @name GET /29678854/delete-category
 * @function
 * @param {string} req - Express request path
 * @param {Function} res - Express response call
 */
router.get("/delete-category", function(req, res) { 
    res.render("category-delete.html")
});

/**
 * Route handler for deleting category
 *
 * Handles a POST request to delete a category from the categoryDb array 
 * based on the provided category ID in the form
 * After deletion, it redirects to the "event-categories" page
 *
 * @name POST /29678854/delete-category
 * @function
 * @param {string} req - Express request path
 * @param {Function} res - Express response call
 */
router.post("/delete-category", function(req, res) { 
	let id = req.body.id;
	for (let i = 0; i < categoryDb.length; i++) {
		if (categoryDb[i].id === id) {
			categoryDb.splice(i, 1);
            console.log(categoryDb)
			break;
		}
	}
	res.redirect("/29678854/event-categories"); 
});

module.exports = router;