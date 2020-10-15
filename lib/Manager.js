const Employee = require("./Employee");

class Manager extends Employee {
    constructor(myName, myId, myEmail, myofficeNumber) {
        super(myName, myId, myEmail)
        this.officeNumber = myofficeNumber;
    }

    // Accepts a user's guess
    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;