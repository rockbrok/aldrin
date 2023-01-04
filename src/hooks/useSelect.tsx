const handleSelect = ({ setData, state, label, item, searchParams, setSearchParams }: any) => {
  setData({
    payload: item.value,
    name: label,
  });
  setData({
    payload: 1,
    name: "activePage",
  });
  state.tags.map((item: { value: string, label: string }, index: number) => {
    if (item.label == label) {
      state.tags.splice(index, 1);
    }
  });
  state.tags.push({ value: item.value, label });
  searchParams.set(label, item.value);
  setSearchParams(searchParams);
}

export { handleSelect }