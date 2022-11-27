// components
import { useEffect, useState } from 'react';
import { Input } from './Input';
import { Select } from './Select';
import { Tag } from './Tag';

const Search = ({ state, setData }: any) => {
  const [tagsList, setTagsList] = useState([]);

  const createYearsList = (years: { label: number; value: string; }[]) => {
    for (let i = 2006; i <= 2010; i++) {
      years.push({ label: i, value: JSON.stringify(i) });
    }

    // No launches in 2011: excluding 2011 from array
    // Return years from 2012 to 2020 (most recent in API)
    for (let i = 2012; i <= 2020; i++) {
      years.push({ label: i, value: JSON.stringify(i) });
    }
  };

  const getYearsList = () => {
    const years: { label: number; value: string; }[] = [];
    createYearsList(years);
    return years;
  }

  // const tagsList: { value: string | number; id: string }[] = [];

  // useEffect(() => {
  //   console.log(tagsList);
  // }, [tagsList]);

  const typesList = [
    { label: "Merlin A", value: "Merlin A" },
    { label: "Merlin C", value: "Merlin C" },
    { label: "v1.0", value: "v1.0" },
    { label: "v1.1", value: "v1.1" },
    { label: "FT", value: "FT" }
  ];

  const orbitsList = [
    { label: "Very Low Earth", value: "very-low-earth" },
    { label: "Low Earth", value: "low-earth" },
    { label: "Medium Earth", value: "medium-earth" },
    { label: "High Earth", value: "high-earth" },
    { label: "Geostationary", value: "geostationary" },
    { label: "Geosynchronous", value: "geosynchronous" },
    { label: "Sun Synchronous", value: "sun-synchronous" },
    { label: "Semi Synchronous", value: "semi-synchronous" },
    { label: "Highly Elliptical", value: "highly-elliptical" },
    { label: "L1 point", value: "L1-point" },
    { label: "Sub Orbital", value: "sub-orbital" },
  ];

  return (
    <section className="grid grid-cols-4 grid-rows-3 gap-4 mb-10">
      <Input
        state={state}
        setData={setData}
      />
      <div className="grid row-start-2 col-span-3 grid-cols-3 gap-4">
        <Select
          items={getYearsList()}
          tagsList={tagsList}
          id="year"
          helper="Year"
          setData={setData}
          state={state.year}
        />
        <Select
          items={typesList}
          tagsList={tagsList}
          id="type"
          helper="Rocket type"
          setData={setData}
          state={state.type}
        />
        <Select
          items={orbitsList}
          tagsList={tagsList}
          id="orbit"
          helper="Orbit"
          setData={setData}
          state={state.orbit}
        />
      </div>

      <Tag
        setData={setData}
        tagsList={tagsList}
      />

    </section>
  );
};

export { Search }