import { clerkMiddleware } from "@clerk/nextjs/server";

// Define the createRouteMatcher function if not available from @clerk/nextjs
const createRouteMatcher = (routes) => {
  return (req) => {
    return routes.some(route => new RegExp(route).test(req.url));
  };
};

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']); 

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
  
  // Allow /api/verify-user to be accessed without authentication
  if (req.url.includes('/api/verify-user')) return;
});


export const config = {
  matcher: [
    '/api/(.*)', // Always run for API routes first
    '/trpc/(.*)',
    // General route for other paths, ensure this is last and avoid over-complicating regex
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
