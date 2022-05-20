export type WorkState =
  | { status: "idle" }
  | { status: "working"; workEndTime: number }
  | { status: "paused"; pausedTimeLeft: number }
  | { status: "pomo-work"; workEndTime: number; sessionNumber: number }
  | { status: "pomo-break"; breakEndTime: number; breakNumber: number }
  | {
      status: "pomo-pause";
      pauseTimeLeft: number;
      type: "work" | "break";
      number: number;
    };

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
