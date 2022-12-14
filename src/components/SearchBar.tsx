import { FC, useState } from 'react';
import { QueryProps, SearchProps } from '../interfaces/Props';
import { Search } from "@mui/icons-material";
import { LaunchMap } from '../LaunchMap';
import { Link, useNavigate } from 'react-router-dom';
import { queryLaunches } from '../hooks/useLaunches';
import OutsideClickHandler from "react-outside-click-handler";
import ReactHtmlParser from 'react-html-parser';
// components
import { ClearButton } from './ClearButton';

const SearchBar: FC<QueryProps & SearchProps> = ({ state, setData, searchParams, setSearchParams }) => {

  const [query, setQuery] = useState<string>("");
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const launches = queryLaunches(state);
  const navigate = useNavigate();

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
    <section className={state.isIDRoute ? "col-start-3 col-span-2" : "col-span-4 grid grid-cols-4 grid-rows-1 gap-4 mt-10"}>
      <div
        className={`relative ${state.isIDRoute ? 'w-full' : 'col-span-3'} flex flex-row`}
        id="searchContainer"
        onClick={inputFocus}
      >
        <OutsideClickHandler
          onOutsideClick={() => {
            setDropdownIsOpen(false);
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick(query)
            }}
            className={`flex flex-row items-center 
              ${state.isIDRoute ? 'h-[36px]' : 'h-[46px]'} 
              !w-full bg-grey rounded-sm py-1 cursor-default`}
          >
            <input
              type="text"
              role="search"
              spellCheck="false"
              className={`relative placeholder:text-black !w-full bg-transparent font-normal rounded-sm ${state.isIDRoute ? 'my-1.5 mx-3' : 'm-3'} focus:outline-none cursor-text select-none`}
              value={query}
              onFocus={() => setDropdownIsOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setDropdownIsOpen(true);
              }}
            />
            <div className="!w-fit relative h-full">
              <ClearInputButton
                query={query}
                setQuery={setQuery}
                setData={setData}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              <SubmitButton
                setDropdownIsOpen={setDropdownIsOpen}
                handleClick={handleClick}
                query={query}
                navigate={navigate}
              />
            </div>
          </form>
          <InputDropdown
            launches={launches}
            state={state}
            query={query}
            dropdownIsOpen={dropdownIsOpen}
            setDropdownIsOpen={setDropdownIsOpen}
          />
        </OutsideClickHandler>
      </div>
    </section>
  );
}

const ClearInputButton = ({ query, setData, setQuery, searchParams, setSearchParams }: any) => {
  if (query.length !== 0) {
    return (
      <div className="flex flex-row h-full mr-12 items-center">
        <ClearButton
          icon="Clear"
          setData={setData}
          payload=""
          className="h-full !w-12 items-center justify-center mr-0"
          name="query"
          func={() => {
            setQuery("");
            searchParams.delete("query");
            setSearchParams(searchParams);
          }}
        />
        <div className="h-3/5 bg-darkgrey !w-[1px]" />
      </div>
    )
  } else return null
}



const InputDropdown = ({ state, setDropdownIsOpen, dropdownIsOpen, query, launches }: any) => {

  const searchIDInArray = (data: any) => {
    for (let i = 0; i < LaunchMap.length; i++) {
      if (LaunchMap[i].id == Number(data.id)) return LaunchMap[i].name;
    }
  }

  const boldMatchCharacters = ({ sentence, characters }: any) => {
    // TO FIX:
    // When final character of word is made bold, space after word is removed
    const regEx = new RegExp(characters, 'gi');
    return sentence.replace(regEx, '<strong>$&</strong>')
  }

  const newArray: { name: string; id: string; }[] = [];

  const pushItems = () => {
    launches.data.launchesPastResult.data.map((data: { mission_name: string; id: string; }) => {
      if (data.mission_name.toLowerCase().includes(query.toLowerCase())) {
        newArray.push({ name: data.mission_name, id: data.id });
      }
    })
  }

  switch (true) {
    case launches.loading:
    case launches.error:
    case launches.data.launchesPastResult.result.totalCount === 0:
    case dropdownIsOpen === false:
    case query.length === 0:
      return null;
    default:
      pushItems();
  }

  return (
    <div className={`bg-grey w-full h-fit absolute left-0 ${state.isIDRoute ? 'top-[35px]' : 'top-[45px]'} z-10 border-2 border-b-[1px] border-grey`}>
      {newArray.slice(0, 6).map((data: { name: string; id: string }, index: number) => {
        return (
          <Link
            to={`/${searchIDInArray(data)}`}
            onClickCapture={() => setDropdownIsOpen(false)}
            state={{ id: data.id }}
            className="w-full h-min relative"
            key={index}
          >
            <p className={`flex flex-row items-start font-normal ${state.isIDRoute ? 'py-1.5 px-3' : 'p-3'} hover:bg-black hover:text-white rounded-sm`}>
              {ReactHtmlParser(boldMatchCharacters({ sentence: data.name, characters: query }))}
            </p>
          </Link>
        )
      })
      }
    </div>
  );
}

const SubmitButton = ({ setDropdownIsOpen, handleClick, query, navigate }: any) => (
  <button
    className="absolute right-0 top-0 h-full w-12 items-center justify-center m-0"
    title="Search"
    role="submit"
    onClick={() => {
      handleClick(query);
      setDropdownIsOpen(false);
      navigate("/");
    }}
  >
    <Search
      style={{ fontSize: "20px", marginTop: "-1px" }}
    />
  </button>
);

export { SearchBar }