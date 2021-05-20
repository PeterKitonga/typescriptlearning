interface AddFunction {
    (number_one: number, number_two: number): number;
}

let add: AddFunction = (a: number, b: number) => {
    return a + b;
};

console.log(`Add Result: ${add(5, 6)}`);

interface Named {
    readonly name: string;
}

interface Greetable extends Named {
    height?: number;
    greet(phrase: string): void;
}

class Person implements Greetable {
    constructor(public name: string, age: number) {

    }

    greet(phrase: string) {
        console.log(`${phrase}, ${this.name} here`);
    }
}

/**
 * We can use an interface as a type for a variable
*/
let user: Greetable;

/**
 * This is correct because the Person() class is 
 * based on the Greetable interface
*/
user = new Person('Peter', 27);
user.greet('Hi there');