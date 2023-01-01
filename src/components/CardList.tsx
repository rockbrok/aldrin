import { FC, MouseEventHandler, ReactFragment, useEffect } from 'react'
import { QueryProps } from '../interfaces/Props';
import { RocketLaunch, Error, Block } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { LaunchMap } from '../LaunchMap';

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

  function searchStringInArray(data: any) {
    for (let i = 0; i < LaunchMap.length; i++) {
      if (LaunchMap[i].id == Number(data.id)) return LaunchMap[i].name;
    }
    return "";
  }

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
          {launches.data.launchesPastResult.data.map((data: { mission_name: string; id: string; }, index: number) => (
            <Link
              to={`/search/${searchStringInArray(data)}`}
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
};

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

export { CardList }