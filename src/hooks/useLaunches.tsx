import { useQuery } from "@apollo/client";
import { GetLaunches } from '../queries/GetLaunches';
import { FindLaunch } from "../queries/FindLaunch";
import { QueryLaunches } from "../queries/QueryLaunches";

const getLaunches = (state: {
  query: string; orbit: { value: string }; activePage: number;
  type: { value: string }; year: { value: string },
}) => {
  const offset = (state.activePage - 1) * 12;

  const { loading, error, data, client } = useQuery(GetLaunches, {
    variables: {
      offset, year: state.year.value, type: state.type.value,
      orbit: state.orbit.value, name: state.query
    },
  });

  const count: number = Math.ceil(data?.launchesPastResult?.result?.totalCount / 12);

  return { loading, error, data, count, offset, client };
}

const queryLaunches = (state: {
  query: string; orbit: { value: string };
  type: { value: string }; year: { value: string },
}) => {

  const { loading, error, data, client } = useQuery(QueryLaunches, {
    variables: {
      year: state.year.value, type: state.type.value,
      orbit: state.orbit.value, name: state.query
    },
  });

  return { loading, error, data, client };
}

const findLaunch = (id: string) => {
  const { loading, error, data } = useQuery(FindLaunch, {
    variables: { id },
  });

  return { loading, error, data };
}

export { getLaunches, queryLaunches, findLaunch }