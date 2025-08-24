export class Animal {
  makeSound(): void {
    console.log("Some generic animal sound");
  }
}

export class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

export class Cat extends Animal {
  makeSound(): void {
    console.log("Meow!");
  }
}

export const animals: Animal[] = [new Dog(), new Cat()];
animals.forEach(animal => animal.makeSound());