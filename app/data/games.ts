// Game Categories
export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Game data structure
export interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  isFeatured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  popularity?: number;
  // Additional fields to support game page
  title?: string; // Compatible with title field
  gameUrl?: string; // Original game URL
  embedUrl?: string; // Game embed URL
  howToPlay?: string[]; // Game play instructions
  coverImage?: string; // Compatible with coverImage field
  previewVideo?: string; // Game preview video
  previewGif?: string; // Game preview GIF
  canEmbed?: boolean; // Whether it can be embedded via iframe
  source?: string; // Game source
  tips?: string[];  // Game tips
  isImplemented?: boolean; // Mark if game is implemented
  instructions?: string;
  component?: string;
  author?: string;
  rating?: number; // Game rating score
  isEmbeddable?: boolean; // Whether it can be embedded (alias for canEmbed)
}

// Game categories
export const categories: Category[] = [
  { id: 'all', name: 'All', icon: '🌟' },
  { id: 'puzzle', name: 'Puzzle', icon: '🧩' },
  { id: 'action', name: 'Action', icon: '⚡️' },
  { id: 'strategy', name: 'Strategy', icon: '🧠' },
  { id: 'adventure', name: 'Adventure', icon: '🏝️' },
  { id: 'shooter', name: 'Shooter', icon: '🔥' },
  { id: 'role', name: 'Role Play', icon: '👱' },
  { id: 'simulation', name: 'Simulation', icon: '🛩' },
  { id: 'racing', name: 'Racing', icon: '🏎️' },
  { id: 'card', name: 'Card', icon: '🃏' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'casual', name: 'Casual', icon: '🎮' },
  { id: '2player', name: 'Two Player', icon: '👬' },
  { id: 'horror', name: 'Horror', icon: '👻' },
  { id: 'clicker', name: 'Clicker', icon: '👈' },
  { id: 'platformer', name: 'Platform', icon: '🏃' },
  { id: 'educational', name: 'Educational', icon: '📚' },
  { id: 'bike', name: 'Bike', icon: '🚲' },
  { id: 'car', name: 'Car', icon: '🚗' },
  { id: 'beauty', name: 'Beauty', icon: '💅' },
  { id: 'dressup', name: 'Dress Up', icon: '👗' },
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
  { id: 'running', name: 'Running', icon: '🏃' },
];

// Game data
export const games: Game[] = [
  // Basketball games
  {
    id: '22',
    name: 'Basketball Stars',
    title: 'Basketball Stars',
    description: 'Play with friends or against the computer in this exciting basketball game. Show your shooting skills and win matches!',
    image: 'https://i.pinimg.com/736x/c2/0b/c9/c20bc9e27e5d134ca17108f73f8bcfe3.jpg',
    coverImage: 'https://i.pinimg.com/736x/c2/0b/c9/c20bc9e27e5d134ca17108f73f8bcfe3.jpg',
    categories: ['sports', 'basketball', '2player'],
    difficulty: 'medium',
    isFeatured: true,
    isNew: false,
    isTrending: true,
    popularity: 90,
    gameUrl: 'https://play.famobi.com/basketball-stars',
    embedUrl: 'https://play.famobi.com/basketball-stars',
    canEmbed: true,
    source: 'Famobi',
    howToPlay: ['Use arrow keys to move player', 'Press space or click to shoot', 'Try to score more points to win', 'Play with friends or challenge the computer'],
    tips: ['Wait for the best shooting moment', 'Learn ball handling and fakes', 'Try different shooting angles'],
    isImplemented: true
  },
  // Klotski game
  {
    id: 'klotski',
    name: 'Klotski',
    title: 'Sliding Block Puzzle',
    description: 'Klotski is an ancient sliding block puzzle game. Move the blocks to help the large red block escape through the exit. This game tests your spatial thinking and planning skills.',
    image: '/images/klotski.svg',
    coverImage: '/images/klotski.svg',
    categories: ['puzzle', 'strategy'],
    difficulty: 'medium',
    isFeatured: true,
    isNew: false,
    isTrending: true,
    popularity: 90,
    embedUrl: '/games/klotski/index.html',
    canEmbed: true,
    isImplemented: true,
    howToPlay: [
      'Drag blocks to move them',
      'Create a path for the red block to reach the exit',
      'Complete the puzzle in as few moves as possible',
      'Use the reset button to start over'
    ],
    tips: [
      'Focus on unblocking the red block',
      'Some moves may seem counterintuitive at first',
      'Try to visualize several moves ahead',
      'Sometimes you need to move blocks away from the exit first'
    ]
  },
  // Sudoku game
  {
    id: '10',
    name: 'Sudoku',
    title: 'Sudoku',
    description: 'Fill the 9x9 grid so each row, column, and 3x3 box contains all numbers from 1 to 9. A puzzle game that challenges your logic.',
    image: '/images/sudoku.svg',
    coverImage: '/images/sudoku.svg',
    rating: 4.9,
    categories: ['puzzle', 'strategy'],
    difficulty: 'medium',
    embedUrl: '/games/sudoku/index.html',
    isEmbeddable: true,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    popularity: 95,
    canEmbed: true,
    isImplemented: true,
    howToPlay: [
      'Fill the grid with numbers 1-9',
      'Each row must contain numbers 1-9 without repetition',
      'Each column must contain numbers 1-9 without repetition',
      'Each 3×3 box must contain numbers 1-9 without repetition'
    ],
    tips: [
      'Start with the most constrained cells',
      'Use pencil marks to track possible values',
      'Look for hidden singles and pairs',
      'Check for intersections between rows, columns and boxes'
    ]
  },
  // Number Guessing game
  {
    id: '1',
    name: 'Number Guessing',
    title: 'Number Guessing',
    description: 'Test your intuition by guessing a number between 1 and 100.',
    image: '/images/number-guessing.svg',
    coverImage: '/images/number-guessing.svg',
    rating: 4.7,
    categories: ['puzzle', 'casual'],
    difficulty: 'easy',
    embedUrl: '/games/number-guessing/index.html',
    isEmbeddable: true,
    isFeatured: true,
    isNew: false,
    isTrending: true,
    popularity: 88,
    canEmbed: true,
    isImplemented: true,
    howToPlay: [
      'The computer selects a random number between 1 and 100',
      'Enter your guess in the input field',
      'The game will tell you if your guess is too high or too low',
      'Try to find the number in as few guesses as possible'
    ],
    tips: [
      'Start with 50 to narrow down the range quickly',
      'Use binary search strategy for optimal guessing',
      'Keep track of the upper and lower bounds based on feedback'
    ]
  }
];

