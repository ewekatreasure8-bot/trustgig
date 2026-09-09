import Link from "next/link";
import { Shield, Lock, MapPin, Star } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                TrustGig
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The trusted marketplace for hiring vetted professionals. Secure
              escrow, verified profiles, and peace of mind on every job.
            </p>
            <div className="mt-6 flex gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 text-primary" />
                Escrow Protected
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Live Location
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Categories</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/search?category=Design" className="text-sm text-muted-foreground hover:text-foreground">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/search?category=Home+Repair" className="text-sm text-muted-foreground hover:text-foreground">
                  Home Repair
                </Link>
              </li>
              <li>
                <Link href="/search?category=Consulting" className="text-sm text-muted-foreground hover:text-foreground">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/search?category=Marketing" className="text-sm text-muted-foreground hover:text-foreground">
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-3 space-y-2">
              <li><span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">About</span></li>
              <li><span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">Careers</span></li>
              <li><span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">Press</span></li>
              <li><span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">Blog</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <ul className="mt-3 space-y-2">
              <li><span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">Help Center</span></li>
              <li><span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">Trust & Safety</span></li>
              <li><span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">Privacy Policy</span></li>
              <li><span className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TrustGig. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span>4.9 average rating from 12,000+ reviews</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
