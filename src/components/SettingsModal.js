import React from "react";
import { CloseIcon } from "../icons/CloseIcon";

export const SettingsModal = ({
  onClose,
  focusTime,
  setFocusTime,
  shortBreakTime,
  setShortBreakTime,
  longBreakTime,
  setLongBreakTime,
}) => {
  const timerSettings = [
    { label: "Focus", value: focusTime, setter: setFocusTime },
    { label: "Short Break", value: shortBreakTime, setter: setShortBreakTime },
    { label: "Long Break", value: longBreakTime, setter: setLongBreakTime },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <button className="float-right" onClick={onClose}>
          <CloseIcon />
        </button>

        {/* Timer Settings */}
        <p>Timer Settings</p>
        <div className="flex flex-wrap">
          {timerSettings.map((setting, index) => (
            <div key={index} className="w-1/3">
              <p>{setting.label}</p>
              <input
                type="number"
                min="0"
                step="1"
                value={setting.value}
                onChange={(e) => setting.setter(e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Autostart Settings */}
        <p>Autostart Settings</p>
        <div>
          <label>Autostart Focus Time</label>
          <input type="checkbox" />
        </div>

        <div></div>
        <label>Autostart Break Time</label>
        <input type="checkbox" />
      </div>
    </div>
  );
};
