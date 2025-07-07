import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);
        let moves = [];

        for (let i = -1; i <= 1; i += 2) {
            for (let j = -1; j <= 1; j += 2) {
                moves.push(new Square(pos.row + 2 * i, pos.col + j));
                moves.push(new Square(pos.row + i, pos.col + 2 * j));
            }
        }

        return moves;
    }
}
