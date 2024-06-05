import { base_url } from './http.js'

// 分页查询学习列表
export const postChat = (content, cb, endCb) => {
    console.log('content', content);
    const sseUrl = base_url + '/chat?content=' + content
    const eventSource = new EventSource(sseUrl);

    // 监听消息事件
    eventSource.onmessage = function (event) {
        if (event.data === '[DONE]') {
            endCb()
            eventSource.close()
            return
        }
        cb(event.data)
        // 在这里处理接收到的消息
    };

    // 监听错误事件
    eventSource.onerror = function (error) {
        console.error('EventSource failed:', error);
        // 在这里处理错误
    };


}