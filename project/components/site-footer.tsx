import Link from "next/link";
import { Shield, Lock, MapPin, Star } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-sky-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                TrustGig
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              The trusted marketplace for hiring verified professionals. Escrow
              payments, background-checked talent, and peace of mind on every
              job.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                <Lock className="h-3.5 w-3.5" />
                Escrow protected
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                <Star className="h-3.5 w-3.5" />
                4.9 avg rating
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                <MapPin className="h-3.5 w-3.5" />
                Live location
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                ["Find talent", "/search"],
                ["Join as a pro", "/join"],
                ["Wallet & escrow", "/wallet"],
                ["Live location", "/location"],
                ["Dashboard", "/dashboard"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 transition hover:text-sky-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Categories</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                "Design",
                "Home Repair",
                "Consulting",
                "Marketing",
                "Writing",
                "Tech & Development",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/search?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-slate-500 transition hover:text-sky-600"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Support</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                "Help Center",
                "Trust & Safety",
                "Privacy Policy",
                "Terms of Service",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <span className="cursor-pointer text-sm text-slate-500 transition hover:text-sky-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sky-100 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} TrustGig. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            Built for safe hiring — escrow, verified pros, real results.
          </p>
        </div>
      </div>
    </footer>
  );
}
