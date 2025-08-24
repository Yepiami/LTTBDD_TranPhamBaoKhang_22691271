export class Animal {
  protected makeSound(): void {
    console.log("Some generic sound");
  }
}

export class Dog extends Animal {
  protected makeSound(): void {
    console.log("Woof!");
  }
}

export class Cat extends Animal {
  protected makeSound(): void {
    console.log("Meow!");
  }
}
