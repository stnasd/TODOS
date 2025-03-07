import { TodoItem } from "@/components/TodoItem/TodoItem";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TFilterType, TItemTodo } from "@/types/types";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoMain.module.css";

export const TodoMain = () => {
  const [isOpenInput, setIsOpenInput] = useState<boolean>(false);
  const [data, setData] = useState<null | TItemTodo[]>(null);
  const [taskText, setTaskText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<TFilterType>("all");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpenInput && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpenInput]);

  const onHandleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setError("");
    setTaskText(e.target.value);
  };

  const onHandleSubmit = (): void => {
    if (taskText.trim().length >= 2) {
      const uniqueId = uuidv4();
      setData((prev) =>
        prev
          ? [...prev, { task: taskText, completed: false, id: uniqueId }]
          : [{ task: taskText, completed: false, id: uniqueId }]
      );
      setTaskText("");
      setIsOpenInput(false);
    } else {
      setError("Текст должен содержать не менее 2 букв.");
    }
  };

  const onHandleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onHandleSubmit();
    }
  };

  const onHandleOpenInput = () => {
    setIsOpenInput((prev) => !prev);
  };

  const onHandleClickFilterButton = (filter: TFilterType) => {
    setFilter(filter);
  };

  const onClearComplitedTasks = () => {
    if (data) {
      setData((prev) => prev.filter((item) => !item.completed));
    }
  };

  const onAddCompletedTask = useCallback((id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);

  const filteredData = useMemo(() => {
    if (data) {
      switch (filter) {
        case "all":
          return data;
        case "completed":
          return data.filter((item) => item.completed);
        case "active":
          return data.filter((item) => !item.completed);
        default:
          return data;
      }
    }
  }, [filter, data]);

  const itemsLeft = useMemo(() => {
    if (data) {
      return data.filter((item) => !item.completed).length;
    }
    return 0;
  }, [data]);

  return (
    <div className={styles.todoMainContainer} data-testid="todo-main-container">
      <div
        className={styles.todoMainHeader}
        onClick={onHandleOpenInput}
        data-testid="todo-main-header"
      >
        <div className={styles.todoMainHeaderCheckmark}></div>
        <p>What needs to be done?</p>
      </div>
      {isOpenInput ? (
        <div
          className={styles.todoMainInputForTask}
          data-testid="todo-main-input"
        >
          {error ? (
            <p className={styles.todoMainError} data-testid="error-message">
              {error}
            </p>
          ) : (
            ""
          )}
          <textarea
            ref={textareaRef}
            placeholder="Add task"
            maxLength={400}
            onChange={onHandleChange}
            onKeyDown={onHandleKeyDown}
            data-testid="task-input"
          />
        </div>
      ) : (
        <div
          className={styles.todoMainItemsList}
          data-testid="todo-main-items-list"
        >
          {filteredData && filteredData.length > 0 ? (
            <>
              {filteredData.map((item) => (
                <div key={item.id} data-testid="todo-item">
                  <TodoItem
                    task={item.task}
                    completed={item.completed}
                    id={item.id}
                    onAddCompletedTask={onAddCompletedTask}
                  />
                </div>
              ))}
            </>
          ) : (
            <div
              className={styles.todoMainAddTaskText}
              data-testid="no-tasks-message"
            >
              <p>Нет задач</p>
            </div>
          )}
        </div>
      )}
      <div className={styles.todoMainFooter} data-testid="todo-main-footer">
        <span
          className={styles.todoRemainingCount}
          data-testid="remaining-count"
        >
          {itemsLeft} items left
        </span>
        <div className={styles.todoMainFilters} data-testid="todo-filters">
          <button
            onClick={() => onHandleClickFilterButton("all")}
            className={cn({
              [styles.filterAll]: filter === "all",
            })}
            data-testid="filter-all"
          >
            All
          </button>
          <button
            onClick={() => onHandleClickFilterButton("active")}
            className={cn({
              [styles.filterActive]: filter === "active",
            })}
            data-testid="filter-active"
          >
            Active
          </button>
          <button
            onClick={() => onHandleClickFilterButton("completed")}
            className={cn({
              [styles.filterCompleted]: filter === "completed",
            })}
            data-testid="filter-completed"
          >
            Completed
          </button>
        </div>
        <button
          className={styles.todoClearCompleted}
          onClick={onClearComplitedTasks}
          data-testid="clear-completed"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
};
//1) Поле для ввода новых задач — На картинке не видно,
//   куда пользователь вводит новые задачи. Я реализовал текстовое поле (textarea),
//   которое появляется при клике на заголовок
//   "What needs to be done?". Поле автоматически фокусируется при открытии.
//
//2)  Обработка ввода — Добавил проверку на минимальную длину текста (2 символа).
//    Если текст короче, выводится сообщение об ошибке.
//
//3)  Добавление задачи — При нажатии Enter или кнопки "Add task" новая задача добавляется в список.
//    Для уникальности каждой задачи используется uuidv4.
//
//4)  Медиа queries — Добавил медиа запросы, для десктопных, планшетных и мобильных устройств.
