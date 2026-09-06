# AGENTS.md

本文件面向在本项目中工作的 AI Agent / 自动化工具体系。请在动手前阅读。

---

## 项目概览

**Pixiv Fanbox Downloader** 是一个 Chrome 浏览器扩展（Manifest V3），用于批量下载 [Pixiv Fanbox](https://www.fanbox.cc/) 上的投稿文件。

- 作者：xuejianxianzun / 雪见仙尊
- 仓库：https://github.com/xuejianxianzun/PixivFanboxDownloader
- 许可证：GPL-3.0-or-later

**重要前提**：本扩展不会绕过 Fanbox 的付费限制。要下载付费内容，用户必须先购买。

### 核心能力

- 抓取单个投稿 / 抓取单个创作者的全部投稿 / 抓取关注的所有用户的投稿 / 抓取赞助的所有用户的投稿 / 抓取 Tag 分类页里的投稿
- 保存投稿里的文件（图片、视频、压缩包等）
- 可以自定义文件命名规则（如 `{user}/{date}-{title}/{index}`）
- 保存投稿正文为 TXT 或 **HTML**（可以使用 HTML 的能力显示同文件夹里的图片/视频）
- 保存投稿评论
- 保存粉丝卡（赞助中创作者的赞助等级图片）
- 支持不下载重复文件、恢复未完成下载、下载完成通知
- 支持多种过滤条件：投稿日期范围、价格（≤/=/≥）、投稿标题关键字、文件名关键字、文件类型、图片尺寸
- 一些下载设置：抓取间隔 / 下载间隔 / 单日下载体积上限（防封号）
- 其他设置：颜色主题（亮/暗）、多语言（简繁中 / 英 / 日 / 韩 / 俄）

---

## 技术栈

- **语言**：TypeScript（strict 模式，`target: ESNext`）
- **构建**：Webpack 5 + ts-loader
- **样式**：LESS（编译为 CSS）
- **格式化**：Prettier
- **打包**：archiver + recursive-copy（`pack.js`）
- **扩展规范**：Chrome MV3（Service Worker）

**不要添加** 任何 React/Vue/jQuery 等前端框架——项目刻意保持零依赖 UI。

---

## 项目结构

```
.
├── src/                        # 源代码
│   ├── manifest.json           # MV3 清单
│   ├── ts/                     # TypeScript 源码
│   │   ├── content.ts          # 内容脚本入口（被注入到 fanbox.cc 页面）
│   │   ├── background.ts       # Service Worker 入口
│   │   ├── API.ts              # Fanbox API 调用
│   │   ├── Config.ts           # 默认配置
│   │   ├── States.ts           # 全局状态
│   │   ├── EVT.ts              # 自定义事件总线
│   │   ├── Store.ts / SaveData.ts # 数据存储（基于 IndexedDB）
│   │   ├── Lang.ts / langText.ts # 多语言
│   │   ├── Theme.ts / Colors.ts # 主题与颜色
│   │   ├── PageType.ts         # 页面类型识别
│   │   ├── UnifiedURL.ts       # 统一 www.fanbox.cc/@xxx 格式
│   │   ├── ListenPageSwitch.ts # 监听 SPA 路由切换
│   │   ├── CenterPanel.ts      # 主控制面板
│   │   ├── OutputPanel.ts      # 日志面板
│   │   ├── ProgressBar.ts      # 下载进度条
│   │   ├── Tip.ts              # 提示气泡
│   │   ├── Toast.ts / MsgBox.ts # 轻量提示与模态框
│   │   ├── FileName.ts         # 文件名生成（含命名规则解析）
│   │   ├── Filter.ts           # 投稿过滤
│   │   ├── QuickCrawl.ts       # 快速抓取按钮逻辑
│   │   ├── ShowNotification.ts # 系统通知
│   │   ├── ShowWhatIsNew.ts    # 更新日志展示
│   │   ├── CheckUnsupportBrowser.ts # 不支持浏览器的提示
│   │   ├── InitPage.ts         # 页面初始化分发
│   │   ├── InitPageBase.ts     # 各页面初始化基类
│   │   ├── InitHomePage.ts     # 主页（https://www.fanbox.cc/home）
│   │   ├── InitPostListPage.ts # 创作者主页（@xxx/posts）
│   │   ├── InitPostPage.ts     # 单个投稿页
│   │   ├── InitTagPage.ts      # Tag 分类页
│   │   ├── InitShopPage.ts     # 赞助商店页
│   │   ├── download/           # 下载相关
│   │   ├── setting/            # 设置表单相关
│   │   └── utils/              # 工具函数（IndexedDB、日期、通用）
│   ├── style/                  # LESS 样式
│   └── static/                 # 静态资源（图标、图片）
├── dist/                       # 构建产物
├── docs/                       # 文档与截图
├── webpack.conf.js             # Webpack 配置（入口：content、background）
├── pack.js                     # 把 dist 打成 zip 的脚本
├── tsconfig.json
├── package.json
├── changelog.md                # 版本变更日志
├── Readme.md / Readme-EN.md / Readme-JA.md / Readme-KO.md / Readme-ZH-TW.md
└── LICENSE
```

补充说明：
- `src/ts/setting/Settings.ts`：初始化和储存设置
- `src/ts/CenterPanel.ts`：下载器的前台界面（设置面板）
- `src/ts/setting/FormHTML.html`：设置面板里的表单（包含了所有用户可见的设置项）
- `src/ts/setting/FormSettings.ts`：管理表单里的设置项：从 settings 里恢复选项的值；当选项改变时保存到 settings 里
- `src/ts/download/DownloadControl.ts`：下载控制
- `src/ts/download/Download.ts`：下载单个文件
- `src/ts/utils/Utils.ts`：通用的工具类

---

## 架构关键点

### 1. 双脚本协作

- **`content.ts`**：被注入 `*://*.fanbox.cc/*`，负责 UI 渲染、用户交互、抓取流程控制
- **`background.ts`**：MV3 Service Worker，负责调用 `chrome.downloads` API、跨域网络请求

两脚本之间通过 `chrome.runtime.sendMessage` / `chrome.storage` 协调。**不要**把下载触发逻辑直接放在 content 里——浏览器下载必须经由 background。

### 2. 页面路由识别

Fanbox 是 SPA，URL 变化但页面不一定刷新。`ListenPageSwitch.ts` 监听 history 变化并触发页面重新初始化，`InitPage.ts` 根据当前 URL 分发到对应的 `InitXxxPage`。

### 3. 抓取和下载流程

使用 QuickCrawl 按钮或者设置面板上的抓取按钮可以开始抓取。抓取流程：

```
  → 在列表页抓取时，先通过 API.ts 请求 /post.paginateCreator 等接口获取投稿 ID 列表
  → 逐个请求 /post.info?postId=xxx 获取投稿详情
  → Filter.ts 按设置过滤
  → 进入下载队列
  → content 通过消息把任务发给 background
  → background 用 chrome.downloads.download 触发浏览器下载
  → 浏览器下载完成后，后台脚本向前台发送消息，使下载进度增加，并开始下载剩余的文件
```

### 4. 命名规则

用户在「设置 → 命名规则」里定义路径模板。`FileName.ts` 解析模板，支持的部分命名标记如：

| 标记 | 含义 |
|---|---|
| `{user}` | 创作者名称 |
| `{user_id}` | 创作者 ID（URL 中 `@xxx` 的 xxx）|
| `{post_id}` | 投稿 ID |
| `{title}` | 投稿标题 |
| `{date}` / `{task_date}` | 投稿日期 / 抓取日期 |
| `{index}` | 文件序号（默认 0 起）|
| `{name}` | 文件原名 |

还有更多的一些标记。用户也可以在命名规则里添加自定义字符、创建多层文件夹。

非法字符会被转义。

### 5. 数据存储

- 用户设置：`chrome.storage.local`
- 下载记录（用于「不下载重复文件」）：`utils/IndexedDB.ts`（基于 IndexedDB）
- 大对象不要塞进 `chrome.storage`——有配额限制

### 6. 反爬策略

历史上有用户因高频爬取被封号。**当前默认策略**（`changelog.md` 4.6.0+）：

- 单线程抓取，请求间隔由用户在「抓取间隔」设置（默认非 0）
- 同时下载数 ≤ 3
- 「下载间隔」控制两次下载启动间隔
- 「每天下载文件大小限制」避免单日过量

修改下载/抓取逻辑时，**不要轻易降低**这些限制。

---

## 修改前必读

### 添加新设置项

1. 在 `setting/Options.ts` 定义默认值
2. 在 `setting/FormHTML.html` 添加对应的表单控件
3. 在 `setting/Form.ts` / `Settings.ts` 读取并应用
4. 在 `Lang.ts` 与各语言字典里添加文案（zh / zh-tw / en / ja / ko / ru）

### 添加新抓取目标（如新的页面类型）

1. 在 `PageType.ts` 增加类型
2. 新建 `InitXxxPage.ts`，继承 `InitPageBase.ts`
3. 在 `InitPage.ts` 的分发逻辑里挂上
4. 在 `manifest.json` 的 `content_scripts.matches` 已包含 `*://*.fanbox.cc/*`，无需修改

### 修复 Fanbox API 变化导致的抓取失败

历史已发生多次（4.4.0、4.9.2、4.9.3、4.9.4 都是这类修复）。思路：

1. 在浏览器开发者工具里复现一次抓取，对比旧版数据结构
2. 在 `API.ts` 里适配新结构；如果新加了嵌套包装层，做兼容（判断字段存在与否）
3. 在 `changelog.md` 写明原因和数据结构对比
4. 如果是分页机制变化（如 `nextUrl` → `pageUrls`），注意不要漏抓后续页

### 修改 UI

- 样式在 `src/style/`，使用 LESS 变量
- 主题相关颜色走 `Theme.ts` / `Colors.ts`，**不要**在控件里写死颜色
- 图标使用项目内 iconfont（`lib/iconfont.js`），不是外部图标库

---

## 代码风格

- 使用 Prettier 默认格式化结果；当前仓库使用：
  - 变量名使用驼峰命名法
  - TypeScript 文件的文件名与它内部的 class 名称相同，并且都是首字母大写的。class 的实例名称则是首字母小写的。
  - 单引号
  - 不写分号
  - 2 空格缩进
  - 默认不使用 ES5 trailing comma；对于已经使用了尾逗号的地方，保持原样，不需要去掉尾逗号。这是因为有些数据可能会在未来添加新的条目，所以我特意添加了尾逗号。
- 注释的风格：
  - 代码注释与日志优先使用中文。
  - 修改代码时，对于模块里的全局变量和全局方法（即模块里或 class 里的顶级成员），必须添加注释，并且使用 JSDoc 格式，如 `/** 注释内容 */`。对于局部代码块、变量，添加适当的注释即可（通常用来说明工作流程），并且使用普通的双斜线注释。
- 优先复用现有工具类、状态模块、事件系统，不要平行造新轮子。
- 不要为了绕过类型检查而使用不必要的 `any` 或双重断言。

## 开发约定

- **TypeScript strict 模式**已开启。不要用 `any` 绕过，新代码尽量显式标注类型
- **不引入第三方运行时依赖**。`package.json` 里目前只有 devDependencies。`dist/` 里如果出现新的第三方 JS，需要单独评估
- **不修改构建产物**。`dist/` 是 webpack/pack.js 自动生成的
- **多语言文案**：每加一个用户可见字符串，必须在 `langText.ts` 的全部 6 种语言里补齐。如果只补一种语言就提交，会被作者打回

## 现有模式与约定

- 事件系统统一使用 `EVT`；很多模块通过监听事件驱动状态变化。
- 很多功能模块是“副作用模块”：创建文件后如果希望自动启用，通常还需要在入口文件中 `import`。
- 很多逻辑已经高度模块化；改动前先搜索是否已有近似实现。
- `dist/` 是编译产物，通常不手改源码生成内容；应修改 `src/` 里的源文件并重新编译。

## 修改原则

- 只做与当前任务直接相关的改动，避免顺手清理无关问题。
- 保持现有行为和用户体验，除非需求明确要求改变。
- 新增逻辑时优先延续现有命名、日志、错误处理、事件绑定方式。
- 如果某个功能需要跨多个模块接线，务必把所有相关入口都接完整。

---

## 开发与构建命令

```bash
npm install            # 安装依赖
npm run ts            # webpack 打包 TS → dist/js/
npm run less          # lessc 编译 src/style/style.less → dist/style/style.css
npm run fmt           # prettier 格式化 src/ts/** 与 src/style/**
npm run pre-build     # ts + less + fmt
npm run build         # pre-build + pack.js（最终产出 zip）
```

构建产物：

- `dist/js/content.js` 与 `dist/js/background.js` 由 webpack 生成
- `dist/manifest.json`、`dist/style/`、`dist/icon/` 等静态文件由 `pack.js` 拷贝
- `PixivFanboxDownloader.zip` 是最终离线安装包

**注意**：构建链不包含 lint，但代码风格由 prettier 统一。提交前请运行 `npm run fmt`。

修改代码后，按最小范围验证：

- 修改 `src/ts/` 后：运行 `npm run ts`
- 修改 `src/style/` 后：运行 `npm run less`
- 需要统一格式时：运行 `npm run fmt`

---

## 修改代码时的注意事项

- 先搜索再改：本仓库功能多、历史久，重复实现的风险高。
- 有时你修改代码之后，我又进行了修改。当你之后再修改时，如果在初次搜索/匹配时结果不符合预期，就可能是发生了这种情况。此时需要以当前实际代码为基础修改，而不是使用你记忆中的旧代码，以免错误的覆盖了我的修改。
- 在开始处理我的每一条新消息前(即每次回复前),先检查一次 git 状态:git status --short 查看工作区改动,并用 git log --oneline -1 确认 HEAD 是否已前移;若发现要修改的文件有变化,先读取其最新内容再动手。因为我可能会在两轮对话之间手动修改文件、进行提交,如果你不检查,会以为文件内容还停留在你上次修改后的结果,这经常会导致命令执行错误和返工。
- 遇到修改抓取流程、下载流程、命名规则等需求时，优先检查相邻模块。
- 翻译 i18n 语句时（即修改 `src/ts/langText.ts` 里的文本时），需要遵守翻译规则：`docs/翻译多语言文本的 prompt.md`。如果我在一条对话里让你修改或补全多个语句的翻译，那么你应该先把这些语句全部翻译，最后执行一次编译，而不是每修改一条就执行一次翻译（这样效率太低）。
- 在代码文件里查找（搜索）内容时，默认忽略 `src/static/` 目录里的文件，因为这些文件大多是静态的库文件，不依赖下载器的代码，也很少进行修改。只有当我明确说明需要查找或编辑里面的文件时，才需要读写它们。
- 每轮对话结束后，如果这轮对话修改了任意 *.ts 文件，就执行 `npm run ts` 进行编译。
- 如果你需要把一些文件更新到 `dist/` 目录里（例如修改了 `src/manifest.json` 之后，需要把它复制到 `dist/` 目录里使其生效），应该执行 `node pack` 命令。
- 当我让你 review 时，如果没有指定某个文件，那么 review 范围就是 git 里未提交的所有更改。注意：总是忽略编译产物（即忽略 `dist/` 目录里的所有文件）和 *.md 文件。
- 当我让你把 Markdown 文本转换为 HTML 格式时，转换规则在文档 `docs/把 Markdown 文本转换为 HTML 格式.md` 里。

---

## 调试技巧

- 扩展加载：`chrome://extensions/` → 开发者模式 → 加载已解压的扩展 → 选择 `dist/` 目录
- Service Worker 日志：`chrome://extensions/` → 本扩展的「Service Worker」链接
- Content Script 日志：在 Fanbox 页面里 DevTools Console
- 抓取/下载流程：看 `OutputPanel.ts` 输出的日志，或 background 控制台
- 模拟 Fanbox 登录态：直接登录 fanbox.cc 即可，扩展读取浏览器 cookie
- 重置扩展数据：在扩展详情页点「删除扩展数据」，或手动清理 IndexedDB（DevTools → Application → IndexedDB）

---

## 容易踩的坑

1. **Fanbox URL 两种形式**：`https://user.fanbox.cc/` 与 `https://www.fanbox.cc/@user` 是**不同源**，cookie、IndexedDB、storage **不通用**。`UnifiedURL.ts` 会把前者跳转到后者，但调试时记得这一点
2. **文件下载依赖 cookie**：Fanbox 文件需要登录态才能下载。把 URL 复制到外部下载器（IDM 等）通常会 403。**不要**尝试绕开这个限制——那是下载器而不是扩展的事
3. **同名文件不覆盖**：让浏览器自动加序号。
4. **MV3 没有持久后台**：`background.ts` 会被浏览器休眠。大文件下载时数据要做持久化（`dlData` 已经做了）。新加的后台状态默认要考虑持久化

---

## PowerShell 约束

当你需要执行终端命令时，可以自行选择使用的工具，不强制使用 PowerShell。如果要使用 PowerShell，则优先使用 PowerShell 7（也就是 `pwsh` 命令），不要使用 Windows 内置的旧版 PowerShell。

下面是**当你使用 PowerShell 7 时**一些具体的约束：
- 若在 PowerShell 中执行命令且关心中文输出，先确保输出编码为 UTF-8。
- 默认禁止使用 Bash 语法。
- 不要使用 Bash 引号/转义习惯，在 PowerShell 命令里，复杂正则优先用单引号包裹。
- 尽可能使用引号`"`或者`'`包裹字符串参数，特别是路径参数，避免因为空格等原因造成命令被截断和出现歧义。
- 如果文件路径有特殊符号(比如各种括号)，你在使用 Get-Content 获取的时候务必加上`-LiteralPath`参数，避免被错误解析。
- 如果正则本身同时包含单引号和双引号，优先拆成多个简单 `rg` 命令。
- 使用 `rg` 时，遇到 PowerShell 解析异常或路径包含通配符时，先展开为真实路径。
- 在 PowerShell 里，语句块表达式（如 `foreach`、`if`）不能直接作为管道输入。 需要先使用 `$()` / `@()` 包裹，或先赋值给变量。 普通命令输出可直接进入管道，无需额外包裹。
- 执行多行 Python 禁止使用 Bash heredoc ；改用 PowerShell here-string | python -

---

## 变更记录

每次提交显著改动前，请确认：

- [ ] 跨语言文案已补齐（如果涉及 UI）
- [ ] `npm run fmt` 已运行
- [ ] `npm run build` 能成功打包出 zip
- [ ] 在本地 Chrome 加载 `dist/` 验证至少一个相关流程（如果你不具备这个能力则跳过此步骤）

---

_本文件由 AI 协作生成。如发现与代码现状不符，请优先以代码为准，并更新本文件。_