# Supabase Request Optimization Guide

An analysis of your request volume shows **1,429 Auth requests** compared to **654 Database requests**. A greater than 2:1 ratio of Auth-to-Database requests is a classic pattern in Next.js App Router applications using Supabase SSR. 

Below is a detailed breakdown of why this is happening in your codebase and the industry-standard architectural practices used to minimize these requests.

---

## 🔍 Root Cause Analysis: Why are Auth Requests so High?

### 1. Unconditional `getUser()` Calls in Middleware
Your `middleware.ts` file executes on every matching request route. Currently, it calls:
```typescript
await supabase.auth.getUser();
```
Unlike `getSession()`, which decodes and verifies the JWT session cookie **locally**, `getUser()` makes a mandatory **outbound HTTP network request** to the Supabase Auth server to fetch the latest user object and validate token revocation. Calling this on every route navigation, client-side prefetch, or API route racks up massive auth request counts.

### 2. Double Authentication Multipliers on API Routes
When a client component makes a standard API request (e.g., fetching `/api/me/interactions` on mount):
1. **Pass 1:** The request hits `middleware.ts`, triggering `supabase.auth.getUser()` (**Auth Request #1**).
2. **Pass 2:** The request reaches the route handler (`app/api/me/interactions/route.ts`), which calls `requireUser()`. Inside `requireUser()`, `authClient.auth.getUser()` is invoked again (**Auth Request #2**).

Every individual authenticated API call incurs a **2x multiplier** on Auth requests.

### 3. Uncached Client-Side Mounts Triggering API Endpoints
Client hooks like `usePromptInteractions` use standard `useEffect` blocks to fetch interactions data on mount. Because Next.js client-side navigations and tab switching frequently remount components, these API endpoints are hit repeatedly without client-side deduplication or stale-while-revalidate caching.

---

## 🛠️ Actionable Best Practices & Solutions

### Practice 1: Switch to `getSession()` in Middleware
For general route traversal and session extension, rely on `getSession()`. It validates the user's JWT cryptographically on your server without calling the Supabase Auth REST API, falling back to a network request only when the token is expired and requires refreshing.

> [!TIP]
> Reserve `getUser()` strictly for highly sensitive Server Actions or API endpoints where immediate server-side permission validation/revocation checks are absolutely necessary before mutating data.

#### Recommended `middleware.ts` Update:
```diff
-  // Refresh session — this is a no-op if the session is still valid
-  await supabase.auth.getUser();
+  // Refresh session cryptographically via local cookie verification
+  // Avoids outbound network requests to Supabase Auth servers unless expired
+  await supabase.auth.getSession();
```

---

### Practice 2: Request-Deduplication with React `cache`
In Next.js App Router, multiple components within the same server render tree might request the current user or database state independently. Wrapping data-fetching utilities in React's `cache()` ensures that identical requests within the same server request lifecycle evaluate once and return the cached promise.

#### Recommended `lib/api-utils.ts` Update:
```typescript
import { cache } from "react";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "./supabase";

// Memoize the session retrieval per server request lifecycle
export const requireUser = cache(async () => {
  const cookieStore = await cookies();
  const authClient = createSupabaseServerClient(cookieStore);
  
  // Use getUser() here if absolute server validation is required for API actions,
  // or getSession() if optimizing for extreme read performance.
  const {
    data: { user },
    error,
  } = await authClient.auth.getUser();

  if (error || !user) {
    return { user: null, authClient, error: "Unauthorized" as const };
  }

  return { user, authClient, error: null };
});
```

---

### Practice 3: Tighten Middleware Matchers
Ensure your middleware matcher strictly ignores paths that don't require user authentication checks or session refreshing, such as external webhooks, static polling assets, or specific background workers.

```typescript
export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     * - monitoring/health check endpoints
     */
    "/((?!_next/static|_next/image|favicon.ico|monitoring|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

---

### Practice 4: Client-Side Request Deduplication (SWR / React Query)
Replace raw `fetch` calls inside `useEffect` hooks with client-side caching libraries like **SWR** (`swr`) or **TanStack React Query**. These libraries automatically deduplicate identical API requests made across multiple sibling components and respect a configured `staleTime` or `dedupingInterval`.

#### Example implementation using SWR for `usePromptInteractions`:
```typescript
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePromptInteractions(prompts: DetailedPrompt[]) {
  const { user } = useAuth();
  const dbIdsKey = useMemo(() => prompts.map((p) => p.id).filter(isDbPrompt).join(","), [prompts]);

  // Automatically handles deduplication, caching, and prevents excessive remount fetching
  const { data } = useSWR(
    user && dbIdsKey ? `/api/me/interactions?ids=${encodeURIComponent(dbIdsKey)}` : null,
    fetcher,
    {
      dedupingInterval: 10000, // Deduplicate calls within a 10-second window
      revalidateOnFocus: false, // Prevent extra queries when switching browser tabs
    }
  );

  // ... derive state from data
}
```

---

## 📊 Summary of Expected Reductions

| Optimization Step | Targeted Metric | Expected Impact |
| :--- | :--- | :--- |
| **`getSession()` in Middleware** | Auth Requests | **~50% reduction** in total Auth API calls. |
| **React `cache()` wrapping** | Database / Auth Requests | Eliminates redundant inline server calls per render pass. |
| **Client-side caching (SWR)** | Total Requests | Halves client API polling volume during UI browsing. |
