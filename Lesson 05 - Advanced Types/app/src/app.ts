type Admin = {
    name: string;
    permissions: string[];
};

type Employee = {
    name: string;
    start_date: Date;
};

// works the same as interfaces extending each other
type ElevatedEmployee = Admin & Employee;

const employee_one: ElevatedEmployee = {
    name: 'Peter',
    permissions: ['create-server'],
    start_date: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

// can also be used to combine union types
type Universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
    // here we use the 'typeof' type guard
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + ' ' + b.toString();
    } else {
        return a + b;
    }
}

const result = add('Peter', 'Kitonga');
console.log(result);

type UnknownEmployee = Employee | Admin;

const printEmployee = (emp: UnknownEmployee) => {
    console.log(`Name: ${emp.name}`);

    // here we use the 'in' type guard
    if ('permissions' in emp) {
        console.log(`Permissions: ${JSON.stringify(emp.permissions)}`);
    }

    if ('start_date' in emp) {
        console.log(`Start Date: ${emp.start_date.toLocaleDateString()}`);
    }
};

printEmployee({name: 'George', start_date: new Date()});

class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...');
    }

    loadCargo(amount: number) {
        console.log(`Loading '${amount}' cargo...`);
    }
}

type Vehicle = Car | Truck;

const vehicle_one = new Car();
const vehicle_two = new Truck();

const useVehicle = (vehicle: Vehicle) => {
    vehicle.drive();

    // here we use the 'instanceof' type guard
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
};

useVehicle(vehicle_two);

interface Bird {
    kind: 'bird';
    flying_speed: number;
}

interface Horse {
    kind: 'horse';
    running_speed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
    let speed: number;

    // checks the literal type value passed
    switch (animal.kind) {
        case 'bird':
            speed = animal.flying_speed;
            break;
        case 'horse':
            speed = animal.running_speed;
            break;
    }

    console.log(`Moving at speed ${speed} km/h`);
};

moveAnimal({ kind: 'bird', flying_speed: 20.99 });

/**
 * Below can also be written as:
 * const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
 * 
 * The '!' signifies that the type will never yield null
*/
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;

userInputElement.value = 'Hi there!';

interface ErrorContainer {
    [prop: string]: string;
}

const error_bag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must be more than 3 characters'
};

const fetched_user = {
    id: 'eiveng8phak6hoh4aeth4iesheig7cho',
    name: 'Peter',
    // job: { title: 'Software Engineer', description: 'Making software for humans' }
};

console.log(fetched_user);

const user_input = '';
const stored_data = user_input ?? 'DEFAULT';

console.log(stored_data);