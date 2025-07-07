import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import { checkSquareWithinBounds } from './moveFunctions';

const LONG_MOVE_MULTIPLIER: number = 2;

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
        let longMove = new Square(pos.row + LONG_MOVE_MULTIPLIER * forwards, pos.col);

        if (checkSquareWithinBounds(shortMove)) {
            if (board.getPiece(shortMove) === undefined) {
                moves.push(shortMove);
                if (!hasHadFirstMove && checkSquareWithinBounds(longMove) && board.getPiece(longMove) === undefined) {
                    moves.push(longMove);
                }
            }
            
            for (let i = -1; i <= 1; i += 2) {
                let diagonalMove = new Square(shortMove.row, pos.col + i);
                let otherPiece = board.getPiece(diagonalMove);
                if (otherPiece !== undefined && this.canTakePiece(otherPiece)) {
                    moves.push(diagonalMove);
                }
            }
        }

        return moves;
    }
}
