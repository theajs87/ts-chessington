import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    startingRow = this.player === Player.WHITE ? 1 : 6

    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);

        if (this.player === Player.WHITE) {
            let hasHadFirstMove: Boolean = !(pos.row == this.startingRow);
            let moves: Square[] = new Array(new Square(pos.row + 1, pos.col));
            if (!hasHadFirstMove) {
                moves.push(new Square(pos.row + 2, pos.col));
            }
            return moves;
        }
        else {
            let hasHadFirstMove: Boolean = !(pos.row == this.startingRow);
            let moves: Square[] = new Array(new Square(pos.row - 1, pos.col));
            if (!hasHadFirstMove) {
                moves.push(new Square(pos.row - 2, pos.col));
            }
            return moves;
        }
    }
}
