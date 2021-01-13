type Props = {
  label: string;
  onClick: () => void;
  isActive: boolean;
  isDisabled: boolean;
};

const Tab = ({ label, onClick, isActive, isDisabled }: Props) => {
  let bgStyle = "bg-gray-400 hover:bg-gray-500";
  if (isActive) {
    bgStyle = "bg-green-400";
  }
  if (isDisabled) {
    bgStyle = "bg-gray-300 cursor-not-allowed";
  }

  return (
    <button
      className={`${bgStyle} flex-1 text-white font-semibold h-10`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default Tab;
