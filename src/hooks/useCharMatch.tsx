const charMatch = ({ result, query }: any) => {
  const textArray = result.split(RegExp(query, "ig"));
  const match = result.match(RegExp(query, "ig"));

  return (
    <>
      {textArray.map((item: any, index: number) => (
        <span key={index}>
          {item}
          {index !== textArray.length - 1 && match && (
            <b>{match[index]}</b>
          )}
        </span>
      ))}
    </>
  );
}

export { charMatch }