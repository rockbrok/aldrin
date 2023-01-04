import { useOutletContext } from 'react-router-dom';
// Components
import { Select } from '../components/Select';
import { Tag } from '../components/Tag';
import { List } from '../components/List';
import { Pagination } from "../components/Pagination";
// Data
import { years, types, orbits } from '../data/SelectData';
import { renderTags } from '../hooks/useTags';

const Search = () => {
  const [launches, state, setData, searchParams, setSearchParams]: any = useOutletContext();

  return (
    <>
      <section className="grid grid-cols-4 grid-rows-2 gap-4 mb-4">
        <div className="grid col-span-3 grid-cols-3 gap-4">
          <Select
            items={years()}
            label="year"
            setData={setData}
            state={state}
            stateKey={state.year}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Select
            items={types}
            label="type"
            setData={setData}
            state={state}
            stateKey={state.type}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Select
            items={orbits}
            label="orbit"
            setData={setData}
            state={state}
            stateKey={state.orbit}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <Tag
          setData={setData}
          tags={renderTags(state)}
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