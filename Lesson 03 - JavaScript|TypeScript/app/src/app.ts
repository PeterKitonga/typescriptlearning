// a let variable has a value that can be changed
let age = 30;

// a const variable has a value that cannot be changed
const user_name = 'Peter';

/**
 * Default function parameters cannot be defined as a first argument
 * because JavaScript & TypeScript cannot skip arguments. Values 
 * from arguments are passed from left to right.
*/
const add = (a: number, b: number = 1) => {
    return a + b;
};

// functions with a single expression dont need the curly braces enclosure. The return statement is passed implicitly
const printOutput = (output: string | number): void => console.log(`Result: ${output}`);

printOutput(add(5));

const active_hobbies = ['Hiking', 'Swimming'];
const hobbies = ['Cycling', 'Cooking', 'Pencil Drawing', ...active_hobbies];

printOutput(JSON.stringify(hobbies));

const animal = {
    species: 'Human',
    class: 'Mammal'
};

const human = { name: 'Peter', is_animal: true, ...animal };

printOutput(JSON.stringify(human));

const multiply = (...numbers: number[]) => {
    return numbers.reduce((current, value) => {
        return current * value;
    }, 1);
};

printOutput(JSON.stringify(multiply(2, 10, 3, 16, 5)));