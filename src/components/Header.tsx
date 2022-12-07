import { Link, matchRoutes, useLocation } from "react-router-dom";
import { FC, useEffect, useState } from 'react';
import { QueryProps, SearchProps } from '../interfaces/Props';
// Components
import { Input } from './Input';

const Header: FC<QueryProps & SearchProps> = ({ launches, setData, searchParams, setSearchParams }) => {
  const [page, setPage] = useState(false);
  const routes = [{ path: "/:id" }]
  const location = useLocation();
  const route = matchRoutes(routes, location);

  console.log(route);

  const routeTest = () => {
    if (route !== null) {
      setPage(true);
    }
  }

  useEffect(() => {
    routeTest();
  }, [location])

  console.log(page);


  return (
    <header className="relative flex flex-col mt-4 w-[900px] justify-between">
      <div className="select-none flex flex-row font-medium items-center justify-between">
        <div className="flex flex-row items-end">
          <Link to="/" reloadDocument>
            <h1 className="text-yellow w-fit px-2 text-2xl cursor-pointer">
              aldrin
            </h1>
          </Link>
          <span className="text-darkgrey text-[10px] ml-1 flex self-end tracking-wide mb-1">
            v1.2.6
          </span>
        </div>
        {page ?
          <Input
            page={page}
            launches={launches}
            setData={setData}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          /> : null}
      </div>
      {page ?
        null :
        <>
          <h3 className="mt-9 text-6xl font-medium  whitespace-pre-line font-medium text-transparent tracking-tight
        bg-clip-text bg-gradient-to-r from-blue to-darkgrey"
          >
            A search tool for spacex {`\n`}launches
          </h3>
          <Input
            launches={launches}
            setData={setData}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </>
      }
    </header>
  );
}
export { Header }