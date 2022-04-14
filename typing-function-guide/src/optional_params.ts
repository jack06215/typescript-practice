interface Fruit2 {
  id: number;
  // nullable
  name: string | null;
  // optional parameter
  type?: string;
}

function returnUser(firstName: string, lastName?: string) {
  return `My name is ${firstName} ${lastName}`;
}

function addition(...args: number[]) {
  let result: number = 0;
  for (let i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}
