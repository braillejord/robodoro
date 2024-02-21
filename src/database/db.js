import Dexie from "dexie";

export const db = new Dexie("pomodoro");
db.version(1).stores({
  tasks: "++id, description, completed",
  timer:
    "id, stage, focusTime, shortBreakTime, longBreakTime, autostartFocus, autostartBreaks",
});

db.on("populate", () => {
  db.timer.add({
    id: 1,
    stage: 0,
    focusTime: 15,
    shortBreakTime: 3,
    longBreakTime: 9,
    autostartFocus: false,
    autostartBreaks: false,
  });
});
