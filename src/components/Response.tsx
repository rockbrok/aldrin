import { Cached, Error as ERR, Block } from '@mui/icons-material';
import { ReactElement, ReactFragment } from "react";

const IconWrapper = (props: { children: string | ReactFragment | ReactElement, style?: string }) => (
  <div className={`flex flex-col items-center justify-center mt-auto" ${props.style}`}>
    {props.children}
  </div>
);

const Loading = () => (
  <IconWrapper style="w-full mt-28">
    <Cached className="animate-spin filter-blue" />
  </IconWrapper>
);

const Empty = () => (
  <IconWrapper style="w-full mt-28">
    <Block className="filter-blue" />
    No data
  </IconWrapper>
);

const Error = () => (
  <IconWrapper>
    <ERR />
    Error
  </IconWrapper>
);

export { Loading, Empty, Error }