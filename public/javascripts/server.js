/**
 * In the server example, the only responsibility this file has is drawing the game of life boards
 */

var jenova = require("jenova");
var socket = io.connect('http://localhost:3000');
var gameOfLifeCanvas = document.getElementById('gameOfLife');

function generateBoard(board, canvas) {

	var ctx = canvas.getContext('2d'),
		width = canvas.width,
		height = canvas.height,
		cellHeight = height/ board.length,
		cellWidth = width / board[0].length;

	// Loop through the board and draw each cell
	board.forEach(function(row, rowIndex) {
		row.forEach(function(col, colIndex) {
			ctx.fillStyle = col ? '#ccc' : '#fff';
			ctx.fillRect(colIndex*cellWidth, rowIndex*cellHeight, cellWidth, cellHeight);
			ctx.strokeRect(colIndex*cellWidth, rowIndex*cellHeight, cellWidth, cellHeight);
		});
	});
}


// Whenever the server emits a new board, lets decompress it and draw it
socket.on('newBoard', function (compressedBoard) {
	var newBoard = jenova.expand(compressedBoard.compressed, compressedBoard.width);
	generateBoard(newBoard, gameOfLifeCanvas)
});