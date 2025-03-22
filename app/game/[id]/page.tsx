"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// 将路径参数[id]格式的页面重定向到查询参数格式的页面
export default function GamePageRedirect({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  useEffect(() => {
    // 重定向到带查询参数的游戏页面
    router.replace(`/game?id=${params.id}`);
  }, [params.id, router]);
  
  // 返回一个简单的加载指示器
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-lg font-medium">正在重定向...</span>
    </div>
  );
} 