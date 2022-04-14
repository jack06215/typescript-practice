interface Fruit {
  id: number;
  name: string;
}

const fruits: Array<Fruit> = [
  { id: 1, name: "apple" },
  { id: 2, name: "orange" },
];

async function getFruitById(fruitId: number): Promise<Fruit | null> {
  const findFruit = fruits.find((fruit) => fruit.id === fruitId);
  if (findFruit == null) {
    return null;
  }
  return findFruit;
}

async function runAsyncFindFruit() {
  const getFruit = await getFruitById(1);
  console.log(getFruit);
}

runAsyncFindFruit();
