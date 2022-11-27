import { FC, MouseEventHandler, ReactFragment, useEffect, useState } from 'react'
import { findLaunch } from '../hooks/useLaunches';
import { QueryProps } from '../interfaces/Props';
import { LazyQueryExecFunction } from '@apollo/client';
import { RocketLaunch, Error, Cached, Block } from '@mui/icons-material';
// components
import { Popup } from './Popup';

const CardList: FC<QueryProps> = ({ launches, state, setData }) => {
  const itemsPerPage = 12;
  const totalCount = launches?.data?.launchesPastResult?.result?.totalCount;
  const completePages: any = Math.floor(totalCount / itemsPerPage);
  const incompletePage = completePages + 1;

  const calculatePlaceholderCardCount = (launches: { loading: boolean; error: boolean; },
    itemsPerPage: number, totalCount: number,
    setData: ((arg0: { payload: number; name: string; }) => void)) => {
    switch (true) {
      case launches.loading:
      case launches.error:
        return;
      default: {
        // Get remainder of items from items per page
        const count = totalCount % itemsPerPage;
        setData({
          payload: count,
          name: "placeholderCardCount",
        });
      }
    }
  };

  const usePlaceholderCardCount = (state: { activePage: number; placeholderCardCount: number },
    incompletePage: any, totalCount: number) => {
    switch (true) {
      case incompletePage == state.activePage:
      case totalCount < itemsPerPage:
        return state.placeholderCardCount;
      default:
        return itemsPerPage;
    }
  }

  // Update calculateCardLoadingCount each time state changes
  useEffect(() => {
    calculatePlaceholderCardCount(launches, itemsPerPage, totalCount, setData);
  }, [state.activePage, state.query, state.type, state.year, state.orbit]);

  const IconWrapper = (props: { children: string | ReactFragment }) => (
    <div className="flex flex-col items-center justify-center mt-auto">
      {props.children}
    </div>
  );

  const Grid = (props: { children: ReactFragment, className?: string }) => (
    <div className={`grid gap-4 grid-cols-4 grid-rows-auto my-4 place-items-center ${props.className}`}>
      {props.children}
    </div>
  );

  switch (true) {
    case launches.loading:
      return (
        <Grid className="mb-16">
          {Array.from({ length: usePlaceholderCardCount(state, incompletePage, totalCount) }, (_, index) =>
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
    case launches.error:
      return (
        <IconWrapper>
          <Error />
          {launches.error}
        </IconWrapper>
      );
    case launches.data.launchesPastResult.result.totalCount === 0:
      return (
        <IconWrapper>
          <Block />
          No data
        </IconWrapper>
      );
    default:
      return (
        <Grid>
          {launches.data.launchesPastResult.data.map((data:
            { mission_name: string; id: string; }, index: number) => {
            return (
              <CardLoaded
                key={index}
                data={data}
              />
            );
          })}
        </Grid>
      );
  }

};

const CardLoaded = (data: { data: { mission_name: string, id: string } }) => {
  const [checked, setChecked] = useState(false);
  const launch = findLaunch(data.data.id);

  const renderIcon = (launch: {
    getLaunch?: LazyQueryExecFunction<any, { id: string; }>; loading: boolean; error: any; data?: any;
  }) => {
    switch (true) {
      case launch.loading:
        return <Cached className="animate-spin filter-blue" />;
      case launch.error:
        return <Error className="filter-blue" />;
      default:
        return <RocketLaunch className="filter-blue" />;
    }
  }

  return (
    <>
      <Card
        className="hover:bg-grey gap-8 pt-14 cursor-pointer"
        click={async () => {
          await launch.getLaunch();
          setChecked(true);
        }}
      >
        {renderIcon(launch)}
        <p className="flex flex-row items-start h-24">
          {data.data.mission_name}
        </p>
      </Card>
      {checked ?
        <Popup
          data={launch?.data?.launch}
          setChecked={setChecked}
        />
        : null}
    </>
  );
};

const Card = (props: { children?: ReactFragment; className?: any, click?: MouseEventHandler<HTMLDivElement> }) => {
  return (
    <div className={`flex flex-col items-center justify-center 
        whitespace-normal select-none
        h-52 w-full bg-white px-6 text-center
        rounded-sm border-2 border-grey ${props.className}`}
      onClick={props.click}
    >
      {props.children}
    </div>
  )
}

export { CardList }