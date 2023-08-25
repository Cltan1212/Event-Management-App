/**
 * Express router providing user related routes. Express module
 * @requires express
 * @const
 */
const express = require("express");


const path = require("path");
const morgan = require("morgan"); // middleware

/**
 * App isntance
 * @const
 */
const app = express();

/**
 * Import express router providing category routes
 * @const
 * @type {Object}
 * @namespace routeCategory
 */
const routeCategory = require("./routers/category"); // import the category router

/**
 * Import express router providing event routes
 * @const
 * @type {Object}
 * @namespace routeCategory
 */
const eventRoute = require('./routers/event'); // import event's router

/**
 * Configure the port number
 * @name listen
 * @function
 * @param {int} port - Express port number 8080
 * @param {Function} callback - Express callback
 */
app.listen(8080, function () {
	console.log(`listening on port ${8080}`);
});

/**
 * Use Morgan middleware to generates logs automatically to any request in 'tiny' format
 * @function
 * @name morgan('tiny')
 */
app.use(morgan('tiny'));


/**
 * Sets up the view engine for rendering HTML templates
 * @function
 */
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


/**
 * Middleware function that configures the Express application to parse incoming
 * requests with `Content-Type: application/json` format.
 * @function
 */
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// parse application/json
app.use(express.json())

/**
 * Middleware function that serves bootstrap static file
 * @function
 */
//Setup the static assets directories
app.use(express.static("node_modules/bootstrap/dist/css"));

/**
 * Middleware function that serves images static folder
 * @function
 */
app.use(express.static("images"));

/**
 * Middleware function that serves views static folder
 * @function
 */
app.use(express.static('views'));

/**
 * Middleware function that serves static css
 * @function
 */
app.use(express.static('css'));

/**
 * Route handler for home page.
 *
 * Handles a GET request to render the "index.html" template as the home page.
 *
 * @name GET /
 * @function
 * @param {string} req - Express request path
 * @param {Function} res - Express response call
 */
app.get('/', function(req, res){
    // res.sendFile(path.join(__dirname,"views","index.html"));
    res.render('index.html');
})

/**
 * Route middleware for handling routes related to categories starting with "/29678854"
 * @function
 */
// Handling routes request (Group 1)
app.use('/29678854', routeCategory);

/**
 * Route middleware for handling routes related to events starting with "/ChunLing"
 * @function
 */
// Handling routes request (Group 2)
app.use('/ChunLing', eventRoute)

/**
 * Route handler for rendering a 404 page.
 *
 * @name GET *
 * @function
 */
app.get("*", function (request, response) {
	response.render("404");
});

/** URL Parameters
 * http://localhost:8080/add/BMW/X7/2023
 */

/** Query String
 * http://localhost:8080/add?maker=BMW&model=X7&year=2023
 */

/** HTTP verbs/ HTTP methods
 * GET: get data from backend
 * POST: send data to backend
 * PUT: to send data to update existing data
 * DELETE: delete data from backend
 */
