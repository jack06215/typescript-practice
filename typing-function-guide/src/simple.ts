// // This will not compile in TS
// function substraction(foo, bar) {
//     return foo - bar;
// }

function substraction_simple(foo: number, bar: number): number {
  return foo - bar;
}

const res1 = substraction_simple(10, 6);
console.log(res1);
