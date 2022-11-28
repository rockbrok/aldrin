import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import { getLaunches } from '../hooks/useLaunches';
import { useSearchParams } from 'react-router-dom';
// components
import { Header } from '../components/Header';
import { Filter } from '../components/Filter';
import { CardList } from '../components/CardList';
import { Pagination } from "../components/Pagination";

const Search = () => {
  const { state, setData } = useContext(FilterContext);
  const launches = getLaunches(state);

  const [searchParams, setSearchParams] = useSearchParams({});
  return (
    <>
      <Header />
      <main className="my-4 w-[900px]">
        <Filter
          state={state}
          setData={setData}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <CardList
          state={state}
          setData={setData}
          launches={launches}
        />
        <Pagination
          state={state}
          setData={setData}
          launches={launches}
        />
      </main>
    </>
  );
};

export { Search };