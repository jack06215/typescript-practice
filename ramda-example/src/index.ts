import * as R from "ramda";

// map
console.log(R.map((n) => n * 2, [1, 2, 3]));
const times2 = R.map((n: number) => n * 2);
times2([1, 2, 3]); // [2, 4, 6]

const obj = {
  name: "kalan",
};
R.propEq("name", "kalan")(obj); // true
// 等價於
// const propEq = (name, value) => (obj) => {
//   return obj[name] === value;
// }

R.zipObj(["id", "title"], ["2", "mytitle"]);
/*
{
  id: '2',
  title: 'mytitle'
}
*/

// compose
const toInteger = (val: string): string => {
  return `${parseInt(val)}`;
};

const toUpper = (str: string): string => {
  return str.toUpperCase();
};

const a = R.compose(toInteger, toUpper)("125000");
console.log(a);

const article = {
  id: "116208916",
  author: {
    information: {
      birthday: "1994-11-11",
      name: "kalan",
    },
    subscribers_count: 1239,
  },
  content: {
    title: "title",
    body: "body",
  },
};
const getBirthday = R.pathOr("Unknown", ["author", "information", "birthday"]);
console.log(getBirthday(article));

const data = [
  {
    id: "1",
    content: "content...",
  },
  {
    id: "2",
    content: "content...",
  },
  {
    id: "3",
    content: "content...",
  },
];

const getIds = R.pluck("id", data); // return ['1','2','3']
console.log(getIds);

const data2 = {
  url: "https://api.github.com/repos/example/magazine/issues/1",
  repository_url: "https://api.github.com/repos/example/magazine",
  labels_url:
    "https://api.github.com/repos/example/magazine/issues/1/labels{/name}",
  comments_url:
    "https://api.github.com/repos/example/magazine/issues/1/comments",
  events_url: "https://api.github.com/repos/example/magazine/issues/1/events",
  html_url: "https://github.com/example/magazine/issues/1",
  id: 252372781,
  number: 1,
  title: "test issue",
};

R.pick(["url", "repository_url", "id", "name"], data2); // 回傳這三個屬性的值，如果找不到此屬性直接忽略

R.pickAll(["url", "repository_url", "name"], data2); // 回傳值如果屬性存在，沒有的話會回傳 undefined

const isURL = (value: any, key: any) => key.indexOf("_url") !== -1;
R.pickBy(isURL, data); // 回傳任何屬性含有 _url

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
  { name: "John", age: 25 },
  { name: "Lenny", age: 51 },
  { name: "Andrew", age: 43 },
  { name: "Peter", age: 81 },
  { name: "Anna", age: 43 },
  { name: "Albert", age: 76 },
  { name: "Adam", age: 47 },
  { name: "Robert", age: 72 },
];
console.log("Sorted by age:");

let sortedByAge = R.sortBy(R.prop("age"), users5);
console.log(sortedByAge);

console.log("Sorted by name:");

let sortedByName = R.sortBy(R.prop("name"), users5);
console.log(sortedByName);
