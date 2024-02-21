import React from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { db } from "../database/db";

export const SettingsModal = ({
  onClose,
  focusTime,
  shortBreakTime,
  longBreakTime,
  autostartFocus,
  autostartBreaks,
}) => {
  const handleTimeChange = async (field, value) => {
    await db.timer.update(1, { [field]: value });
  };

  const timerSettings = [
    {
      label: "Focus",
      field: "focusTime",
      value: focusTime,
    },
    {
      label: "Short Break",
      field: "shortBreakTime",
      value: shortBreakTime,
    },
    {
      label: "Long Break",
      field: "longBreakTime",
      value: longBreakTime,
    },
  ];

  const handleAutostart = async (field, value) => {
    await db.timer.update(1, { [field]: value });
  };

  const handleDefaultTimes = async () => {
    await db.timer.update(1, {
      focusTime: 15,
      shortBreakTime: 3,
      longBreakTime: 9,
    });
  };

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
                onChange={(e) =>
                  handleTimeChange(setting.field, e.target.value)
                }
              />
            </div>
          ))}
          <button onClick={handleDefaultTimes}>Reset to default</button>
        </div>

        <hr />

        {/* Autostart Settings */}
        <p>Autostart Settings</p>
        <div>
          <label>Autostart Focus Time</label>
          <input
            type="checkbox"
            checked={autostartFocus}
            onChange={(e) =>
              handleAutostart("autostartFocus", e.target.checked)
            }
          />
        </div>

        <div></div>
        <label>Autostart Break Time</label>
        <input
          type="checkbox"
          checked={autostartBreaks}
          onChange={(e) => handleAutostart("autostartBreaks", e.target.checked)}
        />
      </div>
    </div>
  );
};
