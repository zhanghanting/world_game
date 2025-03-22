# 游戏预览GIF添加指南

此目录用于存放游戏的预览动画（GIF格式），当用户将鼠标悬停在游戏卡片上时，这些动画会自动播放，展示游戏的精彩内容。

## 文件命名规则

请按照以下规则命名预览GIF文件：

1. 数字猜谜游戏：`number-guessing-preview.gif`
2. 记忆翻牌游戏：`memory-card-preview.gif`
3. 其他游戏：`[游戏ID]-preview.gif`

## 创建高质量的预览GIF

为获得最佳展示效果，请遵循以下建议：

1. **尺寸**：建议尺寸为 420x240 像素
2. **时长**：3-5秒，循环播放
3. **文件大小**：控制在 1MB 以内，以保证快速加载
4. **内容**：展示游戏最吸引人的部分，如游戏胜利、精彩操作等
5. **质量**：保持清晰度，但可适当降低颜色数量以减小文件体积

## 从游戏网站获取预览GIF

### CrazyGames (www.crazygames.com)

1. 访问游戏页面，找到预览动画
2. 使用浏览器开发者工具(F12)
3. 在Network标签下筛选"Media"或"Img"类型
4. 找到GIF资源并下载
5. 使用在线工具调整大小和优化

### itch.io

1. 访问游戏页面，查找游戏预览GIF
2. 右键检查元素，找到原始GIF链接
3. 下载并处理GIF

### Kongregate (www.kongregate.com)

1. 找到游戏预览视频
2. 下载视频或使用录屏工具录制
3. 使用FFmpeg或在线工具转换为GIF：
   ```
   ffmpeg -i input.mp4 -vf "fps=10,scale=420:240:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 output.gif
   ```

## 工具推荐

1. **录制工具**：
   - ScreenToGif: https://www.screentogif.com/ (Windows)
   - Gifox: https://gifox.io/ (Mac)

2. **编辑和优化**：
   - EzGif: https://ezgif.com/
   - GIMP: https://www.gimp.org/
   - FFmpeg: https://ffmpeg.org/

3. **在线转换**：
   - Convertio: https://convertio.co/
   - CloudConvert: https://cloudconvert.com/

## 示例内容

1. **数字猜谜游戏**：展示玩家成功猜中数字时的动画效果
2. **记忆翻牌游戏**：展示翻牌配对成功的精彩瞬间
3. **益智游戏**：展示解谜成功的瞬间
4. **动作游戏**：展示精彩操作或胜利画面

感谢您为游戏添加精彩预览，这将大大提高用户体验！ 