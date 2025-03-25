// Game Configuration
const config = {
  boardSize: 15,      // Default 15x15 board
  winCondition: 5,    // Need 5 in a row to win
  theme: 'classic',
  soundEnabled: false,  // 默认关闭音效
  highlightLastMove: true
};

// Game State
const gameState = {
  board: [],
  currentPlayer: 'black', // black goes first
  gameMode: 'ai',         // 'ai' or 'human'
  difficulty: 'easy',     // 'easy', 'medium', 'hard'
  gameStarted: false,
  gameOver: false,
  winner: null,
  moveHistory: [],
  timeElapsed: 0,
  timerInterval: null,
  records: {
    ai: { wins: 0, losses: 0, draws: 0 },
    human: { wins: 0, losses: 0, draws: 0 }
  },
  aiThinking: false
};

// DOM Elements
const boardElement = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
const undoBtn = document.getElementById('undo-btn');
const hintBtn = document.getElementById('hint-btn');
const settingsBtn = document.getElementById('settings-btn');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const blackIndicator = document.getElementById('black-indicator');
const whiteIndicator = document.getElementById('white-indicator');
const recordsBody = document.getElementById('records-body');
const winModal = document.getElementById('win-modal');
const winnerMessage = document.getElementById('winner-message');
const winDetails = document.getElementById('win-details');
const newGameBtn = document.getElementById('new-game-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const settingsModal = document.getElementById('settings-modal');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const cancelSettingsBtn = document.getElementById('cancel-settings-btn');
const boardSizeSelect = document.getElementById('board-size');
const themeSelect = document.getElementById('theme-select');
const soundToggle = document.getElementById('sound-toggle');
const highlightToggle = document.getElementById('highlight-toggle');
const modeButtons = document.querySelectorAll('.mode-btn');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

// Sound Effects
const sounds = {
  stone: new Audio('https://assets.mixkit.co/active_storage/sfx/2599/2599-preview.mp3'),
  win: new Audio('https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3'),
  invalidMove: new Audio('https://assets.mixkit.co/active_storage/sfx/2205/2205-preview.mp3')
};

// Initialize game
function initGame() {
  loadGameRecords();
  updateRecordsDisplay();
  createBoard();
  startTimer();
  
  // Event listeners for game controls
  restartBtn.addEventListener('click', restartGame);
  undoBtn.addEventListener('click', undoMove);
  hintBtn.addEventListener('click', showHint);
  settingsBtn.addEventListener('click', showSettings);
  newGameBtn.addEventListener('click', restartGame);
  closeModalBtn.addEventListener('click', closeModal);
  saveSettingsBtn.addEventListener('click', saveSettings);
  cancelSettingsBtn.addEventListener('click', closeSettingsModal);
  
  // Game mode selection
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setGameMode(btn.dataset.mode);
    });
  });
  
  // Difficulty selection
  difficultyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setDifficulty(btn.dataset.level);
    });
  });
}

// Create the game board
function createBoard() {
  boardElement.innerHTML = '';
  gameState.board = [];
  
  // Make board grid match the board size
  boardElement.style.gridTemplateColumns = `repeat(${config.boardSize}, 1fr)`;
  boardElement.style.gridTemplateRows = `repeat(${config.boardSize}, 1fr)`;
  
  // Update CSS variables for the board size
  document.documentElement.style.setProperty('--board-size', `min(80vw, 80vh, 600px)`);
  document.documentElement.style.setProperty('--cell-size', `calc(var(--board-size) / ${config.boardSize})`);
  
  // Initialize the board array and create DOM elements
  for (let row = 0; row < config.boardSize; row++) {
    gameState.board[row] = [];
    
    for (let col = 0; col < config.boardSize; col++) {
      gameState.board[row][col] = null;
      
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      
      // Add edge classes
      if (row === 0) cell.classList.add('top-edge');
      if (row === config.boardSize - 1) cell.classList.add('bottom-edge');
      if (col === 0) cell.classList.add('left-edge');
      if (col === config.boardSize - 1) cell.classList.add('right-edge');
      
      // Add marker dots for standard positions (for 19x19 and 15x15 boards)
      if (isMarkerPosition(row, col)) {
        cell.classList.add('marker');
      }
      
      // 添加触摸反馈效果
      cell.addEventListener('touchstart', function(e) {
        // 防止页面缩放和滚动
        e.preventDefault();
        
        // 添加视觉反馈
        this.classList.add('touch-active');
        
        // 显示触摸指示器
        showTouchIndicator(this, e.touches[0]);
      }, { passive: false });
      
      cell.addEventListener('touchend', function(e) {
        // 移除触摸反馈
        this.classList.remove('touch-active');
        
        // 隐藏触摸指示器
        hideTouchIndicator();
        
        // 执行下棋操作
        const row = parseInt(this.dataset.row);
        const col = parseInt(this.dataset.col);
        handleCellClick(row, col);
      });
      
      cell.addEventListener('touchmove', function(e) {
        // 如果触摸移出了当前元素，取消触摸状态
        const touch = e.touches[0];
        const elementAtTouch = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (elementAtTouch !== this) {
          this.classList.remove('touch-active');
          hideTouchIndicator();
        } else {
          // 更新触摸指示器位置
          updateTouchIndicator(touch);
        }
      });
      
      // 保留原有的点击事件
      cell.addEventListener('click', () => handleCellClick(row, col));
      
      boardElement.appendChild(cell);
    }
  }
}

// Check if a position is a standard marker position
function isMarkerPosition(row, col) {
  if (config.boardSize === 19) {
    // Standard positions for 19x19: star points at (3,3), (9,9), (15,15), etc.
    return (row === 3 || row === 9 || row === 15) && 
           (col === 3 || col === 9 || col === 15);
  } else if (config.boardSize === 15) {
    // Standard positions for 15x15
    return (row === 3 || row === 7 || row === 11) && 
           (col === 3 || col === 7 || col === 11);
  }
  return false;
}

// 显示触摸指示器
function showTouchIndicator(cell, touch) {
  // 创建或获取触摸指示器
  let indicator = document.getElementById('touch-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'touch-indicator';
    indicator.className = 'touch-indicator';
    document.body.appendChild(indicator);
  }
  
  // 设置指示器位置和样式
  const rect = cell.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  indicator.style.display = 'block';
  indicator.style.left = `${centerX}px`;
  indicator.style.top = `${centerY}px`;
  
  // 设置指示器颜色为当前玩家颜色
  indicator.style.backgroundColor = gameState.currentPlayer === 'black' ? '#000' : '#fff';
  indicator.style.border = gameState.currentPlayer === 'black' ? '2px solid #444' : '2px solid #ccc';
  
  // 添加动画
  indicator.style.transform = 'scale(0.8)';
  setTimeout(() => {
    indicator.style.transform = 'scale(1)';
  }, 50);
}

// 更新触摸指示器位置
function updateTouchIndicator(touch) {
  const indicator = document.getElementById('touch-indicator');
  if (indicator) {
    // 使指示器跟随触摸点，但保持在触摸点上方一些距离
    indicator.style.left = `${touch.clientX}px`;
    indicator.style.top = `${touch.clientY - 30}px`;
  }
}

// 隐藏触摸指示器
function hideTouchIndicator() {
  const indicator = document.getElementById('touch-indicator');
  if (indicator) {
    indicator.style.display = 'none';
  }
}

// Handle cell click event
function handleCellClick(row, col) {
  // 添加触觉反馈（如果设备支持）
  if (navigator.vibrate) {
    navigator.vibrate(15);
  }
  
  // Ignore clicks if game is over or AI is thinking
  if (gameState.gameOver || gameState.aiThinking) return;
  
  // Check if the cell is already occupied
  if (gameState.board[row][col] !== null) {
    playSound('invalidMove');
    if (navigator.vibrate) {
      navigator.vibrate([30, 50, 30]); // 错误的三段振动
    }
    return;
  }
  
  // Make player's move
  makeMove(row, col);
  
  // If game is vs AI and game is not over, make AI move
  if (gameState.gameMode === 'ai' && !gameState.gameOver) {
    gameState.aiThinking = true;
    
    // 显示AI思考的视觉提示
    showAiThinkingIndicator();
    
    // Slight delay to make it seem like the AI is "thinking"
    setTimeout(() => {
      makeAiMove();
      gameState.aiThinking = false;
      hideAiThinkingIndicator();
    }, 500);
  }
}

// 显示AI思考中的指示器
function showAiThinkingIndicator() {
  let indicator = document.getElementById('ai-thinking-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'ai-thinking-indicator';
    indicator.className = 'ai-thinking-indicator';
    indicator.innerHTML = '<span>AI思考中</span><div class="dot-pulse"></div>';
    document.querySelector('.board-container').appendChild(indicator);
  }
  indicator.style.display = 'flex';
}

// 隐藏AI思考中的指示器
function hideAiThinkingIndicator() {
  const indicator = document.getElementById('ai-thinking-indicator');
  if (indicator) {
    indicator.style.display = 'none';
  }
}

// Make a move
function makeMove(row, col) {
  // Place stone
  gameState.board[row][col] = gameState.currentPlayer;
  renderStone(row, col, gameState.currentPlayer);
  
  // Play sound
  playSound('stone');
  
  // Add to move history
  gameState.moveHistory.push({ row, col, player: gameState.currentPlayer });
  
  // Check for win
  if (checkWin(row, col, gameState.currentPlayer)) {
    endGame(gameState.currentPlayer);
    return;
  }
  
  // Check for draw
  if (checkDraw()) {
    endGame('draw');
    return;
  }
  
  // Switch player
  gameState.currentPlayer = gameState.currentPlayer === 'black' ? 'white' : 'black';
  updatePlayerIndicator();
}

// Render a stone on the board
function renderStone(row, col, color) {
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  
  // Remove any existing stones or highlights
  const existingStone = cell.querySelector('.stone-piece');
  if (existingStone) {
    cell.removeChild(existingStone);
  }
  
  // Remove last move highlight from all stones
  document.querySelectorAll('.stone-piece.last-move').forEach(stone => {
    stone.classList.remove('last-move');
  });
  
  // Create and add the new stone
  const stone = document.createElement('div');
  stone.className = `stone-piece ${color}`;
  
  // Add last move highlight
  if (config.highlightLastMove) {
    stone.classList.add('last-move');
  }
  
  cell.appendChild(stone);
}

// Check for a win
function checkWin(row, col, player) {
  const directions = [
    { dr: 1, dc: 0 },   // vertical
    { dr: 0, dc: 1 },   // horizontal
    { dr: 1, dc: 1 },   // diagonal (top-left to bottom-right)
    { dr: 1, dc: -1 }   // diagonal (top-right to bottom-left)
  ];
  
  for (const dir of directions) {
    let count = 1;  // Start with 1 for the placed stone
    
    // Check in both directions along this line
    for (let i = 1; i < 5; i++) {
      const r1 = row + dir.dr * i;
      const c1 = col + dir.dc * i;
      
      if (r1 >= 0 && r1 < config.boardSize && 
          c1 >= 0 && c1 < config.boardSize && 
          gameState.board[r1][c1] === player) {
        count++;
      } else {
        break;
      }
    }
    
    for (let i = 1; i < 5; i++) {
      const r2 = row - dir.dr * i;
      const c2 = col - dir.dc * i;
      
      if (r2 >= 0 && r2 < config.boardSize && 
          c2 >= 0 && c2 < config.boardSize && 
          gameState.board[r2][c2] === player) {
        count++;
      } else {
        break;
      }
    }
    
    // If 5 or more in a row, it's a win
    if (count >= 5) {
      // Highlight the winning line
      highlightWinningLine(row, col, dir.dr, dir.dc, count);
      return true;
    }
  }
  
  return false;
}

// Highlight the winning line of stones
function highlightWinningLine(row, col, dr, dc, count) {
  // Find the starting position
  let startRow = row;
  let startCol = col;
  
  while (startRow - dr >= 0 && startCol - dc >= 0 && startCol - dc < config.boardSize &&
        gameState.board[startRow - dr][startCol - dc] === gameState.currentPlayer) {
    startRow -= dr;
    startCol -= dc;
  }
  
  // Calculate position and dimensions for the winning line
  const cellSize = boardElement.querySelector('.cell').offsetWidth;
  const lineLength = count * cellSize;
  const boardRect = boardElement.getBoundingClientRect();
  
  // Create the winning line element
  const winLine = document.createElement('div');
  winLine.className = 'win-line';
  
  // Position the line
  const startCellRect = document.querySelector(`.cell[data-row="${startRow}"][data-col="${startCol}"]`).getBoundingClientRect();
  const startX = startCellRect.left - boardRect.left + cellSize / 2;
  const startY = startCellRect.top - boardRect.top + cellSize / 2;
  
  winLine.style.left = `${startX}px`;
  winLine.style.top = `${startY}px`;
  
  // Set the line dimensions
  if (dr === 0) {
    // Horizontal line
    winLine.style.height = '4px';
    winLine.style.width = `${lineLength}px`;
  } else if (dc === 0) {
    // Vertical line
    winLine.style.width = '4px';
    winLine.style.height = `${lineLength}px`;
  } else if (dr === dc) {
    // Diagonal top-left to bottom-right
    winLine.style.height = '4px';
    winLine.style.width = `${Math.sqrt(2) * lineLength}px`;
    winLine.style.transformOrigin = '0 0';
    winLine.style.transform = 'rotate(45deg)';
  } else {
    // Diagonal top-right to bottom-left
    winLine.style.height = '4px';
    winLine.style.width = `${Math.sqrt(2) * lineLength}px`;
    winLine.style.transformOrigin = '100% 0';
    winLine.style.transform = 'rotate(-45deg)';
  }
  
  boardElement.appendChild(winLine);
}

// Check for a draw (board is full)
function checkDraw() {
  for (let row = 0; row < config.boardSize; row++) {
    for (let col = 0; col < config.boardSize; col++) {
      if (gameState.board[row][col] === null) {
        return false; // Board is not full
      }
    }
  }
  return true; // Board is full
}

// End the game with a winner or draw
function endGame(result) {
  gameState.gameOver = true;
  gameState.winner = result;
  stopTimer();
  playSound('win');
  
  // Update records
  if (result !== 'draw') {
    if (gameState.gameMode === 'ai') {
      if (result === 'black') { // Player is always black in this implementation
        gameState.records.ai.wins++;
      } else {
        gameState.records.ai.losses++;
      }
    } else {
      gameState.records.human.wins++;
    }
  } else {
    if (gameState.gameMode === 'ai') {
      gameState.records.ai.draws++;
    } else {
      gameState.records.human.draws++;
    }
  }
  
  saveGameRecords();
  updateRecordsDisplay();
  
  // Show win modal
  showWinModal(result);
}

// Make an AI move
function makeAiMove() {
  const { row, col } = calculateAiMove();
  makeMove(row, col);
}

// Calculate the best move for AI based on difficulty
function calculateAiMove() {
  switch (gameState.difficulty) {
    case 'easy':
      return calculateEasyAiMove();
    case 'medium':
      return calculateMediumAiMove();
    case 'hard':
      return calculateHardAiMove();
    default:
      return calculateEasyAiMove();
  }
}

// Easy AI: Makes mostly random moves but will try to win if possible and block obvious threats
function calculateEasyAiMove() {
  // Try to win if possible
  const winningMove = findWinningMove('white');
  if (winningMove) return winningMove;
  
  // Block player's winning move
  const blockingMove = findWinningMove('black');
  if (blockingMove) return blockingMove;
  
  // Otherwise make a random move
  return makeRandomMove();
}

// Medium AI: More strategic than easy, looks for patterns and builds lines
function calculateMediumAiMove() {
  // Try to win if possible
  const winningMove = findWinningMove('white');
  if (winningMove) return winningMove;
  
  // Block player's winning move
  const blockingMove = findWinningMove('black');
  if (blockingMove) return blockingMove;
  
  // Look for opportunities to create four in a row
  const fourInRowMove = findNInRowOpportunity('white', 4);
  if (fourInRowMove) return fourInRowMove;
  
  // Block player's attempts to create four in a row
  const blockFourInRowMove = findNInRowOpportunity('black', 4);
  if (blockFourInRowMove) return blockFourInRowMove;
  
  // Look for three in a row opportunities
  const threeInRowMove = findNInRowOpportunity('white', 3);
  if (threeInRowMove) return threeInRowMove;
  
  // If nothing good found, play near the last move
  if (gameState.moveHistory.length > 0) {
    const possibleMoves = findMovesNearLastMove(2);
    if (possibleMoves.length > 0) {
      return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }
  }
  
  // If all else fails, make a random move
  return makeRandomMove();
}

// Hard AI: More comprehensive evaluation of the board
function calculateHardAiMove() {
  // Try to win if possible
  const winningMove = findWinningMove('white');
  if (winningMove) return winningMove;
  
  // Block player's winning move
  const blockingMove = findWinningMove('black');
  if (blockingMove) return blockingMove;
  
  // Find the best move using a simple scoring function
  let bestScore = -Infinity;
  let bestMove = null;
  
  // Limit search to a reasonable area
  const moves = findMovesNearLastMove(3);
  
  for (const move of moves) {
    const { row, col } = move;
    
    // Skip if cell is occupied
    if (gameState.board[row][col] !== null) continue;
    
    // Make a temporary move
    gameState.board[row][col] = 'white';
    
    // Score this position
    const score = evaluatePosition('white');
    
    // Undo the move
    gameState.board[row][col] = null;
    
    // Update best move if needed
    if (score > bestScore) {
      bestScore = score;
      bestMove = { row, col };
    }
  }
  
  // If a good move was found, return it, otherwise find something else
  if (bestMove) return bestMove;
  
  // Look for three in a row opportunities
  const threeInRowMove = findNInRowOpportunity('white', 3);
  if (threeInRowMove) return threeInRowMove;
  
  // If nothing good found, make a random move
  return makeRandomMove();
}

// Find moves that would win immediately
function findWinningMove(player) {
  for (let row = 0; row < config.boardSize; row++) {
    for (let col = 0; col < config.boardSize; col++) {
      if (gameState.board[row][col] === null) {
        // Temporarily make the move
        gameState.board[row][col] = player;
        
        // Check if this is a win
        const isWin = checkWin(row, col, player);
        
        // Undo the move
        gameState.board[row][col] = null;
        
        if (isWin) {
          return { row, col };
        }
      }
    }
  }
  return null;
}

// Find opportunities to create N-in-a-row
function findNInRowOpportunity(player, n) {
  const opponent = player === 'black' ? 'white' : 'black';
  const directions = [
    { dr: 1, dc: 0 },   // vertical
    { dr: 0, dc: 1 },   // horizontal
    { dr: 1, dc: 1 },   // diagonal (top-left to bottom-right)
    { dr: 1, dc: -1 }   // diagonal (top-right to bottom-left)
  ];
  
  for (let row = 0; row < config.boardSize; row++) {
    for (let col = 0; col < config.boardSize; col++) {
      if (gameState.board[row][col] !== null) continue;
      
      for (const dir of directions) {
        let count = 1; // Count the empty cell we're checking
        let blocked = false;
        
        // Count in the positive direction
        for (let i = 1; i < 5; i++) {
          const r = row + dir.dr * i;
          const c = col + dir.dc * i;
          
          if (r >= 0 && r < config.boardSize && c >= 0 && c < config.boardSize) {
            if (gameState.board[r][c] === player) {
              count++;
            } else if (gameState.board[r][c] === opponent) {
              blocked = true;
              break;
            } else {
              break; // Empty space
            }
          } else {
            blocked = true; // Edge of board
            break;
          }
        }
        
        // Count in the negative direction
        for (let i = 1; i < 5; i++) {
          const r = row - dir.dr * i;
          const c = col - dir.dc * i;
          
          if (r >= 0 && r < config.boardSize && c >= 0 && c < config.boardSize) {
            if (gameState.board[r][c] === player) {
              count++;
            } else if (gameState.board[r][c] === opponent) {
              blocked = true;
              break;
            } else {
              break; // Empty space
            }
          } else {
            blocked = true; // Edge of board
            break;
          }
        }
        
        // If we found n-in-a-row and it's not blocked on both sides, it's good
        if (count >= n && !blocked) {
          return { row, col };
        }
      }
    }
  }
  
  return null;
}

// Make a random move, preferably near existing stones
function makeRandomMove() {
  // First try to find an empty cell near any existing stone
  const emptyCellsNearStones = [];
  
  for (let row = 0; row < config.boardSize; row++) {
    for (let col = 0; col < config.boardSize; col++) {
      if (gameState.board[row][col] === null && hasAdjacentStone(row, col)) {
        emptyCellsNearStones.push({ row, col });
      }
    }
  }
  
  if (emptyCellsNearStones.length > 0) {
    // Choose a random cell from those near stones
    return emptyCellsNearStones[Math.floor(Math.random() * emptyCellsNearStones.length)];
  }
  
  // If no cells near stones (or as a fallback), find any empty cell
  const allEmptyCells = [];
  
  for (let row = 0; row < config.boardSize; row++) {
    for (let col = 0; col < config.boardSize; col++) {
      if (gameState.board[row][col] === null) {
        allEmptyCells.push({ row, col });
      }
    }
  }
  
  // Choose a random empty cell
  return allEmptyCells[Math.floor(Math.random() * allEmptyCells.length)];
}

// Check if a cell has an adjacent stone (orthogonally or diagonally)
function hasAdjacentStone(row, col) {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue; // Skip the cell itself
      
      const r = row + dr;
      const c = col + dc;
      
      if (r >= 0 && r < config.boardSize && c >= 0 && c < config.boardSize &&
          gameState.board[r][c] !== null) {
        return true;
      }
    }
  }
  return false;
}

// Find possible moves near the last move
function findMovesNearLastMove(distance) {
  const moves = [];
  
  if (gameState.moveHistory.length === 0) {
    // If no moves yet, return center and nearby cells
    const center = Math.floor(config.boardSize / 2);
    for (let dr = -2; dr <= 2; dr++) {
      for (let dc = -2; dc <= 2; dc++) {
        const r = center + dr;
        const c = center + dc;
        if (r >= 0 && r < config.boardSize && c >= 0 && c < config.boardSize) {
          moves.push({ row: r, col: c });
        }
      }
    }
    return moves;
  }
  
  // Get the last move
  const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];
  
  // Look in a square of size 2*distance+1 around the last move
  for (let dr = -distance; dr <= distance; dr++) {
    for (let dc = -distance; dc <= distance; dc++) {
      const r = lastMove.row + dr;
      const c = lastMove.col + dc;
      
      if (r >= 0 && r < config.boardSize && c >= 0 && c < config.boardSize &&
          gameState.board[r][c] === null) {
        moves.push({ row: r, col: c });
      }
    }
  }
  
  return moves;
}

// Evaluate the current position for the given player
function evaluatePosition(player) {
  let score = 0;
  const opponent = player === 'black' ? 'white' : 'black';
  
  // Check for patterns in all directions
  const directions = [
    { dr: 1, dc: 0 },   // vertical
    { dr: 0, dc: 1 },   // horizontal
    { dr: 1, dc: 1 },   // diagonal (top-left to bottom-right)
    { dr: 1, dc: -1 }   // diagonal (top-right to bottom-left)
  ];
  
  for (let row = 0; row < config.boardSize; row++) {
    for (let col = 0; col < config.boardSize; col++) {
      if (gameState.board[row][col] !== player) continue;
      
      for (const dir of directions) {
        let playerCount = 1;
        let emptyBefore = false;
        let emptyAfter = false;
        
        // Look for patterns in the positive direction
        for (let i = 1; i < 5; i++) {
          const r = row + dir.dr * i;
          const c = col + dir.dc * i;
          
          if (r >= 0 && r < config.boardSize && c >= 0 && c < config.boardSize) {
            if (gameState.board[r][c] === player) {
              playerCount++;
            } else if (gameState.board[r][c] === null) {
              emptyAfter = true;
              break;
            } else {
              break;
            }
          }
        }
        
        // Look for patterns in the negative direction
        for (let i = 1; i < 5; i++) {
          const r = row - dir.dr * i;
          const c = col - dir.dc * i;
          
          if (r >= 0 && r < config.boardSize && c >= 0 && c < config.boardSize) {
            if (gameState.board[r][c] === player) {
              playerCount++;
            } else if (gameState.board[r][c] === null) {
              emptyBefore = true;
              break;
            } else {
              break;
            }
          }
        }
        
        // Score based on count and openness
        if (playerCount >= 5) {
          score += 10000; // Win
        } else if (playerCount === 4) {
          if (emptyBefore && emptyAfter) score += 2000; // Open four
          else if (emptyBefore || emptyAfter) score += 500; // Half-open four
        } else if (playerCount === 3) {
          if (emptyBefore && emptyAfter) score += 200; // Open three
          else if (emptyBefore || emptyAfter) score += 50; // Half-open three
        } else if (playerCount === 2) {
          if (emptyBefore && emptyAfter) score += 20; // Open two
        }
      }
    }
  }
  
  return score;
}

// Undo the last two moves (player and AI) or just one in 2-player mode
function undoMove() {
  if (gameState.gameOver || gameState.moveHistory.length === 0) return;
  
  // In AI mode, undo both the AI and player moves
  if (gameState.gameMode === 'ai') {
    // If AI was about to move, only undo player's move
    if (gameState.currentPlayer === 'white') {
      undoLastMove();
    } else {
      // Undo both moves
      undoLastMove();
      undoLastMove();
    }
  } else {
    // In human mode, just undo the last move
    undoLastMove();
  }
}

// Undo the last move
function undoLastMove() {
  if (gameState.moveHistory.length === 0) return;
  
  const lastMove = gameState.moveHistory.pop();
  gameState.board[lastMove.row][lastMove.col] = null;
  
  // Rerender board
  renderBoard();
  
  // Switch current player back
  gameState.currentPlayer = lastMove.player;
  updatePlayerIndicator();
}

// Render the current board state
function renderBoard() {
  // Clear all stones
  document.querySelectorAll('.stone-piece').forEach(stone => stone.remove());
  
  // Render all stones on the board
  for (let row = 0; row < config.boardSize; row++) {
    for (let col = 0; col < config.boardSize; col++) {
      if (gameState.board[row][col]) {
        renderStone(row, col, gameState.board[row][col]);
      }
    }
  }
}

// Show hint for player
function showHint() {
  if (gameState.gameOver || gameState.currentPlayer !== 'black') return;
  
  // Remove any existing hint
  document.querySelectorAll('.hint-marker').forEach(hint => hint.remove());
  
  // Calculate a good move for the player
  let hintMove;
  if (gameState.difficulty === 'easy') {
    // For easy mode, give a simple hint
    hintMove = findWinningMove('black') || findNInRowOpportunity('black', 4) ||
               findNInRowOpportunity('black', 3) || makeRandomMove();
  } else {
    // For medium and hard, calculate as if the AI is playing as black
    gameState.currentPlayer = 'black'; // Temporarily switch
    hintMove = calculateMediumAiMove();
    gameState.currentPlayer = 'black'; // Switch back
  }
  
  // Show hint on the board
  if (hintMove) {
    const cell = document.querySelector(`.cell[data-row="${hintMove.row}"][data-col="${hintMove.col}"]`);
    const hintMarker = document.createElement('div');
    hintMarker.className = 'hint-marker';
    cell.appendChild(hintMarker);
  }
}

// Timer functions
function startTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
  }
  
  gameState.timeElapsed = 0;
  updateTimerDisplay();
  
  gameState.timerInterval = setInterval(() => {
    gameState.timeElapsed++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(gameState.timeElapsed / 60);
  const seconds = gameState.timeElapsed % 60;
  
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Update player indicator to show whose turn it is
function updatePlayerIndicator() {
  blackIndicator.classList.toggle('active', gameState.currentPlayer === 'black');
  whiteIndicator.classList.toggle('active', gameState.currentPlayer === 'white');
}

// Show the win modal
function showWinModal(result) {
  const movesCount = gameState.moveHistory.length;
  const timeString = formatTime(gameState.timeElapsed);
  
  if (result === 'draw') {
    winnerMessage.textContent = 'Game Draw!';
    winDetails.textContent = `The board is full. ${movesCount} moves played in ${timeString}.`;
  } else {
    const winner = result === 'black' ? 'Black' : 'White';
    winnerMessage.textContent = `${winner} Wins!`;
    winDetails.textContent = `Victory achieved in ${movesCount} moves and ${timeString}.`;
  }
  
  winModal.classList.add('show');
}

// Close the win modal
function closeModal() {
  winModal.classList.remove('show');
}

// Show settings modal
function showSettings() {
  // Set current values
  boardSizeSelect.value = config.boardSize;
  themeSelect.value = config.theme;
  soundToggle.checked = config.soundEnabled;
  highlightToggle.checked = config.highlightLastMove;
  
  settingsModal.classList.add('show');
}

// Close settings modal
function closeSettingsModal() {
  settingsModal.classList.remove('show');
}

// Save settings
function saveSettings() {
  const newBoardSize = parseInt(boardSizeSelect.value);
  const newTheme = themeSelect.value;
  
  // Update config
  config.theme = newTheme;
  config.soundEnabled = soundToggle.checked;
  config.highlightLastMove = highlightToggle.checked;
  
  // Apply theme
  document.body.className = `theme-${newTheme}`;
  
  // If board size changed, restart game
  if (newBoardSize !== config.boardSize) {
    config.boardSize = newBoardSize;
    restartGame();
  }
  
  closeSettingsModal();
}

// Set game mode (AI or human)
function setGameMode(mode) {
  gameState.gameMode = mode;
  
  // Update UI
  modeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  
  // Show/hide difficulty selector based on mode
  const difficultySection = document.querySelector('.difficulty-selector');
  difficultySection.style.display = mode === 'ai' ? 'block' : 'none';
  
  // Restart game with new mode
  restartGame();
}

// Set AI difficulty
function setDifficulty(level) {
  gameState.difficulty = level;
  
  // Update UI
  difficultyButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.level === level);
  });
  
  // Restart if game already started
  if (gameState.moveHistory.length > 0) {
    restartGame();
  }
}

// Restart the game
function restartGame() {
  gameState.board = [];
  gameState.currentPlayer = 'black';
  gameState.gameOver = false;
  gameState.winner = null;
  gameState.moveHistory = [];
  
  // Remove win line if it exists
  const winLine = document.querySelector('.win-line');
  if (winLine) winLine.remove();
  
  // Close modal if open
  closeModal();
  
  // Recreate the board
  createBoard();
  
  // Reset and start timer
  stopTimer();
  startTimer();
  
  // Update player indicator
  updatePlayerIndicator();
}

// Load game records from localStorage
function loadGameRecords() {
  const storedRecords = localStorage.getItem('gomokuRecords');
  if (storedRecords) {
    try {
      const records = JSON.parse(storedRecords);
      gameState.records = records;
    } catch (e) {
      console.error("Failed to parse stored records:", e);
    }
  }
}

// Save game records to localStorage
function saveGameRecords() {
  localStorage.setItem('gomokuRecords', JSON.stringify(gameState.records));
}

// Update the records display
function updateRecordsDisplay() {
  recordsBody.innerHTML = '';
  
  // AI mode records
  const aiRow = document.createElement('tr');
  aiRow.innerHTML = `
    <td>vs AI</td>
    <td>${gameState.records.ai.wins}</td>
    <td>${gameState.records.ai.losses}</td>
    <td>${gameState.records.ai.draws}</td>
  `;
  recordsBody.appendChild(aiRow);
  
  // Human mode records
  const humanRow = document.createElement('tr');
  humanRow.innerHTML = `
    <td>vs Human</td>
    <td>${gameState.records.human.wins}</td>
    <td>${gameState.records.human.losses}</td>
    <td>${gameState.records.human.draws}</td>
  `;
  recordsBody.appendChild(humanRow);
}

// Play sound effect
function playSound(soundName) {
  if (config.soundEnabled && sounds[soundName]) {
    sounds[soundName].currentTime = 0;
    sounds[soundName].play().catch(error => {
      console.error("Error playing sound:", error);
    });
  }
}

// Format time for display
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  initGame();
});

// Apply theme on page load
function loadSettings() {
  const storedConfig = localStorage.getItem('gomokuConfig');
  if (storedConfig) {
    try {
      const savedConfig = JSON.parse(storedConfig);
      
      // Apply saved settings to config
      Object.assign(config, savedConfig);
      
      // Update UI elements
      boardSizeSelect.value = config.boardSize;
      themeSelect.value = config.theme;
      soundToggle.checked = config.soundEnabled;
      highlightToggle.checked = config.highlightLastMove;
      
    } catch (e) {
      console.error("Failed to parse stored config:", e);
    }
  }
  
  // Apply theme
  document.body.className = `theme-${config.theme}`;
} 