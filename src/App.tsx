import React, { useState } from "react";
import "./App.css";
import { Todolist, TasksArray } from "./components/TodoList";

function App() {
  const result = useState<Array<TasksArray>>([
    { id: 1, title: "HTML & CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "REACT", isDone: false },
  ]);

  let tasks = result[0];
  const setTask = result[1];

  const removeTasks = (taskid: number) => {
    const nextState: Array<TasksArray> = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== taskid) {
        nextState.push(tasks[i]);
      }
    }
    setTask(nextState);
  };

  // const tasks = [
  //   { id: 1, title: "HTML & CSS", isDone: true },
  //   { id: 2, title: "JS", isDone: true },
  //   { id: 3, title: "REACT", isDone: false },
  // ];

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks} removeTasks={removeTasks} />
    </div>
  );
}

export default App;
