import { Dispatch, ReactFragment, SetStateAction } from "react";

interface QueryProps {
  data?: undefined | string | object | any;
  error?: unknown | any;
  isLoading?: boolean;
  setChecked?: Dispatch<SetStateAction<boolean>> | any;
}

interface SelectProps {
  setData: (arg0: { payload: any; name: string; }) => void;
  id: string;
  value: string;
  label: string;
  children: ReactFragment;
}

interface PaginationProps {
  activePage: number;
  pages: number;
  setData: any;
}

export type { QueryProps, SelectProps, PaginationProps }