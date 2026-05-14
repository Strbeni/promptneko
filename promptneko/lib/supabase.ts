import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { createServerClient as createSSRServerClient } from '@supabase/ssr';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser client — uses @supabase/ssr's createBrowserClient so that
 * sessions are stored in cookies (not localStorage).  This is required
 * for the server-side API routes to read the session via cookie.
 *
 * Safe to call at module level inside "use client" files.
 */
export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Server-side admin client (service-role key — bypasses RLS).
 * Only use inside Server Components and API routes, never on the client.
 */
export function createServerClient() {
  return createClient<Database>(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseAnonKey,
    { auth: { persistSession: false } }
  );
}

/**
 * Cookie-aware Supabase client for reading the authenticated user's session
 * inside Next.js API routes.  Pass `await cookies()` from `next/headers`.
 */
export function createSupabaseServerClient(cookieStore: ReadonlyRequestCookies) {
  return createSSRServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // API routes are read-only for cookies in Next.js app router;
        // the proxy handles cookie rotation.
        cookiesToSet.forEach(() => {});
      },
    },
  });
}
