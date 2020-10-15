class Employee {
    constructor(myname, myID, myEmail) {
        //   can the employee make an instence of class with an object 
        this.name = myname;
        this.id = myID;
        this.email = myEmail
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    // Accepts a user's guess
    getRole() {
        return "Employee";
    }
}

module.exports = Employee;