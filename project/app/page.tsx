"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Shield,
  Lock,
  MapPin,
  Star,
  Search,
  ArrowRight,
  BadgeCheck,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProviderCard } from "@/components/provider-card";
import { providers, categories } from "@/lib/providers";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm animate-fade-in">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Over 10,000 vetted professionals ready to work
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground animate-fade-in-up sm:text-5xl lg:text-6xl">
              Hire vetted professionals
              <br />
              <span className="text-primary">you can trust</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground animate-fade-in-up animation-delay-100">
              Secure escrow payments, verified profiles, and live location
              tracking when you need it. Find the right pro for any job, local
              or remote.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-border/60 bg-background/80 p-2 shadow-lg backdrop-blur-sm animate-fade-in-up animation-delay-200">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Find services near you or online..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-12 border-0 pl-10 text-base shadow-none focus-visible:ring-0"
                />
              </div>
              <Button size="lg" className="h-12 px-6" onClick={handleSearch}>
                Search
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 animate-fade-in-up animation-delay-300">
              {categories.slice(0, 5).map((cat) => (
                <Link
                  key={cat}
                  href={`/search?category=${encodeURIComponent(cat)}`}
                  className="rounded-full border border-border/60 bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-border/60 bg-secondary/20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border/60 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 px-6 py-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Escrow Protected</h3>
              <p className="text-sm text-muted-foreground">
                Funds released only when work is confirmed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <BadgeCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Verified Profiles</h3>
              <p className="text-sm text-muted-foreground">
                Identity and credentials checked
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Live Location</h3>
              <p className="text-sm text-muted-foreground">
                Real-time tracking for local services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended providers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Recommended for you
            </h2>
            <p className="mt-2 text-muted-foreground">
              Top-rated professionals available now
            </p>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {providers.slice(0, 6).map((provider, i) => (
            <div
              key={provider.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <ProviderCard provider={provider} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/search">
            <Button variant="outline">
              View all professionals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/20 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              How TrustGig works
            </h2>
            <p className="mt-2 text-muted-foreground">
              Three simple steps to get your job done safely
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Search & Compare",
                desc: "Browse verified professionals by category, location, price, and reviews. Compare profiles side by side.",
                icon: Search,
              },
              {
                step: "02",
                title: "Hire with Escrow",
                desc: "Fund the job securely through escrow. Your payment is held safely and only released when you confirm the work is done.",
                icon: Lock,
              },
              {
                step: "03",
                title: "Track & Confirm",
                desc: "Track live location for local services. Review the work, confirm completion, and release payment with one click.",
                icon: MapPin,
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <Card className="h-full border-border/60">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-3xl font-bold text-primary/20">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "10K+", label: "Verified Pros", icon: BadgeCheck },
              { value: "4.9", label: "Avg. Rating", icon: Star },
              { value: "500K+", label: "Jobs Completed", icon: TrendingUp },
              { value: "<2hr", label: "Avg. Response", icon: Clock },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-primary/80 shadow-xl">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center lg:flex-row lg:justify-between lg:text-left">
              <div>
                <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
                  Ready to hire a pro you can trust?
                </h2>
                <p className="mt-2 text-primary-foreground/80">
                  Join thousands of clients who found reliable professionals on
                  TrustGig.
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90"
                  asChild
                >
                  <Link href="/join">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/search">Browse Pros</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
