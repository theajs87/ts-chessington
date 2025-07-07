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
        let moves = [];

        for (let i = -1; i <= 1; i += 2) {
            for (let j = -1; j <= 1; j += 2) {
                let firstMove: Square = new Square(pos.row + 2 * i, pos.col + j)
                let otherPiece1 = board.getPiece(firstMove);
                if (checkSquareWithinBounds(firstMove) && (otherPiece1 === undefined || this.canTakePiece(otherPiece1))) {
                    moves.push(firstMove);
                }
                let secondMove: Square = new Square(pos.row + i, pos.col + 2 * j)
                let otherPiece2 = board.getPiece(secondMove);
                if (checkSquareWithinBounds(secondMove) && (otherPiece2 === undefined || this.canTakePiece(otherPiece2))) {
                    moves.push(secondMove);
                }
            }
        }

        return moves;
    }
}
