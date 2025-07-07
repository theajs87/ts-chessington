import Board from "../board";
import GameSettings from "../gameSettings";
import Square from "../square";

export function lateralMoves(board: Board, pos: Square) {
    let moves: Square[] = [];

    moves = moves.concat(checkDirection(board, pos, -1, 0));
    moves = moves.concat(checkDirection(board, pos, 1, 0));
    moves = moves.concat(checkDirection(board, pos, 0, -1));
    moves = moves.concat(checkDirection(board, pos, 0, 1));

    return moves;
}

export function diagonalMoves(board: Board, pos: Square) {
    let moves: Square[] = [];
        
    moves = moves.concat(checkDirection(board, pos, 1, 1));
    moves = moves.concat(checkDirection(board, pos, 1, -1));
    moves = moves.concat(checkDirection(board, pos, -1, 1));
    moves = moves.concat(checkDirection(board, pos, -1, -1));

    return moves;
}

function checkDirection(board: Board, pos: Square, rowDirection: number, colDirection: number) {
    let currentRow: number = pos.row + rowDirection;
    let currentCol: number = pos.col + colDirection;
    let moves: Square[] = [];

    while (currentRow >= 0 && currentCol >= 0 && currentRow < GameSettings.BOARD_SIZE && currentCol < GameSettings.BOARD_SIZE) {
        let square: Square = new Square(currentRow, currentCol);
        if (board.getPiece(square) !== undefined) {
            break;
        }
        moves.push(square);
        currentRow += rowDirection;
        currentCol += colDirection;
    }

    return moves;
}