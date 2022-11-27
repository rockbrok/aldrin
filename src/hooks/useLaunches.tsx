import { useQuery, useLazyQuery } from "@apollo/client";
import { GetLaunches } from '../queries/GetLaunches';
import { FindLaunch } from "../queries/FindLaunch";

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

const findLaunch = (id: string) => {
  const [getLaunch, { loading, error, data }] = useLazyQuery(FindLaunch, {
    variables: { id },
  });

  return { getLaunch, loading, error, data };
}

export { getLaunches, findLaunch }