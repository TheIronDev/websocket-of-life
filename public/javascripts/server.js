/**
 * In the server example, the only responsibility this file has is drawing the game of life boards
 */

var jenova = require("jenova");
var socket = io.connect('');
var helpers = require('./canvasHelper');

var canvas = document.getElementById('gameOfLife'),
	ctx = canvas.getContext('2d'),
	width = canvas.width,
	height = canvas.height,
	currentBoard;

/**
 * On click, emit an event that will update a cell on the server
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

		socket.emit('updateCell', cell);
		helpers.drawCell(newCellVal, cell.col, cell.row, ctx, cellWidth, cellHeight);
	}
}

helpers.setupCanvas(canvas, ctx, canvasOnClick);


function generateBoardCallback (newBoard) {
	currentBoard = newBoard;
}

// Whenever the server emits a new board, lets decompress it and draw it
socket.on('newBoard', function (compressedBoard) {
	var newBoard = jenova.expand(compressedBoard.compressed, compressedBoard.width);
	helpers.generateBoard(newBoard, ctx, width, height, generateBoardCallback);
});