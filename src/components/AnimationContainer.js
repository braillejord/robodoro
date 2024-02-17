import { helix } from "ldrs";

export const AnimationContainer = () => {
  helix.register();

  return (
    <div className="h-full">
      <l-helix size="100" speed="2.5" color="black"></l-helix>
    </div>
  );
};
