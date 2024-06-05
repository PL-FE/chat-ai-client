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
            <uni-icons type="smallcircle" size="21"></uni-icons>
          </span>
          <!-- <span v-html="message.content"> </span> -->
          <ua-markdown :source="message.content" class="flex-1 overflow-auto" />
        </view>
      </view>
    </scroll-view>
    <view
      class="footer fixed w-full px-4 py-2"
      :style="{ bottom: KeyboardHeight }"
    >
      <view class="footer-body flex items-center">
        <input
          :adjust-position="false"
          :cursor-spacing="10"
          class="flex-1"
          placeholder="请输入内容"
          v-model="msg"
          @keydown.enter="sendMsg"
        />
        <uni-icons
          @click="sendMsg"
          :type="loading ? 'spinner-cycle' : 'arrow-up'"
          size="20"
          class="submitIcon"
          :class="{ isDiabled: !canSend }"
          color="#ffffff"
        ></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, shallowReactive } from "vue";
import { postChat } from "../../request/api";
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();

const KeyboardHeight = ref(0);
const msg = ref("");
const messages = ref([]);
const loading = ref(false);
const canSend = computed(() => {
  return msg.value && !loading.value;
});
const sendMsg = () => {
  if (!canSend.value) {
    return;
  }
  messages.value.push(
    { type: "sent", content: msg.value },
    { type: "received", content: "" }
  );
  loading.value = true;
  postChat(
    msg.value,
    (res) => {
      msg.value = "";
      messages.value.slice(-1)[0].content += handleSse(res);
    },
    () => {
      loading.value = false;
    }
  );
};

if (uni.onKeyboardHeightChange) {
  uni.onKeyboardHeightChange((res) => {
    KeyboardHeight.value = res.height + "px";
  });
}

function handleSse(res) {
  try {
    const data = JSON.parse(res);
    return data.choices[0].delta.content || "";
  } catch (error) {
    return "";
  }
}
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
  max-height: calc(100% - 65px);
  overflow: auto;
}
</style>
