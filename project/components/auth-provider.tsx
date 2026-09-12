"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

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
