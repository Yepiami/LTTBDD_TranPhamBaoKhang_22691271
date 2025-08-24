export class Car {
  constructor(public brand: string, public model: string, public year: number) {}

  showInfo(): void {
    console.log(`${this.brand} ${this.model} (${this.year})`);
  }
}
