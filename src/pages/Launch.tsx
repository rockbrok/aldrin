import { findLaunch } from '../hooks/useLaunches';
import { ReactElement } from 'react';
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
import { Helmet } from "react-helmet";
// Components
import { IconWrapper } from '../components/IconWrapper';
// Hooks
import { getLaunchID } from '../hooks/useLaunchMap';

const Launch = () => {
  const pathname = window.location.pathname.split('/');
  const launch = findLaunch(getLaunchID(pathname));
  const data = launch?.data?.launch;

  switch (true) {
    case launch.loading:
      return (
        <IconWrapper style="w-full mt-28">
          <Cached className="animate-spin filter-blue" />
        </IconWrapper>
      );
    case launch.data == undefined:
      return (
        <IconWrapper style="w-full mt-28">
          <Block className="filter-blue" />
          No data
        </IconWrapper>
      )
    case Boolean(launch.error):
      return (
        <IconWrapper style="w-full mt-28">
          <Error className="filter-blue" />
        </IconWrapper>
      );
    default:
      return (
        <>
          <Helmet>
            <title>{data.mission_name} | aldrin</title>
          </Helmet>
          <section className="mt-16 mb-8 flex flex-col grid grid-cols-4 gap-4">
            <div
              tabIndex={0}
              aria-label="Launch mission name"
              className="w-full h-fit p-4 text-4xl col-span-2"
            >
              <h1 tabIndex={0}>{data.mission_name}</h1>
            </div>
            <section className="grid grid-flow-row col-span-4 grid-cols-4 gap-4 rounded-sm">
              <div className="col-span-3 grid grid-cols-3 grid-flow-row auto-rows-max gap-4">
                <Image
                  data={data}
                />
                <Details
                  data={data}
                />
              </div>
              <ItemList
                data={data}
              />
            </section>
          </section>
        </>
      )
  }
}

const Image = ({ data }: any) => (
  <>
    {data.links.flickr_images[1] === undefined ? <></> :
      <div className="col-span-3 h-[312px]">
        <img
          src={data.links.flickr_images[1]}
          alt="Launch photo"
          className="object-center w-full h-full object-cover rounded-sm"
          aria-label="Launch photo"
          tabIndex={0}
        />
      </div>
    }
  </>
);

const Details = ({ data }: any) => (
  <div
    tabIndex={0}
    aria-label="Launch details"
    className="pr-24 col-span-3 h-fit text-lg bg-grey rounded-sm p-4 py-6 leading-6"
  >
    <p tabIndex={0}>
      {data.details ?? "No details"}
    </p>
  </div>
)

const ItemList = ({ data }: any) => (
  <section
    tabIndex={0}
    aria-label="Launch information"
    className="flex flex-col gap-4 col-span-1 h-fit bg-grey rounded-sm p-4 py-6"
  >
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
        data.rocket.second_stage.payloads[0].orbit_params.regime === null ? "Unknown" :
          data.rocket.second_stage.payloads[0].orbit_params.regime.replaceAll('-', ' ')
      }
    />
    <Item
      title="Status"
      icon={<TaskAlt />}
      data={data.launch_success === true ? "Success" : "Failure"}
    />
  </section>
);

const Item = (props: { data: string; icon: ReactElement; title: string; }) => (
  <div
    className="flex flex-row gap-4 items-center w-max capitalize"
    aria-label={props.title + props.data}
    tabIndex={0}
  >
    {props.icon}
    <span>{props.data}</span>
  </div>
);

export { Launch }