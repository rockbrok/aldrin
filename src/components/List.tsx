import { FC, MouseEventHandler, ReactFragment } from 'react'
import { QueryProps } from '../interfaces/Props';
import { RocketLaunch } from '@mui/icons-material';
import { Link } from 'react-router-dom';
// Components
import { Empty, Error } from './Response';
// Hooks
import { cardCount } from '../hooks/useCardCount';
import { getLaunchName } from '../hooks/useLaunchMap';

const List: FC<QueryProps> = ({ launches, state }) => {

  switch (true) {
    case launches.loading:
      return <Loading launches={launches} state={state} />;
    case launches.error:
      return <Error />;
    case launches.data == undefined:
      return <Empty />;
    default: {
      const data = launches.data.launchesPastResult.data;
      return (
        <Grid>
          {data.map((data: { mission_name: string; id: string; }, index: number) => (
            <Link
              to={`/search/${getLaunchName(data)}`}
              state={{ id: data.id }}
              className="w-full"
              key={index}
            >
              <Card className="hover:bg-grey gap-8 pt-14 cursor-pointer">
                <RocketLaunch className="filter-blue" />
                <p className="flex flex-row items-start h-24">
                  {data.mission_name}
                </p>
              </Card>
            </Link>
          ))}
        </Grid>
      );
    }
  }
};

const Grid = (props: { children: ReactFragment, className?: string }) => (
  <div className={`grid gap-4 grid-cols-4 grid-rows-auto my-4 place-items-center ${props.className}`}>
    {props.children}
  </div>
);

const Card = (props: { children?: ReactFragment; className?: any, click?: MouseEventHandler<HTMLDivElement> }) => (
  <div className={`flex flex-col items-center justify-center 
    whitespace-normal select-none
    h-52 w-full bg-white px-6 text-center
    rounded-sm border-2 border-grey ${props.className}`}
    onClick={props.click}
  >
    {props.children}
  </div>
);

const Loading = ({ launches, state }: any) => (
  <Grid className="mb-16">
    {Array.from({ length: cardCount({ launches, state }) }, (_, index) =>
      <Card
        key={index}
        className="animate-pulse pt-16"
      >
        <span className="w-full h-5 mb-2 bg-grey rounded-sm" />
        <span className="w-10/12 h-5 bg-grey rounded-sm" />
      </Card>
    )}
  </Grid>
);

export { List }