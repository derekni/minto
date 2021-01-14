import React, { useContext, useState } from "react";
import PopupContext from "../contexts/PopupContext";
import { Reward } from "../types";
import EditableShopItem from "./EditableShopItem";
import Modal from "./Modal";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

type PopupState =
  | null
  | { type: "confirmation"; reward: Reward }
  | { type: "error"; reward: Reward };

const ShopTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [popupState, setPopupState] = useState<PopupState>(null);
  const { rewards, updateRewards, mints, updateMints } = useContext(
    PopupContext
  );

  const addReward = () => {
    if (process.env.NODE_ENV === "development") {
      updateRewards([
        ...rewards,
        {
          id: Math.floor(Math.random() * 1000),
          name: "New reward",
          price: 10,
        },
      ]);
      return;
    }
    chrome.storage.sync.get({ nextRewardId: 0 }, ({ nextRewardId }) => {
      updateRewards([
        ...rewards,
        { id: nextRewardId, name: "New reward", price: 10 },
      ]);
      chrome.storage.sync.set({ nextRewardId: nextRewardId + 1 });
    });
  };

  const reorder = (list: Reward[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newRewards = reorder(
      rewards,
      result.source.index,
      result.destination.index
    );

    updateRewards(newRewards);
  };

  if (isEditing) {
    return (
      <div className="flex flex-col flex-1 bg-green-50 p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="rewards">
            {(provided) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <ul>
                    {rewards.map((reward, index) => {
                      return (
                        <EditableShopItem
                          key={reward.id}
                          reward={reward}
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
          onClick={addReward}
        >
          Add new reward
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
    <div className="flex flex-col flex-1 bg-green-50 p-4">
      <ul>
        {rewards.map((reward) => {
          return (
            <li key={reward.id}>
              <button
                className="flex justify-between mb-2 py-1 px-2 rounded w-full bg-white shadow hover:shadow-lg transition-all duration-200"
                onClick={() => {
                  if (mints < reward.price) {
                    setPopupState({ type: "error", reward });
                  } else {
                    setPopupState({ type: "confirmation", reward });
                  }
                }}
              >
                <div className="flex-1 truncate mr-2 text-left">
                  {reward.name}
                </div>
                <div>{reward.price}</div>
              </button>
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
        Edit shop
      </button>
      {popupState?.type === "confirmation" && (
        <Modal>
          <div>
            <div className="mb-4">
              Are you sure you want to purchase {popupState.reward.name} for
              {popupState.reward.price} mints?
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
                  setPopupState(null);
                  updateMints(mints - popupState.reward.price);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
      {popupState?.type === "error" && (
        <Modal>
          <div className="flex flex-col items-center">
            <div className="mb-4">
              You need {popupState.reward.price} mints for{" "}
              {popupState.reward.name}.
            </div>
            <button
              onClick={() => setPopupState(null)}
              className="bg-gray-500 text-white p-1 rounded w-1/2"
            >
              Okay
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShopTab;
