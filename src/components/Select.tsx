import { FC, useState } from 'react';
import { SelectProps, SearchProps } from '../interfaces/Props';
import OutsideClickHandler from "react-outside-click-handler";
import { Sort } from "@mui/icons-material";

const Select: FC<SelectProps & SearchProps> = ({ state, id, items, setData, helper, tagsList, searchParams, setSearchParams }) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className="flex flex-col gap-0.5">
      <OutsideClickHandler
        onOutsideClick={() => {
          setShowItems(false);
        }}
      >
        <div className="relative cursor-pointer 
          flex flex-row items-center 
          bg-grey rounded-sm 
          h-11 w-full py-1"
        >
          <div className="absolute top-0 
            h-11 w-full 
            flex flex-col justify-items-center
            bg-grey p-0"
            id="select"
            onClick={() => setShowItems(!showItems)}>
            <Sort
              className="ml-2 mt-3 select-none"
              style={{ fontSize: "20px" }}
            />
            <div className="absolute flex ml-10 mt-3 select-none">
              {helper}
            </div>
            <Items
              items={items}
              state={state}
              setData={setData}
              showItems={showItems}
              tagsList={tagsList}
              id={id}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

const Items: FC<SelectProps & SearchProps> = ({ items, state, setData, showItems, tagsList, id, searchParams, setSearchParams }) => {

  const spliceArray = () => {
    tagsList.map((item: { state: string; }, index: number) => {
      if (item.state == id) {
        tagsList.splice(index, 1);
      }
    });
  }

  const handleChange = (item: { value: string; label: string; }) => {
    setData({
      payload: { value: item.value, label: item.label },
      name: id,
    });
    setData({
      payload: 1,
      name: "activePage",
    });
    spliceArray();
    tagsList.push({ value: item.label, state: id });
    searchParams.set(id, item.value);
    setSearchParams(searchParams);
  }

  return (
    <div
      style={{ display: showItems ? "block" : "none" }}
      className="absolute w-full h-[201px] 
      overflow-auto cursor-default
      border-2 border-b-[1px] border-grey rounded-sm
      mt-11 z-20 bg-grey"
    >
      {items.map((item: { label: string, value: string }, index: number) => (
        <div
          key={index}
          onClick={item.value === state.value ? undefined : () => handleChange(item)}
          className={`relative select-none bg-grey
          border-b-[1px] border-grey rounded-sm 
          p-2 pl-9 cursor-pointer 
          ${item.value == state.value ? "cursor-default" : "hover:bg-black hover:text-white"}`}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
};

export { Select }