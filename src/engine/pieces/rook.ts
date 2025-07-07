import Piece from './piece';
import Player from '../player';
import Board from '../board';
import { lateralMoves } from './moveFunctions';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);
        return lateralMoves(pos);
    }
}
