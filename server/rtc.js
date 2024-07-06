const express = require(`express`)
const request = require(`request`)
const crypto = require(`crypto-js`)
const path = require('path')
const http = require(`http`)
const { Server } = require('socket.io');
const rtc = require("./rtc.js")
/**
 * 
 * @param {*} results 
 * @returns 
 */

/**
 * kintone用のAPI
 */
handling = (app) => {
  // ポート番号
  const port = '8081';
  const users = new Map();
  // express, socket.io 生成
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: '*', // すべてのオリジンを許可
      methods: ['GET', 'POST'], // 許可するHTTPメソッド
    }
  });

  // サーバで公開するディレクトリ設定（htmlとか置く場所）
  app.use(express.static(path.join(__dirname, 'front')));

  /**
   * 接続
   */
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      users.set(userId, socket.id);
      socket.on('disconnect', () => {
        users.delete(userId);
      });
    }
    // socket.id のクライアントのみに socket.id を送信（connectidイベント）
    io.to(socket.id).emit('connectid', socket.id);
    // 受信
    socket.on('message', (dataStr) => {
      let data = JSON.parse(dataStr)
      const { msg } = data;
      const targetSocketId = users.get(data.socketId);
      if (targetSocketId) {
        io.to(targetSocketId).emit('message', data);
      }
    })
    // 切断
    socket.on('disconnect', () => { });
  })
}

module.exports = {
  handling
}