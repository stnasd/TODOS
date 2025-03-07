export type TItemTodo = {
  task: string;
  completed: boolean;
  id: string;
};
export interface ITodoItemProps extends TItemTodo {
  onAddCompletedTask: (id: string) => void;
}
export type TFilterType = "all" | "completed" | "active";
