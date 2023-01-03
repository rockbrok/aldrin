import { matchRoutes, useLocation } from "react-router-dom";
import { useEffect } from 'react';

const useRouteMatch = (setData: (arg0: { payload: boolean; name: string; }) => void) => {
  const location = useLocation();
  const routes = [{ path: "/search/:id" }]
  const route = matchRoutes(routes, location);

  const setBool = () => {
    switch (true) {
      case (route !== null):
        setData({
          payload: true,
          name: "isIDRoute",
        });
        break;
      case (route == null):
        setData({
          payload: false,
          name: "isIDRoute",
        });
    }
  }

  useEffect(() => setBool(), [location]);
}

export { useRouteMatch }
