'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
}

export default function InteractionArea() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: '系统',
      text: '欢迎来到游戏世界聊天室！请文明发言。',
      timestamp: new Date()
    },
    {
      id: '2', 
      user: '小明',
      text: '有人玩过2048吗？我最高只到了1024...',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: '3',
      user: '游戏达人',
      text: '我推荐尝试一下Pac-Man，经典永不过时！',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('游客' + Math.floor(Math.random() * 1000));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: username,
        text: newMessage.trim(),
        timestamp: new Date()
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // 在真实应用中，这里会将消息发送到后端或WebSocket服务
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">实时聊天</h2>
      
      <div className="mb-4 flex items-center">
        <label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-300 mr-2">
          你的昵称:
        </label>
        <input
          type="text"
          id="username"
          className="flex-1 px-3 py-1 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue dark:bg-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 h-64 overflow-y-auto mb-3 border border-gray-200 dark:border-gray-700">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.user === username ? 'text-right' : ''}`}>
            <div 
              className={`inline-block max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                message.user === '系统' 
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300' 
                  : message.user === username
                  ? 'bg-accent-blue text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {message.user !== username && message.user !== '系统' && (
                <div className="font-medium text-xs text-accent-purple mb-1">{message.user}</div>
              )}
              <div>{message.text}</div>
              <div className="text-xs opacity-70 mt-1 text-right">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          placeholder="输入消息..."
          className="flex-1 px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent-blue dark:bg-gray-700"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-accent-blue hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-r-lg transition-colors"
        >
          发送
        </button>
      </form>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        当前为演示模式，消息仅在本地显示
      </div>
    </div>
  );
} 