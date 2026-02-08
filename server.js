const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Claude API配置
const CLAUDE_API_KEY = 'sk-71cc3aad8fad44c8970dd549933d3573'; // 使用你提供的DeepSeek API Key
const CLAUDE_API_BASE = 'https://api.deepseek.com/v1';

// 存储使用量数据
let usageData = {
    dailyUsage: 0,
    totalTokens: 0,
    requestCount: 0,
    lastReset: new Date().toDateString(),
    dailyLimit: 200
};

// 重置每日数据
function resetDailyData() {
    const today = new Date().toDateString();
    if (usageData.lastReset !== today) {
        usageData.dailyUsage = 0;
        usageData.totalTokens = 0;
        usageData.requestCount = 0;
        usageData.lastReset = today;
    }
}

// 获取使用量数据的API端点
app.get('/api/usage', async (req, res) => {
    try {
        resetDailyData();
        
        // 这里可以调用真实的Claude API来获取使用量
        // 目前使用模拟数据
        const mockUsage = {
            amount: usageData.dailyUsage,
            tokens: usageData.totalTokens,
            requests: usageData.requestCount,
            dailyLimit: usageData.dailyLimit,
            lastUpdated: new Date().toISOString(),
            percentage: Math.min((usageData.dailyUsage / usageData.dailyLimit) * 100, 100)
        };

        res.json({
            success: true,
            data: mockUsage
        });
    } catch (error) {
        console.error('获取使用量失败:', error);
        res.status(500).json({
            success: false,
            error: '获取使用量失败'
        });
    }
});

// 模拟Claude API调用并记录使用量
app.post('/api/chat', async (req, res) => {
    try {
        resetDailyData();
        
        const { message } = req.body;
        
        // 模拟API调用成本计算
        const estimatedTokens = message.length * 1.3; // 粗略估算
        const estimatedCost = (estimatedTokens / 1000) * 0.01; // 假设每1K tokens $0.01
        
        // 更新使用量
        usageData.dailyUsage += estimatedCost;
        usageData.totalTokens += Math.floor(estimatedTokens);
        usageData.requestCount += 1;
        
        // 这里可以调用真实的DeepSeek API
        const response = {
            message: `收到消息: ${message}`,
            tokens_used: Math.floor(estimatedTokens),
            cost: estimatedCost
        };
        
        res.json({
            success: true,
            data: response,
            usage: {
                dailyUsage: usageData.dailyUsage,
                totalTokens: usageData.totalTokens,
                requestCount: usageData.requestCount
            }
        });
    } catch (error) {
        console.error('API调用失败:', error);
        res.status(500).json({
            success: false,
            error: 'API调用失败'
        });
    }
});

// 提供主页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('Claude使用量监控系统已启动');
});

module.exports = app;