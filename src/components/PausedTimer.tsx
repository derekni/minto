import { formatCountdownTime } from "../lib/utils";

type Props = { pausedTimeLeft: number };

const PausedTimer = ({ pausedTimeLeft }: Props) => {
  return (
    <div className="text-5xl mb-4 font-mono">
      {formatCountdownTime(pausedTimeLeft)}
    </div>
  );
};

export default PausedTimer;
