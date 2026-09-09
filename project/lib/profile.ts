export const PROFILE_KEY = "trustgig_profile";

export interface ProfileData {
  fullName: string;
  title: string;
  category: string;
  location: string;
  isLocal: boolean;
  price: number;
  about: string;
  skills: string[];
  responseTime: string;
}

export function getProfile(): ProfileData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: ProfileData): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
