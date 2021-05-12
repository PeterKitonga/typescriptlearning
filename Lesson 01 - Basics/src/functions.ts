// void is used when a function doesn't have a return statement
const printResult = (value: number): void => {
    console.log(`Result: ${value}`);
};

const add = (input_one: number, input_two: number): number => {
    return input_one + input_two;
};

printResult(add(20, 7));

// function type
let combineValues: (a: number, b: number) => number;
combineValues = add;

printResult(combineValues(8, 8));

const addAndHandle = (input_one: number, input_two: number, _callback: (num: number) => void) => {
    const result = input_one + input_two;

    return _callback(result);
};

addAndHandle(10, 8, (result) => {
    // do whatever
    const double = result * 2;
    console.log(`Callback result: ${double}`);
    return true;
});