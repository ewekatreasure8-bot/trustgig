"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  MapPin,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth-provider";

export function SiteHeader() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  const displayName = user?.fullName ?? user?.email?.split("@")[0] ?? "";
  const initials = displayName
    ? displayName
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#e8f4fc]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            TrustGig
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-sky-100 bg-white/70 px-2 py-1 shadow-sm md:flex">
          {[
            { href: "/search", label: "Find talent" },
            { href: "/wallet", label: "Wallet" },
            { href: "/location", label: "Location" },
            { href: "/dashboard", label: "Jobs" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-sky-50 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {loading ? null : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-sky-100 bg-white py-1 pl-1 pr-3 shadow-sm transition hover:bg-sky-50">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-sky-100 text-xs font-medium text-sky-700">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-slate-800">
                    {displayName}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push("/dashboard")}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push("/profile/me")}
                >
                  <UserIcon className="h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push("/location")}
                >
                  <MapPin className="h-4 w-4" />
                  Live Location
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => router.push("/wallet")}
                >
                  <Wallet className="h-4 w-4" />
                  Wallet
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 text-destructive focus:text-destructive"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="font-medium text-slate-700"
                asChild
              >
                <Link href="/signin">Log in</Link>
              </Button>
              <Button
                size="sm"
                className="rounded-full bg-sky-500 px-5 font-semibold text-white hover:bg-sky-600"
                asChild
              >
                <Link href="/join">
                  Get started
                  <span className="ml-1">→</span>
                </Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-800 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-sky-100 bg-white md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {[
              { href: "/search", label: "Find talent" },
              { href: "/wallet", label: "Wallet" },
              { href: "/location", label: "Location" },
              { href: "/dashboard", label: "Jobs" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-sky-50"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2">
              {user ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                >
                  Sign out
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/signin">Log in</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 rounded-full bg-sky-500 hover:bg-sky-600"
                    asChild
                  >
                    <Link href="/join">Get started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
