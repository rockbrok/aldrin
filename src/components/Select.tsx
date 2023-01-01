import { FC, useState } from 'react';
import { SelectProps, SearchProps } from '../interfaces/Props';
import OutsideClickHandler from "react-outside-click-handler";
import { Sort } from "@mui/icons-material";

const Select: FC<SelectProps & SearchProps> = ({ state, label, items, setData, helper, tagsList, searchParams, setSearchParams }) => {
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
          <button className="absolute top-0 
            h-11 w-full 
            flex flex-col justify-items-center
            bg-grey p-0"
            type="button"
            role="button"
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls={label}
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
              label={label}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </button>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

const Items: FC<SelectProps & SearchProps> = ({ items, state, setData, showItems, tagsList, label, searchParams, setSearchParams }) => {

  const spliceArray = () => {
    tagsList.map((item: any, index: number) => {
      if (item.label == label) {
        tagsList.splice(index, 1);
      }
    });
  }

  const handleChange = (item: { value: string; label: string; }) => {
    setData({
      payload: item.value,
      name: label,
    });
    setData({
      payload: 1,
      name: "activePage",
    });
    spliceArray();
    tagsList.push({ value: item.value, label });
    searchParams.set(label, item.value);
    setSearchParams(searchParams);
  }

  return (
    <div
      id={label}
      style={{ display: showItems ? "block" : "none" }}
      className="absolute w-full h-[201px] 
      overflow-auto cursor-default
      border-2 border-b-[1px] border-grey rounded-sm
      mt-11 z-20 bg-grey"
    >
      {items.map((item: { label: string, value: string }, index: number) => (
        <button
          type="button"
          key={index}
          tabIndex={0}
          onClick={item.value === state ? undefined : () => handleChange(item)}
          className={`relative select-none bg-grey w-full
          border-b-[1px] border-grey rounded-sm text-left
          p-2 pl-10 cursor-pointer 
          ${item.value == state ? "cursor-default" : "hover:bg-black hover:text-white"}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
};

export { Select }