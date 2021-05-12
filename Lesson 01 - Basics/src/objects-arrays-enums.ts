const person: { 
    name: string; 
    nickname?: string; // optional property
    age: number;
    hobbies: string[];
    role: [number, string];
} = {
    name: 'Peter',
    age: 27,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};

console.log(person);

// param here is an object
const printCoord = (pt: { x: number; y: number }) => {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
};

printCoord({ x: 3, y: 7 });

let favourite_activities: string[];
favourite_activities = ['Sports', 'Cooking'];

for(const activity of favourite_activities) {
    console.log(activity.toUpperCase());
}

let roles: [number, string];
roles = [2, 'author'];

enum Role { ADMIN = 2, READ_ONLY = 100, AUTHOR = 10 };

let role = Role.ADMIN;