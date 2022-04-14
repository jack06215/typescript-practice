class Example {
  a: number;
  b: number;

  constructor(a = 1, b = 4) {
    this.a = a;
    this.b = b;
  }
}

class Example2 {
  constructor(a: number, b: string);
  constructor(xs: any, y?: any) {}
}

new Example2(1, "2");
