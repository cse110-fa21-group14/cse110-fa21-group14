/**
 * This function will accept details about a person
 * and create an object for them.
 * 
 * @param {string} name The person's full name
 * @param {number} age The person's age
 * @param {boolean} isDeveloper Whether or not the person is a developer
 * @returns {Object} The person object
 */
 function createPerson(name, age, isDeveloper) {
    return {
        name: name,
        age: age,
        isDeveloper: isDeveloper
    }
}