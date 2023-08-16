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
        reqBody.name,
        reqBody.description,
        reqBody.image
        );
    categoryDb.push(newCategory);
    res.redirect("/29678854/event-categories"); 
});

// ---------------------------------List all categories in tabular format---------------------------------
router.get("/event-categories", function(req, res) { // WIP
    res.render('category-list',{categoryDb});
});

// ---------------------------------List categories by keyword---------------------------------

/** Query String
 * http://localhost:8080/29678854/search-category?keyword=Melbourne
 */

router.get("/search-category", function(req, res) { // WIP
    let keyword = req.body.keyword;
    let filteredKeyword = categoryDb.filter(category => 
        category.description.toLowerCase().includes(keyword.toLowerCase())
    )
    res.render("category-list", { categories: filteredKeyword });

});

// ---------------------------------Show events details---------------------------------
router.get("/event", function(req, res) { // WIP
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});

// ---------------------------------Delete a category by ID---------------------------------
router.get("/delete-category", function(req, res) { // WIP
    res.render('category-delete');
});

router.post("/delete-category", function(req, res) { // WIP
	let id = req.body.id;
    console.log(id)
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