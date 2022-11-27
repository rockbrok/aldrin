import { FC } from "react";
import { ClearButtonProps } from "../interfaces/Props";
import { Cancel, Clear } from "@mui/icons-material";

const ClearButton: FC<ClearButtonProps> = ({ setData, payload, name, func, icon }) => {

  const Button = ({ icon }: any) => {
    switch (true) {
      case icon === "Clear":
        return <Clear style={{ fontSize: "20px" }} />;
      case icon === "Cancel":
        return <Cancel style={{ fontSize: "20px" }} />;
      default:
        return <Cancel style={{ fontSize: "20px" }} />;
    }
  }

  return (
    <div
      title="Clear"
      className="flex mr-3 
        select-none cursor-pointer"
      onClick={() => {
        setData({
          payload: 1,
          name: "activePage",
        });
        setData({
          payload: payload,
          name: name,
        });
        func();
      }}
    >
      <Button
        icon={icon}
      />
    </div>
  )
}

export { ClearButton }