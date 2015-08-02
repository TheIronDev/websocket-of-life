
var jenova = require('jenova'),
	ioInstance;


var initialBoard = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0]
];

function generateBoard(board) {

	jenova.next(board, function(newBoard) {
		ioInstance.emit('newBoard', jenova.compress(newBoard));
		setTimeout(generateBoard.bind(this, newBoard), 1000);
	});
}

module.exports = function (io) {
	ioInstance = io;
	generateBoard(initialBoard);
};