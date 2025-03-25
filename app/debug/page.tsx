'use client';

import { useEffect, useState } from 'react';
import ParticleBackground from '../components/ParticleBackground';

export default function DebugPage() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    console.log('Debug page mounted, client-side rendering active');
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-2xl text-white mb-4 z-20 relative">粒子背景调试页面</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg z-20 relative">
        <h2 className="text-xl text-white mb-4">状态信息:</h2>
        <ul className="text-white space-y-2">
          <li>客户端渲染: {isClient ? '✅ 是' : '❌ 否'}</li>
          <li>页面加载时间: {isClient ? new Date().toLocaleTimeString() : '加载中...'}</li>
          <li>浏览器: {isClient ? navigator.userAgent : '加载中...'}</li>
        </ul>
        
        <div className="mt-6 flex space-x-4">
          <button 
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
            onClick={() => window.location.reload()}
          >
            刷新页面
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => console.log('Canvas支持检测', {
              hasCanvas: typeof document !== 'undefined' && !!document.createElement('canvas').getContext,
              now: new Date().toISOString()
            })}
          >
            检测Canvas支持
          </button>
        </div>
      </div>
      
      {isClient && (
        <>
          <div className="fixed top-4 left-4 bg-red-700 text-white px-3 py-1 rounded-md z-[9999]">
            调试模式激活 - {new Date().toISOString()}
          </div>
          <ParticleBackground 
            count={300}
            minSize={5}
            maxSize={15}
            colors={['#ec4899', '#8b5cf6', '#6366f1', '#3b82f6', '#a855f7']}
            baseOpacity={1.0}
          />
        </>
      )}
    </div>
  );
} 