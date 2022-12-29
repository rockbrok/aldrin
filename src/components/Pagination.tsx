import { FC } from "react";
import { QueryProps } from "../interfaces/Props";

const Pagination: FC<QueryProps> = ({ state, launches, setData }) => {
  if (launches.count > 1) return (
    <nav className="flex flex-row items-center justify-center my-8">
      {Array.from({ length: launches.count }, (_, index) =>
        <Item
          key={index + 1}
          i={index + 1}
          setData={setData}
          activePage={state.activePage}
        />)}
    </nav>
  );
  return <></>;
};

const Item = ({ i, setData, activePage }: any) => (
  <div
    key={i}
    className={`flex flex-row items-center justify-center 
      bg-white mx-2 select-none text-md 
      cursor-pointer w-8 h-8 rounded-full 
      ${activePage === i ? "bg-black text-white" : "hover:bg-grey"}
    `}
    onClick={() =>
      setData({
        payload: i,
        name: "activePage",
      })}
  >
    {i}
  </div >
)

export { Pagination }