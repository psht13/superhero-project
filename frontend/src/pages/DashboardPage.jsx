import { useEffect } from "react";
import { useSuperheroes } from "../store/superheroes.store";

import HeroesList from "../components/HeroesList";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";

const DashboardPage = () => {
  const [params, setParams] = useSearchParams();

  // Get current page from URL params or fallback to default (1)
  const pageState = parseInt(params.get("page")) || 1;

  const setHeroes = useSuperheroes((state) => state.getSuperheroes);
  const isError = useSuperheroes((state) => state.isError);
  const isLoading = useSuperheroes((state) => state.isLoading);

  useEffect(() => {
    const fetchHeroes = async () => {
      await setHeroes(pageState); // Pass the current page to fetch heroes
    };

    fetchHeroes();

    // Update URL with pageState if params do not match
    if (params.get("page") !== String(pageState)) {
      setParams({ page: pageState });
    }
  }, [pageState, setParams, setHeroes]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <div className="w-full h-full flex flex-col justify-center items-center px-12 py-24 gap-12">
          <HeroesList />
          <Pagination />
        </div>
      )}
    </>
  );
};

export default DashboardPage;
