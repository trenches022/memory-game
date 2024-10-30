const GameStatus = ({ movesLeft, won, lose }) => {
  return (
    <div className="text-center mb-4">
      <p className="text-slate-200 text-xl">Liczba ruchów: {movesLeft}</p>
      {lose && <p className="mt-4 text-4xl font-bold text-slate-200">Przegrałeś</p>}
      {won && <p className="mt-4 text-4xl font-bold text-slate-200">Wygrałeś!</p>}
    </div>
  );
};

export default GameStatus;
