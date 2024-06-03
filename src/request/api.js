// 引入 request 文件
import request from './http.js'

// 分页查询学习列表
export const postChat = (params) => {
    return request({
        url: '/chat',
        method: 'post',
        data: JSON.stringify(params),
        header: {
            // 'Content-Type': 'text/event-stream',
        } // 自定义
    })
}