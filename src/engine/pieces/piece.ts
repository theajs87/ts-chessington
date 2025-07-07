import Player from '../player';
import Board from '../board';
import Square from '../square';
import { checkSquareWithinBounds } from './moveFunctions';

export default class Piece {
    public player: Player;
    public isKing: Boolean;

    public constructor(player: Player) {
        this.player = player;
        this.isKing = false;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    private checkDirection(board: Board, pos: Square, rowDirection: number, colDirection: number) {
        let currentSquare = new Square(pos.row + rowDirection, pos.col + colDirection);
        let moves: Square[] = [];

        while (checkSquareWithinBounds(currentSquare)) {
            let otherPiece = board.getPiece(currentSquare);
            if (otherPiece !== undefined) {
                if (this.canTakePiece(otherPiece)) {
                    moves.push(currentSquare);
                }
                break;
            }
            moves.push(currentSquare);
            currentSquare = new Square(currentSquare.row + rowDirection, currentSquare.col + colDirection);
        }

        return moves;
    }

    protected canTakePiece(otherPiece: Piece) {
        return otherPiece.player !== this.player && !otherPiece.isKing
    }

    protected lateralMoves(board: Board, pos: Square) {
        let moves: Square[] = [];

        moves = moves.concat(this.checkDirection(board, pos, -1, 0));
        moves = moves.concat(this.checkDirection(board, pos, 1, 0));
        moves = moves.concat(this.checkDirection(board, pos, 0, -1));
        moves = moves.concat(this.checkDirection(board, pos, 0, 1));
        return moves;
    }

    protected diagonalMoves(board: Board, pos: Square) {
        let moves: Square[] = [];

        moves = moves.concat(this.checkDirection(board, pos, 1, 1));
        moves = moves.concat(this.checkDirection(board, pos, 1, -1));
        moves = moves.concat(this.checkDirection(board, pos, -1, 1));
        moves = moves.concat(this.checkDirection(board, pos, -1, -1));

        return moves;
    }

    protected checkValidityOfMove(board: Board, move: Square) {
        let otherPiece = board.getPiece(move);
        return checkSquareWithinBounds(move) && (otherPiece === undefined || this.canTakePiece(otherPiece))
    }
}
