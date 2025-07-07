import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import { checkSquareWithinBounds } from './moveFunctions';

const LONG_MOVE_MULTIPLIER: number = 2;

export default class Pawn extends Piece {
    private startingRow: number;
    private forwards: number;

    public constructor(player: Player) {
        super(player);
        this.startingRow = this.player === Player.WHITE ? 1 : 6;
        this.forwards = this.player === Player.WHITE ? 1 : -1;
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);

        let hasHadFirstMove: Boolean = !(pos.row == this.startingRow);
        let moves: Square[] = [];
        let shortMove = new Square(pos.row + this.forwards, pos.col);
        let longMove = new Square(pos.row + LONG_MOVE_MULTIPLIER * this.forwards, pos.col);

        if (checkSquareWithinBounds(shortMove)) {
            if (board.getPiece(shortMove) === undefined) {
                moves.push(shortMove);
                if (!hasHadFirstMove && checkSquareWithinBounds(longMove) && board.getPiece(longMove) === undefined) {
                    moves.push(longMove);
                }
            }
            
            moves = moves.concat(this.checkDiagonals(board, pos))
        }

        return moves;
    }

    private checkDiagonals(board: Board, pos: Square) {
        let moves: Square[] = []
        for (let i = -1; i <= 1; i += 2) {
            let diagonalMove = new Square(pos.row + this.forwards, pos.col + i);
            let otherPiece = board.getPiece(diagonalMove);
            if (otherPiece !== undefined && this.canTakePiece(otherPiece)) {
                moves.push(diagonalMove);
            }
        }
        return moves
    }
}
