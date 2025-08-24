import { Person } from "./bai1";
import { Student } from "./bai2";
import { Car as Car3 } from "./bai3";
import { Rectangle } from "./bai4";
import { BankAccount } from "./bai5";
import { Book } from "./bai6";
import { User } from "./bai7";
import { products, expensive } from "./bai8";
import { Animal as Animal9 } from "./bai9";
import { Account } from "./bai10";
import { Dog as Dog11, Cat as Cat11 } from "./bai11";
import { Bird, Fish } from "./bai12";
import { Square, Circle } from "./bai13";
import { Manager, Developer } from "./bai14";
import { Library } from "./bai15";
import { Box } from "./bai16";
import { Logger } from "./bai17";
import { MathUtil } from "./bai18";
import { Dog as Dog19, Cat as Cat19 } from "./bai19";
import { Car as Car20, Bike } from "./bai20";
import { Repository } from "./bai21";
import { Stack } from "./bai22";
import { CashPayment, CardPayment } from "./bai23";
import { Fan, AirConditioner } from "./bai24";
import { Shape as Shape25 } from "./bai25";
import { Order } from "./bai26";
import { Teacher } from "./bai27";
import { Dog as Dog28, Cat as Cat28 } from "./bai28";
import { Car as Car29, Robot } from "./bai29";
import { School } from "./bai30";

// Bài 1
const p = new Person("Alice", 25);
p.displayInfo();

// Bài 2
const s = new Student("Bob", 20, "A");
s.displayInfo();

// Bài 3
const car3 = new Car3("Toyota", "Camry", 2022);
car3.showInfo();

// Bài 4
const rect = new Rectangle(5, 10);
console.log("Area:", rect.area(), "Perimeter:", rect.perimeter());

// Bài 5
const acc = new BankAccount(100);
acc.deposit(50);
acc.withdraw(30);
console.log("Balance:", acc.balance);

// Bài 6
const b = new Book("1984", "George Orwell", 1949);
console.log(b);

// Bài 7
const u = new User("Tom");
console.log("User:", u.name);
u.name = "Jerry";
console.log("Updated User:", u.name);

// Bài 8
console.log("Products > 100:", expensive);

// Bài 9
const animal9: Animal9 = {
  name: "Lion",
  sound: () => console.log("Roar!")
};
animal9.sound();

// Bài 10
const account = new Account("1", 15);
console.log("Account created at:", account.createdAt);

// Bài 11
const dog11 = new Dog11("Milu");
dog11.bark();
const cat11 = new Cat11("Mimi");
cat11.meow();

// Bài 12
const bird = new Bird();
bird.fly();
const fish = new Fish();
fish.swim();

// Bài 13
const square = new Square(4);
const circle = new Circle(3);
console.log("Square area:", square.area());
console.log("Circle area:", circle.area());

// Bài 14
const manager = new Manager("John", 5000);
manager.manage();
const dev = new Developer("Jane", 4000);
dev.code();

// Bài 15
const lib = new Library();
lib.addBook(new Book("Clean Code", "Robert C. Martin", 2008));
lib.addUser(new User("Alice"));
console.log("Library:", lib);

// Bài 16
const box = new Box<number>(123);
console.log("Box value:", box.value);

// Bài 17
const logger = Logger.getInstance();
logger.log("Hello from Logger!");

// Bài 18
console.log("MathUtil add:", MathUtil.add(2, 3));

// Bài 19 (Polymorphism)
const dog19 = new Dog19();
const cat19 = new Cat19();
dog19.makeSound();
cat19.makeSound();

// Bài 20
const car20 = new Car20();
car20.move();
const bike = new Bike();
bike.move();

// Bài 21
const repo = new Repository<string>();
repo.add("item1");
repo.add("item2");
console.log("Repository:", repo.getAll());

// Bài 22
const stack = new Stack<number>();
stack.push(10);
stack.push(20);
console.log("Peek:", stack.peek());
console.log("Pop:", stack.pop());
console.log("Is Empty:", stack.isEmpty());

// Bài 23
const cash = new CashPayment();
cash.pay(100);
const card = new CardPayment();
card.pay(200);

// Bài 24
const fan = new Fan();
fan.turnOn();
const ac = new AirConditioner();
ac.turnOn();

// Bài 25
Shape25.describe();

// Bài 26
const order = new Order(products);
console.log("Order total:", order.totalPrice());

// Bài 27
const t = new Teacher("Ms. Smith", 40, "Math");
t.introduce();

// Bài 28
const dog28 = new Dog28();
const cat28 = new Cat28();
// do makeSound là protected nên chỉ để ví dụ inheritance (không gọi trực tiếp)

// Bài 29
const car29 = new Car29();
car29.move();
const robot = new Robot();
robot.move();

// Bài 30
const school = new School();
school.addStudent(s);
school.addTeacher(t);
school.displayInfo();
