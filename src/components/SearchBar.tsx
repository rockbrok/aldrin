import { FC, useState, KeyboardEventHandler, useCallback, useEffect } from 'react';
import { QueryProps, SearchProps } from '../interfaces/Props';
import { Search } from "@mui/icons-material";
import { LaunchMap } from '../LaunchMap';
import { Link, useNavigate } from 'react-router-dom';
import { queryLaunches } from '../hooks/useLaunches';
import OutsideClickHandler from "react-outside-click-handler";
// components
import { ClearButton } from './ClearButton';

const SearchBar: FC<QueryProps & SearchProps> = ({ state, setData, searchParams, setSearchParams }) => {

  const [query, setQuery] = useState<string>(state.query ?? "");
  const [query2, setQuery2] = useState<string>("");
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const launches = queryLaunches();
  const navigate = useNavigate();

  const inputFocus = () => {
    const input = document.querySelector('input');
    input?.focus();
  }

  const inputBlur = () => {
    const input = document.getElementById('input')
    input?.blur();
  }

  const handleClick = (query: string, e: any) => {
    setData({
      payload: query,
      name: "query",
    })
    e.preventDefault();
    searchParams.set("q", query);
    setSearchParams(searchParams);
  }

  const getResults = (launchArray: { name: string; id: string; }[]) => {
    switch (true) {
      case launches.loading:
      case Boolean(launches.error):
      case launches.data.launchesPastResult.result.totalCount === 0:
      case dropdownIsOpen === false:
      case query.length === 0:
        return;
      default:
        {
          launches.data.launchesPastResult.data.map((data: { mission_name: string; id: string; }) => {
            if (data.mission_name.toLowerCase().includes(query.toLowerCase())) {
              launchArray.push({ name: data.mission_name, id: data.id });
            }
          })
        }
    }
  }

  const results = () => {
    const launchArray: { name: string; id: string; }[] = [];
    getResults(launchArray);
    return launchArray.slice(0, 6)
  }

  const [focusedIndex, setFocusedIndex] = useState(-1);

  const resetSearch = useCallback(() => {
    setDropdownIsOpen(false);
    inputBlur;
    setFocusedIndex(-1);
  }, []);

  useEffect(() => {
    if (focusedIndex === 6) {
      setQuery2(query)
    }
  });


  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    const { key } = e;
    let nextIndexCount = -1;

    const length = results().length + 1;
    const data = results()[focusedIndex];

    const condition = () => {
      if (nextIndexCount > -1 && nextIndexCount < 6) {
        e.preventDefault();
        const data = results()[nextIndexCount];
        setQuery2(data.name);
      }
    }

    // Move down
    if (e.key === "ArrowDown") {
      nextIndexCount = (focusedIndex + 1) % length;
      condition();
    }

    // Move up
    if (key === "ArrowUp") {
      nextIndexCount = (focusedIndex + length - 1) % length;
      condition();
    }

    // Hide search results
    if (key === "Escape") {
      resetSearch();
    }

    // // Select the current item
    if (key === "Enter") {
      e.preventDefault();

      const searchIDInArray = (data: any) => {
        for (let i = 0; i < LaunchMap.length; i++) {
          if (LaunchMap[i].id == Number(data.id)) return LaunchMap[i].name;
        }
      }
      navigate(`/${searchIDInArray(data)}`)
    }

    setFocusedIndex(nextIndexCount);
  };

  return (
    <section className={state.isIDRoute ? "col-start-3 col-span-2" :
      "col-span-4 grid grid-cols-4 grid-rows-1 gap-4 mt-10"}
    >
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
              handleClick(query, e);
              setDropdownIsOpen(false);
            }}
            tabIndex={1}
            onKeyDown={handleKeyDown}
            onBlur={resetSearch}
            className={`flex flex-row items-center 
              ${state.isIDRoute ? 'h-[36px]' : 'h-[46px]'} 
              !w-full bg-grey rounded-sm py-1 cursor-default`}
          >
            <input
              type="text"
              role="search"
              spellCheck="false"
              className={`relative placeholder:text-black !w-full bg-transparent font-normal rounded-sm 
                ${state.isIDRoute ? 'my-1.5 mx-3' : 'm-3'} focus:outline-none cursor-text select-none`}
              value={query2}
              onFocus={() => setDropdownIsOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setQuery2(e.target.value);
                setDropdownIsOpen(true);
              }}
            />
            <div className="!w-fit relative h-full">
              <ClearInputButton
                query={query}
                setQuery={setQuery}
                setQuery2={setQuery2}
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

const ClearInputButton = ({ query, setData, setQuery, setQuery2, searchParams, setSearchParams }: any) => {
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
    )
  } else return null
}

const InputDropdown = ({ state, setDropdownIsOpen, query, setQuery2, focusedIndex, results, setFocusedIndex, navigate }: any) => {

  const searchIDInArray = (data: any) => {
    for (let i = 0; i < LaunchMap.length; i++) {
      if (LaunchMap[i].id == Number(data.id)) return LaunchMap[i].name;
    }
  }

  const boldMatchCharacters = ({ result, query }: any) => {
    const textArray = result.split(RegExp(query, "ig"));
    const match = result.match(RegExp(query, "ig"));

    return (
      <>
        {textArray.map((item: any, index: number) => (
          <span key={index}>
            {item}
            {index !== textArray.length - 1 && match && (
              <b>{match[index]}</b>
            )}
          </span>
        ))}
      </>
    );
  }

  return (
    <div
      className={`bg-grey w-full h-fit absolute left-0 
        ${state.isIDRoute ? 'top-[35px]' : 'top-[45px]'} z-10 border-2 border-b-[1px] border-grey`}
    >
      {results().map((data: { name: string; id: string }, index: number) => {
        return (
          <Link
            to={`/${searchIDInArray(data)}`}
            onClickCapture={() => setDropdownIsOpen(false)}
            state={{ id: data.id }}
            className="w-full h-min relative"
            key={index}
            onMouseEnter={() => { setFocusedIndex(index); setQuery2(data.name) }}
            onMouseDown={() => navigate(`/${searchIDInArray(data)}`)}
          >
            <p className={`flex flex-row items-start font-normal ${state.isIDRoute ? 'py-1.5 px-3' : 'p-3'} 
              rounded-sm`}
              style={index === focusedIndex ? { backgroundColor: "#000", color: "#fff" } : {}}
            >
              {boldMatchCharacters({ result: data.name, query: query })}
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