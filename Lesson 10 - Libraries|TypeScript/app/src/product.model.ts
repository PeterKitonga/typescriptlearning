import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
    @IsNotEmpty({
        message: 'Title field cannot be empty.'
    })
    title: string;

    @IsNumber({
        maxDecimalPlaces: 2
    }, {
        message: 'Price field should be a number.'
    })
    @IsPositive({
        message: 'Price field should be a positive number.'
    })
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }

    getInformation() {
        return [this.title, `$${this.price}`];
    }
}