
// Using WebPack to load in our game of life module
var jenova = require("jenova");

// The simple (client) version works off calculates the next game-of-life board on the browser.
var initialBoard = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0]
];

// Helper function to generate a new board
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

	// Generate a new board, with a callback to recursively draw the next board available.
	jenova.next(board, function(newBoard) {
		setTimeout(generateBoard.bind(this, newBoard, canvas), 200);
	});
}

window.requestAnimationFrame(generateBoard.bind(this, initialBoard, document.getElementById('gameOfLife')));