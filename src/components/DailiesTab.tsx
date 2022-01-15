import React, { useContext, useEffect, useState } from "react";
import PopupContext from "../contexts/PopupContext";
import { Daily, Reward } from "../types";
import EditableListItem from "./EditableListItem";
import Modal from "./Modal";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

type PopupState = null | { type: "confirmation"; daily: Daily };

const DailiesTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [popupState, setPopupState] = useState<PopupState>(null);
  const { dailies, updateDailies, mints, updateMints } =
    useContext(PopupContext);

  const addDaily = () => {
    if (process.env.NODE_ENV === "development") {
      updateDailies([
        ...dailies,
        {
          id: Math.floor(Math.random() * 1_000),
          name: "New daily",
          value: 10,
          completed: false,
        },
      ]);
      return;
    }
    chrome.storage.sync.get({ nextDailyId: 0 }, ({ nextDailyId }) => {
      updateDailies([
        ...dailies,
        { id: nextDailyId, name: "New daily", value: 25, completed: false },
      ]);
      chrome.storage.sync.set({ nextDailyId: nextDailyId + 1 });
    });
  };

  const completeDaily = (dailyId: number) => {
    updateDailies(
      dailies.map((_daily) => {
        if (_daily.id !== dailyId) {
          return _daily;
        } else {
          return { ..._daily, completed: true };
        }
      })
    );
  };

  const reorder = (list: Daily[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newDailies = reorder(
      dailies,
      result.source.index,
      result.destination.index
    );

    updateDailies(newDailies);
  };

  if (isEditing) {
    return (
      <div className="flex flex-col flex-1 bg-gray-50 p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dailies">
            {(provided) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <ul>
                    {dailies.map((daily, index) => {
                      return (
                        <EditableListItem
                          key={daily.id}
                          type={"daily"}
                          item={daily}
                          index={index}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
        <button
          className="border-gray-500 border-dashed border-2 p-1 rounded mb-2"
          onClick={addDaily}
        >
          Add new daily
        </button>
        <button
          className="bg-green-500 font-semibold text-white p-1 rounded shadow hover:shadow-lg transition-all duration-200"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50 p-4">
      <ul>
        {dailies.map((daily) => {
          return (
            <li key={daily.id}>
              {!daily.completed && (
                <button
                  className="flex justify-between mb-2 py-1 px-2 rounded w-full bg-white shadow hover:shadow-lg transition-all duration-200"
                  onClick={() => {
                    setPopupState({ type: "confirmation", daily });
                  }}
                >
                  <div className="flex-1 truncate mr-2 text-left">
                    {daily.name}
                  </div>
                  {/* <div>{daily.value}</div> */}
                </button>
              )}
              {daily.completed && (
                <button
                  className="flex justify-between mb-2 py-1 px-2 rounded w-full bg-white shadow"
                  disabled={true}
                >
                  <div className="flex-1 truncate mr-2 text-left line-through text-gray-500">
                    {daily.name}
                  </div>
                  {/* <div>{daily.value}</div> */}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <button
        className="bg-gray-500 font-semibold text-white p-1 rounded shadow hover:shadow-lg transition-all duration-200"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Edit dailies
      </button>
      {popupState?.type === "confirmation" && (
        <Modal>
          <div>
            <div className="mb-4">
              Do you want to complete {popupState.daily.name} for{" "}
              {popupState.daily.value} mints?
            </div>
            <div className="flex">
              <button
                className="bg-gray-500 text-white p-1 rounded flex-1 mr-1"
                onClick={() => setPopupState(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white p-1 rounded flex-1 ml-1"
                onClick={() => {
                  completeDaily(popupState.daily.id);
                  setPopupState(null);
                  updateMints(mints + popupState.daily.value);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DailiesTab;
