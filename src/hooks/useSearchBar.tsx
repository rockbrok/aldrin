import { getLaunchName } from "./useLaunchMap";

const handleClick = ({ query, e, setData, navigate, searchParams, setSearchParams }: any) => {
  e.preventDefault();
  setData({
    payload: query,
    name: "query",
  })
  navigate("/search");
  searchParams.set("q", query);
  setSearchParams(searchParams);
}

const handleKeyDown = ({ setDropdownIsOpen, navigate, e, results, setQuery2, query, inputRef, focusedIndex, setFocusedIndex }: any) => {
  const { key } = e;
  const length = results().length + 1;
  let nextIndexCount = -1;
  const blurInput = () => inputRef.current != null && inputRef.current.blur();

  const condition = () => {
    if (nextIndexCount > -1 && nextIndexCount < 6) {
      const data = results()[nextIndexCount];
      setQuery2(data.name);
    } else if (nextIndexCount === 6) {
      setQuery2(query)
    }
  }

  switch (true) {
    case (e.key === "ArrowDown"):
      nextIndexCount = (focusedIndex + 1) % length;
      setFocusedIndex(nextIndexCount);
      condition();
      break;
    case (key === "ArrowUp"):
      e.preventDefault();
      nextIndexCount = (focusedIndex + length - 1) % length;
      setFocusedIndex(nextIndexCount);
      condition();
      break;
    case (key === "Escape"):
      blurInput();
      setDropdownIsOpen(false);
      setFocusedIndex(-1);
      break;
    case (key === "Enter"):
      e.preventDefault();
      navigate(`/search/${getLaunchName(results()[focusedIndex])}`)
      break;
  }
};

export { handleClick, handleKeyDown }