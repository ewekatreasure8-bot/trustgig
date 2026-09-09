"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Menu, X, Search, LogOut, User as UserIcon, LayoutDashboard, MapPin, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    ? displayName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">TrustGig</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Link href="/search" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Browse</Link>
            <Link href="/search?category=Design" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Design</Link>
            <Link href="/search?category=Home+Repair" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Home Repair</Link>
            <Link href="/search?category=Consulting" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Consulting</Link>
          </nav>
        </div>

        <div className="hidden flex-1 max-w-xs lg:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="text" placeholder="Search services..." className="h-9 pl-9 text-sm" onKeyDown={(e) => { if (e.key === "Enter") { const val = (e.target as HTMLInputElement).value; router.push(`/search?q=${encodeURIComponent(val)}`); } }} />
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {loading ? null : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border/60 py-1 pl-1 pr-3 transition-colors hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">{initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">{displayName}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="gap-2" onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2" onClick={() => router.push("/profile/me")}>
                  <UserIcon className="h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2" onClick={() => router.push("/location")}>
                  <MapPin className="h-4 w-4" />
                  Live Location
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2" onClick={() => router.push("/wallet")}>
                  <Wallet className="h-4 w-4" />
                  Wallet
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild><Link href="/signin">Sign in</Link></Button>
              <Button size="sm" asChild><Link href="/join">Join</Link></Button>
            </>
          )}
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            <Link href="/search" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileOpen(false)}>Browse</Link>
            <Link href="/search?category=Design" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileOpen(false)}>Design</Link>
            <Link href="/search?category=Home+Repair" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileOpen(false)}>Home Repair</Link>
            <Link href="/search?category=Consulting" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileOpen(false)}>Consulting</Link>
            {user && (
              <>
                <Link href="/dashboard" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <Link href="/location" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileOpen(false)}>Live Location</Link>
                <Link href="/wallet" className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileOpen(false)}>Wallet</Link>
              </>
            )}
            <div className="mt-3 flex gap-2">
              {user ? (
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { signOut(); setMobileOpen(false); }}>
                  <LogOut className="mr-1.5 h-4 w-4" />Sign out
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="flex-1" asChild><Link href="/signin">Sign in</Link></Button>
                  <Button size="sm" className="flex-1" asChild><Link href="/join">Join</Link></Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
