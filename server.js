// Declare
const express = require("express");
const path = require("path");
const morgan = require("morgan"); // middleware

// Creating express server
const app = express();

// Importing all the routes
const routerCategory = require("./routers/category.js"); // import the category router
const eventRoute = require('./routers/event'); // import event's router

// Config
app.listen(8080);
app.use(morgan('tiny'));
app.use(express.static("node_modules/bootstrap/dist/css"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("views", path.join(__dirname, "views")); // Set the views directory

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// parse application/json
app.use(express.json())


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,"views","index.html"));
})

// Handling routes request (Group 1)
app.use('/29678854', routerCategory);

// Handling routes request (Group 2)
app.use('/events', eventRoute)
app.use('/sold-out-events', eventRoute);
app.use('/categoty/:categoryid', eventRoute);
app.use('/delete-event', eventRoute);

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
