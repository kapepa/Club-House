import {io} from "socket.io-client";
import {config} from "../config";
import Cookies from 'js-cookie';

const SocketIO = io(config.url,{ extraHeaders: {
  Authorization: `Bearer ${Cookies.get('token')}`
}});

export default SocketIO;