import { FC } from "react";
import { PaginationProps } from "../interfaces/Props";
import { GetLaunches } from '../queries/GetLaunches';

const Pagination: FC<PaginationProps> = ({ state, launches, setData }) => {
  return (
    <nav className="flex flex-row items-center justify-center my-8">
      {Array.from({ length: launches.count }, (_, index) =>
        <Item
          key={index + 1}
          i={index + 1}
          // client={launches.client}
          setData={setData}
          activePage={state.activePage}
        />)}
    </nav>
  );
};

const Item = ({ i, setData, activePage, client }: any) => (
  <div
    key={i}
    className={`flex flex-row items-center justify-center 
      bg-white mx-2 select-none text-md 
      cursor-pointer w-8 h-8 rounded-full 
      ${activePage === i ? "bg-black text-white" : "hover:bg-grey"}
    `}
    // Prefetching not working ??
    // onMouseOver={() =>
    //   client.query({
    //     query: GetLaunches,
    //     variables: { offset: i * 12 }
    //   })
    // }
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