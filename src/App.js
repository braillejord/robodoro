import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/navigation/NavBar";
import { SettingsModal } from "./components/SettingsModal";
import { db } from "./database/db";
import { useLiveQuery } from "dexie-react-hooks";
import { TimerHome } from "./pages/TimerHome";
import { RobotHome } from "./pages/RobotHome";
import { NotFound } from "./pages/NotFound";

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
    <Router>
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
      <Routes>
        <Route path="/robots" element={<RobotHome />} />

        <Route
          path="/"
          element={
            <TimerHome
              stages={stages}
              currentStage={currentStage}
              time={time}
              play={play}
              setPlay={setPlay}
              setTime={setTime}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
