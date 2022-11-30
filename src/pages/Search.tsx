import { useOutletContext } from 'react-router-dom';
import { getLaunches } from '../hooks/useLaunches';
// Components
import { Filter } from '../components/Filter';
import { CardList } from '../components/CardList';
import { Pagination } from "../components/Pagination";

const Search = () => {
  const [state, setData, searchParams, setSearchParams]: any = useOutletContext();
  const launches = getLaunches(state);

  return (
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
  );
};

export { Search };