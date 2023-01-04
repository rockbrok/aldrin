import { spliceTags } from "./useTags";

const handleSelect = ({ setData, state, label, item, searchParams, setSearchParams }: any) => {
  setData({
    payload: item.value,
    name: label,
  });
  setData({
    payload: 1,
    name: "activePage",
  });
  spliceTags(state, label);
  state.tags.push({ value: item.value, label });
  searchParams.set(label, item.value);
  setSearchParams(searchParams);
}

export { handleSelect }