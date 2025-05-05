import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function useRouterNoRender() {
  return {
    replace(href: string, _options?: unknown): void {
      window.history.replaceState(null, '', href);
    },
    push(href: string, _options?: unknown): void {
      window.history.pushState(null, '', href);
    },
  } satisfies Partial<AppRouterInstance>;
}
