import { HomeIcon } from "../../icons/HomeIcon";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { NavBarAvatar } from "./NavBarAvatar";

export const NavBar = ({ onSettingsClick }) => {
  return (
    <div className="h-max py-2 bg-white bg-opacity-30">
      <div className="flex justify-between items-center max-w-xl m-auto">
        <p className="font-bold">Robodoro</p>
        <div className="flex items-center gap-2">
          <button>
            <HomeIcon />
          </button>
          <button onClick={onSettingsClick}>
            <SettingsIcon />
          </button>
          <button>
            <NavBarAvatar />
          </button>
        </div>
      </div>
    </div>
  );
};
