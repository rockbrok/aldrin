import { FC } from 'react';
import { TagProps } from '../interfaces/Props';
// components
import { ClearButton } from './ClearButton';

const Tag: FC<TagProps> = ({ tagsList, setData }) => {
  return (
    <div className="grid row-start-3 col-span-3">
      <div className="flex flex-row gap-4">
        {tagsList.length > 0 ? tagsList.map((item: any, index: number) => {
          console.log(item.value);
          console.log(item.state);
          return (
            <div className="flex flex-row items-center 
              h-9 w-fit
              bg-grey rounded-sm gap-4 pl-3"
              key={index}>
              <span>{item.value}</span>
              <ClearButton
                icon="Cancel"
                setData={setData}
                payload={{ value: "", label: "All" }}
                name={item.state}
                func={() => tagsList.splice(index, 1)}
              />
            </div>
          )
        }) : null}
      </div>
    </div>
  )
}

export { Tag }