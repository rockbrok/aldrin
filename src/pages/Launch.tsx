import { useLocation } from 'react-router-dom';
import { findLaunch } from '../hooks/useLaunches';
import { ReactElement, ReactFragment } from 'react';
import {
  Assignment,
  Rocket,
  Language,
  PinDrop,
  CalendarMonth,
  Public,
  TaskAlt,
  Error,
  Cached,
  Block
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

  const data = launch?.data?.launch;

  const IconWrapper = (props: { children: string | ReactFragment | ReactElement }) => (
    <div className="flex flex-col items-center justify-center mt-auto w-full mt-28">
      {props.children}
    </div>
  );

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
        <section className="mt-16 mb-8 flex flex-col grid grid-cols-4 gap-4">
          <div className="w-full h-fit p-4 text-4xl col-span-2">
            {data.mission_name}
          </div>
          <section className="grid grid-flow-row col-span-4 grid-cols-4 gap-4 rounded-sm">
            <div className="col-span-3 grid grid-cols-3 grid-flow-row auto-rows-max gap-4">
              {data.links.flickr_images[1] !== undefined ?
                <div className="col-span-3 h-[312px]">
                  <img src={data.links.flickr_images[1]} alt="launch" className="object-center w-full h-full object-cover rounded-sm" />
                </div> : null}
              <div className="pr-24 col-span-3 h-fit text-lg bg-grey rounded-sm p-4 py-6 leading-6">
                {data.details ?? "No details"}
              </div>
            </div>
            <ItemList
              data={data}
            />
          </section>
        </section>
      )
  }
}

const ItemList = ({ data }: any) => (
  <div className="flex flex-col gap-4 col-span-1 h-fit bg-grey rounded-sm p-4 py-6">
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
      data={data.rocket.second_stage.payloads[0].nationality}
    />
    <Item
      title="Launch site"
      icon={<PinDrop />}
      data={data.launch_site.site_name}
    />
    <Item
      title="Launch year"
      icon={<CalendarMonth />}
      data={data.launch_year}
    />
    <Item
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
  </div>
);

const Item = (props: { data: string; icon: ReactElement; title: string; }) => (
  <div className="flex flex-row gap-4 items-center w-max capitalize">
    <div title={props.title}>
      {props.icon}
    </div>
    {props.data}
  </div>
);

export { Launch }