import React from "react";
import { TrashIcon } from "../icons/TrashIcon";
import { PencilIcon } from "../icons/PencilIcon";

export const Task = ({ id, description, handleEditTask, handleDeleteTask }) => {
  const [complete, setComplete] = React.useState(false);

  const toggleComplete = () => {
    setComplete(!complete);
  };

  return (
    <div
      onClick={toggleComplete}
      className="group flex justify-between items-center p-2 m-2 bg-white rounded cursor-pointer"
    >
      <div className={`text-left ${complete ? "line-through" : ""}`}>
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
