import React from "react";
import { AddIcon } from "../../icons/AddIcon";
import { Task } from "./Task";
import { NewTask } from "./NewTask";
import { db } from "../../database/db";
import { useLiveQuery } from "dexie-react-hooks";
import { EyeIcon } from "../../icons/EyeIcon";
import { TrashIcon } from "../../icons/TrashIcon";

export const TasksContainer = () => {
  const [addingNew, setAddingNew] = React.useState(false);
  const [editingTaskId, setEditingTaskId] = React.useState(null);
  const [showCompleted, setShowCompleted] = React.useState(true);

  const tasks = useLiveQuery(() => db.tasks.toArray());
  const sortedTasks = tasks?.sort((a, b) => a.completed - b.completed);

  const renderTasks = (tasks) => {
    return tasks.map((task) =>
      editingTaskId === task.id ? (
        <NewTask
          key={task.id}
          handleAddTask={handleAddTask}
          handleDeleteNewTask={handleDeleteNewTask}
          initialInput={task.description}
        />
      ) : (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          completed={task.completed}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      )
    );
  };

  const handleCompletedTasks = () => {
    setShowCompleted(!showCompleted);
  };

  const handleEditTask = (id) => {
    setEditingTaskId(id);
    setAddingNew(true);
  };

  const handleDeleteNewTask = () => {
    setAddingNew(false);
    setEditingTaskId(null);
  };

  const handleAddTask = async (input) => {
    if (editingTaskId) {
      try {
        await db.tasks.update(editingTaskId, { description: input });
      } catch (error) {
        console.error("Error updating task", error);
      }
      setEditingTaskId(null);
    } else {
      try {
        await db.tasks.add({ description: input, completed: false });
      } catch (error) {
        console.error("Error adding task", error);
      }
    }
    setAddingNew(false);
  };

  const handleDeleteTask = async (id) => {
    try {
      await db.tasks.delete(id);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleClearCompleted = async () => {
    try {
      await db.tasks.filter((task) => task.completed === true).delete();
    } catch (error) {
      console.error("Error clearing completed tasks", error);
    }
  };

  const handleClearAll = async () => {
    try {
      await db.tasks.clear();
    } catch (error) {
      console.error("Error clearing all tasks", error);
    }
  };

  return (
    <>
      <TasksNav
        setAddingNew={setAddingNew}
        handleCompletedTasks={handleCompletedTasks}
        handleClearCompleted={handleClearCompleted}
        handleClearAll={handleClearAll}
      />
      {sortedTasks &&
        renderTasks(
          showCompleted
            ? sortedTasks
            : sortedTasks.filter((task) => !task.completed)
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

const TasksNav = ({
  setAddingNew,
  handleCompletedTasks,
  handleClearCompleted,
  handleClearAll,
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleNewTask = () => {
    setAddingNew(true);
  };
  return (
    <>
      <div className="flex justify-between">
        <div>Tasks</div>
        <div className="flex">
          <button onClick={handleNewTask}>
            <AddIcon />
          </button>
          <button onClick={handleCompletedTasks}>
            <EyeIcon />
          </button>

          <div
            className="relative inline-flex"
            onBlur={() => setShowDropdown(false)}
          >
            <button onClick={() => setShowDropdown(!showDropdown)}>
              <TrashIcon />
            </button>
            {showDropdown && (
              <div className="absolute bg-white z-10 w-44 top-full right-0 rounded shadow-lg text-left">
                <button onMouseDown={handleClearCompleted}>
                  Clear completed tasks
                </button>
                <button onMouseDown={handleClearAll}>Clear all tasks</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
