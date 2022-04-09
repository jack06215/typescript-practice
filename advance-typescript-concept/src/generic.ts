export enum TaskType {
  feature = "feature",
  bug = "bug",
}

type Task<T = TaskType> = {
  name: string;
  type: T;
};
type FeatureTask = Task<TaskType.feature>;

const whatever: Task = {
  name: "single sign on",
  type: TaskType.feature,
};

const new_feature: FeatureTask = {
  name: "single sign on",
  type: TaskType.feature,
};
