import { useEffect, useState } from "react";
import { formatCountdownTime } from "../lib/utils";

type Props = { workEndTime: number };

const ActiveTimer = ({ workEndTime }: Props) => {
  const [msLeft, setMsLeft] = useState(Math.max(0, workEndTime - Date.now()));
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMsLeft(Math.max(0, workEndTime - Date.now()));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="text-4xl mb-2 font-mono">{formatCountdownTime(msLeft)}</div>
  );
};

export default ActiveTimer;
