const Card = ({ card, isFlipped, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300 ${
        isFlipped ? "bg-blue-600 text-slate-200" : "bg-purple-800 text-slate-200"
      }`}
    >
      {isFlipped ? card.number : "?"}
    </div>
  );
};

export default Card;
