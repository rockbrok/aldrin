
import FilterContextProvider from './context/FilterContext';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { Search } from "./pages/Search";

const Context = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const year = params.get("year");
  const orbit = params.get("orbit");
  const type = params.get("type");
  const query = params.get("q");

  const initialState = {
    orbit: {
      value: orbit || "",
      label: "All",
    },
    year: {
      value: year || "",
      label: "All",
    },
    type: {
      value: type || "",
      label: "All",
    },
    query: query || "",
    limit: "",
    placeholderCardCount: 12,
    activePage: 1,
  };

  return (
    <FilterContextProvider stateVar={initialState}>
      <Outlet />
    </FilterContextProvider>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route element={<Context />}>
        <Route path="search/*" element={<Search />} />
      </Route>
    </Routes>
  </Router>
)

export default App;