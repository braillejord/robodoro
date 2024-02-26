import React from "react";
import { Section } from "../components/Section";
import { Timer } from "../components/timer/Timer";
import { TimerButtons } from "../components/timer/TimerButtons";
import { TimerDetails } from "../components/timer/TimerDetails";
import { TasksContainer } from "../components/tasks/TasksContainer";
// import { AnimationContainer } from "./components/AnimationContainer";

export const TimerHome = ({
  stages,
  currentStage,
  time,
  play,
  setPlay,
  setTime,
}) => {
  return (
    <div className="flex flex-col items-center">
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
    </div>
  );
};
