// Components
import { Loading, Empty, Error } from '../components/Response';
import { useOutletContext } from 'react-router-dom';

const UseLaunch = ({ children }: any) => {
  const [launch]: any = useOutletContext();

  switch (true) {
    case launch.loading:
      return <Loading />;
    case launch.data == undefined:
      return <Empty />;
    case Boolean(launch.error):
      return <Error />;
    default:
      return <>{children}</>;
  }
}

export { UseLaunch }