import React from "react";
import { Section } from "./components/Section";
import "./App.css";
import { Timer } from "./components/timer/Timer";
import { TimerButtons } from "./components/timer/TimerButtons";
import { NavBar } from "./components/navbar/NavBar";
import { TimerDetails } from "./components/timer/TimerDetails";
import { TasksContainer } from "./components/tasks/TasksContainer";
// import { AnimationContainer } from "./components/AnimationContainer";
import { SettingsModal } from "./components/SettingsModal";
import { db } from "./database/db";
import { useLiveQuery } from "dexie-react-hooks";

export const App = () => {
  const [play, setPlay] = React.useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);

  const times = useLiveQuery(() => db.timer.get(1));
  const currentStage = times?.stage || 0;

  const stages = React.useMemo(
    () => [
      { number: 1, label: "Focus Time", duration: times?.focusTime },
      { number: 2, label: "Short Break", duration: times?.shortBreakTime },
      { number: 3, label: "Focus Time", duration: times?.focusTime },
      { number: 4, label: "Short Break", duration: times?.shortBreakTime },
      { number: 5, label: "Focus Time", duration: times?.focusTime },
      { number: 6, label: "Short Break", duration: times?.shortBreakTime },
      { number: 7, label: "Focus Time", duration: times?.focusTime },
      { number: 8, label: "Long Break", duration: times?.longBreakTime },
    ],
    [times?.focusTime, times?.shortBreakTime, times?.longBreakTime]
  );

  const [time, setTime] = React.useState(stages[currentStage].duration);

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  React.useEffect(() => {
    setTime(stages[currentStage].duration);
  }, [stages, currentStage]);

  const autostart = React.useCallback(
    (nextStage) => {
      const isFocusTime = stages[nextStage].label === "Focus Time";
      const isBreakTime = ["Short Break", "Long Break"].includes(
        stages[nextStage].label
      );

      return (
        (times?.autostartFocus && isFocusTime) ||
        (times?.autostartBreaks && isBreakTime)
      );
    },
    [times?.autostartFocus, times?.autostartBreaks, stages]
  );

  const handleCurrentStage = async (stage) => {
    await db.timer.update(1, { stage });
  };

  React.useEffect(() => {
    let timerId = null;

    if (play && time > 0) {
      timerId = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (play && time === 0) {
      timerId = setTimeout(() => {
        const nextStage = (currentStage + 1) % stages.length;
        handleCurrentStage(nextStage);
        setTime(stages[nextStage].duration);
        setPlay(autostart(nextStage));
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [time, play, currentStage, stages, autostart]);

  return (
    <>
      <NavBar onSettingsClick={toggleSettingsModal} />
      {isSettingsModalOpen && (
        <SettingsModal
          onClose={toggleSettingsModal}
          focusTime={times?.focusTime}
          shortBreakTime={times?.shortBreakTime}
          longBreakTime={times?.longBreakTime}
          autostartFocus={times?.autostartFocus}
          autostartBreaks={times?.autostartBreaks}
        />
      )}

      <Section>
        <TimerDetails stages={stages} currentStage={currentStage} />
        <Timer time={time} />
        <div>End of Session Reward: Robot</div>
        <TimerButtons
          play={play}
          setPlay={setPlay}
          setTime={setTime}
          stages={stages}
          currentStage={currentStage}
        />
      </Section>

      <Section>
        <div className="flex">
          <div className="flex items-center justify-center w-full m-2 bg-white rounded">
            Words go here.
          </div>
          <img
            className="m-auto w-1/4"
            src="https://robohash.org/75.169.157.107.png"
            alt="robot"
          />
        </div>
      </Section>

      <Section>
        <TasksContainer />
      </Section>
    </>
  );
};
