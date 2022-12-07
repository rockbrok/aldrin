import { useLocation } from 'react-router-dom';
import { findLaunch } from '../hooks/useLaunches';
import { Error, Cached, Block } from '@mui/icons-material';
import { useState, useEffect, ReactElement, ReactFragment, ReactNode } from 'react';
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

  const IconWrapper = (props: { children: string | ReactFragment | ReactElement }) => (
    <div className="flex flex-col items-center justify-center mt-auto w-full mt-28">
      {props.children}
    </div>
  );

  const getRandomPicture = () => {
    const pictures = data.links.flickr_images;
    const picture = pictures[pictures.length * Math.random() | 0];

    return (
      <div className="w-80 h-80">
        <img src={picture} alt="launch" className="w-full h-full rounded-sm" />
      </div>
    );
  }

  switch (true) {
    case launch.loading:
      return (
        <IconWrapper>
          <Cached className="animate-spin filter-blue" />
        </IconWrapper>
      );
    case launch.data == undefined:
      return (
        <IconWrapper>
          <Block className="filter-blue" />
          No data
        </IconWrapper>
      )
    case Boolean(launch.error):
      return (
        <IconWrapper>
          <Error className="filter-blue" />
        </IconWrapper>
      );
    default:
      return (
        <main className="mt-14 mb-8 grid grid-flow-row grid-cols-[6fr, 9fr] border-2 border-grey bg-grey rounded-sm p-14 gap-x-20 gap-y-6">
          <div className="flex flex-col gap-4 w-[300px] row-start-1 row-end-3 grid-rows-3">
            <div className="bg-lightgrey w-full h-fit p-4 rounded-sm text-3xl">
              {data.mission_name}
            </div>


            {getRandomPicture()}
            <div className="row-span-2">
              <span title="Details">
                <Notes />
              </span>
              {data.details ?? "No details"}
            </div>
          </div>
          <div className="flex flex-col gap-4 col-start-2 col-end-3 w-min">
            <ItemList
              data={data}
              nationalities={nationalities}
              payloadSum={payloadSum}
            />
          </div>
        </main>
      )
  }
}



const ItemList = ({ data, nationalities, payloadSum }: any) => (
  <>

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