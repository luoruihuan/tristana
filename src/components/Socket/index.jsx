/* eslint-disable no-undef */
/*
 * Socket集成
 * @Author: Jiang
 * @Date: 2019-08-27 18:00:15
 * @Last Modified by: Jiang
 * @Last Modified time: 2020-03-26 06:41:39
 */

let SOCKET = '';

// 服务器断开链接
const serverDisconnect = () => {
    if(!SOCKET) {
        return;
    }
    SOCKET.on('disconnect');
};

// 断开链接
const disconnect = () => {
    if(!SOCKET) {
        return;
    }
    SOCKET.disconnect();
};

const offConnect = () => {
    if(!SOCKET) {
        return;
    }
    SOCKET.off('connect');
};

const onConnect = () => {
    if(!SOCKET) {
        return;
    }
    SOCKET.on('connect', () => { });
};

// 移出所有监听
const removeAllListeners = () => {
    if(!SOCKET) {
        return;
    }
    SOCKET.removeAllListeners();
};

// 关闭socket
const close = () => {
    agentOffline();
    offConnect();
    disconnect();
    removeAllListeners();
};

export {
    disconnect,
    serverDisconnect,
    offConnect,
    onConnect,
    removeAllListeners,
    close
};
