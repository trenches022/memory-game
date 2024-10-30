import { useEffect, useState } from "react";
import GridSizeInput from "./GridSizeInput";
import GameStatus from "./GameStatus";
import Card from "./Card";

export const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [movesSize, setMovesSize] = useState(20);
  const [movesLeft, setMovesLeft] = useState(5);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);
  const [lose, setLose] = useState(false);

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setLose(false);
    setMovesLeft(movesSize);
  };

  const handleGridSizeChange = (size) => {
    setGridSize(size);
  };

  const handleMovesSizeChange = (size) => {
    setMovesSize(size);
    setMovesLeft(size);
  };

  const handleClick = (id) => {
    if (disabled || won || lose || flipped.includes(id)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      setMovesLeft((prev) => prev - 1);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      setFlipped([...flipped, id]);
      setMovesLeft((prev) => prev - 1);
      checkMatch(id);
    }
  };

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);

  useEffect(() => {
    initializeGame();
  }, [gridSize, movesSize]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) setWon(true);
    if (movesLeft <= 0 && !won) setLose(true);
  }, [solved, cards, movesLeft, won]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-600 p-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-200">Memory Game</h1>

      <GridSizeInput
        gridSize={gridSize}
        movesSize={movesSize}
        onGridSizeChange={handleGridSizeChange}
        onMovesSizeChange={handleMovesSizeChange}
      />

      <GameStatus movesLeft={movesLeft} won={won} lose={lose} />

      <div
        className="grid gap-2 mb-4 text-slate-200"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={isFlipped(card.id)}
            onClick={() => handleClick(card.id)}
          />
        ))}
      </div>

      <button
        onClick={initializeGame}
        className="mt-4 py-3 px-2 bg-purple-900 text-slate-200 rounded-lg hover:bg-purple-950 transition-colors"
      >
        {won ? "Zagraj ponownie" : "Zresetować"}
      </button>
    </div>
  );
};
