class Category{
    constructor (name){
        this.id = `C${this.randomChar()}${this.randomChar()}-${this.randomId()}`;
        this.name = name;
        this.description = "";
        this.image = "";
        this.createdAt = new Date();  //Set datetime to the current timestamp upon created a category
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

module.exports = Category;
