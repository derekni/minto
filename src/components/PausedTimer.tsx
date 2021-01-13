import { formatCountdownTime } from "../lib/utils";

type Props = { pausedTimeLeft: number };

const PausedTimer = ({ pausedTimeLeft }: Props) => {
  return (
    <div className="text-4xl mb-2 font-mono">
      {formatCountdownTime(pausedTimeLeft)}
    </div>
  );
};

export default PausedTimer;
