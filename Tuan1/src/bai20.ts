export interface Vehicle {
  move(): void;
}

export class Car implements Vehicle {
  move(): void {
    console.log("Car is driving");
  }
}

export class Bike implements Vehicle {
  move(): void {
    console.log("Bike is pedaling");
  }
}