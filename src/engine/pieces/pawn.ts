import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    private startingRow: number;

    public constructor(player: Player) {
        super(player);
        this.startingRow = this.player === Player.WHITE ? 1 : 6
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);

        let hasHadFirstMove: Boolean = !(pos.row == this.startingRow);
        let forwards = this.player === Player.WHITE ? 1 : -1
        let moves: Square[] = [];
        let shortMove = new Square(pos.row + forwards, pos.col);
        let longMove = new Square(pos.row + 2 * forwards, pos.col);

        if (board.getPiece(shortMove) === undefined) {
            moves.push(shortMove);
            if (!hasHadFirstMove && board.getPiece(longMove) === undefined) {
                moves.push(longMove);
            }
        }

        return moves;
    }
}
