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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { providers, categories } from "@/lib/providers";

const featured = providers.slice(0, 6);

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

      <section className="relative px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#b8d9f5_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_left,_#d4ebfa_0%,_transparent_50%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
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
              <div className="flex items-center gap-2 rounded-full border border-sky-100 bg-white p-1.5 shadow-lg shadow-sky-900/5">
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
                  className="h-11 shrink-0 rounded-full bg-slate-900 px-5 font-semibold text-white hover:bg-slate-800"
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
                    className="rounded-full border border-sky-100 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-sky-300 hover:text-sky-700"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={featured[0]?.image}
                    alt={featured[0]?.name ?? "Professional"}
                    className="h-40 w-full object-cover sm:h-48"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={featured[1]?.image}
                    alt={featured[1]?.name ?? "Professional"}
                    className="h-28 w-full object-cover sm:h-32"
                  />
                </div>
              </div>
              <div className="space-y-3 pt-6">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={featured[2]?.image}
                    alt={featured[2]?.name ?? "Professional"}
                    className="h-28 w-full object-cover sm:h-32"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={featured[3]?.image}
                    alt={featured[3]?.name ?? "Professional"}
                    className="h-40 w-full object-cover sm:h-48"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -left-2 top-8 rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-lg sm:left-0">
              <p className="text-xs font-medium text-slate-500">In escrow</p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">$1,250</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                  Protected
                </span>
              </div>
            </div>
            <div className="absolute -right-1 bottom-6 flex items-center gap-2 rounded-2xl border border-white/80 bg-white px-3.5 py-2.5 shadow-lg sm:right-2">
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

        <div className="relative mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-4 border-t border-sky-200/60 pt-10 text-center">
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

      <section className="relative px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]">
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Team working together"
            className="h-72 w-full object-cover sm:h-80 lg:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-8 text-center sm:px-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Work gets done. Money stays safe.
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/80">
              Fund the job, track progress, release payment only when you
              approve.
            </p>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-8 grid max-w-5xl gap-4 px-2 sm:grid-cols-3 sm:px-0">
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
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-900/5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <card.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-base font-bold text-slate-900">
                {card.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                {card.desc}
              </p>
              <Link
                href={card.href}
                className="mt-4 inline-flex items-center gap-1 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Learn more
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((pro) => (
              <Link
                key={pro.id}
                href={`/providers/${pro.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-[#f7fbfe] shadow-sm transition hover:border-sky-200 hover:shadow-md"
              >
                <div className="relative h-44 overflow-hidden bg-sky-100">
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  {pro.verified && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-sky-700 shadow-sm">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{pro.name}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">{pro.title}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {pro.location}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{pro.rating}</span>
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

      <section className="bg-[#e8f4fc] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            It starts with a search
          </h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500">
            Find a pro, fund the job, get it done — with trust built in.
          </p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            {[
              {
                step: "1",
                icon: Search,
                title: "Browse verified pros",
                desc: "Filter by skill, rating, rate, and local or remote.",
              },
              {
                step: "2",
                icon: Wallet,
                title: "Fund with escrow",
                desc: "Payment is held safely until you approve the work.",
              },
              {
                step: "3",
                icon: Users,
                title: "Approve & release",
                desc: "Confirm delivery, release funds, leave a review.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {item.step}
                  </span>
                  <item.icon className="h-5 w-5 text-sky-600" />
                </div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <Button
            size="lg"
            className="mt-10 h-12 rounded-full bg-sky-500 px-8 text-base font-semibold text-white hover:bg-sky-600"
            onClick={() => router.push("/search")}
          >
            Start hiring
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
