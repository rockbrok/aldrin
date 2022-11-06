
import { useState, useContext, FC } from 'react';
import { QueryProps, SelectProps } from './interfaces/Props';
import { FilterContext } from './context/FilterContext';
import { Icon } from './components/Icon';
import { Pagination } from "./pagination/Pagination";
import { useLaunches } from './hooks/useLaunches';

const App = () => {
  const { state, setData } = useContext(FilterContext);
  const launchList = useLaunches(state);

  const yearsList = () => {
    const years = [];

    for (let i = 2006; i <= 2010; i++) {
      years.push(<option key={i} value={`&launch_year=${i}`}>{i}</option>);
    }
    for (let i = 2012; i <= 2019; i++) {
      years.push(<option key={i} value={`&launch_year=${i}`}>{i}</option>);
    }
    return years;
  }

  return (
    <div>
      <header>
        <h1>Heading</h1>
        <h3>Subheading</h3>
        <img src="https://graffica.info/wp-content/uploads/2017/08/LogoNasaSpotB-1200x900.jpg" height="400px" width="300px" alt="logo" />
      </header>
      <main>
        <Select
          id="year"
          label="Year"
          value={state.year}
          setData={setData}
        >
          <option value="">All</option>
          {yearsList()}
        </Select>
        <Select
          id="type"
          label="Rocket Type"
          value={state.type}
          setData={setData}
        >
          <option value="">All</option>
          <option value="&rocket_type=Merlin%20A">Merlin A</option>
          <option value="&rocket_type=Merlin%20C">Merlin C</option>
          <option value="&rocket_type=v1.0">v1.0</option>
          <option value="&rocket_type=v1.1">v1.1</option>
          <option value="&rocket_type=FT">FT</option>
        </Select>
        <Select
          id="status"
          label="Status"
          value={state.status}
          setData={setData}
        >
          <option value="">All</option>
          <option value="&launch_success=true">Success</option>
          <option value="&launch_success=false">Failure</option>
        </Select>
        <button onClick={() => {
          launchList.refetch();
          setData({
            payload: 1,
            name: "activePage",
          });
        }}
        >
          Search
        </button>
        <section>
          <List
            data={launchList.data}
            isLoading={launchList.isLoading}
            error={launchList.error}
          />
          {launchList.data?.data.length !== 0 ?
            <Pagination
              activePage={state.activePage}
              setData={setData}
              pages={launchList.itemsCount}
            /> : null}
        </section>
      </main>
    </div >
  );
};

const Select: FC<SelectProps> = ({ id, value, label, children, setData }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <select name={id} id={id}
      value={value}
      onChange={(e: any) => {
        setData({
          payload: e.target.value,
          name: id,
        });
      }}
    >
      {children}
    </select>
  </>
);

const List: FC<QueryProps> = ({ data, error, isLoading }) => {
  if (isLoading) return <h1>Loading</h1>;
  if (error) return <h1>{error}</h1>;
  else if (data.data.length === 0) return <h1>No data</h1>;

  return (
    <div>
      {data.data.map((data: object, index: number) => {
        return (
          <ListItem key={index} data={data} />
        );
      })}
    </div>
  );
};

const ListItem: FC<QueryProps> = ({ data }) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div onClick={() => setChecked(true)} className="mt-4 cursor-pointer">
        {/* <Icon /> */}
        {data.flight_number}

      </div>
      {checked ? <Popup data={data} setChecked={setChecked} /> : null}
    </>
  );
};

const Popup: FC<QueryProps> = ({ data, setChecked }) => (
  <section className='bg-white absolute w-full h-full top-0 z-10'>
    Flight number: {data.flight_number}<br />
    Rocket Type: {data.rocket.rocket_name}<br />
    Launch year: {data.launch_year}<br />
    Status: {data.launch_success === true ? "Success" : "Failure"}<br />
    Details: {data.details}<br />
    <button className="font-bold" onClick={() => setChecked(false)}>Back</button>
  </section>
);

export default App;