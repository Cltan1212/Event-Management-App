const express = require("express");
const router = express.Router();
const path = require("path");

let categoryDb = [];

router.get("/", function(req, res) { //maybe return to all categories
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});

router.get("/add-category", function(req, res) {
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});

router.get("/event-categories", function(req, res) {
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});

router.get("/search-category", function(req, res) {
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});

router.get("/event", function(req, res) {
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});

router.get("/delete-category", function(req, res) {
    res.sendFile(path.join(__dirname, "../views",'index.html'));
});


module.exports = router;