import { useLocation } from 'react-router-dom';
import { findLaunch } from '../hooks/useLaunches';
import { Error, Cached, Block } from '@mui/icons-material';
import { useState, useEffect, ReactElement } from 'react';
import {
  Notes,
  FactCheck,
  Assignment,
  Rocket,
  Language,
  PinDrop,
  CalendarMonth,
  Public,
  TaskAlt,
  Scale
} from "@mui/icons-material";
import { LaunchMap } from '../LaunchMap';

const Launch = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '');

  function searchStringInArray() {
    for (let i = 0; i < LaunchMap.length; i++) {
      if (LaunchMap[i].name.match(path)) return String(LaunchMap[i].id);
    }
    return "";
  }

  const launch = findLaunch(searchStringInArray() || location.state.id);

  const data = launch?.data?.launch

  const nationalitiesArray: any[] = [];
  const [nationalities, setNationalities] = useState("");

  const payloadsArray: any[] = [];
  const [payloadSum, setPayloadSum] = useState(0);

  const fetchPayloads = async () => {
    await data.rocket.second_stage.payloads.map((data: { payload_mass_kg: string }) => {
      payloadsArray.push(data.payload_mass_kg);
    });
  }

  const calculatePayloadSum = async (sum: number) => {
    return sum = await payloadsArray.reduce((partialSum, a) => partialSum + a, 0);
  }

  const setPayload = async () => {
    const sum = 0;

    await fetchPayloads();
    await calculatePayloadSum(sum);
    setTimeout(() => setPayloadSum(sum));
  }

  const fetchNationalities = async () => {
    await data.rocket.second_stage.payloads.map((data: { nationality: string }) => {
      // If nationalities array does not include the exact nationality
      if (!nationalitiesArray.includes(data.nationality)) {
        nationalitiesArray.push(data.nationality);
      }
    });
  }

  const concatNationalities = (concat: string) => {
    concat = nationalitiesArray.join(' / ')
    setNationalities(concat);
  }

  const setNationality = async () => {
    const concat = "";

    await fetchNationalities();
    concatNationalities(concat);
  }

  useEffect(() => {
    setPayload();
    setNationality();
  }, [payloadsArray]);

  switch (true) {
    case launch.loading:
      return <Cached className="animate-spin filter-blue" />;
    case launch.data == undefined:
      return (
        <>
          <Block className="filter-blue" />
          No data
        </>
      )
    case Boolean(launch.error):
      return <Error className="filter-blue" />;
    default:
      return (
        <main className="relative grid grid-flow-row grid-cols-[6fr, 9fr] border-2 border-grey bg-grey rounded-sm p-14 gap-x-20 gap-y-6">
          <div className="flex flex-col gap-4 col-start-1 col-end-2 w-min">
            <ItemList
              data={data}
              nationalities={nationalities}
              payloadSum={payloadSum}
            />
          </div>
          <div className="flex flex-row gap-4 w-[300px] row-start-1 row-end-3 col-start-2 col-end-3">
            <span title="Details">
              <Notes />
            </span>
            {data.details ?? "No details"}
          </div>
        </main>
      )
  }
}

const ItemList = ({ data, nationalities, payloadSum }: any) => (
  <>
    <Item
      title="Mission name"
      icon={<FactCheck />}
      data={data.mission_name}
    />
    <Item
      title="Rocket name"
      icon={<Assignment />}
      data={data.rocket.rocket_name}
    />
    <Item
      title="Rocket type"
      icon={<Rocket />}
      data={data.rocket.rocket_type}
    />
    <Item
      title="Nationality"
      icon={<Language />}
      data={nationalities}
    />
    <Item
      title="Launch site"
      icon={<PinDrop />}
      data={data.launch_site.site_name}
    />
    <Item
      title="Year"
      icon={<CalendarMonth />}
      data={data.launch_year}
    />
    <Item
      title="Payload"
      icon={<Scale />}
      data={payloadSum === 0 ? "Unknown" : `${payloadSum} kg`}
    />
    <Item
      className="capitalize"
      title="Orbit"
      icon={<Public />}
      data={
        data.rocket.second_stage.payloads[0].orbit_params.regime !== null ?
          data.rocket.second_stage.payloads[0].orbit_params.regime.replaceAll('-', ' ') :
          "Unknown"
      }
    />
    <Item
      title="Status"
      icon={<TaskAlt />}
      data={data.launch_success === true ? "Success" : "Failure"}
    />
  </>
)

const Item = (props: { data: string; icon: ReactElement; title: string; className?: string }) => (
  <div
    className={`flex flex-row gap-4 items-center w-max ${props.className}`}
    title={props.title}
  >
    {props.icon}
    {props.data}
  </div>
)

export { Launch }