import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "./TodoItem";
import "@testing-library/jest-dom";

describe("TodoItem Component", () => {
  it("renders the task text and checkbox", () => {
    const task = "Test Task";
    render(
      <TodoItem
        task={task}
        completed={false}
        id="1"
        onAddCompletedTask={() => {}}
      />
    );

    expect(screen.getByText(task)).toBeInTheDocument();

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  }),
    it("applies completed styles when task is completed", () => {
      const task = "Test Task";
      render(
        <TodoItem
          task={task}
          completed={true}
          id="1"
          onAddCompletedTask={() => {}}
        />
      );

      const taskText = screen.getByText(task);
      expect(taskText).toHaveClass("completed");
    });
  it("calls onAddCompletedTask when checkbox is clicked", () => {
    const task = "Test Task";
    const mockOnAddCompletedTask = jest.fn();

    render(
      <TodoItem
        task={task}
        completed={false}
        id="1"
        onAddCompletedTask={mockOnAddCompletedTask}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnAddCompletedTask).toHaveBeenCalledWith("1");
  });
});
