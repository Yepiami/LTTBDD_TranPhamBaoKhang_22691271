export class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
       this.width = width;
       this.height = height;
    }

    display(): void {
        console.log(`Area: ${this.height* this.width}, Perimeter: ${(this.height+this.width)*2}`);
    }
}
