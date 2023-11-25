<img src="https://github.com/cotiser/rua/assets/12660628/2fac9731-4eb3-4cb8-a816-10bf6cef98b3" width="60"> 

# Getting Started

## 本地开发

### 配置本地环境

在 ui 目录下新增文件`.env.development.local`，设置`VITE_APP_URL`为前端地址，`VITE_SERVER_URL`为后端地址。

如下示例：

```bash
VITE_APP_URL="http://localhost:8080/dev--rua"
VITE_SERVER_URL="http://localhost:5000"
```

### 安装依赖并启动

```bash
$ npm install
$ npm run dev
```

## 将前端代码打包

```bash
$ npm run build
```

如果是 staging 环境，可以：

```bash
$ npm run build:s
```

# Contributors

- sweetbrulee