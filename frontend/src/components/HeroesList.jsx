import { useSuperheroes } from "../store/superheroes.store";
import HeroCard from "./HeroCard";

const HeroesList = () => {
  const superheroes = useSuperheroes((state) => state.superheroes);

  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center w-full gap-4">
        {superheroes.map((hero) => (
          <HeroCard
            key={hero._id}
            id={hero._id}
            images={hero.images}
            nickname={hero.nickname}
          />
        ))}
      </div>
    </div>
  );
};
export default HeroesList;
