class Category{
    constructor (name, description = ""){
        this.name = name;
        this.description = description + this.description; 
        this.image = "";
        this.id = `C${this.randomChar()}${this.randomChar()}-${this.randomId()}`;
        this.createdAt = new Date(); 
    }

    
    randomChar(){
        const randomCharCode = Math.floor(Math.random() * 26) + 65; // generate between 0 - 25 (26 alphabet)
        const randomChar = String.fromCharCode(randomCharCode); // convert to a character
        return randomChar;
    }

    randomId(){
        return Math.round(Math.random()*10000);
    }
}

module.exports = Category;
