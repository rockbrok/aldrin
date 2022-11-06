import axios from 'axios';
import { useQuery } from 'react-query';

const useLaunches = (state: { status: string; type: string; year: number, activePage: number; }) => {
  const params = {
    enabled: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  };

  const offset = `&offset=${(state.activePage - 1) * 12}`;

  const { isLoading, error, data, refetch } = useQuery(
    ["capsules", state.activePage],
    async () => await axios.get("https://api.spacexdata.com/v3/launches?" + state.year + state.status + state.type + "&limit=12" + offset),
    params
  );

  const items: string = data?.headers["spacex-api-count"] ?? '';
  const itemsCount = Math.ceil(parseInt(items) / 12);

  return { isLoading, error, data, refetch, itemsCount };
}

export { useLaunches }