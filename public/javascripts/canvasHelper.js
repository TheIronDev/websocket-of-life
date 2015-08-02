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
function setupCanvas(canvas, ctx, onClick) {
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#ccc";

	if (onClick) {
		canvas.addEventListener('click', onClick);
	}
}


function getClickedCell(event, board, cellWidth, cellHeight) {

	var canvas = event.target,

		leftOffSet = canvas.offsetLeft,
		topOffset = canvas.offsetTop,

		leftClickPoint = event.pageX,
		topClickPoint = event.pageY,

		x = leftClickPoint - leftOffSet,
		y = topClickPoint - topOffset;

	return {
		col: ~~(x/cellWidth),
		row: ~~(y/cellHeight)
	};
}

module.exports = {
	getClickedCell: getClickedCell,
	setupCanvas: setupCanvas,
	generateBoard: generateBoard,
	drawCell: drawCell
};