"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Lock,
  Star,
  ArrowRight,
  BadgeCheck,
  MapPin,
  Search,
  Wallet,
  Users,
  Shield,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { providers, categories } from "@/lib/providers";

const featured = providers.slice(0, 6);

const testimonials = [
  {
    quote:
      "Escrow gave me peace of mind. I funded the job, the designer delivered, and I released payment in one click.",
    name: "Amara Okafor",
    role: "Startup founder",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&h=120&w=120",
  },
  {
    quote:
      "As a pro, TrustGig means fewer payment disputes. Clients fund first — I focus on the work.",
    name: "Marcus Wei",
    role: "Full-stack developer",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=120&w=120",
  },
  {
    quote:
      "Live location for local jobs is a game changer. I knew exactly when the handyman was on the way.",
    name: "Priya Nair",
    role: "Homeowner",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&h=120&w=120",
  },
];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#e8f4fc]">
      <SiteHeader />

      <section className="relative px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#b8d9f5_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_left,_#d4ebfa_0%,_transparent_50%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-sky-700 shadow-sm">
              <Shield className="h-3.5 w-3.5" />
              Trusted by thousands of clients & pros
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]">
              Hire people
              <br />
              you can
              <br />
              <span className="text-sky-600">actually trust.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
              Verified professionals, escrow-protected payments, and live
              location when it matters — so you focus on results, not risk.
            </p>

            <div className="mt-8 max-w-lg">
              <div className="flex items-center gap-2 rounded-full border border-sky-100 bg-white p-1.5 shadow-xl shadow-sky-900/5">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search skills, services, or pros..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="h-11 border-0 bg-transparent pl-10 text-sm shadow-none focus-visible:ring-0"
                  />
                </div>
                <Button
                  className="h-11 shrink-0 rounded-full bg-slate-900 px-6 font-semibold text-white hover:bg-slate-800"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.slice(0, 5).map((cat) => (
                  <Link
                    key={cat}
                    href={`/search?category=${encodeURIComponent(cat)}`}
                    className="rounded-full border border-sky-100 bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-sky-300 hover:bg-white hover:text-sky-700"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              {["No upfront risk", "Verified profiles", "24h support"].map(
                (t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-sky-500" />
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
                  <img
                    src={featured[0]?.image}
                    alt={featured[0]?.name ?? "Professional"}
                    className="h-40 w-full object-cover sm:h-48"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
                  <img
                    src={featured[1]?.image}
                    alt={featured[1]?.name ?? "Professional"}
                    className="h-28 w-full object-cover sm:h-32"
                  />
                </div>
              </div>
              <div className="space-y-3 pt-8">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
                  <img
                    src={featured[2]?.image}
                    alt={featured[2]?.name ?? "Professional"}
                    className="h-28 w-full object-cover sm:h-32"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
                  <img
                    src={featured[3]?.image}
                    alt={featured[3]?.name ?? "Professional"}
                    className="h-40 w-full object-cover sm:h-48"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -left-1 top-10 rounded-2xl border border-white/90 bg-white px-4 py-3 shadow-xl sm:left-0">
              <p className="text-xs font-medium text-slate-500">In escrow</p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">$1,250</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                  Protected
                </span>
              </div>
            </div>
            <div className="absolute -right-1 bottom-8 flex items-center gap-2 rounded-2xl border border-white/90 bg-white px-3.5 py-2.5 shadow-xl sm:right-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <BadgeCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Verified pro
                </p>
                <p className="text-[11px] text-slate-500">Background checked</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-4 rounded-2xl border border-sky-100/80 bg-white/70 px-4 py-8 text-center shadow-sm backdrop-blur-sm sm:px-8">
          {[
            { value: "10K+", label: "Verified professionals" },
            { value: "4.9", label: "Average client rating" },
            { value: "100%", label: "Escrow-protected jobs" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Browse by category
              </h2>
              <p className="mt-1 text-slate-500">
                Find the right specialist for any project.
              </p>
            </div>
            <Link
              href="/search"
              className="hidden text-sm font-semibold text-sky-600 hover:text-sky-700 sm:inline-flex sm:items-center sm:gap-1"
            >
              All categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/search?category=${encodeURIComponent(cat)}`}
                className="group rounded-2xl border border-slate-100 bg-[#f7fbfe] px-4 py-5 text-center transition hover:border-sky-200 hover:bg-sky-50 hover:shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-800 group-hover:text-sky-700">
                  {cat}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]">
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Team collaborating"
            className="h-72 w-full object-cover sm:h-80 lg:h-[22rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/35 to-slate-900/10" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-center sm:px-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Work gets done. Money stays safe.
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/85">
              Fund the job, track progress, release payment only when you
              approve.
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-10 grid max-w-5xl gap-4 px-2 sm:grid-cols-3 sm:px-0">
          {[
            {
              icon: BadgeCheck,
              title: "Verified talent",
              desc: "Real profiles with reviews from completed, escrow-released jobs.",
              href: "/search",
            },
            {
              icon: Lock,
              title: "Escrow payments",
              desc: "Funds stay locked until you confirm the work is done right.",
              href: "/wallet",
            },
            {
              icon: MapPin,
              title: "Live location",
              desc: "See where local pros are while a job is active — only then.",
              href: "/location",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-900/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <card.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                {card.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                {card.desc}
              </p>
              <Link
                href={card.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700"
              >
                Learn more
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Top verified professionals
              </h2>
              <p className="mt-1 text-slate-500">
                Real pros with photos, ratings, and proven work.
              </p>
            </div>
            <Link
              href="/search"
              className="hidden items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700 sm:flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((pro) => (
              <Link
                key={pro.id}
                href={`/providers/${pro.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden bg-sky-100">
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {pro.verified && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-sky-700 shadow-sm">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {pro.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-500">{pro.title}</p>
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {pro.location}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-slate-800">
                        {pro.rating}
                      </span>
                      <span className="text-slate-400">({pro.reviews})</span>
                    </span>
                    <span className="font-bold text-slate-900">
                      ${pro.price}
                      <span className="font-normal text-slate-400">/hr</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8f4fc] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              How TrustGig works
            </h2>
            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Three steps from search to a safe, completed job.
            </p>
          </div>
          <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Search,
                title: "Browse verified pros",
                desc: "Filter by skill, rating, rate, and local or remote. Every profile is checked before it goes live.",
              },
              {
                step: "02",
                icon: Wallet,
                title: "Fund with escrow",
                desc: "Payment is held safely until you approve the work. No surprises for clients or pros.",
              },
              {
                step: "03",
                icon: Users,
                title: "Approve & release",
                desc: "Confirm delivery, release funds, leave a review. Track local jobs live when it matters.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-sky-100 bg-white p-7 shadow-sm"
              >
                <span className="text-xs font-bold tracking-wider text-sky-500">
                  STEP {item.step}
                </span>
                <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Loved by clients and pros
            </h2>
            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Real stories from people who hire — and get hired — on TrustGig.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-2xl border border-slate-100 bg-[#f7fbfe] p-6"
              >
                <Quote className="h-8 w-8 text-sky-200" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  “{t.quote}”
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-sky-100 pt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-slate-900 px-8 py-14 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to hire with confidence?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-slate-400">
            Join thousands of clients and professionals who use escrow,
            verification, and clear reviews on every job.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="h-12 rounded-full bg-sky-500 px-8 text-base font-semibold text-white hover:bg-sky-600"
              onClick={() => router.push("/search")}
            >
              Find talent
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-slate-600 bg-transparent px-8 text-base font-semibold text-white hover:bg-slate-800 hover:text-white"
              onClick={() => router.push("/join")}
            >
              Join as a professional
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
