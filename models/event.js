const randString = require("randomstring");
const { format } = require("date-fns"); // I use this for convert the data format

class Event {
    constructor(
        name,
        description = "", 
        startDateTime, 
        duration, 
        endDateTime,
        isActive = true,
        image = "", // later put default pic here
        capacity = 1000,
        categoryID) {  
        
        // Parse the startDateTime and endDateTime strings into Date objects
        const startDate = new Date(startDateTime);
        const endDate = new Date(endDateTime);

        // Format the Date objects into the desired string format
        const formattedStartDateTime = format(startDate, "MM/dd/yyyy, h:mm:ss a");
        const formattedEndDateTime = format(endDate, "MM/dd/yyyy, h:mm:ss a");

        this.id = `E${randString.generate({length: 2,charset: "ABCDEF",})}-${Math.round(Math.random()*1000)}`;
        this.name = name;
        this.description = description;
        this.startDateTime = formattedStartDateTime;
        this.duration = duration/60 + " hour(s)";
        this.endDateTime = formattedEndDateTime ;
        this.isActive = isActive;
        this.image = image; 
        this.capacity = capacity;
        this.ticketsAvailable = capacity;
        this.categoryID = categoryID;
    }
}

module.exports = Event;