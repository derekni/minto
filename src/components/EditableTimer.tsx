import { useContext, useState } from "react";
import PopupContext from "../contexts/PopupContext";

const EditableTimer = () => {
  const { workLength, updateWorkLength } = useContext(PopupContext);

  const [minutesText, setMinutesText] = useState(
    String(Math.floor(workLength / 60_000)).padStart(2, "0")
  );
  const [secondsText, setSecondsText] = useState(
    String(Math.floor(workLength / 1_000) % 60).padStart(2, "0")
  );
  const [errorText, setErrorText] = useState("");

  const verifyAndSave = () => {
    const minutes = Number(minutesText);
    const seconds = Number(secondsText);

    if (Number.isInteger(minutes) && Number.isInteger(seconds)) {
      setErrorText("");
      updateWorkLength((minutes * 60 + seconds) * 1_000);
      return;
    }
    setErrorText("Invalid values for minutes or seconds");
  };

  return (
    <div>
      <div className="flex items-center mb-4 text-4xl font-mono">
        <input
          className="text-right w-28 rounded bg-transparent outline-none"
          type="text"
          maxLength={3}
          value={minutesText}
          onChange={(e) => {
            setMinutesText(e.target.value);
          }}
          onBlur={verifyAndSave}
        />
        :
        <input
          className="w-20 rounded mr-8 bg-transparent outline-none"
          type="text"
          maxLength={2}
          value={secondsText}
          onChange={(e) => {
            setSecondsText(e.target.value);
          }}
          onBlur={verifyAndSave}
        />
      </div>
      {errorText && <div>{errorText}</div>}
    </div>
  );
};

export default EditableTimer;
