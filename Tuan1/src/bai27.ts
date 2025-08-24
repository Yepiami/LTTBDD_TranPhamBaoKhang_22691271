import { Person } from "./bai1";

export class Teacher extends Person {
  constructor(name: string, age: number, public subject: string) {
    super(name, age);
  }

  introduce(): void {
    console.log(`I am ${this.name}, I teach ${this.subject}`);
  }
}
