import { useState, useEffect } from "react";

const cardCount = ({ launches, state }: any) => {
  const totalCount = async () => await launches?.data?.launchesPastResult?.result.totalCount;
  const pagesFilled: number = Math.floor(Number(totalCount()) / state.maxCards);
  const lastPage = pagesFilled + 1;
  const cardsOnLastPage = Number(totalCount()) % state.maxCards;

  const [total, setTotal] = useState(state.maxCards);
  useEffect(() => setTotal(cardsOnLastPage), [state]);

  switch (true) {
    case lastPage == state.activePage && cardsOnLastPage !== 0:
    case Number(totalCount()) < state.maxCards:
      return total;
    default:
      return state.maxCards;
  }
}

export { cardCount }