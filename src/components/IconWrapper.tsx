import { ReactFragment, ReactElement } from "react";

const IconWrapper = (props: { children: string | ReactFragment | ReactElement, style?: string }) => (
  <div className={`flex flex-col items-center justify-center mt-auto" ${props.style}`}>
    {props.children}
  </div>
);

export { IconWrapper }