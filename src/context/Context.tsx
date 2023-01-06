import { createContext, useReducer } from "react";

const Context = createContext(null as any);

const ACTIONS = {
  SET: "set",
};

const reducer = (state: any, action: { type: string, name: string, payload: object | string | number | boolean }) => {
  switch (action.type) {
    case ACTIONS.SET:
      return {
        ...state,
        [action.name]: action.payload
      };
  }
}

const ContextProvider = ({ children }: any) => {
  const params = new URLSearchParams(window.location.search);

  const initialState = {
    orbit: params.get("orbit") ?? "",
    year: params.get("year") ?? "",
    type: params.get("type") ?? "",
    query: params.get("q") ?? "",
    isIDRoute: false,
    maxCards: 12,
    activePage: 1,
    tags: [],
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
    <Context.Provider value={{ state, setData }}>
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider }