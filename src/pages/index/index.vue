<template>
  <view class="page page-content h-full">
    <scroll-view class="chat-content" scroll-y>
      <view
        v-for="(message, index) in messages"
        :key="index"
        class="message-item"
      >
        <view v-if="message.type === 'sent'" class="sent-message">
          <span class="sent-message-body">
            {{ message.content }}
          </span>
        </view>
        <view v-else class="received-message flex">
          <span class="pr-2">
            <uni-icons type="smallcircle" size="24"></uni-icons>
          </span>
          <!-- <span v-html="message.content"> </span> -->
          <ua-markdown :source="message.content" class="flex-1 overflow-auto" />
        </view>
      </view>
    </scroll-view>
    <view class="footer w-full px-4 py-2">
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
    if (res) {
      console.log("res", res);
      messages.push({ type: "received", content: res });
    }
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
.message-item {
  line-height: 30px;
  padding: 15px 10px;
  .sent-message {
    text-align: right;
  }
  .sent-message-body {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 20px;
  }
}
.chat-content {
  height: calc(100% - 65px);
}
</style>
