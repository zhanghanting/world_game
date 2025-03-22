import { NextRequest, NextResponse } from 'next/server';
import { getDomainFromUrl } from '@/app/utils/gameUtils';

/**
 * 游戏代理API
 * 用于代理游戏内容，解决跨域问题，允许游戏在iframe中加载
 */
export async function GET(request: NextRequest) {
  try {
    // 获取目标URL
    const url = request.nextUrl.searchParams.get('url');
    
    if (!url) {
      return new NextResponse('Missing URL parameter', { status: 400 });
    }
    
    const domain = getDomainFromUrl(url);
    const baseUrl = new URL(url);
    
    // 检查是否是资源请求（如JS、CSS、图片等）
    const path = request.nextUrl.pathname;
    const isAssetRequest = path.includes('/assets/') || 
                            path.endsWith('.js') || 
                            path.endsWith('.css') || 
                            path.endsWith('.png') || 
                            path.endsWith('.jpg') || 
                            path.endsWith('.svg') || 
                            path.endsWith('.json');
    
    // 如果是资源请求，尝试直接从源站获取
    const assetPath = request.nextUrl.searchParams.get('assetPath');
    if (isAssetRequest && assetPath) {
      const assetUrl = new URL(assetPath, baseUrl).href;
      
      try {
        const assetResponse = await fetch(assetUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': baseUrl.origin,
            'Origin': baseUrl.origin
          }
        });
        
        if (!assetResponse.ok) {
          console.error(`Error fetching asset: ${assetResponse.status} ${assetResponse.statusText}`);
          return new NextResponse(`Error fetching asset: ${assetResponse.status}`, { status: assetResponse.status });
        }
        
        const assetHeaders = new Headers(assetResponse.headers);
        assetHeaders.set('Access-Control-Allow-Origin', '*');
        return new NextResponse(assetResponse.body, { headers: assetHeaders });
      } catch (error: any) {
        console.error('Asset proxy error:', error);
        return new NextResponse(`Asset error: ${error.message}`, { status: 500 });
      }
    }
    
    // 请求原始游戏内容
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': 'https://worldgame.world/',
        'Origin': 'https://worldgame.world'
      }
    });
    
    if (!response.ok) {
      console.error(`Error fetching game content: ${response.status} ${response.statusText}`);
      return new NextResponse(`Error fetching game content: ${response.status}`, { status: response.status });
    }
    
    const contentType = response.headers.get('content-type') || '';
    
    // 如果是HTML内容，需要修改以防止iframe检测和解决跨域问题
    if (contentType.includes('text/html')) {
      let html = await response.text();
      
      // 1. 添加允许跨域的响应头
      const headers = new Headers(response.headers);
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      headers.set('X-Frame-Options', 'ALLOWALL');
      headers.set('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data:; media-src *; frame-ancestors *");
      
      // 2. 注入JS脚本，防止iframe检测和处理资源加载
      const injectedScript = `
        <script>
          // 1. 防止检测iframe
          try {
            // 覆盖 window.self, window.top, window.parent 以绕过iframe检测
            Object.defineProperty(window, 'self', { get: function() { return window; } });
            Object.defineProperty(window, 'top', { get: function() { return window; } });
            Object.defineProperty(window, 'parent', { get: function() { return window; } });
            
            // 覆盖 window.frameElement 检测
            Object.defineProperty(window, 'frameElement', { get: function() { return null; } });
            
            // 覆盖 document.referrer
            Object.defineProperty(document, 'referrer', { 
              get: function() { return 'https://worldgame.world'; } 
            });
            
            // 覆盖 location.ancestorOrigins
            if (window.location.ancestorOrigins) {
              Object.defineProperty(window.location, 'ancestorOrigins', { 
                get: function() { return { length: 0, item: function() { return null; }, contains: function() { return false; } }; } 
              });
            }
            
            // 2. 拦截资源加载并重写URL
            const originalFetch = window.fetch;
            window.fetch = function(resource, init) {
              try {
                let url = resource;
                if (typeof resource === 'string') {
                  // 相对路径转绝对路径
                  if (resource.startsWith('/') && !resource.startsWith('//')) {
                    url = '${baseUrl.origin}' + resource;
                  } else if (!resource.match(/^(https?:|data:|blob:)/)) {
                    url = new URL(resource, '${baseUrl.href}').href;
                  }
                  
                  // 重写URL为通过我们的代理
                  url = '/api/gameproxy?url=' + encodeURIComponent(url);
                }
                return originalFetch(url, init);
              } catch (e) {
                console.warn('Fetch interception error:', e);
                return originalFetch(resource, init);
              }
            };
            
            // 拦截XHR请求
            const originalOpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function(method, url, ...args) {
              try {
                let newUrl = url;
                if (typeof url === 'string') {
                  // 相对路径转绝对路径
                  if (url.startsWith('/') && !url.startsWith('//')) {
                    newUrl = '${baseUrl.origin}' + url;
                  } else if (!url.match(/^(https?:|data:|blob:)/)) {
                    newUrl = new URL(url, '${baseUrl.href}').href;
                  }
                  
                  // 重写URL为通过我们的代理
                  newUrl = '/api/gameproxy?url=' + encodeURIComponent(newUrl);
                }
                return originalOpen.call(this, method, newUrl, ...args);
              } catch (e) {
                console.warn('XHR interception error:', e);
                return originalOpen.call(this, method, url, ...args);
              }
            };
            
            // 3. 重写资源加载
            const proxyAsset = (url) => {
              if (!url) return url;
              try {
                if (url.startsWith('/') && !url.startsWith('//')) {
                  // 处理绝对路径但不包含域名的URL
                  return '/api/gameproxy?assetPath=' + encodeURIComponent('${baseUrl.origin}' + url);
                } else if (!url.match(/^(https?:|data:|blob:)/)) {
                  // 处理相对路径
                  return '/api/gameproxy?assetPath=' + encodeURIComponent(new URL(url, '${baseUrl.href}').href);
                } else if (url.match(/^https?:/)) {
                  // 处理绝对路径
                  return '/api/gameproxy?assetPath=' + encodeURIComponent(url);
                }
              } catch (e) {
                console.warn('Asset URL rewriting error:', e);
              }
              return url;
            };
            
            // 重写资源元素的URL
            const originalCreateElement = document.createElement;
            document.createElement = function(tagName) {
              const element = originalCreateElement.call(document, tagName);
              
              if (tagName.toLowerCase() === 'script') {
                Object.defineProperty(element, 'src', {
                  get: function() {
                    return this.getAttribute('src') || '';
                  },
                  set: function(value) {
                    this.setAttribute('src', proxyAsset(value));
                  }
                });
              } else if (tagName.toLowerCase() === 'link') {
                const originalSetAttribute = element.setAttribute;
                element.setAttribute = function(name, value) {
                  if (name === 'href') {
                    return originalSetAttribute.call(this, name, proxyAsset(value));
                  }
                  return originalSetAttribute.call(this, name, value);
                };
              } else if (tagName.toLowerCase() === 'img') {
                Object.defineProperty(element, 'src', {
                  get: function() {
                    return this.getAttribute('src') || '';
                  },
                  set: function(value) {
                    this.setAttribute('src', proxyAsset(value));
                  }
                });
              }
              
              return element;
            };
          } catch(e) { console.warn('Iframe protection script error:', e); }
          
          // 4. 修复跨域问题
          window.addEventListener('message', function(event) {
            try {
              window.postMessage(event.data, '*');
            } catch(e) {}
          });
        </script>
      `;
      
      // 在HTML中插入脚本
      html = html.replace('<head>', '<head>' + injectedScript);
      
      // 解决跨域资源加载问题 - 将相对URL转换为绝对URL，然后改为通过代理加载
      const proxyAssetUrls = (htmlContent: string): string => {
        // 处理script标签的src属性
        htmlContent = htmlContent.replace(/(<script[^>]+src=["'])(?!(?:https?:\/\/|data:|\/\/))([^"']+)(["'][^>]*>)/gi, 
          (match: string, p1: string, p2: string, p3: string) => {
            try {
              const absoluteUrl = new URL(p2, baseUrl).href;
              return `${p1}/api/gameproxy?assetPath=${encodeURIComponent(absoluteUrl)}${p3}`;
            } catch (e) {
              return match;
            }
          }
        );
        
        // 处理link标签的href属性
        htmlContent = htmlContent.replace(/(<link[^>]+href=["'])(?!(?:https?:\/\/|data:|\/\/))([^"']+)(["'][^>]*>)/gi, 
          (match: string, p1: string, p2: string, p3: string) => {
            try {
              const absoluteUrl = new URL(p2, baseUrl).href;
              return `${p1}/api/gameproxy?assetPath=${encodeURIComponent(absoluteUrl)}${p3}`;
            } catch (e) {
              return match;
            }
          }
        );
        
        // 处理img标签的src属性
        htmlContent = htmlContent.replace(/(<img[^>]+src=["'])(?!(?:https?:\/\/|data:|\/\/))([^"']+)(["'][^>]*>)/gi, 
          (match: string, p1: string, p2: string, p3: string) => {
            try {
              const absoluteUrl = new URL(p2, baseUrl).href;
              return `${p1}/api/gameproxy?assetPath=${encodeURIComponent(absoluteUrl)}${p3}`;
            } catch (e) {
              return match;
            }
          }
        );
        
        return htmlContent;
      };
      
      html = proxyAssetUrls(html);
      
      return new NextResponse(html, {
        headers: headers
      });
    }
    
    // 对于非HTML内容，直接返回
    const contentHeaders = new Headers(response.headers);
    contentHeaders.set('Access-Control-Allow-Origin', '*');
    contentHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    contentHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return new NextResponse(response.body, {
      headers: contentHeaders
    });
    
  } catch (error: any) {
    console.error('Game proxy error:', error);
    return new NextResponse(`Internal server error: ${error.message}`, { status: 500 });
  }
} 