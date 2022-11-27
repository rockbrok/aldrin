import { Dispatch, SetStateAction } from "react";

interface QueryProps {
  data?: undefined | string | object | any;
  error?: unknown | any;
  loading?: boolean;
  setChecked?: Dispatch<SetStateAction<boolean>> | any;
  query?: string;
  name?: any;
  launches?: any;
  activePage?: number;
  items?: any;
  state?: any;
  setData?: any;
}

interface SelectProps {
  setData: (arg0: { payload: { value: string; label: string } | number; name: string; }) => void;
  items?: any[];
  state: {
    label: string,
    value: string
  };
  id: string;
  helper?: string;
  tagsList: { value: string | number; state: string }[];
}

interface TagProps {
  tagsList: { value: string | number; state: string, index: number }[];
  setData: (arg0: { payload: { value: string; label: string } | number; name: string; }) => void;
}

interface InputProps {
  setData: (arg0: { payload: string | number; name: string; }) => void;
  state: {
    query: string
  };
}

interface ClearButtonProps {
  setData: any;
  payload: { value: string; label: string } | string | number;
  name: string;
  func?: any | undefined;
  icon: string;
}

interface PaginationProps {
  setData: (arg0: { payload: number; name: string; }) => void;
  launches: {
    count: number,
    client: any
  }
  state: {
    activePage: number
  }
}

export type { QueryProps, SelectProps, InputProps, ClearButtonProps, PaginationProps, TagProps }