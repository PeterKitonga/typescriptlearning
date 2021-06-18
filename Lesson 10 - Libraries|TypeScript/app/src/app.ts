import 'reflect-metadata';
import { Product } from './product.model';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

const products = [
    { title: 'A carpet', price: 29.99 },
    { title: 'A book', price: 10.99 }
];

const loaded_products = plainToClass(Product, products);

for (const prod of loaded_products) {
    console.log(prod.getInformation());
}

const new_prod = new Product('', -12.99);

validate(new_prod).then(errors => {
    if (errors.length > 0) {
        console.log('Validation errors present');
        console.log(errors);
    } else {
        console.log(new_prod.getInformation());
    }
});