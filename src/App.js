import React from "react";
import "./App.css";

export const App = () => {
  const [play, setPlay] = React.useState(false);
  const [initialFocusTime, setInitialFocusTime] = React.useState(15);
  const [initialShortTime, setInitialShortTime] = React.useState(3);
  const [initialLongTime, setInitialLongTime] = React.useState(9);
  const [currentStage, setCurrentStage] = React.useState(0);

  const stages = React.useMemo(
    () => [
      { label: "Focus Time", duration: initialFocusTime },
      { label: "Short Break", duration: initialShortTime },
      { label: "Focus Time", duration: initialFocusTime },
      { label: "Short Break", duration: initialShortTime },
      { label: "Focus Time", duration: initialFocusTime },
      { label: "Short Break", duration: initialShortTime },
      { label: "Focus Time", duration: initialFocusTime },
      { label: "Long Break", duration: initialLongTime },
    ],
    [initialFocusTime, initialShortTime, initialLongTime]
  );

  const [time, setTime] = React.useState(stages[currentStage].duration);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  React.useEffect(() => {
    let timerId = null;

    if (play && time > 0) {
      timerId = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (play && time === 0) {
      const nextStage = (currentStage + 1) % stages.length;
      setCurrentStage(nextStage);
      setTime(stages[nextStage].duration);
      setPlay(false);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [time, play, currentStage, stages]);

  const pauseTimer = () => {
    setPlay(!play);
  };

  const restartTimer = () => {
    setTime(stages[currentStage].duration);
    setPlay(false);
  };

  return (
    <div className="pomo">
      <div>{stages[currentStage].label}</div>
      <div className="timer">
        <span>{formatTime(time)}</span>
      </div>
      <div>current stage: {currentStage}</div>
      <div>current time: {time}</div>
      <button onClick={pauseTimer}>{play ? "pause" : "start"}</button>
      <button onClick={restartTimer}>restart</button>
    </div>
  );
};
