/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'www.crazygames.com', 'play-lh.googleusercontent.com', 'img.gamedistribution.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // 禁用远程图片优化以减少错误
    unoptimized: true,
    // 提高图片加载超时时间
    minimumCacheTTL: 1800,
  },
  // 允许来自外部源的视频和媒体加载
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
          // 增加额外的允许跨域资源共享的头部
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  // 添加游戏代理功能
  async rewrites() {
    return [
      {
        source: '/api/games/proxy/:path*',
        destination: 'https://html5.gamedistribution.com/:path*',
      },
      {
        source: '/api/games/crazygames/:path*',
        destination: 'https://www.crazygames.com/:path*',
      }
    ];
  },
  // 添加重定向以处理404错误
  async redirects() {
    return [
      {
        source: '/images/game-covers/:path*',
        destination: '/images/game-covers/fallback.jpg',
        permanent: false,
        missing: [
          {
            type: 'header',
            key: 'referer',
          },
        ],
      },
      {
        source: '/images/game-previews/:path*',
        destination: '/images/game-covers/fallback.jpg',
        permanent: false,
        missing: [
          {
            type: 'header',
            key: 'referer',
          },
        ],
      },
    ];
  },
  // 更改环境变量配置
  env: {
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
  },
  // 配置边缘运行时
  experimental: {
    instrumentationHook: false,
    serverComponentsExternalPackages: [],
    // 优化配置以减少内存使用
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
    serverActions: {
      bodySizeLimit: '1mb',
    },
  },
  // 自定义webpack配置
  webpack: (config, { isServer, dev }) => {
    // 修改buffer分配限制
    // 解决"Array buffer allocation failed"错误
    config.performance = {
      ...config.performance,
      maxAssetSize: 1024 * 1024 * 30, // 30MB
      maxEntrypointSize: 1024 * 1024 * 50, // 50MB
    };

    // 增加Node选项，提高内存限制
    if (isServer) {
      if (config.optimization) {
        // 根据当前环境设置正确的nodeEnv值，避免冲突
        config.optimization.nodeEnv = dev ? 'development' : 'production';
      }
    }

    return config;
  },
};

module.exports = nextConfig; 