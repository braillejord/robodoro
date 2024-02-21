import React from "react";
import { CheckIcon } from "../../icons/CheckIcon";
import { TrashIcon } from "../../icons/TrashIcon";

export const NewTask = ({
  handleAddTask,
  handleDeleteNewTask,
  initialInput,
}) => {
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
