import { useSuperheroes } from "../store/superheroes.store";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const pagination = useSuperheroes((state) => state.pagination);
  console.log(pagination);

  const setPage = useSuperheroes((state) => state.setPage);
  const [params, setParams] = useSearchParams();

  // Ensure we read the page from the query parameter or default to 1
  const currentPage = parseInt(params.get("page")) || 1;

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setPage(nextPage);
    setParams({ page: nextPage });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setPage(prevPage);
      setParams({ page: prevPage });
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <PageBtn
        direction="left"
        clickHandler={handlePreviousPage}
        isBlocked={currentPage <= 1}
      />
      <p className="flex flex-col gap-2 items-center justify-center">
        <span>Page</span>
        <span>
          {currentPage} | {pagination.totalPages}
        </span>
      </p>
      <PageBtn
        direction="right"
        clickHandler={handleNextPage}
        isBlocked={!pagination.hasNextPage}
      />
    </div>
  );
};

const PageBtn = ({ direction, clickHandler, isBlocked }) => {
  return (
    <button
      type="button"
      onClick={clickHandler}
      disabled={isBlocked}
      className="flex justify-center items-center rounded-full w-20 h-20
      outline-none border border-slate-300 bg-transparent disabled:cursor-not-allowed">
      {direction === "right" ? <GoArrowRight /> : <GoArrowLeft />}
    </button>
  );
};

export default Pagination;
