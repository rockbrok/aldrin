import Context from './context/FilterContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import { Search } from "./pages/Search";
import { Launch } from "./pages/Launch";
// Components
import { Layout } from './components/Layout';

const App = () => (
  <Router basename="search">
    <Context>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/*" element={<Search />} />
          <Route path="/:id" element={<Launch />} />
        </Route>
      </Routes>
    </Context>
  </Router>
);

export default App;