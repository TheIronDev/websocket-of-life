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
	height = canvas.height;

helpers.setupCanvas(ctx);

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
	// Generate a new board, with a callback to recursively draw the next board available.
	jenova.next(board, function(newBoard) {
		setTimeout(helpers.generateBoard.bind(this, newBoard, ctx, width, height, generateBoardCallback), 200);
	});
}

window.requestAnimationFrame(helpers.generateBoard.bind(this, initialBoard, ctx, width, height, generateBoardCallback));