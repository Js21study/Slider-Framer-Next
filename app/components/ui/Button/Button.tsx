import React, { FC } from "react";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  styles?: string;
}

export const Button: FC<Props> = ({ onClick, children, styles }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 w-9 md:w-12 flex justify-center items-center  -translate-y-1/2 cursor-pointer z-30 ${styles}`}
      aria-label="button"
    >
      {children}
    </button>
  );
};
