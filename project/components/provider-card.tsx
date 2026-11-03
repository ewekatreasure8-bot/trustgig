import Link from "next/link";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import type { Provider } from "@/lib/providers";

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Link href={`/providers/${provider.id}`} className="group block">
      <div className="h-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <img
              src={provider.image}
              alt={provider.name}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-white"
            />
            {provider.verified && (
              <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white ring-2 ring-white">
                <BadgeCheck className="h-3 w-3" />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-semibold text-slate-900">
                {provider.name}
              </h3>
              {provider.verified && (
                <span className="text-xs font-medium text-blue-600">
                  Verified
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-sm text-slate-500">
              {provider.title}
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{provider.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-slate-800">{provider.rating}</span>
            <span className="text-slate-400">({provider.reviews})</span>
          </div>
          <div>
            <span className="text-base font-bold text-slate-900">
              ${provider.price}
            </span>
            <span className="text-sm text-slate-400">/hr</span>
          </div>
        </div>

        {provider.skills?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {provider.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
