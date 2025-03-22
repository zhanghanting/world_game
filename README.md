# WorldGame.World

A modern web platform showcasing the world's most popular online games in an elegant, user-friendly interface.

## Project Overview

WorldGame.World is a game aggregation platform that embeds popular online games via iframes. The platform features a clean, Apple-inspired design aesthetic with excellent responsiveness across desktop and mobile devices. All content is presented in authentic English with comprehensive game guides to enhance user experience.

## Technology Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with Apple-inspired color palette
- **UI Components**: Headless UI, Heroicons
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Core Requirements

### MVP Features

1. **Game Showcase**
   - Display games in a responsive grid layout
   - Each game card includes preview image and concise description
   - Games categorized by type (Action, Strategy, Puzzle, etc.)

2. **Search Functionality**
   - Search bar at the top of the page
   - Ability to search games by title and category

3. **Layout Structure**
   - Top: Search bar and navigation
   - Left: Main game grid
   - Right-Top: Top 5 most popular games
   - Right-Bottom: Interaction area

4. **Game Preview & Details**
   - Preview window for quick game trial
   - Detailed game pages with full-screen iframe
   - Game instructions and tips
   - Similar game recommendations

### Design Requirements

1. **Visual Style**
   - Apple-inspired color palette
   - Clean, minimalist interface
   - Proper spacing and visual hierarchy

2. **Responsive Design**
   - Fully responsive across all device sizes
   - Mobile-friendly navigation
   - Optimized game displays for all screen sizes

3. **User Experience**
   - Smooth transitions and animations
   - Intuitive navigation
   - Fast loading times

### Content Requirements

1. **Game Information**
   - Authentic English descriptions
   - Clear, concise game instructions
   - Helpful gameplay tips
   - Appropriate categorization

2. **Game Selection**
   - Focus on currently popular HTML5 games
   - Diverse selection of game genres
   - All embedded games must be functional

## Project Structure

```
app/
├── components/        # UI components
│   ├── CategoryNav.tsx    # Category navigation
│   ├── GameCard.tsx       # Game card display
│   ├── GameGrid.tsx       # Game grid layout
│   ├── GamePreview.tsx    # Game preview modal
│   ├── Header.tsx         # Site header with search
│   ├── Icons.tsx          # Icon components
│   ├── InteractionArea.tsx # User interaction section
│   └── TopGames.tsx       # Top games section
├── data/              # Data files
│   └── games.ts       # Game data and categories
├── game/              # Game detail pages
│   └── [id]/
│       └── page.tsx
├── category/          # Category pages
│   └── [id]/
│       └── page.tsx
├── globals.css        # Global styles
├── layout.tsx         # Root layout
├── page.tsx           # Home page
├── not-found.tsx      # 404 page
└── providers.tsx      # Theme provider
```

## Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/worldgame-world.git
cd worldgame-world
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Adding New Games

To add new games, edit the `app/data/games.ts` file following the existing pattern:

```typescript
{
  id: 'game-id',
  title: 'Game Title',
  description: 'Game description...',
  shortDescription: 'Short description',
  coverImage: 'https://path-to-image.jpg',
  categories: ['Category1', 'Category2'],
  iframeUrl: 'https://game-url.com',
  popularity: 85,
  featured: false,
  howToPlay: [
    'Step 1...',
    'Step 2...'
  ],
  tips: [
    'Tip 1...',
    'Tip 2...'
  ]
}
```

## Deployment

The project is configured for easy deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Create a new project on Vercel
3. Import your repository
4. Deploy with default settings

## 游戏预览功能

本项目实现了游戏卡片的悬停预览功能，当用户将鼠标悬停在游戏卡片上时，静态图片会切换为动态预览GIF，展示游戏的精彩瞬间，以吸引用户快速开始游戏。

### 预览GIF设置

1. 预览GIF文件应放置在 `public/previews/` 目录下
2. 文件命名规则：
   - 数字猜谜游戏：`number-guessing-preview.gif`
   - 记忆翻牌游戏：`memory-card-preview.gif`
   - 其他游戏：`[game-id]-preview.gif`

### 添加新游戏预览

要为新游戏添加预览GIF：

1. 创建一个3-5秒的游戏演示GIF，建议尺寸为420x240像素
2. 命名格式应遵循 `[game-id]-preview.gif`
3. 将文件放置在 `public/previews/` 目录
4. 刷新页面即可看到悬停预览效果

详细指南请参考 `public/previews/README.md` 文件。

## Future Enhancements

Potential features for future releases:

1. User accounts and game progress saving
2. Game ratings and reviews
3. More advanced game recommendations
4. Community features (chat, forums)
5. Leaderboards for competitive games 