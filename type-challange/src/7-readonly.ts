type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Todo7 {
  title: string
  description: string
}

const todo: MyReadonly<Todo7> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
