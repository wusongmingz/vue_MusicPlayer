import axios from 'axios';

export async function gpt35Api(message) {
    console.log("Calling gpt35Api with message:", message);

    const apiUrl = 'http://localhost:3000/gpt'; // 后端 API URL

    try {
        // 使用 GET 请求，并将 message 作为查询参数发送
        const response = await axios.get(apiUrl, {
            params: {
                message: message  // 将消息作为查询参数传递
            }
        });

        // 返回 GPT 的响应内容
        return response.data.message; // 假设后端返回的数据格式是 { message: '...' }
    } catch (error) {
        // 打印详细的错误信息
        console.error('Error calling GPT API:', error.response ? error.response.data : error.message);

        // 重新抛出错误以供外部捕获
        throw new Error('Failed to fetch GPT response');
    }
}
