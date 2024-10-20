import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// 从环境变量中获取 GPT API Key
const apiKey = process.env.OPENAI_API_KEY;

// 调用 OpenAI GPT-3.5 Turbo 接口的函数
const gpt35ApiCall = async (message) => {
    console.log("Calling GPT-3.5 Turbo API with message:", message);
    try {
        const response = await axios.post('https://api.chatanywhere.tech/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: message }
            ],
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            timeout: 10000
        });
        console.log("GPT-3.5 Turbo API response:", response.data);

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling GPT API:', error.response? error.response.data : error.message);
        throw error;
    }
};

// 创建 GET 端点来调用 GPT-3.5
app.get('/gpt', async (req, res) => {
    const messages = req.query.message || '你好，我是 ChatGPT，有什么可以帮助你的吗？';

    try {
        const gptResponse = await gpt35ApiCall(messages);
        res.json({ message: gptResponse });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching GPT response' });
    }
});

// 文件上传配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});