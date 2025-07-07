import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import { checkSquareWithinBounds } from './moveFunctions';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
        this.isKing = true;
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);
        let moves: Square[] = []

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let move = new Square(pos.row + i, pos.col + j);
                let otherPiece = board.getPiece(move);

                if (!pos.equals(move) && this.checkValidityOfMove(board, move)) {
                    moves.push(move);
                }
            }
        }

        return moves;
    }
}
