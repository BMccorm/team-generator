const Employee = require("./Employee");

class Manager extends Employee {
    constructor(myName, myId, myEmail, myOfficeNumber) {
        super(myName, myId, myEmail)
        this.officeNumber = myOfficeNumber;
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