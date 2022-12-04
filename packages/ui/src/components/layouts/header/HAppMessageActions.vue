<template>
  <q-btn round dense flat color="grey-8" icon="notifications">
    <q-badge color="red" text-color="white" floating>2</q-badge>
    <q-tooltip>Notifications</q-tooltip>
    <q-menu anchor="bottom left" self="top left">
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption lines="2">
              Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
            <q-btn label="发送" @click="send"></q-btn>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption>
              Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>Voted!</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption>
              Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-badge color="teal" label="10k" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption>
              Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>2 min ago</q-item-label>
            <div class="text-orange">
              <q-icon name="star" />
              <q-icon name="star" />
              <q-icon name="star" />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <q-item>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption>
              Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>meta</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { useAuthenticationStore } from '/@/stores';
import { toast } from '/@/lib/utils';
import { useWebSocket } from '@vueuse/core';
import { Client, Message } from '@stomp/stompjs';

export default defineComponent({
  name: 'HAppMessageActions',

  setup(props) {
    const store = useAuthenticationStore();

    // const { status, data, close } = useWebSocket('ws://192.168.101.10:8847/websocket/ws', {
    //   onConnected: websocket => {
    //     console.log('==> Web Socket connected.');
    //     websocket.
    //   },
    //   onDisconnected: websocket => {
    //     console.log('<== Web Socket disconnected.');
    //   },
    //   autoReconnect: {
    //     retries: 3,
    //     delay: 1000,
    //     onFailed() {
    //       alert('Failed to connect WebSocket after 3 retries');
    //     }
    //   }
    // });

    let client = {} as Client;

    const createClient = () => {
      client = new Client({
        brokerURL: 'ws://192.168.101.10:8847/websocket/ws',
        connectHeaders: {
          Authorization: 'Bearer ' + store.token,
          'X-Herodotus-Open-Id': store.userId
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
      });

      client.onConnect = frame => {
        console.log('WebSocket connnected: ' + frame.headers['message']);
        client.subscribe('/topic/notice', res => {
          console.log(res);
          toast.info(res.body);
        });

        client.subscribe('/user/private/msg', res => {
          console.log(res);
        });
      };

      client.onStompError = frame => {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ', frame.headers);
        console.log('Additional details: ', frame.body);
      };
    };

    const send = () => {
      client.publish({
        destination: '/frontend/notice',
        body: 'come from vue',
        headers: {
          Authorization: 'Bearer ' + store.token
        }
      });
    };

    const connect = () => {
      createClient();
      client.activate();
    };

    // const connect = () => {
    //   const socket = new SockJS('http://192.168.101.10:8847/websocket/stomp-sockjs');

    //   // const websocket = new WebSocket('ws://192.168.101.10:8847/websocket/ws');

    //   stompClient = Stomp.over(socket);

    //   stompClient.connect(
    //     {
    //       Authorization: 'Bearer ' + store.token,
    //       'X-Herodotus-Open-Id': store.userId
    //     },
    //     frame => {
    //       // 连接成功： 订阅服务器的地址。为了浏览器可以接收到消息，必须先订阅服务器的地址
    //       console.log('connect success');
    //       console.log(frame);
    //       connectSucceed();
    //     },
    //     error => {
    //       // 连接失败的回调
    //       // this.reconnect(this.socketUrl, this.connectSucceed)
    //       console.log('connect failed');
    //       console.log(error);
    //     }
    //   );
    // };

    // // const reconnect = (socketUrl, callback) => {
    // //   // this.reconnecting = true
    // //   let connected = false
    // //   const timer = setInterval(() => {
    // //     this.socket = new SockJS(socketUrl)
    // //     this.stompClient = Stomp.over(this.socket)
    // //     this.stompClient.connect(headers, frame => {
    // //       this.reconnectting = false
    // //       connected = true
    // //       clearInterval(timer)
    // //       callback()
    // //     }, err => {
    // //       console.log('Reconnect failed！');
    // //       if(!connected) console.log(err);
    // //     })
    // //   }, 1000);
    // // },
    // // closeSocket(){
    // //   if(this.stompClient != null){
    // //     this.stompClient.disconnect()
    // //     // this.stompClient.disconnect(()=>{
    // //     //   console.log('连接关闭')
    // //     // });
    // //   }
    // // },

    onMounted(() => {
      if (store.access_token) {
        connect();
      }
    });

    onUnmounted(() => {
      console.log('message onUnMounted');
    });

    return {
      send
    };
  }
});
</script>

<style lang="scss">
.hidden_icon {
  a {
    i {
      display: none;
    }
  }
}
</style>
