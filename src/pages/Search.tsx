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
            tags={renderTags(state)}
            label="year"
            helper="Year"
            setData={setData}
            state={state.year}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Select
            items={types}
            tags={renderTags(state)}
            label="type"
            helper="Rocket type"
            setData={setData}
            state={state.type}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Select
            items={orbits}
            tags={renderTags(state)}
            label="orbit"
            helper="Orbit"
            setData={setData}
            state={state.orbit}
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