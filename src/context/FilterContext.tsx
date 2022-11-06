
import { createContext, useReducer } from "react";

const FilterContext = createContext(null as any);

const initialState = {
  status: "",
  type: "",
  year: "",
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