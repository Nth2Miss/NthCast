# 🚀 NthScreen

**NthScreen** 是一款基于 WebRTC 技术的网页屏幕共享工具。通过强制 H.264 硬件编码和高性能信令传输，它能够实现在浏览器中近乎原生的共享体验。

> **当前版本：** v1.0 (Cloudflare Pages Functions 架构)
> 
> 
> **核心优势：** 60FPS 支持 / 15Mbps 码率 / 无需独立 Worker

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-orange?style=for-the-badge&logo=cloudflare)](https://deploy.cloudflare.com/?url=https://github.com/Nth2Miss/NthScreen)
[![Demo Status](https://img.shields.io/website?url=https%3A%2F%2Fscreen.52520721.xyz&style=for-the-badge&label=Live%20Demo)](https://screen.52520721.xyz)

-----

## ✨ 核心特性

* **极简部署**：采用 Cloudflare Pages Functions，前端后端一键集成，无需配置跨域。
* **极致画质**：支持 **1080P / 60FPS / 15Mbps**，并强制开启 H.264 硬件加速。
* **智能连接**：内置“中继（Relay）”与“直连（P2P）”切换，适配复杂网络环境。

-----

## 🛠️ 关键配置指南 (Pusher)

本项目使用 [Pusher Channels](https://pusher.com/channels) 作为 WebRTC 的信令服务器。请按照以下步骤获取配置：

### 1\. 创建 Pusher 应用

1. 登录 [Pusher 控制台](https://dashboard.pusher.com/)。
2. 点击 **"Create app → Channels"**。
3. 名称随意（如 `NthScreen`），集群（Cluster）推荐选择 **`ap1 (Singapore)`** 以获得亚太地区最低延迟。
4. 在 **"App Keys"** 页面，你会看到 `app_id`, `key`, `secret`, `cluster`。**请保存这些信息。**

### 2\. 开启客户端事件 (非常重要)

由于本项目使用客户端触发信令以降低延迟，你必须手动开启此开关：

1. 进入 Pusher 控制台的 **"App Settings"**。
2. 找到 **"Enable client events"** 选项。
3. **将其勾选并保存**。如果不开启，共享端将无法发送连接请求。

-----

## 🚀 部署步骤

### 1\. 准备仓库

将本项目代码克隆或上传到你的 GitHub 私有/公开仓库。

### 2\. 在 Cloudflare Pages 部署

1. 进入 [Cloudflare 控制台](https://dash.cloudflare.com/) -\> **Workers & Pages**。
2. 点击 **Create application** -\> **Pages** -\> **Connect to Git**。
3. 选择你的仓库。
4. **构建设置 (Build settings)**：
   * **Framework preset**: `None`
   * **Build command**: 留空（不需要构建）
   * **Build output directory**: `public`
5. **环境变量 (Environment variables)**：
   在部署前点击 **"Add variables"**，填入以下 5 个关键变量：

| 变量名                  | 来源                 | 说明                            |
|:-------------------- |:------------------ |:----------------------------- |
| **`PUSHER_APP_ID`**  | Pusher App Keys    | 你的 Pusher 应用 ID               |
| **`PUSHER_KEY`**     | Pusher App Keys    | 你的 Pusher Key                 |
| **`PUSHER_CLUSTER`** | Pusher App CLUSTER | 你的 Pusher CLUSTER（默认 ap1 新加坡） |
| **`PUSHER_SECRET`**  | Pusher App Keys    | 你的 Pusher Secret              |
| **`Turn_id`**        | CF 账户 ID           | 在 Cloudflare 侧边栏底部获取          |
| **`Turn_token`**     | CF API Token       | Turn服务器的令牌                    |

6. 点击 **"Save and Deploy"**。

-----

## 📂 项目结构说明

```text
├── public/
│   └── index.html    # 前端主页面
├── functions/
│   └── api/
│       ├── auth.js   # 后端：Pusher 私有频道鉴权
│       ├── config.js # 后端：动态获取 PUSHER KEY 凭证
        └── ice.js    # 后端：动态获取 Cloudflare TURN 凭证
├── package.json      # 项目依赖 (pusher-js 等)
└── README.md         # README文档
```


