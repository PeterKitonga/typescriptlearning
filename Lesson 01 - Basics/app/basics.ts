const add = (n1: number, n2: number, show_result: boolean, phrase: string) => {
    const result = n1 + n2;

    if (show_result) {
        console.log(phrase + result);
    } else {
        return result;
    }
};

const number_one = 5;
const number_two = 2.8;
const print_result = true;
const result_phrase = 'Result is: ';

add(number_one, number_two, print_result, result_phrase);