import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

const publicPaths = ['/login', '/api/auth'];

function getLocaleFromPath(pathname: string): string | null {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  if (potentialLocale && locales.includes(potentialLocale as (typeof locales)[number])) {
    return potentialLocale;
  }
  return null;
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes (except auth check)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get locale from path or use default
  const pathLocale = getLocaleFromPath(pathname);
  const locale = pathLocale || defaultLocale;

  // Remove locale from pathname for checking
  const pathnameWithoutLocale = pathLocale ? pathname.replace(`/${pathLocale}`, '') || '/' : pathname;

  // Check if path is public
  const isPublicPath = publicPaths.some(
    (path) => pathnameWithoutLocale === path || pathnameWithoutLocale.startsWith(`${path}/`)
  );

  // Redirect to login if not authenticated and not on public path
  if (!user && !isPublicPath) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if authenticated and on login page
  if (user && pathnameWithoutLocale === '/login') {
    // Check if user has completed onboarding
    const { data: userData } = await supabase
      .from('users')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single();

    if (userData?.onboarding_completed) {
      return NextResponse.redirect(new URL(`/${locale}/chat`, request.url));
    } else {
      return NextResponse.redirect(new URL(`/${locale}/onboarding`, request.url));
    }
  }

  // Add locale to path if missing
  if (!pathLocale && pathname !== '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  // Redirect root to default locale
  if (pathname === '/') {
    if (user) {
      return NextResponse.redirect(new URL(`/${defaultLocale}/chat`, request.url));
    }
    return NextResponse.redirect(new URL(`/${defaultLocale}/login`, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
