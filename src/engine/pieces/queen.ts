import Piece from './piece';
import Player from '../player';
import Board from '../board';
import { diagonalMoves, lateralMoves } from './moveFunctions';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);

        return lateralMoves(board, pos).concat(diagonalMoves(board, pos));
    }
}
