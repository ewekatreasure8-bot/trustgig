"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface LocalUser {
  id: string;
  email: string;
  fullName: string;
  accountType: string;
  createdAt: string;
}

interface AuthContextValue {
  user: LocalUser | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, accountType: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signUp: async () => ({ error: "Not implemented" }),
  signIn: async () => ({ error: "Not implemented" }),
  signOut: async () => {},
});

const STORAGE_KEY = "trustgig_users";
const SESSION_KEY = "trustgig_session";

interface StoredUser extends LocalUser {
  password: string;
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw) as LocalUser;
        setUser(session);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string, accountType: string) => {
    const users = getStoredUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { error: "An account with this email already exists." };
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      email,
      password,
      fullName,
      accountType,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveStoredUsers(users);

    const sessionUser: LocalUser = {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      accountType: newUser.accountType,
      createdAt: newUser.createdAt,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { error: null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found || found.password !== password) {
      return { error: "Invalid email or password. Please try again." };
    }

    const sessionUser: LocalUser = {
      id: found.id,
      email: found.email,
      fullName: found.fullName,
      accountType: found.accountType,
      createdAt: found.createdAt,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
