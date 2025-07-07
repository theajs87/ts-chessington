import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);
        if (this.player === Player.WHITE) {
            return new Square(pos.row + 1, pos.col);
        }
        else {
            return new Square(pos.row - 1, pos.col);
        }
    }
}
