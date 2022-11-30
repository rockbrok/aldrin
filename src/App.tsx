import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Search } from "./pages/Search";
import { Launch } from "./pages/Launch";
import Context from "./context/FilterContext";

const App = () => (
  <Router basename="search">
    <Routes>
      <Route path="/" element={
        <Context>
          <Search />
        </Context>}
      />
      <Route path="/:id" element={
        <Context>
          <Launch />
        </Context>
      }
      />

      {/* Bug with React Router preventing special characters. Revert to using non-wrapped routes */}

      {/* <Route element={<Context />}>
        <Route path="/" element={<Search />} />
        <Route path="/launch@:id" element={<Launch />} />
      </Route> */}
    </Routes>
  </Router>
)

export default App;