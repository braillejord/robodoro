import React from "react";
import { TrashIcon } from "../../icons/TrashIcon";
import { PencilIcon } from "../../icons/PencilIcon";
import { db } from "../../database/db";

export const Task = ({
  id,
  description,
  completed,
  handleEditTask,
  handleDeleteTask,
}) => {
  const toggleComplete = async () => {
    await db.tasks.update(id, { completed: !completed });
  };

  return (
    <div className="group flex justify-between items-center p-2 m-2 bg-white rounded cursor-pointer">
      <div
        className={`text-left ${completed ? "line-through" : ""}`}
        onClick={toggleComplete}
      >
        {description}
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => handleEditTask(id)}>
          <PencilIcon />
        </button>
        <button onClick={() => handleDeleteTask(id)}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
