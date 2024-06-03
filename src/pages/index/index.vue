<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
      <input v-model="msg" />
      <button @click="sendMsg">发送</button>
    </view>
  </view>
</template>

<script>
import { postChat } from "../../request/api";

export default {
  data() {
    return {
      title: "",
      msg: "",
    };
  },
  onLoad() {},
  methods: {
    sendMsg() {
      postChat({ content: this.msg }).then((res) => {
        this.title = res;
      });
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
