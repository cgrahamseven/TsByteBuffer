# TsByteBuffer
A simple byte buffer implementation written in TypeScript. This module can be used to send and receive structured data over the network.

Required Dependencies: ref (npm install ref)

To compile to javascript for use with node.js, simply run: tsc bytebuffer.ts

Example Usage:
```typescript
/// <reference path="./lib/node.d.ts" />
import net = require('net');
import * as byteBuffer from './bytebuffer';

// Server function to handle new connections 
function onConnection(socket: net.Socket) {
    socket.on('data', function(data: Buffer) {
        let packet: byteBuffer.ByteBuffer = new byteBuffer.ByteBuffer(byteBuffer.ByteOrder.BIG_ENDIAN, data);
        // We only have one type of packet, so output the results as we read them
        console.log("[*] ProcessCreated packet details:\n" + 
        "Process Id: " + packet.getUInt() + "\n" +
        "Parent Id: " + packet.getUInt() + "\n" + 
        "Image Name: " + packet.getBytes(packet.getUInt()).toString() + "\n" + 
        "Image Hash: " + packet.getBytes(packet.getUInt()).toString() + "\n");
    });
}

// Create a server that listens on localhost for new connections
net.createServer(onConnection).listen(5555, "localhost");

// Create a client to connect to the server and send a ProcessCreated packet 
let client: net.Socket = net.connect({port: 5555, host: "localhost"}, function() {
    let packet: byteBuffer.ByteBuffer = new byteBuffer.ByteBuffer(byteBuffer.ByteOrder.BIG_ENDIAN);
    let imageName: string = "C:\\Windows\\System32\\notepad.exe";
    let imageHash: string = "3b508cae5debcba928b5bc355517e2e6";
    // Build a ProcessCreated packet 
    packet.putUInt(2345);             // ProcessId (uint32_t)
    packet.putUInt(6789);             // ParentId (uint32_t)
    packet.putUInt(imageName.length); // ImageNameLen (uint32_t)
    packet.putBytes(imageName);       // ImageName (string)
    packet.putUInt(imageHash.length); // ImageHashLen (uint32_t)
    packet.putBytes(imageHash);       // ImageHash (string)
    // Send it
    client.end(packet.data());
});
```
