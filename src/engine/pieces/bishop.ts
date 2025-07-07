import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);
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
}
