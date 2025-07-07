import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import { checkSquareWithinBounds } from './moveFunctions';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);
        let moves: Square[] = [];

        for (let i = -1; i <= 1; i += 2) {
            for (let j = -1; j <= 1; j += 2) {
                moves = moves.concat(this.getLMoves(board, pos, i, j*2));
                moves = moves.concat(this.getLMoves(board, pos, i*2, j));
            }
        }

        return moves;
    }

    private getLMoves(board: Board, pos: Square, rowDirection: number, colDirection: number) {
        let move: Square = new Square(pos.row + rowDirection, pos.col + colDirection);
        let otherPiece = board.getPiece(move);
        if (this.checkValidityOfMove(board, move)) {
            return [move];
        }
        return [];
    }
}
