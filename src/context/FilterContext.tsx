
import { createContext, useReducer } from "react";

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
  placeholderCardCount: 12,
  activePage: 1,
};

const ACTIONS = {
  SET: "set",
};

const reducer = (state: any, action: any) => {
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

const FilterContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setData = (props: { payload: any; name: any; }) => {
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

export default FilterContextProvider

export { FilterContext }