export const RobotPreview = () => {
  return (
    <button onClick={() => console.log("clicked")}>
      <img
        className="border border-white rounded"
        src="https://robohash.org/75.169.157.107.png"
        alt="robot"
      />
    </button>
  );
};
