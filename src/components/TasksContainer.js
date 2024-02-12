import React from "react";
import { AddIcon } from "../icons/AddIcon";
import { Task } from "./Task";

export const TasksContainer = () => {
  const [tasks, setTasks] = React.useState([<Task />, <Task />, <Task />]);

  return (
    <>
      <TasksNav />
      {tasks.map((task, index) => (
        <Task key={index} />
      ))}
    </>
  );
};

const TasksNav = () => {
  const addTask = () => {
    console.log("clicked");
  };

  return (
    <div className="flex justify-between">
      <div>Tasks</div>
      <button onClick={addTask}>
        <AddIcon />
      </button>
    </div>
  );
};
