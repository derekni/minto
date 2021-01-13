import { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

const Modal = ({ children }: Props) => {
  return (
    <div className="flex absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 items-center justify-center">
      <div className="bg-white w-44 rounded p-4">{children}</div>
    </div>
  );
};

export default Modal;
