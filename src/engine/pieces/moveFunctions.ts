import Board from "../board";
import GameSettings from "../gameSettings";
import Square from "../square";

export function checkSquareWithinBounds(square: Square) {
    return square.row >= 0 && square.col >= 0 && square.row < GameSettings.BOARD_SIZE && square.col < GameSettings.BOARD_SIZE
}