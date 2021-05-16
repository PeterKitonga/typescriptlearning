let user_input: unknown;
let user_name: string;

user_input = 5;
user_input = 'Peter';

/**
 * Difference of unknown from any type is that we require to do a type check before
 * assigning a variable with an unknown type to a variable with a strict type
*/
if (typeof user_input === 'string') {
    user_name = user_input;
}

const generateError = (message: string, code: number): never => {
    throw { message, error_code: code };
};

generateError('An error occured!', 500);