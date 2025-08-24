export class Animal {
  constructor(public name: string) {}
  makeSound(): void {
    console.log("Some sound");
  }
}

export class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} says Woof!`);
  }
}

export class Cat extends Animal {
  meow(): void {
    console.log(`${this.name} says Meow!`);
  }
}
