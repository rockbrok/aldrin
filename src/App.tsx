import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  useSearchParams
} from 'react-router-dom'
import { useContext } from 'react';
import { Context } from './context/Context';
import { getLaunches } from './hooks/useLaunches';
// Pages
import { Search } from "./pages/Search";
import { Launch } from "./pages/Launch";
// Components
import { Header } from './components/Header';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/search" element={<Root />} >
        <Route index element={<Search />} />
        <Route path="/search/:id" element={<Launch />} />
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
};

const Root = () => {
  const { state, setData } = useContext(Context);
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

export default App;