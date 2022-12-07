import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import { Outlet, useSearchParams } from 'react-router-dom';
import { getLaunches } from '../hooks/useLaunches';
// Components
import { Header } from './Header';

const Layout = () => {
  const { state, setData } = useContext(FilterContext);
  const [searchParams, setSearchParams] = useSearchParams({});
  const launches = getLaunches(state);

  return (
    <>
      <Header
        launches={launches}
        state={state}
        setData={setData}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <main className="my-4 w-[900px]">
        <Outlet context={[launches, state, setData, searchParams, setSearchParams]} />
      </main>
    </>
  )
}

export { Layout }