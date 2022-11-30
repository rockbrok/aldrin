import { Link } from "react-router-dom";
import { FC } from 'react';
import { QueryProps, SearchProps } from '../interfaces/Props';
// Components
import { Input } from './Input';

const Header: FC<QueryProps & SearchProps> = ({ state, setData, searchParams, setSearchParams }) => (
  <header className="relative flex flex-col mt-4 w-[900px] justify-between">
    <div className="select-none flex flex-row font-medium items-center">
      <Link
        to="/"
        onClick={() => window.location.reload()}
      >
        <h1 className="text-white w-fit py-1 px-2 bg-yellow rounded-sm text-2xl cursor-pointer">
          aldrin
        </h1>
      </Link>
      <span className="text-darkgrey text-xs ml-3 flex self-end">
        v1.0.0
      </span>
    </div>
    <h3 className="mt-9 text-6xl font-medium  whitespace-pre-line font-medium text-transparent tracking-tight
        bg-clip-text bg-gradient-to-r from-blue to-darkgrey"
    >
      A search tool for spacex {`\n`}launches
    </h3>
    <Input
      state={state}
      setData={setData}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  </header>
);

export { Header }