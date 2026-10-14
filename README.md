# covid19 · 基于 Vue3 + ECharts 的新冠疫情数据可视化

> ## ⚠️ 本项目已归档，不再维护
>
> **归档时间**：2026-10-14
>
> **失效原因**（均已实测确认）：
>
> 1. 上游数据接口 `api.inews.qq.com/newsqa/v1/query/...modules/list` 已被腾讯下线，现返回 **HTTP 404**；
> 2. 国内疫情公开数据自 2023 年初停止更新，`diseaseh5Shelf` 字段所承载的统计口径已不存在；
> 3. 自建 Node 数据代理（`162.14.73.22:3333`）与部署站点均已关停。
>
> **代码本身仍是完好的**：`npm install` / `npm run dev` / `npm run build` / `npm run typecheck` 在 Node 24 下全部通过（见[本地运行](#本地运行)）。但由于数据源已消失，即使把页面跑起来，图表也拿不到任何数据——这不是 bug，无法通过改代码恢复。
>
> 保留目的：个人学习记录（Vue3 + TypeScript + Pinia + ECharts 地图可视化的入门实践）。

---

## 项目简介

一个单页数据大屏：把当时腾讯新闻公开的新冠疫情统计接口取回来，用 ECharts 做中国地图分色、散点标注和趋势图，左侧是核心指标卡片，右侧是分地区明细表。

最初写于 2022 年 4 月，用于练习 Vue3 组合式 API 与 ECharts 地理坐标系的配合方式。

## 页面构成

| 区域 | 内容 | 数据字段 |
|------|------|----------|
| 左上 指标卡 ×6 | 本土现有确诊 / 现有确诊 / 累计确诊 / 无症状感染者 / 境外输入 / 累计死亡，每张同时显示「较上日 +N」与累计值 | `chinaAdd` / `chinaTotal` |
| 中部 | 中国地图（`geo` 组件，线性渐变填充）+ 各省位置散点，散点大小映射现有确诊 | `diseaseh5Shelf.areaTree[0].children` + `geoCoordMap` |
| 左下 饼图 / 折线图 | 重点城市现有确诊占比与趋势（取前 10 条） | `statisGradeCityDetail` |
| 右侧 明细表 | 地区 / 新增确诊 / 累计确诊 / 治愈 / 死亡，行入场带 animate.css 动画 | 默认展开上海的下属分区 |

## 技术栈

- **框架**：Vue 3.2（`<script setup>` 组合式 API）
- **语言**：TypeScript 4.5
- **构建**：Vite 2.8 + `@vitejs/plugin-vue` / `@vitejs/plugin-vue-jsx`
- **状态**：Pinia 2.0
- **可视化**：ECharts 5.3（地图注册见 `src/assets/china.js`，经纬度表见 `src/assets/getMap.ts`）
- **请求**：Axios 0.26
- **动效**：animate.css 4.1
- **样式**：Less

## 目录结构

```
.
├── src/
│   ├── App.vue              # 大屏主体：指标卡 + 地图 + 饼图/折线图 + 明细表
│   ├── main.ts              # 应用入口，挂载 Pinia
│   ├── server/index.ts      # Axios 实例，baseURL 指向自建代理（已停用）
│   ├── stores/
│   │   ├── index.ts         # Pinia store：拉取接口并拆分 chinaAdd / chinaTotal / cityDetail
│   │   └── type.ts          # 接口响应的 TypeScript 类型定义
│   └── assets/
│       ├── china.js         # 中国地图 GeoJSON 注册
│       ├── getMap.ts        # 省份经纬度表 geoCoordMap
│       └── 1.jpg            # 大屏背景图
├── NodeDemo/
│   └── index.ts             # Express 代理：转发腾讯接口 + 放开跨域，监听 3333
├── vite.config.ts           # 仅配置了 @ → src 别名
└── package.json
```

## 数据来源与调用链

```
Vue3 前端 (src/server/index.ts, baseURL = http://162.14.73.22:3333)
    ↓  GET /api/list
Express 代理 (NodeDemo/index.ts, 监听 3333，附带 Access-Control-Allow-Origin: *)
    ↓  POST
腾讯新闻接口 api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list
             ?modules=statisGradeCityDetail,diseaseh5Shelf
```

中间加一层 Node 代理的原因是浏览器直连腾讯接口会被跨域限制拦下，同时收敛请求参数。

**当前状态**：最后一步的腾讯接口已返回 404，因此整条链路即使自建代理也取不到数据。

## 本地运行

以下命令在 **Node v24.16.0 / npm 11.13.0** 下实测通过（2026-10-14）：

```sh
# 1. 安装依赖（约 206 个包，无编译错误）
npm install

# 2. 开发服务器 —— 可正常启动，默认 http://localhost:3000
npm run dev

# 3. 生产构建 —— 可成功产出 dist/（647 个模块，主 chunk 约 1.07 MB）
npm run build

# 4. 类型检查 —— 无报错
npm run typecheck

# 5. 预览构建产物
npm run preview   # http://localhost:5050
```

如需一并跑起代理（**注意：跑起来也拿不到数据，仅为还原架构**）：

```sh
cd NodeDemo
npm install
npm run dev       # ts-node index.ts，监听 3333
```

> 页面打开后指标卡显示为空、地图无散点属预期结果——`store.getList()` 请求失败后，各字段停留在初始空值。

## 已知限制

保留原样未修，作为当时的练习痕迹：

- **默认城市写死为数组下标**：`src/App.vue` 中 `city[3].children` 固定取上海分区，接口数据顺序变化即错位。
- **直接操作 DOM 拿图表容器**：`document.querySelector('#china')`，未使用 Vue 的 `ref`。
- **地图数据全量内置**：`china.js` 把 GeoJSON 打进包里，是产物体积偏大的主因。
- **依赖版本较旧**：Vite 2.8 / vue-tsc 0.31 属于 2022 年的生态，升级需同步改造配置。
- **无 LICENSE 文件**：未显式声明开源许可。

## 部署历史（均已关停）

| 地址 | 用途 | 现状（2026-10-14 实测） |
|------|------|------------------------|
| `covid19.suxin23.cn` | 域名访问入口 | DNS 已不再解析 |
| `http://162.14.73.22:410/` | 前端静态部署 | 端口无响应 |
| `http://162.14.73.22:3333/api/list` | Node 数据代理 | 端口无响应 |

## 项目时间线

| 日期 | 事件 |
|------|------|
| 2022-04-01 | 项目初步完成，前端 + Node 代理 |
| 2022-04-10 | 更换背景图，默认展示改为上海 |
| 2022-05-03 ~ 05-08 | README 文档补充 |
| 2023-03-13 | 最后一次提交（README 标注项目失效） |
| 2026-10-14 | 仓库归档，README 重写为现状说明 |

---

疫情已经结束。这套代码留着只是记录一段自己刚上手 Vue3 时的样子。
