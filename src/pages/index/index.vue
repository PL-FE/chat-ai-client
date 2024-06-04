<template>
  <view class="page-content h-fit">
    <scroll-view class="chat-content" scroll-y>
      <view
        v-for="(message, index) in messages"
        :key="index"
        class="message-item"
      >
        <view v-if="message.type === 'sent'" class="sent-message">{{
          message.content
        }}</view>
        <view v-else class="received-message">{{ message.content }}</view>
      </view>
    </scroll-view>
    <view class="footer absolute bottom-0 w-full px-4 pb-2">
      <view class="footer-body flex items-center">
        <input
          class="flex-1"
          placeholder="请输入内容"
          v-model="msg"
          @keydown.enter="sendMsg"
        />
        <uni-icons
          @click="sendMsg"
          type="arrow-up"
          size="20"
          class="submitIcon"
          :class="{ isDiabled: !msg }"
          color="#ffffff"
        ></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, shallowReactive } from "vue";
import { postChat } from "../../request/api";
const msg = ref("");
const messages = shallowReactive([]);
const sendMsg = () => {
  messages.push({ type: "sent", content: msg.value });
  const parms = { content: msg.value };
  msg.value = "";
  postChat(parms).then((res) => {
    messages.push({ type: "received", content: res });
  });
};
</script>

<style scoped lang="scss">
.footer-body {
  background-color: #f4f4f4;
  padding: 8px 16px;
  border-radius: 26px;

  .submitIcon {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #f4f4f4;
    background-color: #252525;

    &.isDiabled {
      background-color: #d7d7d7;
    }
  }
}

.page-msg {
  margin-bottom: 54px;
}
</style>
