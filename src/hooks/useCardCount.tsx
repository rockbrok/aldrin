const useCardCount = ({ launches, state }: any) => {
  const totalCount = launches?.data?.launchesPastResult?.result?.totalCount;
  const pagesFilled: number = Math.floor(totalCount / state.maxCards);
  const lastPage = pagesFilled + 1;
  const cardsOnLastPage = totalCount % state.maxCards;

  switch (true) {
    case lastPage == state.activePage && cardsOnLastPage !== 0:
    case totalCount < state.maxCards:
      return cardsOnLastPage;
    default:
      return state.maxCards;
  }
}

export { useCardCount }