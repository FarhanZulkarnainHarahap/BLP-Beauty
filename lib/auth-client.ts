"use client";

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { credentials: "same-origin" });
  if (!response.ok) throw new Error("Could not initialize authentication");
  const data = (await response.json()) as { csrfToken?: string };
  if (!data.csrfToken) throw new Error("Authentication CSRF token is missing");
  return data.csrfToken;
}

async function authAction(path: string, callbackUrl: string) {
  const token = await csrfToken();
  const redirectTo = new URL(callbackUrl, window.location.origin).toString();
  const response = await fetch(`/api/auth/${path}`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1",
    },
    body: new URLSearchParams({ csrfToken: token, callbackUrl: redirectTo }),
  });
  const data = (await response.json()) as { url?: string };
  window.location.href = data.url ?? redirectTo;
}

export function signIn(provider: "google" | "facebook", callbackUrl = "/auth-redirect") {
  return authAction(`signin/${provider}`, callbackUrl);
}

export function signOut(callbackUrl = "/") {
  return authAction("signout", callbackUrl);
}
