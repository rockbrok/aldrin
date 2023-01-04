const years = () => {
  const years: { label: number; value: string; }[] = [];

  for (let i = 2006; i <= 2010; i++) {
    years.push({ label: i, value: JSON.stringify(i) });
  }
  // No launches in 2011: excluding 2011 from array
  // Return years from 2012 to 2020 (most recent in API)
  for (let i = 2012; i <= 2020; i++) {
    years.push({ label: i, value: JSON.stringify(i) });
  }

  return years;
}

const types = [
  { label: "Merlin A", value: "Merlin A" },
  { label: "Merlin C", value: "Merlin C" },
  { label: "v1.0", value: "v1.0" },
  { label: "v1.1", value: "v1.1" },
  { label: "FT", value: "FT" }
];

const orbits = [
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

export { types, orbits, years }