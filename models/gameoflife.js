
var jenova = require('jenova'),
	socketUpdates = [],
	ioInstance;


var initialBoard = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function generateBoard(board) {

	socketUpdates.forEach(function(cell) {
		board[cell.row][cell.col] = board[cell.row][cell.col] === 0 ? 1 : 0;
	});
	socketUpdates = [];

	jenova.next(board, function(newBoard) {
		ioInstance.emit('newBoard', jenova.compress(newBoard));
		setTimeout(generateBoard.bind(this, newBoard), 800);
	});
}

// We are dealing with websockets, which exposes us to more vulnerabilities...
function safetyFirst(data) {
	var col = data.col,
		row = data.row;
	if (data && col && row &&
		typeof col === 'number' &&  typeof row === 'number' &&
		col <= initialBoard[0].length && row <= initialBoard.length) {
		return true;
	}
	return false;
}

module.exports = function (io) {

	ioInstance = io;

	io.on('connection', function (socket) {
		socket.on('updateCell', function(data) {
			if (safetyFirst(data)) {
				socketUpdates.push(data);
			}
		});
	});

	generateBoard(initialBoard);
};