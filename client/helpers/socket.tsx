import {io} from "socket.io-client";
import {config} from "../config";

const SocketIO = io(config.url);

// Socket.on('connect', function() {
//   console.log('Connected');
// });

export default SocketIO;