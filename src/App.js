import React from "react";
import { Section } from "./components/Section";
import "./App.css";
import { Timer } from "./components/Timer";
import { TimerButtons } from "./components/TimerButtons";
import { NavBar } from "./components/NavBar";
import { TimerDetails } from "./components/TimerDetails";
import { TasksContainer } from "./components/TasksContainer";

export const App = () => {
  const [play, setPlay] = React.useState(false);
  const [initialFocusTime, setInitialFocusTime] = React.useState(15);
  const [initialShortTime, setInitialShortTime] = React.useState(3);
  const [initialLongTime, setInitialLongTime] = React.useState(9);
  const [currentStage, setCurrentStage] = React.useState(0);

  const stages = React.useMemo(
    () => [
      { number: 1, label: "Focus Time", duration: initialFocusTime },
      { number: 2, label: "Short Break", duration: initialShortTime },
      { number: 3, label: "Focus Time", duration: initialFocusTime },
      { number: 4, label: "Short Break", duration: initialShortTime },
      { number: 5, label: "Focus Time", duration: initialFocusTime },
      { number: 6, label: "Short Break", duration: initialShortTime },
      { number: 7, label: "Focus Time", duration: initialFocusTime },
      { number: 8, label: "Long Break", duration: initialLongTime },
    ],
    [initialFocusTime, initialShortTime, initialLongTime]
  );

  const [time, setTime] = React.useState(stages[currentStage].duration);

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

  return (
    <>
      <NavBar />
      <Section>
        <TimerDetails stages={stages} currentStage={currentStage} />
        <Timer time={time} />
        <div>Reward: Robot</div>
        <TimerButtons
          play={play}
          setPlay={setPlay}
          setTime={setTime}
          stages={stages}
          currentStage={currentStage}
        />
      </Section>

      <div className="flex justify-center max-w-xl m-auto gap-2">
        <Section>Animation</Section>
        <Section>Robot</Section>
      </div>

      <Section>
        <TasksContainer />
      </Section>
    </>
  );
};
