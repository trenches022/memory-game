const GridSizeInput = ({ gridSize, movesSize, onGridSizeChange, onMovesSizeChange }) => {
  const handleGridSize = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) onGridSizeChange(size);
  };

  const handleMovesSize = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 1 && size <= 30) onMovesSizeChange(size);
  };

  return (
    <div className="mb-4">
      <label className="mr-2 text-slate-200">Ilość Klatek: (max 10)</label>
      <input
        type="number"
        value={gridSize}
        onChange={handleGridSize}
        min="2"
        max="10"
        className="border-2 border-gray-300 rounded px-2 py-1"
      />
      <label className="mr-2 ml-2 text-slate-200">Max ilość ruchów:</label>
      <input
        type="number"
        value={movesSize}
        onChange={handleMovesSize}
        min="1"
        max="25"
        className="border-2 border-gray-300 rounded px-2 py-1"
      />
    </div>
  );
};

export default GridSizeInput;
