import { io } from "socket.io-client";


export default class SocketIO {

    socket;

    constructor(url) {
        this.url = url;
    }

    initialize() {
        this.socket = io(this.url);
    }

    close() {
        this.socket.disconnect();
    }

    getSendTemp(callback) {
        this.socket.on('/socket/sendTemp', (payload) => {
            callback(payload);
        });
    }
    
}