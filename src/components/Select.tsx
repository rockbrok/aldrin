import { FC, useState } from 'react';
import { SelectProps, SearchProps } from '../interfaces/Props';
import { Sort } from "@mui/icons-material";
import OutsideClickHandler from "react-outside-click-handler";
// Hooks
import { handleSelect } from '../hooks/useSelect';

const Select: FC<SelectProps & SearchProps> = ({ state, stateKey, label, items, setData, searchParams, setSearchParams }) => {
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
            <div className="absolute flex ml-10 mt-3 select-none capitalize">
              {label}
            </div>
            <Items
              items={items}
              state={state}
              stateKey={stateKey}
              setData={setData}
              showItems={showItems}
              label={label}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

const Items: FC<SelectProps & SearchProps> = ({ items, state, stateKey, setData, showItems, label, searchParams, setSearchParams }) => (
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
        onClick={item.value === stateKey ? undefined : () =>
          handleSelect({ state, setData, label, item, searchParams, setSearchParams })
        }
        className={`relative select-none bg-grey w-full
          border-b-[1px] border-grey rounded-sm text-left
          p-2 pl-10 cursor-pointer 
          ${item.value == stateKey ? "cursor-default" : "hover:bg-black hover:text-white"}`}
      >
        {item.label}
      </button>
    ))}
  </div>
);

export { Select }