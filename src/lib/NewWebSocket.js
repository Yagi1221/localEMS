import store from '@/store/store.js';

const VUE_APP_WebSucket_URL =  process.env.VUE_APP_WebSucket_URL;
export default function (onMessageCallBack , onErrorCallBack , topic , doOnce ) {
    try {
        debugger;
        var socket = new WebSocket(VUE_APP_WebSucket_URL);
        socket.onmessage = function (raw) {
        try {
            if (onMessageCallBack) {
                onMessageCallBack(raw.data ?? raw);
            }
            if (doOnce) {
                socket.send( JSON.stringify({ "action": "unsubscribe", "topic": topic }));
                socket.close();
            }
        } catch (error) {
            console.log("Error: " + error.message);
        }
        };

        socket.onerror = function (event) {
            if (onErrorCallBack) {
                onErrorCallBack(event)
            } 
            socket.close();
        };

        socket.onopen = function () {
            if (socket.readyState === WebSocket.OPEN) {
                debugger;
                socket.send(JSON.stringify({ "action": "auth", "token": store.getters.user.Token }));
                socket.send( JSON.stringify({ "action": "subscribe", "topic": topic }));
            }
        };

        return socket;
    }
    catch{
        return null;
    }
  }