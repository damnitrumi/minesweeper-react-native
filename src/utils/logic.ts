export type BoardProps = {
  row: number;
  column: number;
  opened: boolean;
  flagged: boolean;
  mined: boolean;
  exploded: boolean;
  nearMines: number;
}[][];

const createBoard = (rows: number, columns: number): BoardProps => {
  return Array(rows)
    .fill(0)
    .map((_, row) => {
      return (
        Array(columns)
          .fill(0)
          // eslint-disable-next-line @typescript-eslint/no-shadow
          .map((_, column) => {
            return {
              row,
              column,
              opened: false,
              flagged: false,
              mined: false,
              exploded: false,
              nearMines: 0,
            };
          })
      );
    });
};

const spreadMines = (board: BoardProps, minesAmount: number) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const rowSel = parseInt(`${Math.random() * rows}`, 10);
    const columnSel = parseInt(`${Math.random() * columns}`, 10);

    if (!board[rowSel][columnSel].mined) {
      board[rowSel][columnSel].mined = true;
      minesPlanted++;
    }
  }
};

export const createMinedBoard = (
  rows: number,
  columns: number,
  minesAmount: number,
) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
};

const cloneBoard = (board: BoardProps) => {
  return board.map(rows => {
    return rows.map(field => {
      return {...field};
    });
  });
};

const getNeighbors = (board: BoardProps, row: number, column: number) => {
  const neighbors: any = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  rows.forEach(r => {
    columns.forEach(c => {
      const different = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;

      if (different && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });
  return neighbors;
};

const safeNeighborhood = (board: BoardProps, row: number, column: number) => {
  const safes = (result: boolean, neighbor: BoardProps[0][0]) =>
    result && !neighbor.mined;
  return getNeighbors(board, row, column).reduce(safes, true);
};
