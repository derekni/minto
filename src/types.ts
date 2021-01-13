export type WorkState =
  | { status: "idle" }
  | { status: "working"; workEndTime: number }
  | { status: "paused"; pausedTimeLeft: number };

export type Reward = {
  id: number;
  name: string;
  price: number;
};
