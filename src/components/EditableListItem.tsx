import React, { useContext, useEffect, useState } from "react";
import PopupContext from "../contexts/PopupContext";
import DragIcon from "../icons/DragIcon";
import TrashIcon from "../icons/TrashIcon";
import { Daily, ItemType, Reward, Todo } from "../types";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  type: ItemType;
  item: Reward | Todo | Daily;
  index: number;
};

const EditableListItem = ({ type, item, index }: Props) => {
  if (type == "reward") {
    return EditableReward(item as Reward, index);
  } else if (type == "todo") {
    return EditableTodo(item as Todo, index);
  } else if (type == "daily") {
    return EditableDaily(item as Daily, index);
  }
  return <>Editable List Item failed</>;
};

const EditableReward = (reward: Reward, index: number) => {
  const { rewards, updateRewards } = useContext(PopupContext);

  const updateRewardName = (rewardId: number, rewardName: string) => {
    updateRewards(
      rewards.map((reward) => {
        if (reward.id !== rewardId) {
          return reward;
        }
        return { ...reward, name: rewardName };
      })
    );
  };

  const updateRewardPrice = (rewardId: number, rewardPrice: number) => {
    updateRewards(
      rewards.map((reward) => {
        if (reward.id !== rewardId) {
          return reward;
        }
        return { ...reward, price: rewardPrice };
      })
    );
  };

  const deleteReward = () => {
    updateRewards(rewards.filter((_reward) => _reward.id !== reward.id));
  };

  return (
    <DraggableListItem
      draggableId={reward.id}
      index={index}
      name={reward.name}
      onNameChange={updateRewardName}
      value={reward.price}
      onValueChange={updateRewardPrice}
      onDelete={deleteReward}
    />
  );
};

const EditableTodo = (todo: Todo, index: number) => {
  const { todos, updateTodos } = useContext(PopupContext);

  const updateTodoName = (todoId: number, todoName: string) => {
    updateTodos(
      todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }
        return { ...todo, name: todoName };
      })
    );
  };

  const updateTodoValue = (todoId: number, todoValue: number) => {
    updateTodos(
      todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }
        return { ...todo, value: todoValue };
      })
    );
  };

  const deleteTodo = () => {
    updateTodos(todos.filter((_todo) => _todo.id !== todo.id));
  };

  return (
    <DraggableListItem
      draggableId={todo.id}
      index={index}
      name={todo.name}
      onNameChange={updateTodoName}
      value={todo.value}
      onValueChange={updateTodoValue}
      onDelete={deleteTodo}
    />
  );
};

const EditableDaily = (daily: Daily, index: number) => {
  const { dailies, updateDailies } = useContext(PopupContext);

  const updateDailyName = (dailyId: number, dailyName: string) => {
    updateDailies(
      dailies.map((daily) => {
        if (daily.id !== dailyId) {
          return daily;
        }
        return { ...daily, name: dailyName };
      })
    );
  };

  const updateDailyValue = (dailyId: number, dailyValue: number) => {
    updateDailies(
      dailies.map((daily) => {
        if (daily.id !== dailyId) {
          return daily;
        }
        return { ...daily, value: dailyValue };
      })
    );
  };

  const deleteDaily = () => {
    updateDailies(dailies.filter((_daily) => _daily.id !== daily.id));
  };

  return (
    <DraggableListItem
      draggableId={daily.id}
      index={index}
      name={daily.name}
      onNameChange={updateDailyName}
      value={daily.value}
      onValueChange={updateDailyValue}
      onDelete={deleteDaily}
    />
  );
};

type DraggableProps = {
  draggableId: number;
  index: number;
  name: string;
  onNameChange: (id: number, name: string) => void;
  value: number;
  onValueChange: (id: number, val: number) => void;
  onDelete: () => void;
};

const DraggableListItem = ({
  draggableId,
  index,
  name,
  onNameChange,
  value,
  onValueChange,
  onDelete,
}: DraggableProps) => {
  return (
    <Draggable draggableId={String(draggableId)} index={index}>
      {(provided) => {
        return (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <li className="flex items-center pb-2">
              <div className="w-4 mr-2" {...provided.dragHandleProps}>
                <DragIcon />
              </div>
              <input
                className="flex-1 mr-2 border border-gray-200 rounded-sm pl-0.5"
                value={name}
                onChange={(e) => onNameChange(draggableId, e.target.value)}
              />
              <input
                className="w-8 mr-2 text-right border border-gray-200 rounded-sm pr-0.5"
                value={value}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (Number.isInteger(value) && value >= 0) {
                    onValueChange(draggableId, value);
                  }
                }}
              />
              <button className="w-4" onClick={onDelete}>
                <TrashIcon />
              </button>
            </li>
          </div>
        );
      }}
    </Draggable>
  );
};

export default EditableListItem;
