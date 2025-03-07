import { render, screen, fireEvent } from "@testing-library/react";
import { TodoMain } from "./TodoMain";
import "@testing-library/jest-dom";

describe("TodoMain Component", () => {
  beforeEach(() => {
    render(<TodoMain />);
  });

  it("adds a new task when Enter is pressed", async () => {
    const header = screen.getByTestId("todo-main-header");
    fireEvent.click(header);

    const textarea = screen.getByTestId("task-input");
    fireEvent.change(textarea, { target: { value: "New Task" } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });

    expect(await screen.findByText("New Task")).toBeInTheDocument();
  });

  it("filters tasks correctly", async () => {
    const header = screen.getByTestId("todo-main-header");
    fireEvent.click(header);

    const textarea = screen.getByTestId("task-input");
    fireEvent.change(textarea, { target: { value: "Task 1" } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });

    expect(await screen.findByText("Task 1")).toBeInTheDocument();

    const checkmark = screen.getAllByTestId("checkmark")[0];
    fireEvent.click(checkmark);

    const completedFilter = screen.getByTestId("filter-completed");
    fireEvent.click(completedFilter);
    expect(await screen.findByText("Task 1")).toBeInTheDocument();

    const activeFilter = screen.getByTestId("filter-active");
    fireEvent.click(activeFilter);
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();

    const allFilter = screen.getByTestId("filter-all");
    fireEvent.click(allFilter);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  it("clears completed tasks", async () => {
    const header = screen.getByTestId("todo-main-header");
    fireEvent.click(header);

    const textarea = screen.getByTestId("task-input");
    fireEvent.change(textarea, { target: { value: "Task 1" } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });

    const checkmark = screen.getAllByTestId("checkmark")[0];
    fireEvent.click(checkmark);

    const clearButton = screen.getByTestId("clear-completed");
    fireEvent.click(clearButton);

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });
});
