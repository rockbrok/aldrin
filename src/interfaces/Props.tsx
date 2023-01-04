interface SearchProps {
  state?: any;
  setData: (arg0: {
    payload: { value: string; label: string } | number | string | boolean; name: string;
  }) => void;
  searchParams: any;
  setSearchParams: any;
}

interface QueryProps {
  state: any;
  setData: (arg0: {
    payload: { value: string; label: string } | number | string | boolean; name: string;
  }) => void;
  launches: {
    loading: boolean,
    error: any,
    data: any,
    count: number
  };
}

interface SelectProps {
  items: any[];
  label: string;
  showItems?: boolean;
  state: any;
  stateKey: string;
  setData: (arg0: {
    payload: { value: string; label: string } | number | string; name: string;
  }) => void;
}

interface ClearButtonProps {
  setData: any;
  payload: { value: string; label: string } | string | number;
  label: string;
  func?: any | undefined;
  icon: string;
  className?: string;
}

export type { QueryProps, SelectProps, ClearButtonProps, SearchProps }