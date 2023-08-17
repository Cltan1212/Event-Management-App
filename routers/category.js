const express = require("express");
const router = express.Router();
const path = require("path");
const Category = require("../models/event-category");

let categoryDb = [];

//adding filler categories
let category1 = new Category("THE LUME Melbourne Connection","Connection is a showcase of breathtaking stories through First Nations art and music");
let category2 = new Category("Cody Johnson","Cody Johnson will perform at Rod Laver Arena in Melbourne")
let category3 = new Category("Capriccio at Victorian Opera","This final operatic masterpiece by Richard Strauss and Clemens Krauss")
let category4 = new Category("BEER PONG CHAMPIONSHIP","Show off your skills at our BEER PONG CHAMPIONSHIP!")
let category5 = new Category("MURDER AT THE MANOR","Murder Mystery Dinner Theatre � Melbourne")
let category6 = new Category("RMIT Law Ball 2023","RMIT Law Students' Society presents RMIT Law Ball 2023")
categoryDb.push(category1);
categoryDb.push(category2);
categoryDb.push(category3);
categoryDb.push(category4);
categoryDb.push(category5);
categoryDb.push(category6);



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
    res.render('category-list',{categoryDb});
});

// ---------------------------------List categories by keyword---------------------------------

/** Query String
 * http://localhost:8080/29678854/search-category?keyword=Melbourne
 */

router.get("/search-category", function(req, res) {
    let keyword = req.query.keyword;
    let filteredKeyword = categoryDb.filter(category => 
        category.description.toLowerCase().includes(keyword.toLowerCase())
    )
    res.render("category-list (filter)", { filteredCategories: filteredKeyword, allCategories: categoryDb});
    console.log("Filtered Count:", filteredKeyword.length);

});

// ---------------------------------Show events details---------------------------------
router.get("/events/:id", function(req, res) { // WIP
    const categoryID = req.params.id;
    res.sendFile(path.join(fixedViewsPath, 'category-add.html')); 
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

function getCategoryDb() {
    return categoryDb;
}

module.exports = {
    categoryDataRouter: router,
    getCategoryDb: getCategoryDb()
};
// module.exports = {getCategoryDb};