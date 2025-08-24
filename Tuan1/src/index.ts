import {Person} from "./bai1"
import { Student } from "./bai2";
import { Car } from "./bai3";
import { Rectangle } from "./bai4";
// 1. Create a class Person with attributes name and age. Write a method to display this information
let j = new Person ("Khang", 22);
let p = new Student ("Khang", 22, "Khtn");
let k = new Car ("toyota","vios",2022)
let n= new Rectangle (2,4);
j.display();
n.display();
k.display();