class Category{
    constructor (name, description, image){
        this.name = name;
        this.description = description; 
        this.image = image || "/standard-category-image.jpg";
        this.id = `C${this.randomChar()}${this.randomChar()}-${this.randomId()}`;
        this.createdAt = new Date(); 
    }

    
    randomChar(){
        const randomCharCode = Math.floor(Math.random() * 26) + 65; // generate between 0 - 25 (26 alphabet)
        const randomChar = String.fromCharCode(randomCharCode); // convert to a character
        return randomChar;
    }

    randomId() {
        const min = 1000; // Minimum value to ensure 4 digits
        const max = 9999; // Maximum value
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = Category;
