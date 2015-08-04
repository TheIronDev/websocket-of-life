# WebSocket-of-life

[Project Url](http://websocket-of-life.herokuapp.com/)

This is a proof-of-concept game of life implementation using WebSockets.

## Overview

### Server
The server takes care of generating new boards and emitting compressed version of the boards to the client.
Compression happens using [lzutf8](https://www.npmjs.com/package/lzutf8)

### Client
The client listens for the emitted events, decompresses the boards, and finally draws them with canvas.

Both client and server are making use of a game of life module I made called [jenova](https://www.npmjs.com/package/jenova).
WebPack enables me to use require the same code (commonJS style) in both node and client land. :)


## WebSockets

### Initializing on the server

```javascript
// Initialize the websocket by passing in a `http.createServer` instance.
var io = require('socket.io')(server);
```

### Server-Side Web Socket Code

```javascript
// Emit an io event to the client
io.emit('serverEventName', eventData);

// Or listen on events from the client
io.on('connection', function (socket) {
    socket.on('clientEventName', function(data) {
        // Do something with that event
    });
});
```

### Client-Side Web Socket Code

```javascript
// Open up a io connection (note, I loaded a script tag from '/socket.io/socket.io.js', exposing the io variable)
var socket = io.connect('');

// Listen to events from the server
socket.on('serverEventName', function (data) {
	// Do something with the server-side event
});

// Emit an event from the client to the server
socket.emit('clientEventName', mydata);
```

## WebPack

I would love to talk all day about what I did to get my project to utilize webpack, but honestly...

Go here instead: https://github.com/petehunt/webpack-howto

By far this is the best webpack how-to.

