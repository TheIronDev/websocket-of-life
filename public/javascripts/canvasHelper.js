/**
 * This module exposes a set of canvas-related helpers for drawing the game of life.
 * Its used in both the client and server webpack bundles.
 */

function drawCell (cell, colIndex, rowIndex, ctx, cellWidth, cellHeight) {
	ctx.fillStyle = cell ? '#006702' : '#fff';
	ctx.fillRect(colIndex*cellWidth, rowIndex*cellHeight, cellWidth, cellHeight);
	ctx.strokeRect(colIndex*cellWidth, rowIndex*cellHeight, cellWidth, cellHeight);
}

function generateBoard (board, ctx, width, height, callback) {

	var cellHeight = height/ board.length,
		cellWidth = width / board[0].length;

	// Loop through the board and draw each cell
	board.forEach(function(row, rowIndex) {
		row.forEach(function(cell, colIndex) {
			drawCell(cell, colIndex, rowIndex, ctx, cellWidth, cellHeight);
		});
	});

	if (callback) {
		callback(board);
	}
}

/**
 * Setup default canvas styles
 */
function setupCanvas(ctx) {
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#ccc";
}

module.exports = {
	setupCanvas: setupCanvas,
	generateBoard: generateBoard,
	drawCell: drawCell
};