type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

interface Todo4 {
  title: string
  description: string
  completed: boolean
}

type Todo4Preview = MyPick<Todo4, 'completed' | 'title'>

const todo2: Todo4Preview = {
  title: 'Clean room',
  completed: false,
}

type name = "firstname" | "lastname";
type TName = {
  [key in name]: string;
};
const val1: TName = {
  firstname: "sadf",
  lastname: "sadfas",
};
