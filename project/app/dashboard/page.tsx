"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield, Star, TrendingUp, Clock, ArrowRight, MapPin, Wallet,
  Search, Briefcase, BadgeCheck, MessageSquare, CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAuth } from "@/components/auth-provider";
import { providers } from "@/lib/providers";

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

  const firstName = user.fullName.split(" ")[0];
  const isProvider = user.accountType === "offer" || user.accountType === "both";

  const stats = [
    { label: "Active Jobs", value: "3", icon: Briefcase, color: "text-primary" },
    { label: "Completed", value: "27", icon: CheckCircle2, color: "text-success" },
    { label: "Avg Rating", value: "4.9", icon: Star, color: "text-warning" },
    { label: "Response Time", value: "<2hr", icon: Clock, color: "text-accent-foreground" },
  ];

  const quickActions = [
    { label: "Browse Professionals", desc: "Find trusted pros for any job", icon: Search, href: "/search" },
    { label: "Live Location", desc: "Track active local jobs in real time", icon: MapPin, href: "/location" },
    { label: "Wallet & Escrow", desc: "Manage balance, deposits, and withdrawals", icon: Wallet, href: "/wallet" },
    ...(isProvider ? [{ label: "My Profile", desc: "View and edit your public profile", icon: BadgeCheck, href: "/profile/me" }] : []),
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here&apos;s what&apos;s happening with your TrustGig account.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={stat.label} className="border-border/60 animate-fade-in-up" >
              <CardContent className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href}>
                    <Card className="group cursor-pointer border-border/60 transition-all hover:border-primary/30 hover:shadow-md">
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

            {/* Recent Activity */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h2>
              <Card className="border-border/60">
                <CardContent className="p-5">
                  <div className="space-y-4">
                    {[
                      { title: "Logo design project", status: "In Progress", amount: "$650", icon: Briefcase },
                      { title: "Home repair - Kitchen faucet", status: "Escrow Funded", amount: "$120", icon: Wallet },
                      { title: "Marketing consultation", status: "Completed", amount: "$300", icon: CheckCircle2 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 border-b border-border/40 pb-4 last:border-0 last:pb-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                          <item.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{item.amount}</p>
                          <Badge variant={item.status === "Completed" ? "default" : "secondary"} className="mt-1 text-xs">
                            {item.status === "Completed" ? "Paid" : item.status === "Escrow Funded" ? "In Escrow" : "Active"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Summary */}
            <Card className="border-border/60">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Wallet</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-2xl font-bold text-foreground">$2,450</p>
                  </div>
                  <div className="border-t border-border/40 pt-3">
                    <p className="text-sm text-muted-foreground">In Escrow</p>
                    <p className="text-lg font-semibold text-foreground">$770</p>
                  </div>
                </div>
                <Button className="mt-4 w-full" size="sm" asChild>
                  <Link href="/wallet">Manage Wallet</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Pros */}
            <Card className="border-border/60">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Top Pros</h3>
                  <Link href="/search" className="text-xs text-primary hover:underline">View all</Link>
                </div>
                <div className="space-y-3">
                  {providers.slice(0, 3).map((p) => (
                    <Link key={p.id} href={`/providers/${p.id}`} className="flex items-center gap-3 transition-colors hover:bg-accent/50 rounded-lg p-1.5 -m-1.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                        {p.name.split(" ").map((w) => w[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{p.title}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                        <span className="font-medium">{p.rating}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trust Badge */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Escrow Protected</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Your payments are held safely in escrow and only released when you confirm the work is done.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
