class Event {
    constructor(name, startDateTime, duration, categoryID) {  // how default work??
        this.id = `E${this.randomChar}${this.randomChar}-${this.randomId}`;
        this.name = name;
        this.description = "";
        this.startDateTime = startDateTime;
        this.duration = duration;
        this.isActive = true;
        this.image = ""; // later put default pic here
        this.capacity = 1000;
        this.ticketsAvailable = this.capacity;
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