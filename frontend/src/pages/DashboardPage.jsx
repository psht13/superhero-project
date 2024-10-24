import { useEffect } from "react";
import { useSuperheroes } from "../store/superheroes.store";

import HeroesList from "../components/HeroesList";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";

const DashboardPage = () => {
  const setHeroes = useSuperheroes((state) => state.getSuperheroes);
  const isError = useSuperheroes((state) => state.isError);
  const isLoading = useSuperheroes((state) => state.isLoading);

  useEffect(() => {
    const fetchHeroes = async () => await setHeroes();
    fetchHeroes();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <div className="w-full h-full flex justify-center, items-center p-12">
          <HeroesList />
        </div>
      )}
    </>
  );
};
export default DashboardPage;
