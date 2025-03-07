import styles from "./TodoItem.module.css";
import cn from "classnames";
import { ITodoItemProps, TItemTodo } from "@/types/types";
import { memo, useState } from "react";

export const TodoItem: React.FC<ITodoItemProps> = memo(
  ({ task, completed, id, onAddCompletedTask }) => {
    const onClickCheckbox = () => {
      onAddCompletedTask(id);
    };

    return (
      <div className={styles.todoItem}>
        <label className={styles.itemCheckbox} data-testid="checkmark">
          <input
            type="checkbox"
            onClick={onClickCheckbox}
            checked={completed}
          />
          <span className={styles.itemCheckmark}></span>
        </label>
        <p className={cn(styles.itemText, { [styles.completed]: completed })}>
          {task}
        </p>
      </div>
    );
  }
);
