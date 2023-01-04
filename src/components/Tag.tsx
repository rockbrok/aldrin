import { FC } from 'react';
import { SearchProps } from '../interfaces/Props';
// Components
import { ClearButton } from './ClearButton';
// Hooks
import { removeKebab } from '../hooks/useRemoveKebab';
import { renderTags } from '../hooks/useTags';

const Tag: FC<SearchProps> = ({ state, setData, searchParams, setSearchParams }) => (
  <div className="grid col-span-3">
    <div className="flex flex-row gap-4">
      {renderTags(state).map((item: { value: string | number | null, label: string }, index: number) => (
        <div className="flex flex-row items-center 
          h-9 w-fit cursor-default
          bg-grey rounded-sm gap-4 pl-3"
          key={index}>
          <span
            className={item.label === "orbit" ? "capitalize" : ""}
            id={item.label}
          >
            {removeKebab(item.value)}
          </span>
          <ClearButton
            icon="Cancel"
            setData={setData}
            payload=""
            label={item.label}
            func={() => {
              state.tags.splice(index, 1);
              searchParams.delete(item.label);
              setSearchParams(searchParams);
            }}
          />
        </div>
      ))}
    </div>
  </div>
)

export { Tag }