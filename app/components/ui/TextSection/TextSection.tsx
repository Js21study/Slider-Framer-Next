import { FC } from "react";

interface TextSectionProps {
  title: string;
  description: string;
}

export const TextSection: FC<TextSectionProps> = ({ title, description }) => {
  return (
    <div className="absolute  lg:h-fit bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-black/50 to-black bg-opacity-50 text-white/80 p-4 md:p-6">
      <h2 className=" text-[50px] md:text-[100px] lg:text-[150px] font-semibold">
        {title}
      </h2>
      <p className="text-sm sm:text-[14px] md:text-[18px] md:w-4/5 lg:w-3/5 lg:text-3xl font-extralight pb-10">
        {description}
      </p>
    </div>
  );
};
