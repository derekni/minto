import { createContext } from "react";
import { Reward, WorkState } from "../types";

type PopupContextType = {
  workState: WorkState;
  updateWorkState: (workState: WorkState) => void;
  workLength: number;
  updateWorkLength: (workLength: number) => void;
  mints: number;
  updateMints: (mints: number) => void;
  rewards: Reward[];
  updateRewards: (rewards: Reward[]) => void;
};

const PopupContext = createContext<PopupContextType>({
  workState: { status: "idle" },
  updateWorkState: () => {},
  workLength: 25 * 60 * 1000,
  updateWorkLength: () => {},
  mints: 0,
  updateMints: () => {},
  rewards: [],
  updateRewards: () => {},
});

export default PopupContext;
