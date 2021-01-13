import { useContext } from "react";
import PopupContext from "../contexts/PopupContext";
import { WorkState } from "../types";
import ActiveTimer from "./ActiveTimer";
import EditableTimer from "./EditableTimer";
import PausedTimer from "./PausedTimer";

const WorkTab = () => {
  const { workState, updateWorkState, workLength } = useContext(PopupContext);

  const stopWork = () => {
    const updatedWorkState: WorkState = { status: "idle" };
    updateWorkState(updatedWorkState);

    if (process.env.NODE_ENV === "development") {
      return;
    }
    chrome.alarms.clearAll();
  };

  const pauseWork = () => {
    if (workState.status !== "working") return;
    const updatedPausedTimeLeft = workState.workEndTime - Date.now();
    const updatedWorkState: WorkState = {
      status: "paused",
      pausedTimeLeft: updatedPausedTimeLeft,
    };
    updateWorkState(updatedWorkState);

    if (process.env.NODE_ENV === "development") {
      return;
    }
    chrome.alarms.clearAll();
  };

  const startWork = () => {
    let workEndTime: number | null = null;
    if (workState.status === "idle") {
      workEndTime = Date.now() + workLength;
    } else if (workState.status === "paused") {
      workEndTime = Date.now() + workState.pausedTimeLeft;
    }
    if (workEndTime === null) {
      throw new Error("tried to start work when not idle or paused");
    }

    const updatedWorkState: WorkState = { status: "working", workEndTime };
    updateWorkState(updatedWorkState);

    if (process.env.NODE_ENV === "development") {
      return;
    }
    const alarmName = "workFor" + Math.floor(workLength / 60_000);
    chrome.alarms.create(alarmName, { when: workEndTime });

    window.close();
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-green-50">
      {workState.status === "idle" && (
        <>
          <EditableTimer />
          <button
            className="bg-green-400 text-white font-semibold py-1 shadow hover:shadow-lg transition-all duration-200 w-24 rounded"
            onClick={startWork}
          >
            Work
          </button>
        </>
      )}
      {workState.status === "working" && (
        <>
          <ActiveTimer workEndTime={workState.workEndTime} />
          <button
            className="bg-gray-500 text-white font-semibold w-24 py-1 shadow hover:shadow-lg transition-all duration-200 rounded mb-1"
            onClick={pauseWork}
          >
            Pause
          </button>
          <button
            className="bg-red-500 text-white font-semibold w-24 py-1 shadow hover:shadow-lg transition-all duration-200 rounded"
            onClick={stopWork}
          >
            Stop
          </button>
        </>
      )}
      {workState.status === "paused" && (
        <>
          <PausedTimer pausedTimeLeft={workState.pausedTimeLeft} />
          <button
            className="bg-green-500 text-white font-semibold w-24 py-1 shadow hover:shadow-lg transition-all duration-200 rounded mb-1"
            onClick={startWork}
          >
            Resume
          </button>
          <button
            className="bg-red-500 text-white font-semibold w-24 py-1 shadow hover:shadow-lg transition-all duration-200 rounded"
            onClick={stopWork}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default WorkTab;
