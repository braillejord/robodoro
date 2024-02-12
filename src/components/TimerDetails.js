export const TimerDetails = ({ stages, currentStage }) => {
  return (
    <div className="flex justify-between text-center">
      <div className="w-1/2"></div>
      <div className="w-1/2">{stages[currentStage].label}</div>
      <div className="w-1/2 text-right">{currentStage + 1}/8</div>
    </div>
  );
};
