import { Dispatch, SetStateAction } from "react";

interface SearchProps {
  searchParams: any;
  setSearchParams: any;
}

interface TagProps {
  tagsList: { value: string | number; state: string, index: number }[];
  setData: (arg0: {
    payload: { value: string; label: string } | number; name: string;
  }) => void;
}

interface QueryProps {
  state?: any;
  setData: (arg0: {
    payload: { value: string; label: string } | number | string; name: string;
  }) => void;
  launches?: any;
}

interface SelectProps {
  items: any[];
  id: string;
  helper?: string;
  showItems?: boolean;
  tagsList: { value: string | number; state: string }[];
}

interface PopupProps {
  data?: undefined | string | object | any;
  setChecked?: Dispatch<SetStateAction<boolean>> | any;
}

interface ClearButtonProps {
  setData: any;
  payload: { value: string; label: string } | string | number;
  name: string;
  func?: any | undefined;
  icon: string;
  className?: string;
}

export type { QueryProps, SelectProps, ClearButtonProps, TagProps, PopupProps, SearchProps }