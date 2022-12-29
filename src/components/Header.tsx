import { Link, matchRoutes, useLocation } from "react-router-dom";
import { FC, useEffect } from 'react';
import { QueryProps, SearchProps } from '../interfaces/Props';
// Components
import { SearchBar } from './SearchBar';

const Header: FC<QueryProps & SearchProps> = ({ launches, state, setData, searchParams, setSearchParams }) => {
  const location = useLocation();
  const routes = [{ path: "/:id" }]
  const route = matchRoutes(routes, location);

  const routeTest = () => {
    if (route !== null) {
      setData({
        payload: true,
        name: "isIDRoute",
      });
    } else {
      setData({
        payload: false,
        name: "isIDRoute",
      });
    }
  }

  useEffect(() => {
    routeTest();
  }, [location])

  return (
    <header className="relative mt-4 w-[900px] justify-between">
      <Container>
        <div className="flex flex-row items-end h-9 row-span-1 col-span-2">
          <Link to="/" reloadDocument>
            <h1 className="text-yellow w-fit px-2 text-2xl cursor-pointer">
              aldrin
            </h1>
          </Link>
          <span className="text-darkgrey text-[10px] ml-1 flex self-end tracking-wide mb-1">
            v1.2.6
          </span>
        </div>
        {state.isIDRoute ?
          <SearchBar
            state={state}
            launches={launches}
            setData={setData}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          /> :
          <Container>
            <Title />
            <SearchBar
              launches={launches}
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

const Container = (props: { children: any }) => (
  <div className="grid grid-cols-4 grid-flow-row auto-rows-max gap-4 col-span-4 font-medium">
    {props.children}
  </div>
)

const Title = () => (
  <h3 className="col-span-3 mt-6 text-6xl whitespace-pre-line text-transparent tracking-tight
    bg-clip-text bg-gradient-to-r from-blue to-darkgrey"
  >
    A search tool for spacex {`\n`}launches
  </h3>
)

export { Header }