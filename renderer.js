/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

// const WebSocket = require('ws');
// const ws = new WebSocket('ws://localhost:8765');

// ws.on('open', function open() {
//   console.log('Connected to Python');
// });

// ws.on('message', function incoming(data) {
//   const message = JSON.parse(data);
//   console.log('Received message from Python:', message);
//   // 在界面中显示数据
//   // Your code to display the data in the Electron interface
// });


const zmq = require("zeromq");


async function runClient() {
    const sock = new zmq.Subscriber();

    try {
        sock.connect("tcp://localhost:5555");
        sock.subscribe("");

        for await (const [result] of sock) {
            const rev_msg = JSON.parse(result.toString())
            console.log("Received message", rev_msg);
            console.log("topic1: output", "data:", rev_msg["output"])
            console.log("topic2: plot", "data:", rev_msg["plot"])
            // console.log(result.toString());
        }

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    
}

runClient();

  
