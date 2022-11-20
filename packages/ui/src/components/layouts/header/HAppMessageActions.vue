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

export default defineComponent({
  name: 'HAppMessageActions',

  setup(props) {
    const store = useAuthenticationStore();

    let stompClient = {} as Stomp.Client;

    const connectSucceed = () => {
      // 设置心跳发送接受频率（ms）默认为10000ms。 heart-beating是利用window.setInterval()去规律地发送heart-beats或者检查服务端的heart-beats。
      stompClient.heartbeat.outgoing = 10000;
      stompClient.heartbeat.incoming = 0;

      stompClient.subscribe('/topic/notice', res => {
        console.log(res);
        toast.info(res.toString());
      });
    };

    const send = () => {
      stompClient.send(
        '/app/frontend/notice',
        {
          Authorization: 'Bearer ' + store.token
        },
        'come from vue'
      );
    };

    const connect = () => {
      const socket = new SockJS('http://192.168.101.10:8847/websocket');

      stompClient = Stomp.over(socket);

      stompClient.connect(
        {
          Authorization: 'Bearer ' + store.token,
          'X-Herodotus-Open-Id': store.userId
        },
        frame => {
          // 连接成功： 订阅服务器的地址。为了浏览器可以接收到消息，必须先订阅服务器的地址
          console.log('connect success');
          console.log(frame);
          connectSucceed();
        },
        error => {
          // 连接失败的回调
          // this.reconnect(this.socketUrl, this.connectSucceed)
          console.log('connect failed');
          console.log(error);
        }
      );
    };

    // const reconnect = (socketUrl, callback) => {
    //   // this.reconnecting = true
    //   let connected = false
    //   const timer = setInterval(() => {
    //     this.socket = new SockJS(socketUrl)
    //     this.stompClient = Stomp.over(this.socket)
    //     this.stompClient.connect(headers, frame => {
    //       this.reconnectting = false
    //       connected = true
    //       clearInterval(timer)
    //       callback()
    //     }, err => {
    //       console.log('Reconnect failed！');
    //       if(!connected) console.log(err);
    //     })
    //   }, 1000);
    // },
    // closeSocket(){
    //   if(this.stompClient != null){
    //     this.stompClient.disconnect()
    //     // this.stompClient.disconnect(()=>{
    //     //   console.log('连接关闭')
    //     // });
    //   }
    // },

    onMounted(() => {
      if (store.access_token) {
        // connect();
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
