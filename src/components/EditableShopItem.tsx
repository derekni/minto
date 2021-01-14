import React, { useContext, useEffect, useState } from "react";
import PopupContext from "../contexts/PopupContext";
import DragIcon from "../icons/DragIcon";
import TrashIcon from "../icons/TrashIcon";
import { Reward } from "../types";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "next/app";

type Props = {
  reward: Reward;
  index: number;
};

const EditableShopItem = ({ reward, index }: Props) => {
  const { rewards, updateRewards } = useContext(PopupContext);
  const [rewardName, setRewardName] = useState(reward.name);
  const [rewardPrice, setRewardPrice] = useState(reward.price);

  useEffect(() => {
    updateRewards(
      rewards.map((_reward) => {
        if (_reward.id !== reward.id) {
          return _reward;
        }
        return { ...reward, name: rewardName, price: rewardPrice };
      })
    );
  }, [rewardName, rewardPrice]);

  const deleteReward = () => {
    updateRewards(rewards.filter((_reward) => _reward.id !== reward.id));
  };

  return (
    <Draggable draggableId={String(reward.id)} index={index}>
      {(provided) => {
        return (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <li className="flex items-center pb-2">
              <div className="w-4 mr-2" {...provided.dragHandleProps}>
                <DragIcon />
              </div>
              <input
                className="flex-1 mr-2"
                value={rewardName}
                onChange={(e) => setRewardName(e.target.value)}
              />
              <input
                className="w-8 mr-2 text-right"
                value={rewardPrice}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (Number.isInteger(value)) {
                    setRewardPrice(value);
                  }
                }}
              />
              <button className="w-4" onClick={deleteReward}>
                <TrashIcon />
              </button>
            </li>
          </div>
        );
      }}
    </Draggable>
  );
};

export default EditableShopItem;
