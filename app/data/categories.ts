import { FaGamepad, FaRegSmile, FaCar, FaMousePointer, FaGraduationCap, FaUserFriends, FaBiking, FaBasketballBall } from 'react-icons/fa';
import { GiPunchBlast, GiMountainRoad, GiBrain, GiChessKnight, GiTennisRacket, GiCardRandom, GiCrownedSkull, GiEarthAmerica, GiDeathSkull, GiPistolGun, GiJumpAcross, GiClothes, GiLipstick } from 'react-icons/gi';

// 定义分类类型
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType;
  isFeatured: boolean;
}

// 游戏分类
export const categories: Category[] = [
  {
    id: 'all',
    name: '全部',
    description: '所有游戏',
    icon: FaGamepad,
    isFeatured: true
  },
  {
    id: 'action',
    name: '动作',
    description: '刺激的动作游戏，需要快速反应和精确控制',
    icon: GiPunchBlast,
    isFeatured: true
  },
  {
    id: 'adventure',
    name: '冒险',
    description: '探索未知世界，解决谜题，体验精彩故事',
    icon: GiMountainRoad,
    isFeatured: true
  },
  {
    id: 'puzzle',
    name: '益智',
    description: '挑战你的大脑，解决各种谜题和挑战',
    icon: GiBrain,
    isFeatured: true
  },
  {
    id: 'strategy',
    name: '策略',
    description: '需要战略思维和规划的游戏',
    icon: GiChessKnight,
    isFeatured: true
  },
  {
    id: 'casual',
    name: '休闲',
    description: '简单易玩的游戏，适合短时间游玩',
    icon: FaRegSmile,
    isFeatured: true
  },
  {
    id: 'racing',
    name: '赛车',
    description: '高速竞技的赛车游戏',
    icon: FaCar,
    isFeatured: false
  },
  {
    id: 'sports',
    name: '体育',
    description: '各种体育运动主题的游戏',
    icon: GiTennisRacket,
    isFeatured: false
  },
  {
    id: 'card',
    name: '卡牌',
    description: '基于卡牌的游戏，包括收集、战略和技巧',
    icon: GiCardRandom,
    isFeatured: false
  },
  {
    id: 'role',
    name: '角色扮演',
    description: '扮演角色，提升能力，体验故事的游戏',
    icon: GiCrownedSkull,
    isFeatured: false
  },
  {
    id: 'simulation',
    name: '模拟',
    description: '模拟现实世界或虚拟世界的游戏',
    icon: GiEarthAmerica,
    isFeatured: false
  },
  {
    id: 'clicker',
    name: '点击',
    description: '通过点击积累资源和进度的游戏',
    icon: FaMousePointer,
    isFeatured: false
  },
  {
    id: 'educational',
    name: '教育',
    description: '寓教于乐的游戏，学习知识的同时享受乐趣',
    icon: FaGraduationCap,
    isFeatured: false
  },
  {
    id: 'horror',
    name: '恐怖',
    description: '恐怖主题的游戏，提供紧张刺激的体验',
    icon: GiDeathSkull,
    isFeatured: false
  },
  {
    id: '2player',
    name: '双人',
    description: '适合两名玩家一起游玩的游戏',
    icon: FaUserFriends,
    isFeatured: false
  },
  {
    id: 'shooter',
    name: '射击',
    description: '以射击为主要机制的游戏',
    icon: GiPistolGun,
    isFeatured: false
  },
  {
    id: 'platformer',
    name: '平台',
    description: '需要在平台间跳跃和移动的游戏',
    icon: GiJumpAcross,
    isFeatured: false
  },
  {
    id: 'car',
    name: '汽车',
    description: '以汽车为主题的游戏',
    icon: FaCar,
    isFeatured: false
  },
  {
    id: 'bike',
    name: '自行车',
    description: '以自行车为主题的游戏',
    icon: FaBiking,
    isFeatured: false
  },
  {
    id: 'dressup',
    name: '装扮',
    description: '服装搭配和角色装扮的游戏',
    icon: GiClothes,
    isFeatured: false
  },
  {
    id: 'beauty',
    name: '美容',
    description: '美容和化妆相关的游戏',
    icon: GiLipstick,
    isFeatured: false
  },
  {
    id: 'basketball',
    name: '篮球',
    description: '篮球主题的体育游戏',
    icon: FaBasketballBall,
    isFeatured: false
  }
]; 