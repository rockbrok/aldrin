import { useOutletContext } from 'react-router-dom';
// Components
import { Filter } from '../components/Filter';
import { CardList } from '../components/CardList';
import { Pagination } from "../components/Pagination";

const Search = () => {
  const [launches, state, setData, searchParams, setSearchParams]: any = useOutletContext();

  return (
    <>
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
      {launches.count > 0 ?
        <Pagination
          state={state}
          setData={setData}
          launches={launches}
        />
        : null}
    </>
  );
};

export { Search };