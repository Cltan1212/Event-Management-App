/**
 * Tasks Group 1 (student #1)
 * Author: Uyen Vu
 */
const express = require("express");
const router = express.Router();
const path = require("path");
const Category = require("../models/event-category");

const data = require("../data");
const categoryDb = data.categoryDb;
const events = data.events;

//---------------------------------Create a specific category with a fixed ID---------------------------------
// this fixed category is always categoryDb[0]
const fixedCategory = new Category(
    "Melbourne Moomba Festival 2023",
    "Melbourne's longest-running, iconic festival, takes place every March. Hosted many events for all ages",
    "example-image-1.png"
);
fixedCategory.id = "CME-1234"; // Overwrite the auto generated ID with fixed ID

// Push the fixed category to the category array
categoryDb.push(fixedCategory);
//---------------------------------adding filler categories---------------------------------
let category1 = new Category("THE LUME Melbourne Connection","Connection is a showcase of breathtaking stories through First Nations art and music");
let category2 = new Category("MURDER AT THE MANOR","Murder Mystery Dinner Theatre � Melbourne")
let category3 = new Category("RMIT Law Ball 2023","RMIT Law Students' Society presents RMIT Law Ball 2023", "404.png") // CL: testing adding picture
categoryDb.push(category1);
categoryDb.push(category2);
categoryDb.push(category3);

let fixedViewsPath = path.join(__dirname, "../views")

router.get("/", function(req, res) {
    res.render('index.html')
});

//---------------------------------Add Category feature---------------------------------

// Handle GET request to show the "Add Category" form
router.get("/add-category", function(req, res) {
    res.sendFile(path.join(fixedViewsPath, "category-add.html"))
});

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
router.get("/event-categories", function(req, res) { // WIP
    res.render('category-list',{allCategories: categoryDb});
});

// ---------------------------------List categories by keyword---------------------------------

/** Query String
 * http://localhost:8080/29678854/search-category?keyword=Melbourne
 */

router.get("/search-category", function(req, res) {
    let keyword = req.query.keyword;
    if(keyword == null){
        res.render('instruction-search-category');
    }
    let filteredKeyword = categoryDb.filter(category => 
        category.description.toLowerCase().includes(keyword.toLowerCase())
    )
    res.render("category-list (filter)", { filteredCategories: filteredKeyword});
    console.log("Filtered Count:", filteredKeyword.length);

});

// ---------------------------------Show events details---------------------------------
router.get("/event/EAB-1234", function(req, res) { // WIP
    res.render('event-page', {event :events[0]})
});

router.get("/event/:id", function(req, res) { // WIP
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
router.get("/delete-category", function(req, res) { 
    res.sendFile(path.join(fixedViewsPath, "category-delete.html"))
});

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