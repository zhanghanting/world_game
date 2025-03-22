/**
 * 游戏工具函数
 */

import { games, Game } from '../data/games';

/**
 * 将游戏URL转换为代理URL
 * @param url 原始游戏URL
 * @returns 代理后的URL
 */
export function getProxiedGameUrl(url: string): string {
  return `/api/gameproxy?url=${encodeURIComponent(url)}`;
}

/**
 * 检查游戏是否支持内嵌
 * @param url 游戏来源
 * @returns 是否支持内嵌
 */
export function isGameEmbeddable(url: string): boolean {
  // 大多数游戏平台现在都可以嵌入
  return true;
}

/**
 * 从游戏源URL提取游戏ID或路径
 * @param url 游戏源URL
 * @returns 游戏ID或路径
 */
export function extractGameIdFromUrl(url: string): string | null {
  try {
    // 解析URL
    const parsedUrl = new URL(url);
    
    // 尝试从路径中提取ID
    const pathParts = parsedUrl.pathname.split('/').filter(part => part.length > 0);
    const lastPart = pathParts[pathParts.length - 1];
    
    // 如果最后一部分可能是ID，返回它
    if (lastPart && !lastPart.includes('.')) {
      return lastPart;
    }
    
    // 从查询参数中尝试提取ID
    const searchParams = new URLSearchParams(parsedUrl.search);
    for (const param of ['id', 'game', 'gameId', 'game_id']) {
      if (searchParams.has(param)) {
        return searchParams.get(param);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting game ID from URL:', error);
    return null;
  }
}

/**
 * 从游戏URL中提取域名
 * @param url 游戏URL
 * @returns 格式化的域名
 */
export function getDomainFromUrl(url: string): string {
  try {
    // 确保URL以http或https开头
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = 'https://' + url;
    }
    
    const parsedUrl = new URL(formattedUrl);
    return parsedUrl.hostname.replace('www.', '');
  } catch (error) {
    console.error('Error extracting domain from URL:', error);
    return '';
  }
}

// 根据ID获取游戏数据
export function getGameById(id: string): Game | null {
  const game = games.find(g => g.id === id);
  return game || null;
}

// 寻找类似游戏
export function findSimilarGames(game: Game, count: number = 3): Game[] {
  if (!game) return [];
  
  // 根据分类和难度来判断相似性
  return games
    .filter(g => 
      g.id !== game.id && // 排除当前游戏
      (g.categories.some(cat => game.categories.includes(cat)) || // 相同分类
       g.difficulty === game.difficulty) // 相同难度
    )
    .sort((a, b) => {
      // 计算相似度分数
      const aScore = getGameSimilarityScore(game, a);
      const bScore = getGameSimilarityScore(game, b);
      return bScore - aScore; // 降序排列
    })
    .slice(0, count);
}

// 计算两个游戏之间的相似度分数
function getGameSimilarityScore(game1: Game, game2: Game): number {
  let score = 0;
  
  // 相同分类加分
  game1.categories.forEach(cat => {
    if (game2.categories.includes(cat)) {
      score += 2;
    }
  });
  
  // 相同难度加分
  if (game1.difficulty === game2.difficulty) {
    score += 1;
  }
  
  // 相同特性加分 (isFeatured, isNew, isTrending)
  if (game1.isFeatured === game2.isFeatured) score += 0.5;
  if (game1.isNew === game2.isNew) score += 0.5;
  if (game1.isTrending === game2.isTrending) score += 0.5;
  
  return score;
} 