import { Section } from "../components/Section";
import { RobotPreview } from "../components/RobotPreview";

export const RobotHome = () => {
  return (
    <>
      <div className="flex justify-evenly">
        <div className="bg-white my-5 w-80 bg-opacity-30">
          <p>BLANK SPACE</p>
        </div>

        <Section>
          {/* make this into a component (robot navbar or something) */}
          <div className="flex justify-between">
            <div className="flex">
              <p>Sort</p>
              <p>Type</p>
            </div>
            <p>Search</p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <RobotPreview />
            <RobotPreview />
            <RobotPreview />
            <RobotPreview />
            <RobotPreview />
            <RobotPreview />
            <RobotPreview />
          </div>
        </Section>

        <div className="bg-white my-5 w-80 bg-opacity-30 p-2 text-center">
          <div className="bg-white ">Robot Name</div>
          <RobotPreview />
          <div className="bg-white ">Personality</div>
          <div className="bg-white ">Birthday</div>
          <div className="bg-white ">Ancestor</div>
          <div className="bg-white ">Delete Robot</div>
        </div>
      </div>
    </>
  );
};
