import { FC } from "react";
import { ClearButtonProps } from "../interfaces/Props";
import { Cancel, Clear } from "@mui/icons-material";

const ClearButton: FC<ClearButtonProps> = ({ setData, payload, label, func, icon, className }) => {

  return (
    <button
      title="Clear"
      type="reset"
      tabIndex={0}
      aria-label="Clear"
      className={`flex mr-3 select-none cursor-pointer ${className}`}
      onClick={() => {
        setData({
          payload: 1,
          name: "activePage",
        });
        setData({
          payload: payload,
          name: label,
        });
        func();
      }}
    >
      {icon === "Clear" ? <Clear style={{ fontSize: "20px" }} /> :
        <Cancel style={{ fontSize: "20px" }} />
      }
    </button>
  )
}

export { ClearButton }