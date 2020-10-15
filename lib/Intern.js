const Employee = require("./Employee");

class Intern extends Employee {
    constructor(myName, myId, myEmail, mySchool) {
        super(myName, myId, myEmail)
        this.school = mySchool;
    }

    // Accepts a user's guess
    getRole() {
        return "Intern";
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;