
import { useContext } from 'react';
import { FilterContext } from './context/FilterContext';
import { getLaunches } from './hooks/useLaunches';
// components
import { Header } from './components/Header';
import { Search } from './components/Search';
import { CardList } from './components/CardList';
import { Pagination } from "./components/Pagination";

const App = () => {
  const { state, setData } = useContext(FilterContext);
  const launches = getLaunches(state);

  return (
    <>
      <Header />
      <main className="my-4 w-[900px]">
        <Search
          state={state}
          setData={setData}
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

export default App;