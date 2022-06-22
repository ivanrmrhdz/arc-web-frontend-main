import Axios from "axios";
import Api from "./api";
import SocketIO from "./socket-io";

Axios.defaults.headers.common.Accept = "application/json";

Axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');

        if(token) {
            config.headers.Authorization = token;
        }

        return config;
    },
    error => Promise.reject(error)
);

const url = 'http://localhost:4000';
const urlRestApi = `${url}/api`; 

export default {
    socketio: new SocketIO(url),
    api: new Api(Axios, urlRestApi),
}