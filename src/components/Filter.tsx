import { FC, useEffect, useState } from 'react';
import { SearchProps } from '../interfaces/Props';
// Components
import { Select } from './Select';
import { Tags } from './Tags';
// Hooks
import { removeKebab } from '../hooks/useRemoveKebab';

const Filter: FC<SearchProps> = ({ state, setData, searchParams, setSearchParams }) => {

  interface StateProperties {
    value: string | null | number;
    label: string;
  }

  const [tagsList] = useState<StateProperties[]>([]);

  const tagSwitch = (props: { obj: any; label: string; }) => {
    switch (true) {
      case (props.obj === ""):
      case (props.label in tagsList):
        return null;
      default:
        tagsList.push({ value: props.obj, label: props.label })
    }
  }

  useEffect(() => {
    tagSwitch({ obj: state.year, label: "year" });
    tagSwitch({ obj: state.type, label: "type" });
    tagSwitch({ obj: removeKebab(state.orbit), label: "orbit" });
  }, []);

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
    <section className="grid grid-cols-4 grid-rows-2 gap-4 mb-4">
      <div className="grid col-span-3 grid-cols-3 gap-4">
        <Select
          items={getYearsList()}
          tagsList={tagsList}
          label="year"
          helper="Year"
          setData={setData}
          state={state.year}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Select
          items={typesList}
          tagsList={tagsList}
          label="type"
          helper="Rocket type"
          setData={setData}
          state={state.type}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Select
          items={orbitsList}
          tagsList={tagsList}
          label="orbit"
          helper="Orbit"
          setData={setData}
          state={state.orbit}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <Tags
        setData={setData}
        tagsList={tagsList}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </section>
  );
};

export { Filter }