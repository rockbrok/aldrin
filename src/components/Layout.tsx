import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import { Outlet, useSearchParams } from 'react-router-dom';
// Components
import { Header } from './Header';

const Layout = () => {
  const { state, setData } = useContext(FilterContext);
  const [searchParams, setSearchParams] = useSearchParams({});
  return (
    <>
      <Header
        state={state}
        setData={setData}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Outlet context={[state, setData, searchParams, setSearchParams]} />
    </>
  )
}

export { Layout }