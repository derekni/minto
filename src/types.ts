export type WorkState =
  | { status: "idle" }
  | { status: "working"; workEndTime: number }
  | { status: "paused"; pausedTimeLeft: number };

export type Reward = {
  id: number;
  name: string;
  price: number;
};

export type Todo = {
  id: number;
  name: string;
  value: number;
};

export type Daily = {
  id: number;
  name: string;
  value: number;
  completed: boolean;
};

export type ItemType = "reward" | "todo" | "daily";
