// 游戏资源收集 - 所有可嵌入的游戏资源

// 游戏资源类型定义
export interface GameResource {
  id: string;          // 唯一标识符
  title: string;       // 游戏标题
  description: string; // 游戏描述
  categories: string[]; // 游戏分类
  gameUrl: string;     // 游戏原始URL
  embedUrl: string;    // 游戏嵌入URL
  coverImage: string;  // 游戏封面图片
  thumbnailImage?: string; // 游戏缩略图
  previewVideo?: string; // 游戏预览视频（如果有）
  previewGif?: string;   // 游戏预览GIF（如果视频不可用）
  source: string;      // 游戏来源网站
  canEmbed: boolean;   // 是否可以通过iframe嵌入
}

// 收集的可嵌入的HTML5游戏资源 - 清空列表，因为外部游戏资源不可用
export const gameResources: GameResource[] = [
  // 暂时清空，等测试确认可用后再添加
]; 