import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from 'next-intl/middleware';

/** 
 * 根据用户区域进行国际化处理 将路由转向到对应[lang]的路由  例如：app/[lang]/layout.js
 */
const intlMiddleware = createMiddleware({
  locales: ["en", "zh", "ja"],
  defaultLocale: "en",
});

/** 
 * 权限验证中间件
 */
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  beforeAuth: (req) => { return intlMiddleware(req) },
  publicRoutes: ["/:lang/sign-in", '/api/webhook/clerk'],
  ignoredRoutes: ['/api/webhook/clerk']
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
