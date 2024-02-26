import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "../../icons/HomeIcon";
import { TimeIcon } from "../../icons/TimeIcon";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { NavBarAvatar } from "./NavBarAvatar";

export const NavBar = ({ onSettingsClick }) => {
  const navigate = useNavigate();
  const [iconState, setIconState] = React.useState("home");

  const handleIconClick = () => {
    if (iconState === "home") {
      navigate("/robots");
      setIconState("timer");
    } else {
      navigate("/");
      setIconState("home");
    }
  };

  return (
    <div className="h-max py-2 bg-white bg-opacity-30">
      <div className="flex justify-between items-center max-w-xl m-auto">
        <p className="font-bold">Robodoro</p>
        <div className="flex items-center gap-2">
          <button onClick={handleIconClick}>
            {iconState === "home" ? <HomeIcon /> : <TimeIcon />}
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
