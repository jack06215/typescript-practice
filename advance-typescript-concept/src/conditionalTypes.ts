import { Epic, Release, Priority } from "./backlog";

type Dissel = {
  type: "petroleum" | "bio" | "synthetic";
};
type Gasoline = {
  type: "hybrid" | "conventional";
};
type NoEngine = {
  type: "limbs";
};

type Bus = {
  engine: Dissel;
};
type Car = {
  engine: Gasoline;
};

type Bicycle = {
  engine: NoEngine;
};

type Engine<T> = T extends { engine: unknown } ? T["engine"] : never;
type BusEngine = Engine<Bus>;

const busEngine: BusEngine = {
  type: "bio",
};

const carEngine: Engine<Car> = {
  type: "hybrid",
};

const no_engine: Engine<Bicycle> = {
  type: "limbs",
};

const releases: Release = {
  name: "Sprint 1",
  epics: [
    {
      name: "Account Management",
      tasks: [
        { name: "Single Sign On", priority: Priority.mustHave },
        { name: "Email Notifications", priority: Priority.mustHave },
      ],
    },
  ],
};

const epic: Epic = {
  name: "Account Management",
  tasks: [
    { name: "Single Sign On", priority: Priority.mustHave },
    { name: "Email Notifications", priority: Priority.mustHave },
  ],
};

console.log(epic);

// // Type '"bio"' is not assignable to type '"hybrid" | "conventional"'.
// const invalidEngine: Engine<Car> = {
//     type: 'bio'
// }
