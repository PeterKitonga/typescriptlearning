// validation logic
export interface ValidationRules {
    value: string | number;
    required?: boolean;
    min_length?: number;
    max_length?: number;
    min?: number;
    max?: number;
}

/**
 * Checks whether all rules of a defined field are satisfied
*/
export const validate = (input: ValidationRules) => {
    let is_valid = true;

    if (input.required) {
        is_valid = is_valid && input.value.toString().trim().length !== 0;
    }

    if (input.min_length != null && typeof input.value === 'string') {
        is_valid = is_valid && input.value.length >= input.min_length;
    }

    if (input.max_length != null && typeof input.value === 'string') {
        is_valid = is_valid && input.value.length <= input.max_length;
    }

    if (input.min != null && typeof input.value === 'number') {
        is_valid = is_valid && input.value >= input.min;
    }

    if (input.max != null && typeof input.value === 'number') {
        is_valid = is_valid && input.value <= input.max;
    }

    return is_valid;
};