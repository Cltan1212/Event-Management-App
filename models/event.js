const randString = require("randomstring");
const { format } = require("date-fns"); // I use this for convert the data format

/**
 * Represents an Event.
 * @constructor
 * @param {string} name - The name of the event.
 * @param {string} [description = ""] - The description of the event.
 * @param {string} startDateTime - The start date and time of the event.
 * @param {number} duration - The duration of the event in minutes.
 * @param {string} endDateTime - The end date and time of the event.
 * @param {boolean} [isActive = false] - Indicates if the event is active.
 * @param {string} [image = ""] - The image URL for the event.
 * @param {number} [capacity = 1000] - The maximum capacity of the event.
 * @param {string} category - The category ID of the event.
 */

class Event {
    constructor(
        name,
        description = "", 
        startDateTime, 
        duration, 
        isActive = true,
        image = "event.jpeg", 
        capacity = 1000,
        ticketsAvailable = "",
        category) {  
        
        // Parse the startDateTime and endDateTime strings into Date objects
        const startDate = new Date(startDateTime);
        const endDate = new Date(startDate.getTime() + (duration * 60000));;

        // Format the Date objects into the desired string format
        const formattedStartDateTime = format(startDate, "MM/dd/yyyy, h:mm:ss a");
        const formattedEndDateTime = format(endDate, "MM/dd/yyyy, h:mm:ss a");

        this.id = `E${randString.generate({length: 2,charset: "ABCDEF",})}-${this.randomId()}`;
        this.name = name;
        this.description = description;
        this.startDateTime = formattedStartDateTime;
        this.duration = this.changeDuration(duration)
        this.endDateTime = formattedEndDateTime ;
        this.isActive = isActive;
        this.image = image; 
        this.capacity = capacity;
        this.ticketsAvailable = ticketsAvailable === "" ? this.capacity : ticketsAvailable;
        this.categoryID = category;
    }

    /**
     * Generate four digits random ID
     * @returns a four digit numbers
     */
    randomId() {
        const min = 1000; 
        const max = 9999; 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Converts the duration in minutes to a human-readable format.
     * @param {number} duration - The duration in minutes.
     * @returns {string} - The formatted duration string.
     */
    changeDuration(d) {
        const duration = parseInt(d);
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return hours == 0 ? `${minutes} minutes` : minutes == 0 ? `${hours} hours` : `${hours} hours ${minutes} minutes` 
    }
}

module.exports = Event;