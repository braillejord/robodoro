import { CloseIcon } from "../icons/CloseIcon";

export const Task = () => {
  return (
    <div className="flex justify-between items-center p-2 m-2 bg-white rounded">
      <div className="text-left">
        Really Really Really Really Really Really Really Really Long Task
        Description
      </div>
      <CloseIcon />
    </div>
  );
};
