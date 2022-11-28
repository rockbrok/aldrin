import { FC } from 'react';
import { SearchProps, TagProps } from '../interfaces/Props';
// components
import { ClearButton } from './ClearButton';

const Tags: FC<TagProps & SearchProps> = ({ tagsList, setData, searchParams, setSearchParams }) => (
  <div className="grid row-start-3 col-span-3">
    <div className="flex flex-row gap-4">
      {tagsList.map((item: any, index: number) => (
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
            func={() => {
              tagsList.splice(index, 1);
              searchParams.delete(item.state);
              setSearchParams(searchParams);
            }}
          />
        </div>
      ))}
    </div>
  </div>
)

export { Tags }