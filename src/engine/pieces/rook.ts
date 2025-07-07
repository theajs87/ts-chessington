import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from '../gameSettings';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let pos = board.findPiece(this);
        let moves: Square[] = [];
    
        for (let i = 0; i < GameSettings.BOARD_SIZE; i++) {
            if (i !== pos.col) {
                moves.push(new Square(pos.row, i));
            }
            if (i !== pos.row) {
                moves.push(new Square(i, pos.col));
            }
        }

        return moves;
    }
}
