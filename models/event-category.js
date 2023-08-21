/**
 * Represents a Category
 * @constructor 
 * @param {string} name - The name of the category
 * @param {string} [description] - Optional, the description of the category
 * @param {string} [image] - Optional, the static path of image for the category
 * @param {string} id - The ID of the category
 * @param {Date} createdAt - The date category were created/added
 */

class Category{
    constructor (name, description, image){
        this.name = name;
        this.description = description; 
        this.image = image || "/standard-category-image.jpg";
        this.id = `C${this.randomChar()}${this.randomChar()}-${this.randomId()}`;
        this.createdAt = new Date(); 
    }

    /**
     * Generates a random uppercase character (A-Z).
     * @returns {string} The randomly generated character.
     */
    randomChar(){
        const randomCharCode = Math.floor(Math.random() * 26) + 65; // generate between 0 - 25 (26 alphabet)
        const randomChar = String.fromCharCode(randomCharCode); // convert to a character
        return randomChar;
    }

    /**
     * Generates a random ID between 1000 and 9999.
     * @returns {number} The randomly generated ID.
     */
    randomId() {
        const min = 1000; // Minimum value to ensure 4 digits
        const max = 9999; // Maximum value
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = Category;
