/* ============================================================================ Basic Class Decorator ============================================================================ */

const Logger = (log_string: string) => {
    return (constructor: Function) => {
        console.log(log_string);
        console.log(constructor);
    };
};

const withTemplate = (template: string, selector: string) => {
    /**
     * Lets TypeScript know that the factory returns an implementation of a class
     * with a name property
    */
    return <Type extends {new(...args: any[]): {name: string}}>(original_constructor: Type) => {
        /**
         * Extends the class the decorator is applied to
        */
        return class extends original_constructor {
            /**
             * Replaces the constructor in the class but still instantiates
             * all the logic from that class constructor
            */
            constructor(...args: any[]) {
                super();

                console.log('Render Person');
                const el = document.getElementById(selector);

                if (el) {
                    el.innerHTML = template;
                    el.querySelector('h1')!.textContent = `Person object name: ${this.name}`;
                }
            }
        };
    }
};

@Logger('Logging Person..')
@withTemplate('<h1></h1>', 'app') // means that the decorator will only be executed when the class is instantiated
class Person {
    public name: string = 'Peter';

    constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();

console.log(person);

/* ============================================================================ All Decorator Types ============================================================================ */

/**
 * Gets two arguments when used as a decorator for a property:
 * target(1st argument): this is the constructor of the class
 * property name(2nd argument): the property name 
*/
const Log = (target: any, property_name: string | Symbol) => {
    console.log('Property Decorator');
    console.log(target, property_name);
};

const LogTwo = (target: any, accessor_name: string, descriptor: PropertyDescriptor) => {
    console.log('Accessor Decorator');
    console.log(target);
    console.log(accessor_name);
    console.log(descriptor);
};

const LogThree = (target: any, method_name: string, descriptor: PropertyDescriptor) => {
    console.log('Method Decorator');
    console.log(target);
    console.log(method_name);
    console.log(descriptor);
};

const LogFour = (target: any, method_name: string, position: number) => {
    console.log('Parameter Decorator');
    console.log(target);
    console.log(method_name);
    console.log(position);
};

class Product {
    @Log
    public title: string;
    private _price: number;

    @LogTwo
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive');
        }
    }

    constructor(
        title: string, 
        _price: number
    ) {
        this.title = title;
        this._price = _price;
    }

    @LogThree
    getPriceWithTax(@LogFour tax: number) {
        return this._price * (1 + tax);
    }
}

const prod = new Product('Cola', 20);

/* ============================================================================ Method Example ============================================================================ */

const Autobind = (target: any, method_name: string, descriptor: PropertyDescriptor) => {
    const original_method = descriptor.value;
    const adjusted_descriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            /**
             * Makes sure that 'this' is always bound to the method the decorator
             * is attached to
            */
            const bound_function = original_method.bind(this);
            return bound_function;
        }
    };

    return adjusted_descriptor;
};

class Printer {
    public message: string = 'This works!';

    @Autobind
    showMessage () {
        console.log(this.message);
    }
}

const printer = new Printer();

const button = <HTMLButtonElement>document.querySelector('button')!;
button.addEventListener('click', printer.showMessage);

/* ============================================================================ Validation Example ============================================================================ */

interface ValidatorConfig {
    [property: string]: {
        [validate_prop: string]: string[] // ['required', 'positive']
    }
}

const registered_validators: ValidatorConfig = {};

const Required = (target: any, property_name: string) => {
    registered_validators[target.constructor.name] = {
        ...registered_validators[target.constructor.name],
        [property_name]: [...(registered_validators[target.constructor.name]?.[property_name] ?? []), 'required']
    };
};

const PositiveNumber = (target: any, property_name: string) => {
    registered_validators[target.constructor.name] = {
        ...registered_validators[target.constructor.name],
        [property_name]: [...(registered_validators[target.constructor.name]?.[property_name] ?? []), 'positive']
    };
};

const validate = (obj: any): boolean => {
    const obj_validator_config = registered_validators[obj.constructor.name];
    console.log(obj_validator_config);

    if (!obj_validator_config) {
        return true;
    } else {
        let is_valid = true;

        for (const prop in obj_validator_config) {
            console.log(prop);
            for (const validator of obj_validator_config[prop]) {
                switch (validator) {
                    case 'required':
                        /**
                         * '!!' should be 'true' if input is not empty and 'false' if input is empty
                        */
                        is_valid = is_valid && !!obj[prop];
                        break;
                    case 'positive':
                        is_valid = is_valid && obj[prop] > 0;
                        break;
                }
            }
        }

        return is_valid;
    }
};

class Course {
    @Required
    public title: string;

    @PositiveNumber
    public price: number;

    constructor (title: string, price: number) {
        this.title = title;
        this.price = price;
    }
}

const course_form = <HTMLFormElement>document.querySelector('form')!;
course_form.addEventListener('submit', event => {
    event.preventDefault();
    const title_el = <HTMLInputElement>document.getElementById('title')!;
    const price_el = <HTMLInputElement>document.getElementById('price')!;

    const title = title_el.value;
    const price = parseInt(price_el.value);

    const created = new Course(title, price);

    if (!validate(created)) {
        throw new Error('Validation failed');
    } else {
        console.log(created);
    }
});