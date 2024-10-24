import { useParams } from "react-router-dom";

const HeroDescriptionPage = () => {
  const { heroId } = useParams();
  return <div> {heroId}</div>;
};
export default HeroDescriptionPage;
