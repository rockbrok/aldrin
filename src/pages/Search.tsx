import { useOutletContext } from 'react-router-dom';
// Components
import { Select } from '../components/Select';
import { Tag } from '../components/Tag';
import { List } from '../components/List';
import { Pagination } from "../components/Pagination";
// Data
import { years, types, orbits } from '../data/SelectData';
// Hooks
import { getLaunches } from '../hooks/useLaunches';

const Search = () => {
  const [state, setData, searchParams, setSearchParams]: any = useOutletContext();
  const launches = getLaunches(state);

  return (
    <>
      <section className="grid grid-cols-4 grid-rows-2 gap-4 mb-4">
        <div className="grid col-span-3 grid-cols-3 gap-4">
          <Select
            items={years()}
            label="year"
            state={state}
            stateKey={state.year}
            setData={setData}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Select
            items={types}
            label="type"
            state={state}
            stateKey={state.type}
            setData={setData}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Select
            items={orbits}
            label="orbit"
            state={state}
            stateKey={state.orbit}
            setData={setData}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <Tag
          state={state}
          setData={setData}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </section>
      <List
        state={state}
        setData={setData}
        launches={launches}
      />
      <Pagination
        state={state}
        setData={setData}
        launches={launches}
      />
    </>
  );
};

export { Search };