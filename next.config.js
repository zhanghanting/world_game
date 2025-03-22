/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.crazygames.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.crazygames.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'videos.crazygames.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.y8.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.y8.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.itch.zone',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.itch.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'html5.gamedistribution.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.gamedistribution.com',
        pathname: '/**',
      }
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
};

module.exports = nextConfig; 