import { Quote, Star } from "lucide-react";
import React from "react";

const TestimonialCard = ({ stars, content, profession }) => {
  return (
    <div className="min-w-[20rem] h-fit border p-5 flex flex-col gap-5 rounded-2xl shadow-xs hover:shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex gap-3">
        {new Array(stars).fill(0).map((_, idx) => (
          <Star
            key={`${idx}${stars}`}
            size={20}
            fill="#f5ed00"
            color="#f5ed00"
            absoluteStrokeWidth
          />
        ))}
      </div>
      <div className="flex gap-3">
        <div className="h-full"><Quote size={30} strokeWidth={1} absoluteStrokeWidth /></div>
        <div className="h-full"><p className="italic">"{content}"</p></div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="w-7 h-7 rounded-full bg-black/50 dark:bg-white/50"></div>
        <div><p className="text-sm">{profession}</p></div>
      </div>
    </div>
  );
};

export default TestimonialCard;
