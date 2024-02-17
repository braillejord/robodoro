import React from "react";
import { Section } from "./components/Section";
import "./App.css";
import { Timer } from "./components/Timer";
import { TimerButtons } from "./components/TimerButtons";
import { NavBar } from "./components/NavBar";
import { TimerDetails } from "./components/TimerDetails";
import { TasksContainer } from "./components/TasksContainer";
import { AnimationContainer } from "./components/AnimationContainer";
import { SettingsModal } from "./components/SettingsModal";

export const App = () => {
  const [play, setPlay] = React.useState(false);
  const [focusTime, setFocusTime] = React.useState(15);
  const [shortBreakTime, setShortBreakTime] = React.useState(3);
  const [longBreakTime, setLongBreakTime] = React.useState(9);
  const [currentStage, setCurrentStage] = React.useState(0);

  const stages = React.useMemo(
    () => [
      { number: 1, label: "Focus Time", duration: focusTime },
      { number: 2, label: "Short Break", duration: shortBreakTime },
      { number: 3, label: "Focus Time", duration: focusTime },
      { number: 4, label: "Short Break", duration: shortBreakTime },
      { number: 5, label: "Focus Time", duration: focusTime },
      { number: 6, label: "Short Break", duration: shortBreakTime },
      { number: 7, label: "Focus Time", duration: focusTime },
      { number: 8, label: "Long Break", duration: longBreakTime },
    ],
    [focusTime, shortBreakTime, longBreakTime]
  );

  const [time, setTime] = React.useState(stages[currentStage].duration);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  React.useEffect(() => {
    setTime(stages[currentStage].duration);
  }, [stages, currentStage]);

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
      <NavBar onSettingsClick={toggleSettingsModal} />
      {isSettingsModalOpen && (
        <SettingsModal
          onClose={toggleSettingsModal}
          focusTime={focusTime}
          setFocusTime={setFocusTime}
          shortBreakTime={shortBreakTime}
          setShortBreakTime={setShortBreakTime}
          longBreakTime={longBreakTime}
          setLongBreakTime={setLongBreakTime}
        />
      )}

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
