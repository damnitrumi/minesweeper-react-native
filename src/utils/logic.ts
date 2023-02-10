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

export const cloneBoard = (board: BoardProps) => {
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

export const openField = (board: BoardProps, row: number, column: number) => {
  const field = board[row][column];

  if (field.flagged || hadExplosion(board) || wonGame(board)) {
    return false;
  }

  if (!field.opened) {
    field.opened = true;
    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column).forEach((n: BoardProps[0][0]) =>
        openField(board, n.row, n.column),
      );
    } else {
      const neighbors = getNeighbors(board, row, column);
      field.nearMines = neighbors.filter(
        (n: BoardProps[0][0]) => n.mined,
      ).length;
    }
  }

  return true;
};

const fields = (board: any) => [].concat(...board);

export const hadExplosion = (board: BoardProps) =>
  fields(board).filter((field: BoardProps[0][0]) => field.exploded).length > 0;

const pendding = (field: BoardProps[0][0]) =>
  (field.mined && !field.flagged) || (!field.mined && !field.opened);

export const wonGame = (board: BoardProps) =>
  fields(board).filter(pendding).length === 0;

export const showMines = (board: BoardProps) =>
  fields(board)
    .filter((field: BoardProps[0][0]) => field.mined)
    .forEach((field: BoardProps[0][0]) => (field.opened = true));

export const invertFlag = (board: BoardProps, row: number, column: number) => {
  const field = board[row][column];

  if (!field.opened) {
    field.flagged = !field.flagged;
  }
};

export const flagsUsed = (board: BoardProps): number => {
  return fields(board).filter((field: BoardProps[0][0]) => field.flagged)
    .length;
};
