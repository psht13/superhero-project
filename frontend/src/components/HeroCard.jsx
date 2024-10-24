import { Link } from "react-router-dom";

const HeroCard = ({ id, images, nickname }) => {
  return (
    <>
      <Link
        className="max-w-[200px] h-full flex flex-col gap-2 shadow-md rounded-xl overflow-hidden cursor-pointer"
        to={`/${id}`}>
        <img
          className="w-full h-[200px] object-cover"
          src={images[0]}
          alt={id}
        />
        <p className="text-center text-lg capitalize pb-2">{nickname}</p>
      </Link>
    </>
  );
};
export default HeroCard;
