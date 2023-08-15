const express = require("express");
const router = express.Router();
const path = require("path");
const Category = require("../models/event-category");

let categoryDb = [];

let category1 = new Category("THE LUME Melbourne Connection","Connection is a showcase of breathtaking stories through First Nations art and music");
let category2 = new Category("Cody Johnson","Cody Johnson will perform at Rod Laver Arena in Melbourne")
categoryDb.push(category1);
categoryDb.push(category2);
console.log(categoryDb)


router.get("/", function(req, res) {
    res.render('index.html')
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
    res.redirect("/event-categories"); 
});

// ---------------------------------List all categories in tabular format---------------------------------
router.get("/event-categories", function(req, res) { // WIP
    res.render('category-list',{categoryDb});
});

// ---------------------------------List categories by keyword---------------------------------

/** Query String
 * http://localhost:8080/29678854/search-category?Melbourne
 */

router.get("/search-category", function(req, res) { // WIP
    let categoryKeyword = req.body.categoryKeyword;
    let filteredKeyword = categoryDb.filter(category => 
        category.description.toLowerCase().includes(categoryKeyword.toLowerCase())
    )
    res.render("category-list", { categories: filteredKeyword });

});

// ---------------------------------Show events details---------------------------------
router.get("/event", function(req, res) { // WIP
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});

// ---------------------------------Delete a category by ID---------------------------------
router.get("/delete-category", function(req, res) { // WIP
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});


module.exports = router;