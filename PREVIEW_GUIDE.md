# 游戏预览GIF获取与处理指南

本指南将详细介绍如何从各大游戏网站获取高质量的游戏预览GIF，并将其集成到我们的项目中。

## 目录

1. [前提条件](#前提条件)
2. [从CrazyGames获取预览](#从crazygames获取预览)
3. [从itch.io获取预览](#从itchio获取预览)
4. [从Kongregate获取预览](#从kongregate获取预览)
5. [处理与优化GIF](#处理与优化gif)
6. [将GIF集成到项目中](#将gif集成到项目中)
7. [批量处理多个GIF](#批量处理多个gif)
8. [疑难解答](#疑难解答)

## 前提条件

在开始之前，请确保您已经安装以下工具：

1. 现代网页浏览器（Chrome, Firefox等）
2. 图像编辑工具（可选）：
   - [GIMP](https://www.gimp.org/)
   - [Photoshop](https://www.adobe.com/products/photoshop.html)
3. FFmpeg（可选，用于视频转GIF）：
   - [下载地址](https://ffmpeg.org/download.html)
4. 录屏工具（如需录制）：
   - [ScreenToGif](https://www.screentogif.com/)（Windows）
   - [Gifox](https://gifox.io/)（Mac）
   - [Peek](https://github.com/phw/peek)（Linux）

## 从CrazyGames获取预览

### 方法1：使用浏览器开发者工具

1. 访问[CrazyGames](https://www.crazygames.com/)
2. 找到您感兴趣的游戏并打开其页面
3. 按F12打开开发者工具
4. 切换到"Network"（网络）选项卡
5. 在筛选器中选择"Img"或"Media"
6. 刷新页面
7. 查找类型为"gif"或"mp4"的资源文件
8. 右键点击文件→在新标签页中打开
9. 右键保存图像/视频

### 方法2：使用录屏工具

1. 打开游戏页面
2. 启动ScreenToGif等录屏工具
3. 选择录制区域，确保覆盖游戏预览
4. 开始录制，等待预览动画播放
5. 停止录制，保存为GIF格式

### 特定游戏搜索技巧

- 数字猜谜游戏：搜索"number game"、"guess the number"
- 记忆翻牌游戏：搜索"memory card game"、"matching pairs"
- 益智类游戏：搜索"puzzle game"
- 动作类游戏：搜索"action game"

## 从itch.io获取预览

1. 访问[itch.io](https://itch.io/)
2. 搜索相关游戏类型
3. 打开游戏页面
4. 右键点击游戏预览→检查元素
5. 在HTML代码中找到img标签，查看src属性
6. 复制完整的图像URL
7. 在新标签页中打开URL
8. 右键保存图像

**提示**：itch.io上的游戏通常有多个预览图片，您可以查找包含动画效果的GIF。

## 从Kongregate获取预览

Kongregate上的游戏预览通常是视频格式，需要转换为GIF：

1. 访问[Kongregate](https://www.kongregate.com/)
2. 搜索并打开游戏页面
3. 定位游戏预览视频
4. 使用开发者工具找到视频源：
   - 按F12打开开发者工具
   - 切换到"Network"选项卡
   - 筛选"Media"类型
   - 找到扩展名为.mp4的文件
5. 下载视频文件
6. 使用FFmpeg转换为GIF：
   ```bash
   ffmpeg -i input.mp4 -t 5 -vf "fps=10,scale=420:240:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 output.gif
   ```

## 处理与优化GIF

无论从哪个来源获取GIF，都需要进行处理以符合项目要求：

### 调整尺寸

使用在线工具[EzGif](https://ezgif.com/resize)或本地工具调整GIF尺寸：
1. 上传您的GIF
2. 设置尺寸为420×240像素
3. 处理并下载

### 优化文件大小

使用[EzGif优化工具](https://ezgif.com/optimize)减小文件大小：
1. 上传调整尺寸后的GIF
2. 选择压缩级别（推荐中等）
3. 处理并下载
4. 确保文件大小在1MB以内

### 使用FFmpeg进行一步到位处理

```bash
ffmpeg -i input.gif -vf "fps=10,scale=420:240:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 output.gif
```

## 将GIF集成到项目中

1. 将处理好的GIF文件命名为正确格式：
   - 数字猜谜游戏：`number-guessing-preview.gif`
   - 记忆翻牌游戏：`memory-card-preview.gif`
   - 其他游戏：`[游戏ID]-preview.gif`

2. 将文件放置在项目的`public/previews/`目录中

3. 刷新页面，将鼠标悬停在游戏卡片上测试效果

## 批量处理多个GIF

如果需要处理多个GIF，可以使用我们项目中的脚本：

```bash
# 如果源文件是视频
node scripts/generate-preview.js path/to/video.mp4 游戏ID

# 例如：
node scripts/generate-preview.js downloads/number-game.mp4 1
```

## 疑难解答

### 预览不显示

1. 检查文件命名是否正确
2. 确认文件位于正确的目录
3. 检查浏览器控制台是否有错误
4. 确保GIF文件可以正常打开

### GIF文件过大

1. 减少帧率（fps）
2. 降低GIF质量
3. 缩短GIF时长
4. 移除不必要的帧

### 预览加载缓慢

1. 进一步优化GIF大小
2. 考虑使用更小的GIF作为预览
3. 检查网络连接

---

通过遵循本指南，您应该能够从各大游戏网站获取高质量的游戏预览GIF，并将其成功集成到我们的项目中。如有任何问题，请参考`public/previews/README.md`文件或联系开发团队。 