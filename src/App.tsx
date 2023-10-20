import React, { useState } from "react";
import "./App.css";
import { Todolist, TasksType } from "./components/TodoList";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  const todoListTitle = "What to learn";
  const [tasks, setTask] = useState<Array<TasksType>>([
    { id: 1, title: "HTML & CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "REACT", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");
  const changeFilter = (newFilterValue: FilterValuesType) =>
    setFilter(newFilterValue);

  // let tasks = result[0];
  // const setTask = result[1];

  const removeTasks = (taskid: number) => {
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

  return (
    <div className="App">
      <Todolist
        title="todoListTitle"
        tasks={filteredTasks}
        removeTasks={removeTasks}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
