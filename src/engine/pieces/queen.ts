import Piece from './piece';
import Player from '../player';
import Board from '../board';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);

        return this.lateralMoves(board, pos).concat(this.diagonalMoves(board, pos));
    }
}
