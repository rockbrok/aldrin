import { FilterContextProvider } from './context/FilterContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import { Search } from "./pages/Search";
import { Launch } from "./pages/Launch";
// Components
import { Layout } from './components/Layout';

const App = () => (
  <Router basename="search">
    <FilterContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/*" element={<Search />} />
          <Route path="/:id" element={<Launch />} />
        </Route>
      </Routes>
    </FilterContextProvider>
  </Router>
);

export default App;