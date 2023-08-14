const randString = require("randomstring");

class Event {
    constructor(
        name,
        description = "", 
        startDateTime, 
        duration, 
        isActive = true,
        image = "",
        capacity = 1000,
        ticketsAvailable = capacity,
        categoryID) {  
        
        this.id = `E${randString.generate({length: 2,charset: "ABCDEF",})}-${Math.round(Math.random()*1000)}`;
        this.name = name;
        this.description = description;
        this.startDateTime = startDateTime;
        this.duration = duration;
        this.isActive = isActive;
        this.image = image; // later put default pic here
        this.capacity = capacity;
        this.ticketsAvailable = ticketsAvailable;
        this.categoryID = categoryID;
    }
}

module.exports = Event;