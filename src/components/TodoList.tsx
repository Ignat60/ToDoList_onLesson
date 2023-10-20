import React from "react";

export type TasksArray = {
  id: number;
  title: string;
  isDone: boolean;
};

type ToDoListPropsType = {
  title: string;
  tasks: Array<TasksArray>;
  removeTasks: (taskid: number) => void;
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
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
