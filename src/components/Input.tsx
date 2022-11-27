import { FC } from 'react';
import { InputProps } from '../interfaces/Props';
import { Search } from "@mui/icons-material";
// components
import { ClearButton } from './ClearButton';

const Input: FC<InputProps> = ({ state, setData }) => {
  const inputFocus = () => {
    const input = document.querySelector('input');
    input?.focus();
  }

  const handleChange = (e: { target: { value: string; }; }) => {
    const REGEX = /^[a-zA-Z0-9]+$/;
    // if value is not blank, then test the regex
    if (e.target.value === "" || REGEX.test(e.target.value)) {
      setData({
        payload: e.target.value,
        name: "query",
      })
    }
  }

  return (
    <div className="flex flex-col gap-0.5 w-[100%] row-start-1 row-end-2 col-span-2">
      <div
        className="relative row-start-1 row-end-2 col-span-3 flex flex-row items-center h-[46px] w-full bg-grey rounded-sm py-1 cursor-default"
        onClick={inputFocus}
      >
        <Search
          className="absolute ml-2 select-none"
          style={{ fontSize: "20px" }}
        />
        <input
          type="text"
          role="search"
          spellCheck="false"
          placeholder="Search"
          className="relative placeholder:text-black w-full bg-transparent rounded-sm mx-9 m-2 focus:outline-none cursor-text select-none"
          value={state.query}
          onChange={handleChange}
        />
        {state.query.length !== 0 ?
          <ClearButton
            icon="Clear"
            setData={setData}
            payload=""
            name="query"
          />
          : null}
      </div>
    </div>
  );
}

export { Input }