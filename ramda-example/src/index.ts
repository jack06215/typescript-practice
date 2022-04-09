import * as R from "ramda";

const wordArr = ["", "hello", "world"];
console.log(wordArr.filter(R.identity));

const users = [
  { name: "John", city: "London", born: "2001-04-01" },
  { name: "Lenny", city: "New York", born: "1997-12-11" },
  { name: "Andrew", city: "Boston", born: "1987-02-22" },
  { name: "Peter", city: "Prague", born: "1936-03-24" },
  { name: "Anna", city: "Bratislava", born: "1973-11-18" },
  { name: "Albert", city: "Bratislava", born: "1940-12-11" },
  { name: "Adam", city: "Trnava", born: "1983-12-01" },
  { name: "Robert", city: "Bratislava", born: "1935-05-15" },
  { name: "Robert", city: "Prague", born: "1998-03-14" },
];
const res1 = R.filter(R.where({ city: R.equals("Bratislava") }))(users);
console.log(res1);

let nums = [2, 4, 6, 8, 10];

console.log(R.head(nums));
console.log(R.tail(nums));
console.log(R.init(nums));
console.log(R.last(nums));

let nums2 = [1, 2, 2, 2, 3, 3, 4, 5, 5, 5, 6, 7];

let n1 = R.length(nums2);
console.log(n1);

let n2 = R.length(R.uniq(nums2));
console.log(n2);

console.log(R.prop("name", { name: "John", age: 25 }));
console.log(R.prop("age", { name: "John", age: 25 }));

const users2 = [
  { name: "John", age: 25 },
  { name: "Lenny", age: 51 },
  { name: "Andrew", age: 43 },
  { name: "Peter", age: 81 },
  { name: "Anna", age: 43 },
  { name: "Albert", age: 76 },
  { name: "Adam", age: 47 },
  { name: "Robert", age: 72 },
];

console.log(R.pluck("age", users2));
console.log(R.pluck("name", users2));

let maxAge = R.apply(Math.max, R.pluck("age", users2));
console.log(`The oldest person is ${maxAge} years old.`);

let nums4 = [1, 2, 3, 4, 5, 6];

console.log(R.splitEvery(2, nums4));
console.log(R.splitEvery(3, nums4));


console.log(R.range(1, 10));


const users5 = [
    { name: 'John', age: 25 },
    { name: 'Lenny', age: 51 },
    { name: 'Andrew', age: 43 },
    { name: 'Peter', age: 81 },
    { name: 'Anna', age: 43 },
    { name: 'Albert', age: 76 },
    { name: 'Adam', age: 47 },
    { name: 'Robert', age: 72 }
  ];
console.log('Sorted by age:');

let sortedByAge = R.sortBy(R.prop('age'), users5);
console.log(sortedByAge);

console.log('Sorted by name:');

let sortedByName = R.sortBy(R.prop('name'), users5);
console.log(sortedByName);