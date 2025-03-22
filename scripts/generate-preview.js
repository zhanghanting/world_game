/**
 * 游戏预览GIF生成脚本
 * 
 * 此脚本用于从视频文件生成游戏预览GIF
 * 需要安装ffmpeg和Node.js
 * 
 * 用法:
 * node generate-preview.js <视频文件路径> <游戏ID>
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 检查参数
if (process.argv.length < 4) {
  console.log('用法: node generate-preview.js <视频文件路径> <游戏ID>');
  process.exit(1);
}

const videoPath = process.argv[2];
const gameId = process.argv[3];
const outputDir = path.join(__dirname, '..', 'public', 'previews');
const outputFile = path.join(outputDir, `${gameId}-preview.gif`);

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`正在从 ${videoPath} 生成游戏 ${gameId} 的预览GIF...`);

try {
  // 使用ffmpeg生成预览GIF
  const command = `ffmpeg -i "${videoPath}" -t 4 -vf "fps=10,scale=420:240:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 "${outputFile}"`;
  
  console.log('执行命令:', command);
  execSync(command, { stdio: 'inherit' });
  
  console.log(`成功生成预览GIF: ${outputFile}`);
  console.log('请刷新页面查看效果');
} catch (error) {
  console.error('生成预览GIF时出错:', error.message);
  process.exit(1);
} 