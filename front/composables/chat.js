/**
 * kintoneでのアクセス
 */
import { ref } from 'vue';
import { defineStore } from "pinia";
import { io } from 'socket.io-client';
export const chat = defineStore(
  "chat",
  () => {
    const socket = ref(null)
    let socketId = ref('')
    // socket.io 接続時イベント connectid
    const connect = (userId) => {
      socket.value = io('http://localhost:8081', {
        query: { userId: userId, },
      })
      socket.value.on('connectid', (id) => {
        socketId = userId;
      });
      socket.value.on('message', function (data) {
        const json = data;
        if (!json.message) {
          return;
        }
        alert(json)
      })
    }

    const send = (name, msg) => {
      +
      const now = new Date();
      const json = {
        name: name,
        message: msg,
        time: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
        socketId: socketId,
      };
      // socket に message イベントで送信
      socket.value.emit('message', JSON.stringify(json));
    }
    return {
      connect,
      send
    }
  })
