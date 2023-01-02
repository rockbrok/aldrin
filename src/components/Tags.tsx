import { FC } from 'react';
import { SearchProps, TagProps } from '../interfaces/Props';
// components
import { ClearButton } from './ClearButton';

const Tags: FC<TagProps & SearchProps> = ({ tagsList, setData, searchParams, setSearchParams }) => (
  <div className="grid col-span-3">
    <div className="flex flex-row gap-4">
      {tagsList.map((item: { value: string | number | null, label: string }, index: number) => (
        <div className="flex flex-row items-center 
          h-9 w-fit cursor-default
          bg-grey rounded-sm gap-4 pl-3"
          key={index}>
          <span
            className={item.label === "orbit" ? "capitalize" : ""}
            id={item.label}
          >
            {String(item.value).replaceAll('-', ' ')}
          </span>
          <ClearButton
            icon="Cancel"
            setData={setData}
            payload=""
            label={item.label}
            func={() => {
              tagsList.splice(index, 1);
              searchParams.delete(item.label);
              setSearchParams(searchParams);
            }}
          />
        </div>
      ))}
    </div>
  </div>
)

export { Tags }