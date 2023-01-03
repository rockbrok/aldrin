import { Link } from "react-router-dom";
import { FC } from 'react';
import { SearchProps } from '../interfaces/Props';
import { useRouteMatch } from "../hooks/useRouteMatch";
// Components
import { SearchBar } from './SearchBar';

const Header: FC<SearchProps> = ({ state, setData, searchParams, setSearchParams }) => {
  useRouteMatch(setData);

  return (
    <header className="relative mt-4 w-[900px] justify-between">
      <Container>
        <Logo />
        {state.isIDRoute ?
          <SearchBar
            state={state}
            setData={setData}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          /> :
          <Container>
            <Title />
            <SearchBar
              state={state}
              setData={setData}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </Container>
        }
      </Container>
    </header>
  );
}

const Container = ({ children }: any) => (
  <div className="grid grid-cols-4 grid-flow-row auto-rows-max gap-4 col-span-4 font-medium">
    {children}
  </div>
)

const Logo = () => (
  <div className="flex flex-row items-end h-9 row-span-1 col-span-2">
    <Link
      to="/search"
      reloadDocument
      tabIndex={0}
      aria-labelledby="h1"
    >
      <h1 id="h1" className="text-yellow w-fit px-2 text-2xl cursor-pointer">
        aldrin
      </h1>
    </Link>
    <span className="text-darkgrey text-[10px] ml-1 flex self-end tracking-wide mb-1">
      v1.6.2
    </span>
  </div>
)

const Title = () => (
  <h3 className="col-span-3 mt-6 text-6xl whitespace-pre-line text-transparent tracking-tight
    bg-clip-text bg-gradient-to-r from-blue to-darkgrey"
    tabIndex={0}
  >
    A search tool for spacex {`\n`}launches
  </h3>
)

export { Header }