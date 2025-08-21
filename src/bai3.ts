export class Car {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string,model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    display(): void {
        console.log(` ${this.brand} ${this.model} ${this.year}`);
    }
}
