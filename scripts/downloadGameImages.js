/**
 * 游戏图像下载脚本
 * 
 * 这个脚本从GameDistribution自动下载游戏缩略图到本地
 * 解决游戏预览图片404错误问题
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { gameResources } = require('../app/data/gameResources');

// 确保图像目录存在
const imagesDir = path.join(__dirname, '../public/images');
const gameCoversDir = path.join(imagesDir, 'game-covers');
const previewsDir = path.join(imagesDir, 'previews');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

if (!fs.existsSync(gameCoversDir)) {
  fs.mkdirSync(gameCoversDir, { recursive: true });
}

if (!fs.existsSync(previewsDir)) {
  fs.mkdirSync(previewsDir, { recursive: true });
}

// 创建一个默认封面图，避免404错误
const createDefaultCoverImage = () => {
  const defaultCoverPath = path.join(gameCoversDir, 'fallback.jpg');
  
  // 只在文件不存在时创建
  if (!fs.existsSync(defaultCoverPath)) {
    // 创建一个简单的纯色图像作为默认图
    const simpleCanvas = `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#2a3f5f"/>
        <text x="50%" y="50%" font-family="Arial" font-size="50" fill="white" text-anchor="middle" dominant-baseline="middle">游戏封面</text>
      </svg>
    `;
    
    fs.writeFileSync(defaultCoverPath, simpleCanvas);
    console.log(`创建了默认封面图: ${defaultCoverPath}`);
  }
};

// 下载图像
const downloadImage = (url, filePath) => {
  return new Promise((resolve, reject) => {
    // 如果文件已存在，跳过下载
    if (fs.existsSync(filePath)) {
      console.log(`图片已存在: ${filePath}`);
      resolve(filePath);
      return;
    }
    
    console.log(`下载图片: ${url} -> ${filePath}`);
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`下载失败，状态码: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`图片下载成功: ${filePath}`);
        resolve(filePath);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // 删除未完成的文件
      reject(err);
    });
  });
};

// 主函数
async function main() {
  console.log('开始下载游戏图像...');
  createDefaultCoverImage();
  
  const downloads = [];
  
  // 遍历所有游戏资源
  for (const game of gameResources) {
    try {
      // 创建游戏ID特定的文件名
      const coverFileName = `${game.id}.jpg`;
      const previewFileName = `${game.id}-preview.gif`;
      
      const coverPath = path.join(gameCoversDir, coverFileName);
      const previewPath = path.join(previewsDir, previewFileName);
      
      // 下载缩略图用作封面
      if (game.thumbnailImage && game.thumbnailImage.startsWith('http')) {
        downloads.push(downloadImage(game.thumbnailImage, coverPath));
      }
      
      // 如果有GIF预览，也下载它
      if (game.previewGif && game.previewGif.startsWith('http')) {
        downloads.push(downloadImage(game.previewGif, previewPath));
      }
      
      // 更新本地文件路径
      console.log(`更新游戏 ${game.id} 的本地图像路径`);
    } catch (error) {
      console.error(`处理游戏 ${game.id} 时出错:`, error);
    }
  }
  
  // 等待所有下载完成
  await Promise.allSettled(downloads);
  console.log('所有图像下载完成!');
  
  // 更新游戏资源文件中的图像路径
  console.log('记得在gameResources.ts中更新图像路径为本地路径!');
}

// 运行主函数
main().catch(err => {
  console.error('图像下载过程中出错:', err);
  process.exit(1);
}); 