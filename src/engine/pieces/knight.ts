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
                if (checkSquareWithinBounds(firstMove)) {
                    moves.push(firstMove);
                }
                let secondMove: Square = new Square(pos.row + i, pos.col + 2 * j)
                if (checkSquareWithinBounds(secondMove)) {
                    moves.push(secondMove);
                }
            }
        }

        return moves;
    }
}
