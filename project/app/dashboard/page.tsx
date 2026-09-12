"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield, Search, MapPin, Wallet, BadgeCheck,
  ArrowRight, UserPlus, Briefcase,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAuth } from "@/components/auth-provider";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.push("/signin");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/20">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const firstName = user.fullName?.split(" ")[0] || "there";

  const quickActions = [
    {
      label: "Browse Services",
      desc: "Find trusted people for any job — home, digital, or personal",
      icon: Search,
      href: "/search",
    },
    {
      label: "Create Your Profile",
      desc: "Start offering your skills and get hired",
      icon: UserPlus,
      href: "/profile/setup",
    },
    {
      label: "Wallet & Escrow",
      desc: "Manage your balance and secure payments",
      icon: Wallet,
      href: "/wallet",
    },
    {
      label: "Live Location",
      desc: "Track local jobs in real time",
      icon: MapPin,
      href: "/location",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome, {firstName} 👋
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            TrustGig helps you hire trusted people or get hired for everyday and professional jobs.
          </p>
        </div>

        {/* Main CTA Card */}
        <Card className="mb-10 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                Get started in 2 minutes
              </h2>
              <p className="mt-1 text-muted-foreground">
                Create a profile to offer services, or start browsing trusted professionals near you.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/profile/setup">Create Profile</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/search">Browse Services</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="mb-5 text-lg font-semibold text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <Card className="group h-full cursor-pointer border-border/60 transition-all hover:border-primary/30 hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <action.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{action.label}</h3>
                      <p className="text-sm text-muted-foreground">{action.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust Note */}
        <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Built on Trust</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
            Payments are protected by escrow. Profiles can be verified.  
            Whether you need a plumber, a designer, a cleaner, or a developer — TrustGig keeps it safe.
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
