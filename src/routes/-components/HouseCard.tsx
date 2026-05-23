import { HouseType } from "@lib/constants/houses";

type HouseCardProps = {
  house: HouseType;
  onClick: (house: HouseType) => void;
};

export const HouseCard = ({ house, onClick }: HouseCardProps) => {
  const handleClick = () => onClick(house);

  return (
    <button
      onClick={handleClick}
      className="relative isolate flex h-[350px] w-[260px] flex-col justify-end overflow-hidden rounded-2xl px-3 py-6 no-underline shadow-md shadow-zinc-950 transition-transform duration-300 hover:scale-105 hover:no-underline hover:shadow-xl"
    >
      <img
        src={`/houses/${house}.png`}
        alt={house}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </button>
  );
};
