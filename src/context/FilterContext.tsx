import { createContext, useReducer } from "react";
import { Outlet, useLocation } from "react-router-dom";

const FilterContext = createContext(null as any);

const initialState = {
  orbit: {
    value: "",
    label: "All",
  },
  year: {
    value: "",
    label: "All",
  },
  type: {
    value: "",
    label: "All",
  },
  query: "",
  limit: "",
  // id: "",
  placeholderCardCount: 12,
  activePage: 1,
};

const ACTIONS = {
  SET: "set",
};

const reducer = (state: any, action: { type: string, name: string, payload: object | string | number }) => {
  switch (action.type) {
    case ACTIONS.SET:
      return {
        ...state,
        [action.name]: action.payload
      };
    default:
      return initialState;
  }
}

const FilterContextProvider = ({ children, stateVar }: any) => {
  const [state, dispatch] = useReducer(reducer, stateVar);

  const setData = (props: { payload: object | string | number; name: string; }) => {
    dispatch({
      type: ACTIONS.SET,
      payload: props.payload,
      name: props.name,
    });
  };

  return (
    <FilterContext.Provider value={{ state, setData }}>
      {children}
    </FilterContext.Provider>
  );
}

const Context = ({ children }: any) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const year = params.get("year");
  const orbit = params.get("orbit");
  const type = params.get("type");
  const query = params.get("q");

  const initialState = {
    orbit: {
      value: orbit || "",
      label: "All",
    },
    year: {
      value: year || "",
      label: "All",
    },
    type: {
      value: type || "",
      label: "All",
    },
    query: query || "",
    limit: "",
    placeholderCardCount: 12,
    activePage: 1,
  };

  return (
    <FilterContextProvider stateVar={initialState}>
      {/* <Outlet /> */}
      {children}
    </FilterContextProvider>
  );
};

export default Context;

export { FilterContext }