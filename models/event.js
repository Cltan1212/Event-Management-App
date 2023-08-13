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
        this.id = `E${this.randomChar()}${this.randomChar()}-${this.randomId()}`;
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

    randomChar(){
        const randomCharCode = Math.floor(Math.random() * 26) + 97; // generate between 0 - 25 (26 alphabet)
        const randomChar = String.fromCharCode(randomCharCode); // convert to a character
        return randomChar;
    }

    randomId(){
        return Math.round(Math.random()*1000);
    }
}

module.exports = Event;