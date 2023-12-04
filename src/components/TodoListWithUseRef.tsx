import React, { useRef } from "react";
import { FilterValuesType } from "../App";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type ToDoListPropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTasks: (taskid: string) => void;
  changeFilter: (newFilterValue: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export const Todolist = (props: ToDoListPropsType) => {
  const taskTitleInput = useRef<HTMLInputElement>(null);

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

  const onClickSetAllFilterHandler = () => props.changeFilter("all");
  const addTaskHandler = () => {
    if (taskTitleInput.current) {
      const newTaskTitle = taskTitleInput.current.value;
      props.addTask(newTaskTitle);
    }
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <input ref={taskTitleInput} />
      <button onClick={addTaskHandler}>+</button>
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
