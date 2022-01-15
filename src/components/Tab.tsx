import CalendarIcon from "../icons/CalendarIcon";
import ClipboardIcon from "../icons/ClipboardIcon";
import ClockIcon from "../icons/ClockIcon";
import { TabId } from "../pages/popup";

type Props = {
  id: TabId;
  label: string;
  onClick: () => void;
  isActive: boolean;
  isDisabled: boolean;
};

const getIcon = (id: TabId) => {
  switch (id) {
    case "work":
      return <ClockIcon />;
    case "todo":
      return <ClipboardIcon />;
    case "dailies":
      return <CalendarIcon />;
    default:
      return null;
  }
};

const Tab = ({ id, label, onClick, isActive, isDisabled }: Props) => {
  let bgStyle = "bg-gray-400 hover:bg-gray-500";
  if (isActive) {
    bgStyle = "bg-green-500";
  }
  if (isDisabled) {
    bgStyle = "bg-gray-300 cursor-not-allowed";
  }
  const icon = getIcon(id);

  return (
    <button
      className={`${bgStyle} flex-1 text-white font-semibold h-10 justify-center flex flex-col items-center`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isActive ? (
        <div className="flex flex-col items-center text-xs">
          {icon}
          {isActive && label}
        </div>
      ) : (
        icon
      )}
    </button>
  );
};

export default Tab;
