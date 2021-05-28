const names: Array<string> = ['two', 'three', '4.5', '6'];

const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done');
    }, 2000);
});

/**
 * Gives us the flexibility to allow a variety of types
 * passed and defined diffrently when we call the function
 * 
 * Constraints allow us to lock down what kind of type our generic type will have.
 * Below we constrain our generic function to object arguments.
*/
const merge = <T extends object, U extends object>(first_obj: T, second_obj: U) => {
    return {...first_obj, ...second_obj};
    // return Object.assign(first_obj, second_obj);
};

const merged_one = merge({name: 'Peter'}, {age: 30});
console.log(merged_one.name);

const merged_two = merge({name: 'Peter', hobbies: ['cycling', 'swimming']}, {age: 30, height: '6 feet'});
console.log(merged_two.hobbies);

interface Lengthy {
    length: number;
}

const countAndDescribe = <Type extends Lengthy>(element: Type): [Type, string] => {
    let description = 'Got no value.';

    if (element.length > 0) {
        if (element.length === 1) { 
            description = 'Got 1 value.';
        } else {
            description = `Got ${element.length} values.`;
        }
    }

    return [element, description];
};

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['Hi there!', 'Welcome home!']));

const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U) => {
    return `Value: ${obj[key]}`;
};

console.log(extractAndConvert({ name: 'Peter' }, 'name'));

class ExampleStorage<Type extends string | number | boolean> {
    private data: Type[] = [];

    addItem(item: Type) {
        this.data.push(item);
    }

    removeItem(item: Type) {
        let index = this.data.indexOf(item);

        if (index === -1) {
            return;
        }

        this.data.splice(index, 1);
    }

    getItems() {
        return [...this.data];
    }
}

const sweets = new ExampleStorage<string>();
sweets.addItem('Cake');
sweets.addItem('Cookies');
console.log(`Sweets: ${JSON.stringify(sweets.getItems())}`);

const scores = new ExampleStorage<number>();
scores.addItem(10);
scores.addItem(46);
scores.addItem(90);
console.log(`Math Test Scores: ${JSON.stringify(scores.getItems())}`);

// const users = new ExampleStorage<object>();
// users.addItem({ name: 'Peter' });
// users.addItem({ name: 'John' });

// users.removeItem({ name: 'Peter' });
// console.log(`Users: ${JSON.stringify(users.getItems())}`);

interface CourseGoal {
    title: string;
    description: string;
    complete_until: Date;
}

const createCourseGoal = (title: string, description: string, date: Date): CourseGoal => {
    let goal: Partial<CourseGoal> = {};
    goal.title = title;
    goal.description = description;
    goal.complete_until = date;

    return goal as CourseGoal;
};

// This means we cannot do something like: usernames.push('James');
const usernames: Readonly<string[]> = ['Peter', 'John'];