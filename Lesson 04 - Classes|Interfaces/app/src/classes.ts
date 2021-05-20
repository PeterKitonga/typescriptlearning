abstract class Department {
    // private readonly _id: string;
    // public name: string; // by default all properties are public
    protected employees: string[] = []; // will allow access to class and subclasses only
    static fiscal_year: string = '2020';

    constructor(protected readonly _id: string, public name: string) {}

    // makes sure that 'this' will always refer to the class
    // abstract method is defined with a return type and no body
    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    getEmployees() {
        console.log(`Number of Employees: ${this.employees.length}`);
        console.log(`Employees: ${JSON.stringify(this.employees)}`);
    }

    getFiscalYear() {
        /**
         * static properties cannot be access by 'this' in a non static method, 
         * we call the class to access it
        */
        return { employment_year: Department.fiscal_year };
    }

    static createEmployee(name: string) {
        // can be access by 'this' in a static method
        return { name, employment_year: this.fiscal_year };
    }
}

class Engineering extends Department {
    /**
     * For us to initialize values through a constructor
     * we must pass the super() method with arguments
     * of the base class this class inherits from
    */
    constructor(_id: string, public designers: string[]) {
        super(_id, 'Engineer');
    }

    describe() {
        console.log(`Department Engineering #(${this._id}): ${this.name}`);
    }
}

class Accounting extends Department {
    private last_report: string;
    private static instance: Accounting; // create a private property with a type of the class

    private constructor(_id: string, public auditors: string[], private reports: string[] = ['Audit 2020']) {
        super(_id, 'Accounting');
        this.last_report = reports[0];
    }

    /**
     * Check whether the class has already been
     * instantiated and return the instance.
     * If not instantiated, create a new instance
    */
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance =  new Accounting('dahquaitah2ohph0eevooc8k', ['Jane', 'Mary']);
        return this.instance;
    }

    get mostRecentReport() {
        if (!this.last_report) {
            throw new Error('No report found');
        }

        return this.last_report;
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass a value to update last report');
        }

        this.addReports(value);
    }

    describe() {
        console.log(`Department Accounting #(${this._id}): ${this.name}`);
    }

    /**
     * We can also add methods specific to a sub class
    */
    addReports (report_name: string) {
        this.reports.push(report_name);
        this.last_report = report_name;
    }

    getReports () {
        console.log(`Number of Reports: ${this.reports.length}`);
        console.log(`Report List: ${JSON.stringify(this.reports)}`);
    }

    addEmployee(name: string) {
        if(name === 'Peter') {
            return;
        }

        // can access protected property in the base class
        this.employees.push(name);
    }
}

const accounting = Accounting.getInstance();
const engineering = new Engineering('ceiwaiph8aeng8eeph0aithi', ['Peter', 'John']);

accounting.describe();
engineering.describe();

accounting.addEmployee('Jake');
accounting.addEmployee('George');
accounting.addReports('Taxes 2021');

accounting.getEmployees();
accounting.getReports();

console.log(`Last Report One: ${accounting.mostRecentReport}`);

accounting.mostRecentReport = 'Another Report';

console.log(`Last Report Two: ${accounting.mostRecentReport}`);

const employee_one = Department.createEmployee('Joseph');
console.log(employee_one);
const year = Department.fiscal_year;
console.log(year);