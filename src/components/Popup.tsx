import { FC, ReactElement, useEffect, useState } from 'react'
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { QueryProps } from '../interfaces/Props';
import OutsideClickHandler from "react-outside-click-handler";
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
  Scale,
  Close
} from "@mui/icons-material";

const Popup: FC<QueryProps> = ({ data, setChecked }) => {
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

  return (
    <>
      <RemoveScrollBar />
      <section className="fixed top-0 left-0 h-full w-full z-40 flex flex-col backdrop-blur-md items-center justify-items-center">
        <OutsideClickHandler
          onOutsideClick={() => {
            setChecked(false);
          }}
        >
          <div className="relative grid grid-flow-row grid-cols-[6fr, 9fr] border-2 border-grey bg-grey rounded-sm p-14 gap-x-20 gap-y-6">
            <button
              title="Close"
              className="absolute top-0 right-[-56px] p-4 pt-0 mt-[-6px] filter-grey"
              onClick={() => setChecked(false)}
            >
              <Close />
            </button>
            <div className="flex flex-col gap-4 col-start-1 col-end-2 w-min">
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
            </div>
            <div className="flex flex-row gap-4 w-[300px] row-start-1 row-end-3 col-start-2 col-end-3">
              <span title="Details">
                <Notes />
              </span>
              {data.details ?? "No details"}
            </div>
          </div>
        </OutsideClickHandler>
      </section>
    </>
  );
};

const Item = (props: { data: string; icon: ReactElement; title: string; className?: string }) => (
  <div
    className={`flex flex-row gap-4 items-center w-max ${props.className}`}
    title={props.title}
  >
    {props.icon}
    {props.data}
  </div>
)

export { Popup }