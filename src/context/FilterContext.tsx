import { createContext, useReducer } from "react";
import { useLocation } from "react-router-dom";

const FilterContext = createContext(null as any);

const ACTIONS = {
  SET: "set",
};

const reducer = (state: any, action: {
  type: string, name: string, payload: object | string | number | boolean
}) => {
  switch (action.type) {
    case ACTIONS.SET:
      return {
        ...state,
        [action.name]: action.payload
      };
  }
}

const FilterContextProvider = ({ children }: any) => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const initialState = {
    orbit: params.get("orbit") ?? "",
    year: params.get("year") ?? "",
    type: params.get("type") ?? "",
    query: params.get("q") ?? "",
    isIDRoute: false,
    placeholderCardCount: 12,
    activePage: 1,
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const setData = (props: { payload: object | string | number | boolean; name: string; }) => {
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

export { FilterContext, FilterContextProvider }