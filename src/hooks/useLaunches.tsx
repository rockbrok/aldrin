import { useQuery } from "@apollo/client";
import { GetLaunches } from '../queries/GetLaunches';
import { FindLaunch } from "../queries/FindLaunch";
import { QueryLaunches } from "../queries/QueryLaunches";

const getLaunches = (state: {
  query: string; orbit: string; activePage: number; type: string; year: string, placeholderCardCount: number
}) => {
  const offset = (state.activePage - 1) * state.placeholderCardCount;

  const { loading, error, data } = useQuery(GetLaunches, {
    variables: { offset, year: state.year, type: state.type, orbit: state.orbit, name: state.query }
  });

  const count: number = Math.ceil(data?.launchesPastResult?.result?.totalCount / state.placeholderCardCount);

  return { loading, error, data, count, offset };
}

const queryLaunches = () => {
  const { loading, error, data } = useQuery(QueryLaunches);
  return { loading, error, data };
}

const findLaunch = (id: string) => {
  const { loading, error, data } = useQuery(FindLaunch, {
    variables: { id },
  });
  return { loading, error, data };
}

export { getLaunches, queryLaunches, findLaunch }