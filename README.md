# Claude 使用量监控系统

一个优雅的Claude Code使用量实时监控系统，采用苹果风格设计，可以实时显示当天的API消耗量。

## 功能特性

- 🎨 **苹果风格设计** - 采用苹果官网风格的现代化UI设计
- 📊 **实时监控** - 实时显示当天的消耗金额、Token使用量和请求次数
- 📈 **进度可视化** - 直观的进度条显示当日使用量占限额的百分比
- 🔄 **自动刷新** - 每30秒自动刷新数据，支持手动刷新
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **快速部署** - 支持Vercel一键部署

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (原生)
- **后端**: Node.js, Express
- **部署**: Vercel
- **API**: DeepSeek API (兼容Claude格式)

## 快速开始

### 本地开发

1. 克隆项目
```bash
git clone <repository-url>
cd claude-usage-monitor
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:3000`

### 部署到Vercel

1. 安装Vercel CLI
```bash
npm install -g vercel
```

2. 登录Vercel
```bash
vercel login
```

3. 部署项目
```bash
npm run deploy
```

## API接口

### 获取使用量数据
```
GET /api/usage
```

响应格式:
```json
{
  "success": true,
  "data": {
    "amount": 15.67,
    "tokens": 12500,
    "requests": 45,
    "dailyLimit": 200,
    "lastUpdated": "2026-02-08T12:00:00.000Z",
    "percentage": 7.84
  }
}
```

### 模拟API调用
```
POST /api/chat
```

请求格式:
```json
{
  "message": "你好，Claude"
}
```

## 配置说明

在 `server.js` 中可以配置以下参数:

- `CLAUDE_API_KEY`: DeepSeek API密钥
- `CLAUDE_API_BASE`: API基础URL
- `dailyLimit`: 每日消费限额 (默认$200)

## 设计特色

- **毛玻璃效果**: 使用backdrop-filter实现现代化的毛玻璃背景
- **渐变色彩**: 采用苹果风格的渐变色彩方案
- **微交互**: 丰富的hover和点击动效
- **字体系统**: 使用苹果系统字体栈
- **响应式布局**: 移动端优先的响应式设计

## 浏览器支持

- Chrome 88+
- Safari 14+
- Firefox 90+
- Edge 88+

## 许可证

MIT License

## 作者

guangxin - [GitHub](https://github.com/LGXfufile)