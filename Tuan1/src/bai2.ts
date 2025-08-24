import { Person } from "./bai1";

export class Student extends Person {
  constructor(name: string, age: number, public grade: string) {
    super(name, age);
  }

  displayInfo(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
  }
}
