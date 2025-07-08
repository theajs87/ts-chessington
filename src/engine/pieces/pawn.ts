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
        moves = moves.concat(this.checkEnPassant(board, pos))
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

    private checkEnPassant(board: Board, pos: Square) {
        let toEnPassant = board.lastLongMovePawn;
        if (toEnPassant !== undefined) {
            let enPassantPos = board.findPiece(toEnPassant);
            if (this.canTakePiece(toEnPassant) && enPassantPos.row === pos.row && Math.abs(enPassantPos.col - pos.col) === 1) {
                return [new Square(enPassantPos.row + this.forwards, enPassantPos.col)];
            }
        }
        return [];
    }

    override moveTo(board: Board, newSquare: Square) {
        let originalPos = board.findPiece(this);
        let opposingPiece = board.getPiece(newSquare);
        super.moveTo(board, newSquare);
        if (Math.abs(originalPos.row - newSquare.row) === 2) {
            board.lastLongMovePawn = this;
        }
        if (opposingPiece === undefined && newSquare.col !== originalPos.col) {
            board.setPiece(new Square(newSquare.row - this.forwards, newSquare.col), undefined);
        }
    }
}
