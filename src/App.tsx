import React, { useState } from "react";
import "./App.css";
import { Todolist, TasksType } from "./components/TodoList";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  // Global
  const todoListTitle = "What to learn";
  const [tasks, setTask] = useState<Array<TasksType>>([
    { id: crypto.randomUUID(), title: "HTML & CSS", isDone: true },
    { id: crypto.randomUUID(), title: "JS", isDone: true },
    { id: crypto.randomUUID(), title: "REACT", isDone: false },
  ]);

  const addTask = (title: string): void => {
    // create task
    const newTask: TasksType = {
      id: crypto.randomUUID(),
      title: title,
      isDone: false,
    };
    // add a new task to state

    const nextState: Array<TasksType> = [newTask, ...tasks];
    setTask(nextState);
  };

  // D:
  const removeTasks = (taskid: string): void => {
    // меняем цыкл for на метод массива filter
    // ----------------------------------------------
    // const nextState: Array<TasksArray> = [];
    // for (let i = 0; i < tasks.length; i++) {
    //   if (tasks[i].id !== taskid) {
    //     nextState.push(tasks[i]);
    //   }
    // }
    const nextState: Array<TasksType> = tasks.filter(
      (task) => task.id !== taskid
    );
    setTask(nextState);
  };
  // U:

  const ChangeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
    const nextState: Array<TasksType> = tasks.map((task: TasksType) =>
      task.id === taskId ? { ...task, isDone: newIsDoneValue } : task
    );
    setTask(nextState);
  };

  // Local
  const [filter, setFilter] = useState<FilterValuesType>("all");
  const changeFilter = (newFilterValue: FilterValuesType) =>
    setFilter(newFilterValue);

  const GetFilteredTasks = (
    allTasks: Array<TasksType>,
    newFilterValue: FilterValuesType
  ): Array<TasksType> => {
    switch (newFilterValue) {
      case "active":
        return allTasks.filter((t) => t.isDone === false);
      case "completed":
        return allTasks.filter((t) => t.isDone === true);
      default:
        return allTasks;
    }
  };
  const filteredTasks: Array<TasksType> = GetFilteredTasks(tasks, filter);

  // const tasks = [
  //   { id: 1, title: "HTML & CSS", isDone: true },
  //   { id: 2, title: "JS", isDone: true },
  //   { id: 3, title: "REACT", isDone: false },
  // ];
  // R:
  return (
    <div className="App">
      <Todolist
        title="todoListTitle"
        tasks={filteredTasks}
        filter={filter}
        removeTasks={removeTasks}
        changeFilter={changeFilter}
        addTask={addTask}
        ChangeTaskStatus={ChangeTaskStatus}
      />
    </div>
  );
}

export default App;
