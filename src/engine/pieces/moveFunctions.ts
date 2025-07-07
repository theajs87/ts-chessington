import Board from "../board";
import GameSettings from "../gameSettings";
import Square from "../square";

export function lateralMoves(board: Board, pos: Square) {
    let moves: Square[] = [];

    for (let i = pos.row - 1; i >= 0; i--) {
        if (board.getPiece(new Square(i, pos.col)) !== undefined) {
            break;
        }
        moves.push(new Square(i, pos.col));
    }
    for (let i = pos.row + 1; i < GameSettings.BOARD_SIZE; i++) {
        if (board.getPiece(new Square(i, pos.col)) !== undefined) {
            break;
        }
        moves.push(new Square(i, pos.col));
    }

    for (let i = pos.col - 1; i >= 0; i--) {
        if (board.getPiece(new Square(pos.row, i)) !== undefined) {
            break;
        }
        moves.push(new Square(pos.row, i));
    }
    for (let i = pos.col + 1; i < GameSettings.BOARD_SIZE; i++) {
        if (board.getPiece(new Square(pos.row, i)) !== undefined) {
            break;
        }
        moves.push(new Square(pos.row, i));
    }

    return moves;
}

export function diagonalMoves(pos: Square) {
    let moves: Square[] = [];
        
    for (let i = 1; (pos.row + i < GameSettings.BOARD_SIZE) && (pos.col + i < GameSettings.BOARD_SIZE); i++) {
        moves.push(new Square(pos.row + i, pos.col + i));
    }
    for (let i = 1; (pos.row + i < GameSettings.BOARD_SIZE) && (pos.col - i >= 0); i++) {
        moves.push(new Square(pos.row + i, pos.col - i));
    }
    for (let i = 1; (pos.row - i >= 0) && (pos.col + i < GameSettings.BOARD_SIZE); i++) {
        moves.push(new Square(pos.row - i, pos.col + i));
    }
    for (let i = 1; (pos.row - i >= 0) && (pos.col - i >= 0); i++) {
        moves.push(new Square(pos.row - i, pos.col - i));
    }

    return moves;
}