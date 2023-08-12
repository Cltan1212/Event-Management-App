const express = require("express");
const router = express.Router();
const path = require("path");
const Category = require("../models/event-category.js");

let categoryDB = [];

router.get("/", function(req, res) { // WIP maybe return to all categories
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});

//---------------------------------Add Category feature---------------------------------

// Handle GET request to show the "Add Category" form
router.get("/add-category", function(req, res) {
    res.sendFile(path.join(__dirname, "../views", "category-add.html"));
    res.render('category-add.html', {})
});

// Handle POST request when the form is submitted
router.post("/add-category", function(req, res) {
    let name = req.body.name;
    let description = req.body.description;
    let image = req.body.image;

    let category1 = new Category(name);

    categoryDB.push(category1);

    res.redirect('/event-categories')
});

// ---------------------------------List all categories in tabular format---------------------------------
router.get("/event-categories", function(req, res) { // WIP
    res.send(categoryDB);
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