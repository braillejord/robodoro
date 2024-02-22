export const TimerDetails = ({ stages, currentStage }) => {
  return (
    <div className="flex justify-between text-center">
      <div className="w-1/2"></div>
      <div className="w-1/2">{stages[currentStage].label}</div>
      <div className="group relative w-1/2 text-right">
        {currentStage + 1}/8
        <div className="group-hover:opacity-100 absolute opacity-0 top-full right-0 mt-1 rounded bg-white text-left">
          <p>A session is typically broken into 8 intervals.</p>
          <p>1. Focus Interval</p>
          <p>2. Short Break</p>
          <p>3. Focus Interval</p>
          <p>4. Short Break</p>
          <p>5. Focus Interval</p>
          <p>6. Short Break</p>
          <p>7. Focus Interval</p>
          <p>8. Long Break</p>
        </div>
      </div>
    </div>
  );
};
