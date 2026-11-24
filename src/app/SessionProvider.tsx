"use client";

import { SessionProvider as Provider } from "next-auth/react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  // Mounted under /leadg: without basePath, next-auth/react calls the
  // DOMAIN-ROOT /api/auth/* routes (the main CRM), so the login form
  // posts this app's credentials to the wrong application and every
  // sign-in fails while the same credentials work via the API. Pin the
  // app's own auth routes. (Same fix as foreclosure/leadcaller.)
  return <Provider basePath="/leadg/api/auth">{children}</Provider>;
}
