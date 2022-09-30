import GameSettings from "../gameSettings";
import Square from "../square";

export function lateralMoves(pos: Square) {
    let moves: Square[] = [];
    
    for (let i = 0; i < GameSettings.BOARD_SIZE; i++) {
        if (i !== pos.col) {
            moves.push(new Square(pos.row, i));
        }
        if (i !== pos.row) {
            moves.push(new Square(i, pos.col));
        }
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