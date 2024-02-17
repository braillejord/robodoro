import React from "react";
import { AddIcon } from "../icons/AddIcon";
import { Task } from "./Task";
import { CheckIcon } from "../icons/CheckIcon";
import { TrashIcon } from "../icons/TrashIcon";

export const TasksContainer = () => {
  const [tasks, setTasks] = React.useState([
    { id: 1, description: "Task 1" },
    { id: 2, description: "Task 2" },
    { id: 3, description: "Task 3" },
  ]);
  const [addingNew, setAddingNew] = React.useState(false);
  const [editingTaskId, setEditingTaskId] = React.useState(null);

  const handleAddTask = (input) => {
    if (editingTaskId) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, description: input } : task
      );
      setTasks(updatedTasks);
      setEditingTaskId(null);
    } else {
      const newTask = { id: Math.random() + 3, description: input };
      setTasks([...tasks, newTask]);
    }
    setAddingNew(false);
  };

  const handleEditTask = (id) => {
    setEditingTaskId(id);
    setAddingNew(true);
  };

  const handleDeleteNewTask = () => {
    setAddingNew(false);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <TasksNav setAddingNew={setAddingNew} />
      {tasks.map((task) =>
        editingTaskId === task.id ? (
          <NewTask
            key={task.id}
            handleAddTask={handleAddTask}
            handleDeleteNewTask={() => {
              handleDeleteNewTask();
              setEditingTaskId(null);
            }}
            initialInput={task.description}
          />
        ) : (
          <Task
            key={task.id}
            id={task.id}
            description={task.description}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
        )
      )}
      {addingNew && editingTaskId === null && (
        <NewTask
          handleAddTask={handleAddTask}
          handleDeleteNewTask={handleDeleteNewTask}
          initialInput=""
        />
      )}
    </>
  );
};

const TasksNav = ({ setAddingNew }) => {
  const handleNewTask = () => {
    console.log("clicked");
    setAddingNew(true);
  };

  return (
    <div className="flex justify-between">
      <div>Tasks</div>
      <button onClick={handleNewTask}>
        <AddIcon />
      </button>
    </div>
  );
};

const NewTask = ({ handleAddTask, handleDeleteNewTask, initialInput }) => {
  const [input, setInput] = React.useState(initialInput);

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
  };

  const handleSubmit = () => {
    handleAddTask(input);
    setInput("");
  };

  return (
    <div className="flex justify-between items-center p-2 m-2 bg-white rounded cursor-pointer">
      <input
        autoFocus
        type="text"
        value={input}
        onChange={handleInputChange}
        className="w-full text-left"
      />
      <div className="flex gap-1">
        <button onClick={handleSubmit}>
          <CheckIcon />
        </button>
        <button onClick={handleDeleteNewTask}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
