import { FC, StrictMode, useState } from "react";
import classes from "./App.module.css";
import { TodoMain } from "@/pages/TodoMain/TodoMain";
import { AppHeader } from "@/components/AppHeader/AppHeader";

export const App: FC = () => {
  return (
    <StrictMode>
      <div className={classes.containerApp}>
        <AppHeader />
        <TodoMain />
      </div>
    </StrictMode>
  );
};
