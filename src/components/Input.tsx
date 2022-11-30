import { FC, useState } from 'react';
import { QueryProps, SearchProps } from '../interfaces/Props';
import { Search } from "@mui/icons-material";
// components
import { ClearButton } from './ClearButton';

const Input: FC<QueryProps & SearchProps> = ({ state, setData, searchParams, setSearchParams }) => {
  const [query, setQuery] = useState("");

  const inputFocus = () => {
    const input = document.querySelector('input');
    input?.focus();
  }

  const handleClick = (query: string) => {
    // const REGEX = /^[a-zA-Z0-9]+$/;
    setData({
      payload: query,
      name: "query",
    })
    searchParams.set("query", query);
    setSearchParams(searchParams);
  }

  return (
    <section className="grid grid-cols-4 grid-rows-1 gap-4 mt-10">
      <div
        className="relative col-span-3 flex flex-row"
        onClick={inputFocus}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick(query)
          }}
          className="flex flex-row items-center h-[46px] w-full bg-grey rounded-sm py-1 cursor-default">
          <input
            type="text"
            role="search"
            spellCheck="false"
            className="relative placeholder:text-black w-full bg-transparent rounded-sm m-3 focus:outline-none cursor-text select-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.length !== 0 ?
            <div className="flex flex-row h-full mr-12 items-center">
              <ClearButton
                icon="Clear"
                setData={setData}
                payload=""
                className="h-full w-12 items-center justify-center mr-0"
                name="query"
                func={() => {
                  setQuery("");
                  searchParams.delete("query");
                  setSearchParams(searchParams);
                }}
              />
              <div className="h-3/5 bg-darkgrey w-[1px]" />
            </div>
            : null}
          <button
            className="absolute right-0 h-full w-12 items-center justify-center m-0"
            title="Search"
            role="submit"
            onClick={() => handleClick(query)}
          >
            <Search
              style={{ fontSize: "20px", marginTop: "-1px" }}
            />
          </button>
        </form>
      </div>
    </section>
  );
}

export { Input }