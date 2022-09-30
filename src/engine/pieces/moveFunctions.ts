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
    let currentSquare = new Square(pos.row + rowDirection, pos.col + colDirection);
    let moves: Square[] = [];

    while (checkSquareWithinBounds(currentSquare)) {
        if (board.getPiece(currentSquare) !== undefined) {
            break;
        }
        moves.push(currentSquare);
        currentSquare = new Square(currentSquare.row + rowDirection, currentSquare.col + colDirection);
    }

    return moves;
}

export function checkSquareWithinBounds(square: Square) {
    return square.row >= 0 && square.col >= 0 && square.row < GameSettings.BOARD_SIZE && square.col < GameSettings.BOARD_SIZE
}