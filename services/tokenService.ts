import Cookies from "js-cookie";

const TOKEN_CONFIG = {
  TOKEN_EXPIRY: 7, // 7 días
  COOKIE_OPTIONS: {
    sameSite: "lax" as const,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
  },
};

export const tokenService = {
  getToken(): string | undefined {
    return Cookies.get("token");
  },

  setToken(token: string): void {
    Cookies.set("token", token, {
      expires: TOKEN_CONFIG.TOKEN_EXPIRY,
      ...TOKEN_CONFIG.COOKIE_OPTIONS,
    });
  },

  clearToken(): void {
    Cookies.remove("token");
  },

  hasToken(): boolean {
    return !!this.getToken();
  },
};
