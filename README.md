# 项目详细信息
## 📁 项目结构
```
github-actions-demo/
├── .eslintrc.yml          # ESLint 配置文件
├── .git/                  # Git 版本控制目录
├── .github/               # GitHub Actions 工作流配置
├── .gitignore            # Git 忽略文件配置
├── LICENSE               # 开源许可证
├── README.md             # 项目说明文档
├── build.sh              # 构建脚本
├── go.mod                # Go 模块定义文件
├── go.sum                # Go 模块校验和
├── index.js              # Node.js 主应用文件
├── main.go               # Go 主程序文件
└── node_modules/         # Node.js 依赖目录
```
## 🏗️ 架构概览
### 多语言混合架构
- **Go 服务**：系统信息监控服务
- **Node.js 服务**：Web API 服务
### 环境准备

- 安装 [Node.js](https://nodejs.org/en)
- 安装 [pnpm](https://pnpm.io/installation)

### 操作步骤

- 安装依赖

```sh
pnpm install
```

- 启动 Dev Server

```sh
pnpm run dev
```

- 在浏览器访问 http://localhost:3000

### 核心功能模块
#### 1. 系统监控服务 (main.go)
- **功能**：定时采集系统信息
- **采集内容**：
  - 操作系统信息（平台、版本、内核）
  - CPU 使用率
  - 内存使用情况（总量、已用、空闲、使用率）
  - 磁盘使用情况（总量、已用、空闲、使用率）
  - 网络流量统计（发送/接收字节数）
- **采集频率**：每 5 秒采集一次
#### 2. Web 服务 (index.js)
- **框架**：Express.js
- **端口**：8080
- **端点**：
  - `GET /`：返回纯文本 \"Hello World\"
## 📦 依赖信息
### Go 依赖
```go
module james.org/m
go 1.24.0
require (
    github.com/shirou/gopsutil v3.21.11+incompatible // 系统监控核心库
)
require (
    github.com/go-ole/go-ole v1.2.6         // Windows COM 接口支持
    github.com/stretchr/testify v1.10.0     // 测试框架
    github.com/tklauser/go-sysconf v0.3.15  // 系统配置获取
    github.com/tklauser/numcpus v0.10.0    // CPU 数量检测
    github.com/yusufpapurcu/wmi v1.2.4     // Windows WMI 接口
    golang.org/x/sys v0.35.0               // 系统调用封装
)
```
### Node.js 依赖
- **express**: ^4.18.2 (Web 框架)
## 🚀 开发工具链
### GitHub Actions 集成
- **工作流位置**：`.github/workflows/`
- **本地测试工具**：[act](https://github.com/nektos/act)
- **常用命令**：
  ```bash
  act -j test    # 运行测试任务
  act            # 运行完整流水线
  act -l         # 查看执行图
  ```
### 构建脚本
- **build.sh**：项目构建脚本

### 代码质量工具
- **ESLint**：JavaScript 代码检查
- **Go 测试**：内置测试框架支持
## 📊 技术栈
| 层级 | 技术 | 用途 |
|---|---|---|
| 后端 | Go 1.24 | 系统监控服务 |
| 后端 | Node.js | Web API 服务 |
| 框架 | Express.js | Web 框架 |
| 监控 | gopsutil | 系统信息采集 |
| CI/CD | GitHub Actions | 持续集成/部署 |
| 测试 | act | 本地工作流测试 |
## 🎯 项目特点
1. **混合架构**：同时支持 Go 和 Node.js 运行时
2. **系统监控**：实时采集并展示系统资源使用情况
3. **云原生**：深度集成 GitHub Actions
4. **本地开发友好**：支持使用 act 本地测试工作流
5. **零配置部署**：通过 GitHub Actions 实现自动化部署