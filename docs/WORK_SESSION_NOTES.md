# 工作会话记录

## 当前任务状态（2025-12-29）

### ✅ 已完成
1. **MNIST 文章基础创建**
   - 完成所有基础组件（Hero, HeroCompact, Content, ConvolutionVisualizer, TerminalSection）
   - 创建路由文件（page.tsx, Cover.tsx）
   - 创建翻译文件（zh/en）
   - 注册到文章列表和 i18n 配置
   - 现代终端风格设计（深色背景 + 白色文字 + 终端绿/青色/黄色）

2. **问题修复**
   - ✅ 统一首页卡片高度：h-[400px]
   - ✅ 移除硬编码英文，使用翻译
   - ✅ 文章按日期倒序排列（新文章在前）
   - ✅ 首页点击跳转功能

3. **文档更新**
   - ✅ 更新 DESIGN_GUIDE.md：增加首页一致性约束
   - ✅ 更新 ARTICLE_CREATION.md：Step 5.2 增加 Hero Link 包裹提示
   - ✅ 更新 ARTICLE_CREATION.md：Step 8.3 增加首页点击测试

### 🚧 待完成（下一步）

**主要任务**：将原始 MNIST.md 的详细数学内容集成到文章中

**实现方案**：终端命令式展开（已选定）
```
简介文字...

┌────────────────────────────────────────┐
│ $ cat convolution_math.txt             │  ← 绿色，可点击展开
└────────────────────────────────────────┘

展开后显示：
- 详细的计算步骤
- LaTeX 数学公式（需要 KaTeX）
- 矩阵运算过程
- $ exit 命令收起
```

**需要做的**：
1. 创建 `TerminalDetails.tsx` 组件（可折叠的终端内容块）
2. 安装并配置 KaTeX（如果还没有）
3. 将 `/Users/as/code/loom-wisdom/MNIST.md` 的详细内容按章节提取
4. 更新 Content.tsx，在每个章节添加"查看详细推导"
5. 更新翻译文件，添加详细内容的翻译

## 关键文件路径

**源文件**：
- 原始内容：`/Users/as/code/loom-wisdom/MNIST.md`

**项目文件**：
- 组件目录：`/Users/as/VPS/www/app/components/mnist-neural-network/`
  - Hero.tsx, HeroCompact.tsx, Content.tsx
  - ConvolutionVisualizer.tsx, TerminalSection.tsx
  - index.tsx（文章注册）
- 路由：`/Users/as/VPS/www/app/[locale]/mnist-neural-network/`
  - page.tsx, Cover.tsx
- 翻译：`/Users/as/VPS/www/messages/{zh,en}/mnist-neural-network.json`
- 配置：
  - `/Users/as/VPS/www/app/components/articles/index.ts`
  - `/Users/as/VPS/www/i18n/request.ts`

## 项目规范总结

1. **首页卡片规范**（来自 DESIGN_GUIDE.md）：
   - 高度：`h-[400px]`（inHome 模式）
   - 宽度：`w-full`
   - 必须用 `<Link>` 包裹

2. **国际化规范**：
   - 所有文本使用 `useTranslations()`
   - 禁止硬编码任何语言的文字
   - 翻译文件使用命名对象，不用数组索引

3. **文章排序**：
   - `getPublishedArticles()` 按 date 倒序排列

4. **设计原则**：
   - 形式服务于内容
   - 首页保持一致
   - 每篇文章可以有独特风格

## 服务器信息

- 开发服务器运行中
- 任务 ID: b784dd0
- 地址：http://localhost:3000
- 中文 MNIST：http://localhost:3000/zh/mnist-neural-network
- 英文 MNIST：http://localhost:3000/en/mnist-neural-network

## 设计风格（MNIST 文章）

**配色**：
- 背景：#1a1a1a
- 正文：#e5e7eb
- 标题：#ffffff
- 命令提示符：#50fa7b（终端绿）
- 矩阵边框：#8be9fd（青色）
- 高亮结果：#f1fa8c（黄色）
- 注释：#6272a4（暗灰）

**字体**：
- 等宽字体：JetBrains Mono > Fira Code > SF Mono

**核心组件**：
- ConvolutionVisualizer：交互式矩阵计算演示
- TerminalSection：终端风格的章节容器
- （待创建）TerminalDetails：可展开的详细内容

## 反思总结

**出现的问题**：
1. 首页卡片高度不一致
2. 硬编码英文文本
3. 文章排序混乱

**根本原因**：
- 没有先参考现有文章实现
- 国际化意识薄弱
- 缺少用户视角

**改进措施**：
- ✅ 更新 DESIGN_GUIDE.md 增加首页一致性约束
- ✅ 更新 ARTICLE_CREATION.md 增加最佳实践提示
- 学习现有实现 → 继承规范 → 在规范内创新
