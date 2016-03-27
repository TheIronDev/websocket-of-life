/**
 * In the client example, this file is responsible for drawing the current board and generating the next
 * @type {exports}
 */

// Using WebPack to load in our game of life module
var jenova = require("jenova");
var helpers = require('./canvasHelper');
var canvas = document.getElementById('gameOfLife'),
	ctx = canvas.getContext('2d'),
	width = canvas.width,
	height = canvas.height,
	clickedCells = [],
	currentBoard;

/**
 * On click, update a cell and push it into a queue to get updated on our next redraw
 * @param event
 */
function canvasOnClick(event) {

	var canvas = event.target,
		width = canvas.width,
		height = canvas.height,
		newCellVal = 0,
		cellHeight,
		cellWidth,
		cell;

	if (currentBoard) {

		cellHeight = height/ currentBoard.length;
		cellWidth = width / currentBoard[0].length;

		cell = helpers.getClickedCell(event, currentBoard, cellWidth, cellHeight);
		newCellVal = currentBoard[cell.row][cell.col] === 1 ? 0 : 1;

		clickedCells.push(cell);
		helpers.drawCell(newCellVal, cell.col, cell.row, ctx, cellWidth, cellHeight);
	}
}

helpers.setupCanvas(canvas, ctx, canvasOnClick);

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

// Once we have finished drawing a board, call *this* function to generate the next board.
function generateBoardCallback(board) {
	currentBoard = board;

	// If there are cell clicks that are queued up, lets mutate the board with those clicks before generating the next board
	clickedCells.forEach(function(cell) {
		board[cell.row][cell.col] = board[cell.row][cell.col] === 0 ? 1 : 0;
	});
	clickedCells = [];

	// Generate a new board, with a callback to recursively draw the next board available.
	jenova.next(board, {}, function(newBoard) {
		setTimeout(helpers.generateBoard.bind(this, newBoard, ctx, width, height, generateBoardCallback), 200);
	});
}

window.requestAnimationFrame(helpers.generateBoard.bind(this, initialBoard, ctx, width, height, generateBoardCallback));