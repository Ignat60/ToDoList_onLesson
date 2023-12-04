import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { FilterValuesType } from "../App";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type ToDoListPropsType = {
  title: string;
  tasks: Array<TasksType>;
  filter: FilterValuesType;
  removeTasks: (taskid: string) => void;
  changeFilter: (newFilterValue: FilterValuesType) => void;
  addTask: (title: string) => void;
  ChangeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void;
};

export const Todolist = (props: ToDoListPropsType) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const taskList: JSX.Element = props.tasks.length ? (
    <ul>
      {props.tasks.map((t, num) => {
        const onClickRemoveTaskHandler = () => props.removeTasks(t.id);
        const onCnangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
          props.ChangeTaskStatus(t.id, e.currentTarget.checked);

        return (
          <li key={t.id} className={t.isDone ? "task-is-done" : "task"}>
            {num + 1}
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={onCnangeTaskStatusHandler}
            />
            <span>{t.title}</span>
            <button onClick={onClickRemoveTaskHandler}>X</button>
          </li>
        );
      })}
    </ul>
  ) : (
    <span>Your task list is empty</span>
  );

  const onClickSetAllFilterHandler = () => props.changeFilter("all");
  const addTaskHandler = () => {
    props.addTask(title);
    setTitle("");
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    if (e.target.value.trimStart() || e.target.value === "") {
      setTitle(e.target.value);
    } else {
      setError(true);
    }
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && !isAddTaskBtnDisabled && addTaskHandler();

  // let useMessage = null;
  // if (!title.length) {
  //   useMessage = <p>Please, start typing...</p>;
  // }
  // if (title.length > 15) {
  //   useMessage = <p style={{ color: "red" }}>Your title is too long!</p>;
  // }
  // ---------------
  // refactoring sring: 43-44

  // const userMessageStartTyping: boolean | JSX.Element = title.length === 0 && (
  //   <p>Please, start typing...</p>
  // );

  // refactoring sring: 39-41
  const userMessageLengthTitle = title.length > 15 && (
    <p style={{ color: "red" }}>Your title is too long!</p>
  );

  // --------------
  const isAddTaskBtnDisabled = title.length > 15 || !title.length;
  const userMessageEmptyError = error && (
    <p style={{ color: "red" }}>Enter task title!</p>
  );
  return (
    <div>
      <h2>{props.title}</h2>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        placeholder={"Please, start typing..."}
        className={error ? "input-error" : undefined}
      />

      <button disabled={isAddTaskBtnDisabled} onClick={addTaskHandler}>
        +
      </button>
      {/* {useMessage} */}
      {/* {userMessageStartTyping} */}
      {userMessageLengthTitle}
      {/* {title.length > 15 && <p></p>} */}
      {userMessageEmptyError}
      <div>{taskList}</div>

      <div>
        <button
          className={props.filter === "all" ? "btn-filter-active" : undefined}
          onClick={() => props.changeFilter("all")}
        >
          All
        </button>
        <button
          className={
            props.filter === "active" ? "btn-filter-active" : undefined
          }
          onClick={() => props.changeFilter("active")}
        >
          Active
        </button>
        <button
          className={
            props.filter === "completed" ? "btn-filter-active" : undefined
          }
          onClick={() => props.changeFilter("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
