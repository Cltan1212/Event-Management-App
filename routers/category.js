const express = require("express");
const router = express.Router();
const path = require("path");
const Category = require("../models/event-category.js");

let categoryDB = [];

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
    let name = req.body.name;
    let description = req.body.description;
    let image = req.body.image;

    let newCategory = new Category(name);
    if (description != null){
        newCategory.description == description;
    }
    if(image != null){
        newCategory.image == image
    }

    categoryDB.push(newCategory);

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