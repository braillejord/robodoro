import { SettingsIcon } from "../icons/SettingsIcon";
import { NavBarAvatar } from "./NavBarAvatar";

export const NavBar = ({ children }) => {
  return (
    <div className="h-max py-2 bg-violet-200">
      <div className="flex justify-between items-center max-w-xl m-auto">
        <p className="font-bold">Robodoro</p>
        <div className="flex items-center">
          <SettingsIcon />
          <NavBarAvatar />
        </div>
      </div>
    </div>
  );
};
