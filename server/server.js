const { Server } = require('socket.io');
const path = require('path');
const http = require('http');
const express = require(`express`)
const app = express()
const cors = require(`cors`)
const request = require(`request`)
const kintone = require("./kitnoneApi.js")
app.listen(8080, () => {
})
app.use(express.static(`./front`));
app.use(express.urlencoded({ extended: true, limit: `1000mb` }))
app.use(express.json({ extended: true, limit: `1000mb` }))
app.use(cors())

/**
 * kintone
 * api
 */

kintone.expressKintone(app)


// ポート番号
const port = '8081';
const users = new Map(); // ユーザーIDとソケットIDを管理するマップ
// express, socket.io 生成
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // すべてのオリジンを許可
        methods: ['GET', 'POST'], // 許可するHTTPメソッド
    }
});

// サーバで公開するディレクトリ設定（htmlとか置く場所）
app.use(express.static(path.join(__dirname, 'front')));

// 接続時の処理、socket が接続情報
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log('message')
    console.log(userId)
    if (userId) {
        users.set(userId, socket.id);
        socket.on('disconnect', () => {
            users.delete(userId);
        });
    }
    // socket.id のクライアントのみに socket.id を送信（connectidイベント）
    io.to(socket.id).emit('connectid', socket.id);
    // messageイベント受信
    socket.on('message', (dataStr) => {
        let data = JSON.parse(dataStr)
        const { msg } = data;
        const targetSocketId = users.get(data.socketId);
        console.log('message')
        console.log(data.socketId)
        console.log(targetSocketId)
        console.log(data)
        if (targetSocketId) {
            io.to(targetSocketId).emit('message', data);
        }

    });
    // 切断時処理
    socket.on('disconnect', () => { });
});
// ポート3000番でサーバを起動します。
server.listen(port, () => {
});