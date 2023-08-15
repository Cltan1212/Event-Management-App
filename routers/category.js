const express = require("express");
const router = express.Router();
const path = require("path");
const Category = require("../models/event-category");

let categoryDb = [];

let category1 = new Category("Xmas-Pool","Christmas pool party at St.Kilda");
categoryDb.push(category1);

router.get("/", function(req, res) { //WIP maybe display all the options
    res.redirect('/event-categories')
});

//---------------------------------Add Category feature---------------------------------

// Handle GET request to show the "Add Category" form
router.get("/add-category", function(req, res) {
    res.render('category-add');
});

// Handle POST request when the form is submitted
router.post("/add-category", function(req, res) {
    let reqBody = req.body;
    let newCategory = new Category(
        reqBody.categoryName,
        reqBody.categoryDescription,
        reqBody.categoryImage
        );
    categoryDb.push(newCategory);
    res.redirect("/add-category"); 
});

// ---------------------------------List all categories in tabular format---------------------------------
router.get("/event-categories", function(req, res) { // WIP
    res.render('category-list',{categoryDb});
});

router.get("/search-category", function(req, res) { // WIP
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});

router.get("/event", function(req, res) { // WIP
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});

router.get("/delete-category", function(req, res) { // WIP
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});


module.exports = router;