import React, { useContext, useEffect, useState } from "react";
import PopupContext from "../contexts/PopupContext";
import DragIcon from "../icons/DragIcon";
import TrashIcon from "../icons/TrashIcon";
import { Reward } from "../types";

type Props = {
  reward: Reward;
};

const EditableShopItem = ({ reward }: Props) => {
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
    <li className="flex items-center mb-2">
      <div className="w-4 mr-2" draggable="true">
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
  );
};

export default EditableShopItem;
