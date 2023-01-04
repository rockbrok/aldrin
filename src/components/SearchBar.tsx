import { FC, useState, useRef } from 'react';
import { SearchProps } from '../interfaces/Props';
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import OutsideClickHandler from "react-outside-click-handler";
// Components
import { ClearButton } from './ClearButton';
// Hooks
import { queryLaunches } from '../hooks/useLaunches';
import { handleClick, handleKeyDown } from '../hooks/useSearchBar';
import { getLaunchName } from '../hooks/useLaunchMap';
import { charMatch } from '../hooks/useCharMatch';

const SearchBar: FC<SearchProps> = ({ state, setData, searchParams, setSearchParams }) => {

  const [query, setQuery] = useState<string>(state.query ?? "");
  const [query2, setQuery2] = useState<string>(state.query.slice());

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const launches = queryLaunches();
  const navigate = useNavigate();
  const focusInput = () => inputRef.current != null && inputRef.current.focus();

  const getResults = (launchArray: { name: string; id: string; }[]) => {
    switch (true) {
      case launches.loading:
      case Boolean(launches.error):
      case launches.data.launchesPastResult.result.totalCount === 0:
      case dropdownIsOpen === false:
      case query.length === 0:
        return;
      default:
        launches.data.launchesPastResult.data.map((data: { mission_name: string; id: string; }) => {
          if (data.mission_name.toLowerCase().includes(query.toLowerCase())) {
            launchArray.push({ name: data.mission_name, id: data.id });
          }
        })
    }
  }

  const results = () => {
    const launchArray: { name: string; id: string; }[] = [];
    getResults(launchArray);
    return launchArray.slice(0, 6);
  }

  return (
    <section className={state.isIDRoute ? "col-start-3 col-span-2" :
      "col-span-4 grid grid-cols-4 grid-rows-1 gap-4 mt-10"}
    >
      <div
        className={`relative flex flex-row ${state.isIDRoute ? 'w-full' : 'col-span-3'}`}
        id="searchContainer"
        onClick={focusInput}
      >
        <OutsideClickHandler
          onOutsideClick={() => {
            setDropdownIsOpen(false);
          }}
        >
          <form
            onSubmit={(e) => {
              handleClick({ query, e, setData, navigate, searchParams, setSearchParams });
              setDropdownIsOpen(false);
            }}
            tabIndex={0}
            aria-label="Search bar"
            onKeyDown={(e) => handleKeyDown({
              setDropdownIsOpen,
              navigate,
              e,
              results,
              setQuery2,
              query,
              inputRef,
              focusedIndex,
              setFocusedIndex
            })}
            className={`flex flex-row items-center 
              ${state.isIDRoute ? 'h-[36px]' : 'h-[46px]'} 
              !w-full bg-grey rounded-sm py-1 cursor-default`}
          >
            <Input
              state={state}
              inputRef={inputRef}
              query2={query2}
              setDropdownIsOpen={setDropdownIsOpen}
              setQuery={setQuery}
              setQuery2={setQuery2}
            />
            <div className="!w-fit relative h-full">
              <Clear
                query={query}
                setQuery={setQuery}
                setQuery2={setQuery2}
                setData={setData}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              <Submit
                setDropdownIsOpen={setDropdownIsOpen}
                query={query}
                navigate={navigate}
                setSearchParams={setSearchParams}
                searchParams={searchParams}
                setData={setData}
              />
            </div>
          </form>
          <Dropdown
            focusedIndex={focusedIndex}
            navigate={navigate}
            setFocusedIndex={setFocusedIndex}
            results={results}
            state={state}
            query={query}
            setQuery2={setQuery2}
            setDropdownIsOpen={setDropdownIsOpen}
          />
        </OutsideClickHandler>
      </div>
    </section>
  );
}

const Input = ({ state, query2, setDropdownIsOpen, setQuery, setQuery2, inputRef }: any) => (
  <input
    type="text"
    role="search"
    spellCheck="false"
    ref={inputRef}
    className={`relative placeholder:text-black !w-full bg-transparent font-normal rounded-sm 
      focus:outline-none cursor-text select-none ${state.isIDRoute ? 'my-1.5 mx-3' : 'm-3'}`}
    value={query2}
    onFocus={() => setDropdownIsOpen(true)}
    onChange={(e) => {
      setQuery(e.target.value);
      setQuery2(e.target.value);
      setDropdownIsOpen(true);
    }}
  />
);

const Clear = ({ query, setData, setQuery, setQuery2, searchParams, setSearchParams }: any) => {
  return (query.length !== 0) ?
    <div className="flex flex-row h-full mr-12 items-center">
      <ClearButton
        icon="Clear"
        setData={setData}
        payload=""
        className="h-full !w-12 items-center justify-center mr-0"
        label="query"
        func={() => {
          setQuery("");
          setQuery2("");
          setData({
            payload: "",
            name: "query",
          })
          searchParams.delete("q");
          setSearchParams(searchParams);
        }}
      />
      <div className="h-3/5 bg-darkgrey !w-[1px]" />
    </div>
    : null
}

const Dropdown = ({ state, setDropdownIsOpen, query, focusedIndex, results, setFocusedIndex, navigate }: any) => (
  <div
    className={`bg-grey w-full h-fit absolute left-0 
      z-10 border-2 border-b-[1px] border-grey
      ${state.isIDRoute ? 'top-[35px]' : 'top-[45px]'}`}
  >
    {results().map((data: { name: string; id: string }, index: number) => {
      return (
        <Link
          to={`/search/${getLaunchName(data)}`}
          onClickCapture={() => setDropdownIsOpen(false)}
          state={{ id: data.id }}
          className="w-full h-min relative"
          key={index}
          onMouseEnter={() => { setFocusedIndex(index); }}
          onMouseDown={() => navigate(`/search/${getLaunchName(data)}`)}
        >
          <p
            className={`flex flex-row items-start font-normal rounded-sm
              ${state.isIDRoute ? 'py-1.5 px-3' : 'p-3'} `}
            style={index === focusedIndex ? { backgroundColor: "#000", color: "#fff" } : {}}
          >
            {charMatch({ result: data.name, query: query })}
          </p>
        </Link>
      )
    })}
  </div>
);

const Submit = ({ setData, setDropdownIsOpen, searchParams, setSearchParams, query, navigate }: any) => (
  <button
    className="absolute right-0 top-0 h-full w-12 items-center justify-center m-0"
    title="Search"
    role="submit"
    onClick={() => {
      handleClick({ query, setData, navigate, searchParams, setSearchParams });
      setDropdownIsOpen(false);
      navigate("/search");
    }}
  >
    <Search
      style={{ fontSize: "20px", marginTop: "-1px" }}
    />
  </button>
);

export { SearchBar }