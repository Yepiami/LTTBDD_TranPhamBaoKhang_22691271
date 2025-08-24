export class Employee {
  constructor(public name: string, public salary: number) {}
}

export class Manager extends Employee {
  manage(): void {
    console.log(`${this.name} is managing`);
  }
}

export class Developer extends Employee {
  code(): void {
    console.log(`${this.name} is coding`);
  }
}
