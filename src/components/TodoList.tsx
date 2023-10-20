import React from "react";
import { FilterValuesType } from "../App";

export type TasksType = {
  id: number;
  title: string;
  isDone: boolean;
};

type ToDoListPropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTasks: (taskid: number) => void;
  changeFilter: (newFilterValue: FilterValuesType) => void;
};

export const Todolist = (props: ToDoListPropsType) => {
  const taskList: Array<JSX.Element> = props.tasks.map((t, num) => {
    const onClickRemoveTaskHandler = () => props.removeTasks(t.id);
    return (
      <li>
        {num + 1}
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <button onClick={onClickRemoveTaskHandler}>X</button>
      </li>
    );
  });

  return (
    <div>
      <h2>{props.title}</h2>
      <input type="text" />
      <button>+</button>
      <ul>{taskList}</ul>
      <div>
        <button onClick={() => props.changeFilter("all")}>All</button>
        <button onClick={() => props.changeFilter("active")}>Active</button>
        <button onClick={() => props.changeFilter("completed")}>
          Completed
        </button>
      </div>
    </div>
  );
};
