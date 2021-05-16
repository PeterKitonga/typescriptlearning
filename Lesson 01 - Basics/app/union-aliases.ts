type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

// result_conversion is always going to be one of the two defined values
const combine = (input_one: Combinable, input_two: Combinable, result_conversion: ConversionDescriptor) => {
    let result;

    if (typeof input_one === 'number' && typeof input_two === 'number' || result_conversion === 'as-number') {
        // we use the '+' symbol in front of the variables to convert them to a number
        result = +input_one + +input_two;
    } else {
        result = `${input_one} ${input_two}`;
    }

    return result;
};

const combined_ages = combine(30, 26, 'as-number');
console.log(combined_ages);

const combined_string_ages = combine('30', '26', 'as-number');
console.log(combined_string_ages);

const combine_names = combine('Peter', 'Kitonga', 'as-text');
console.log(combine_names);