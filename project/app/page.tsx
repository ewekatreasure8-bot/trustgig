"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  Star,
  ArrowRight,
  BadgeCheck,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { providers } from "@/lib/providers";

const featured = [
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    title: "UI/UX Designer",
    location: "Bengaluru, India",
    rating: 5.0,
    reviews: 128,
    price: 45,
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  },
  {
    id: "alex-johnson",
    name: "Alex Johnson",
    title: "Full Stack Developer",
    location: "Toronto, Canada",
    rating: 4.9,
    reviews: 96,
    price: 65,
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  },
  {
    id: "maria-gonzalez",
    name: "Maria Gonzalez",
    title: "Digital Marketing Specialist",
    location: "Mexico City, Mexico",
    rating: 5.0,
    reviews: 76,
    price: 40,
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  },
  {
    id: "james-okafor",
    name: "James Okafor",
    title: "Data Analyst",
    location: "Lagos, Nigeria",
    rating: 4.9,
    reviews: 63,
    price: 35,
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  },
  {
    id: "sophie-laurent",
    name: "Sophie Laurent",
    title: "Brand & Visual Designer",
    location: "Lyon, France",
    rating: 5.0,
    reviews: 84,
    price: 50,
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  },
].map((p) => {
  const match = providers.find((x) => x.name === p.name);
  return { ...p, href: match ? `/providers/${match.id}` : "/search" };
});

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* Hero — matches mockup */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1.5 text-sm font-medium text-blue-700">
              <BadgeCheck className="h-4 w-4" />
              Trusted professionals. Vetted for quality.
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Hire vetted professionals{" "}
              <span className="text-blue-600">you can trust</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-500">
              Access top independent talent, carefully verified for skills,
              experience, and reliability.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="h-12 rounded-xl bg-blue-600 px-6 text-base font-semibold hover:bg-blue-700"
                onClick={() => router.push("/search")}
              >
                Find Talent
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-12 rounded-xl px-5 text-base font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                onClick={() => router.push("/search")}
              >
                <Play className="mr-2 h-4 w-4 fill-current" />
                Learn how it works
              </Button>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-14 flex flex-wrap items-start gap-8 sm:gap-12">
            {[
              {
                icon: Shield,
                title: "Vetted Professionals",
                desc: "Background checked",
              },
              {
                icon: Star,
                title: "Quality Guaranteed",
                desc: "Satisfaction assured",
              },
              {
                icon: Lock,
                title: "Secure Payments",
                desc: "Protected every step",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Featured Professionals
            </h2>
            <p className="mt-1 text-slate-500">
              Handpicked professionals with verified skills and proven results.
            </p>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
          >
            View all professionals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {featured.map((pro) => (
            <Link
              key={pro.id}
              href={pro.href}
              className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md"
            >
              <div className="relative mx-auto h-16 w-16">
                <img
                  src={pro.image}
                  alt={pro.name}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-white"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white ring-2 ring-white">
                  <BadgeCheck className="h-3 w-3" />
                </span>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-slate-900">{pro.name}</h3>
                <p className="mt-0.5 text-xs font-medium text-blue-600">
                  Verified
                </p>
                <p className="mt-1 text-sm text-slate-500">{pro.title}</p>
                <p className="mt-0.5 text-xs text-slate-400">{pro.location}</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-slate-800">
                    {pro.rating.toFixed(1)}
                  </span>
                  <span className="text-slate-400">({pro.reviews})</span>
                </div>
                <p className="mt-3 border-t border-slate-100 pt-3 text-base font-bold text-slate-900">
                  ${pro.price}{" "}
                  <span className="text-sm font-normal text-slate-400">/hr</span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/search">
            <Button variant="outline" className="rounded-xl">
              View all professionals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Marketing strip — trust should not be optional */}
      <section className="border-y border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
              <Shield className="h-4 w-4" />
              Verified. Trusted. Gig ready.
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Trust{" "}
              <span className="text-blue-600">shouldn't be optional.</span>
            </h2>
            <p className="mt-4 max-w-md text-lg text-slate-500">
              TrustGig connects you with verified professionals you can count
              on—so you can focus on results, not risks.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-blue-600" />
                Verified Professionals
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-blue-600" />
                Secure & Private
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 text-blue-600" />
                Rated & Reviewed
              </span>
            </div>
            <Button
              size="lg"
              className="mt-8 h-12 rounded-xl bg-blue-600 px-7 text-base font-semibold hover:bg-blue-700"
              onClick={() => router.push("/search")}
            >
              Find Trusted Talent
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="mt-4 text-sm text-slate-500">
              Built for freelancers.{" "}
              <span className="font-semibold text-blue-600">Trusted</span> by
              businesses.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="space-y-3">
              {featured.slice(0, 3).map((pro, i) => (
                <div
                  key={pro.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white p-4 shadow-lg"
                  style={{ marginLeft: i * 24 }}
                >
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-semibold text-slate-900">
                        {pro.title}
                      </p>
                      <BadgeCheck className="h-4 w-4 shrink-0 text-blue-600" />
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {pro.rating.toFixed(1)} ({pro.reviews} reviews)
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-emerald-600">
                      ● Verified
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            How TrustGig works
          </h2>
          <p className="mt-2 text-slate-500">
            Three simple steps to get work done safely
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Find verified talent",
              desc: "Browse pros by skill, rating, and location. Every profile is checked before it goes live.",
            },
            {
              step: "2",
              title: "Hire with escrow",
              desc: "Fund the job first. Money stays locked until you confirm the work is done.",
            },
            {
              step: "3",
              title: "Approve & release",
              desc: "Review the delivery, release payment, and leave a review. Track local jobs live when it matters.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to hire with confidence?
            </h2>
            <p className="mt-2 text-slate-400">
              Your next great hire, minus the guesswork.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-blue-600 px-6 font-semibold hover:bg-blue-700"
              onClick={() => router.push("/search")}
            >
              Find Talent
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-slate-600 bg-transparent px-6 font-semibold text-white hover:bg-slate-800 hover:text-white"
              onClick={() => router.push("/join")}
            >
              Join as a Professional
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
