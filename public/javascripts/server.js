/**
 * In the server example, the only responsibility this file has is drawing the game of life boards
 */

var jenova = require("jenova");
var socket = io.connect('');
var helpers = require('./canvasHelper');

var canvas = document.getElementById('gameOfLife'),
	ctx = canvas.getContext('2d'),
	width = canvas.width,
	height = canvas.height;

helpers.setupCanvas(ctx);

// Whenever the server emits a new board, lets decompress it and draw it
socket.on('newBoard', function (compressedBoard) {
	var newBoard = jenova.expand(compressedBoard.compressed, compressedBoard.width);
	helpers.generateBoard(newBoard, ctx, width, height)
});