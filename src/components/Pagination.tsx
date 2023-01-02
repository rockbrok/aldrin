import { FC } from "react";
import { QueryProps } from "../interfaces/Props";

const Pagination: FC<QueryProps> = ({ state, launches, setData }) => (
  <nav className="flex flex-row items-center justify-center my-8">
    {Array.from({ length: launches.count }, (_, index: number) => (
      <button
        type="button"
        aria-label={`Page ${index + 1}`}
        tabIndex={0}
        key={index + 1}
        disabled={state.activePage === (index + 1)}
        className={`flex flex-row items-center justify-center 
        bg-white mx-2 select-none text-md 
        cursor-pointer w-8 h-8 rounded-full 
        ${state.activePage === (index + 1) ? "bg-black text-white cursor-default" : "hover:bg-grey"}`}
        onClick={() =>
          setData({
            payload: index + 1,
            name: "activePage",
          })}
      >
        {index + 1}
      </button>
    ))}
  </nav>
);

export { Pagination }