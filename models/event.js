const randString = require("randomstring");
const { format } = require("date-fns"); // I use this for convert the data format

class Event {
    constructor(
        name,
        description = "", 
        startDateTime, 
        duration, 
        endDateTime,
        isActive = false,
        image = "", // later put default pic here
        capacity = 1000,
        category) {  
        
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
        this.duration = this.changeDuration(duration)
        this.endDateTime = formattedEndDateTime ;
        this.isActive = isActive;
        this.image = image; 
        this.capacity = capacity;
        this.ticketsAvailable = capacity;
        this.category = category;
    }

    changeDuration(duration) {
        let hours = Math.round(duration/60);
        let minutes = duration - hours*60;
        return hours == 0 ? `${minutes} minutes` : minutes == 0 ? `${hours} hours` : `${hours} hours ${minutes} minutes` 
    }
}

module.exports = Event;