interface SearchProps {
  searchParams: any;
  setSearchParams: any;
}

interface TagProps {
  tagsList: { value: string | number | null; state: string }[];
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

interface ClearButtonProps {
  setData: any;
  payload: { value: string; label: string } | string | number;
  name: string;
  func?: any | undefined;
  icon: string;
  className?: string;
}

export type { QueryProps, SelectProps, ClearButtonProps, TagProps, SearchProps }