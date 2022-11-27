import { FC, useState } from 'react';
import { SelectProps } from '../interfaces/Props';
import OutsideClickHandler from "react-outside-click-handler";
import { Sort } from "@mui/icons-material";
// components
import { ClearButton } from './ClearButton';

const Select: FC<SelectProps> = ({ state, id, items, setData, helper, tagsList }) => {
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
            {items !== undefined ?
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
                    onClick={item.value !== state.value ? () => {
                      setData({
                        payload: { value: item.value, label: item.label },
                        name: id,
                      });
                      setData({
                        payload: 1,
                        name: "activePage",
                      });
                      setShowItems(false);
                      tagsList.map((item, index) => {
                        if (item.state == id) {
                          tagsList.splice(index, 1);
                        }
                      });
                      tagsList.push({ value: item.label, state: id });
                    } : undefined}
                    className={`relative select-none bg-grey
                      border-b-[1px] border-grey rounded-sm 
                      p-2 pl-9 cursor-pointer ${item.value == state.value ? "cursor-default" : "hover:bg-black hover:text-white"}`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
              : null}
          </div>
        </div>
      </OutsideClickHandler>
      {/* {state.value !== "" ?
        <Tag
          state={state}
          setData={setData}
          id={id}
        />
        : null} */}
    </div>
  );
};

// const Tag: FC<SelectProps> = ({ state, setData, id }) => {
//   return (
//     <div className="flex flex-row items-center 
//     relative h-9 w-fit
//     bg-grey rounded-sm gap-4 pl-3">
//       <span>{state.label}</span>
//       <ClearButton
//         icon="Cancel"
//         setData={setData}
//         payload={{ value: "", label: "All" }}
//         name={id}
//       />
//     </div>
//   )
// }

export { Select }