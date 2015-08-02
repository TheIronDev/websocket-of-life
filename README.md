# WebSocket-of-life

[Project Url](http://websocket-of-life.herokuapp.com/)

This is a proof-of-concept game of life implementation using WebSockets.

## Server
The server takes care of generating new boards and emitting compressed version of the boards to the client.
Compression happens using [lzutf8](https://www.npmjs.com/package/lzutf8)

## Client
The client listens for the emitted events, decompresses the boards, and finally draws them with canvas.

Both client and server are making use of a game of life module I made called [jenova](https://www.npmjs.com/package/jenova).
WebPack enables me to use require the same code (commonJS style) in both node and client land. :)