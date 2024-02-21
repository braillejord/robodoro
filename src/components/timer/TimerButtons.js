import { PlayIcon } from "../../icons/PlayIcon";
import { PauseIcon } from "../../icons/PauseIcon";
import { RestartIcon } from "../../icons/RestartIcon";
import { CloseIcon } from "../../icons/CloseIcon";

import { db } from "../../database/db";

export const TimerButtons = ({
  play,
  setPlay,
  setTime,
  stages,
  currentStage,
}) => {
  const playTimer = () => {
    setPlay(true);
  };

  const pauseTimer = () => {
    setPlay(false);
  };

  const restartTimer = () => {
    setTime(stages[currentStage].duration);
    setPlay(false);
  };

  const resetTimer = async () => {
    await db.timer.update(1, { stage: 0 });
    setTime(stages[currentStage].duration);
    setPlay(false);
  };

  const Button = ({ children, onClick }) => {
    return (
      <button
        className="rounded mx-1 hover:bg-white hover:bg-opacity-50 active:bg-white"
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="pt-4">
      <Button onClick={playTimer}>{<PlayIcon />}</Button>
      <Button onClick={pauseTimer}>{<PauseIcon />}</Button>
      <Button onClick={restartTimer}>{<RestartIcon />}</Button>
      <Button onClick={resetTimer}>{<CloseIcon />}</Button>
    </div>
  );
};
