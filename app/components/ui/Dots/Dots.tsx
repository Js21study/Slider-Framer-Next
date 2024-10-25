import { FC } from "react";

interface DotsProps {
  length: number;
  action: (index: number) => void;
  currentIndex: number;
}

export const Dots: FC<DotsProps> = ({ length, action, currentIndex }) => {
  return (
    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-50">
      {new Array(length).fill("").map((_, index) => (
        <button
          key={index}
          onClick={() => action(index)}
          className={`w-4 h-4  border-[2px] rounded-full transition-all duration-500 ${
            index === currentIndex ? "!w-10" : ""
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
