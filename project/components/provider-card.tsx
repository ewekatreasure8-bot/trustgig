import Link from "next/link";
import { Star, MapPin, BadgeCheck, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Provider } from "@/lib/providers";

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Link href={`/providers/${provider.id}`} className="group block">
      <Card className="h-full overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
        <div className="relative h-32 bg-gradient-to-br from-primary/5 via-accent to-primary/5">
          <div className="absolute right-3 top-3">
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm"
            >
              {provider.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5 pt-0">
          <div className="-mt-12 mb-3 flex items-end justify-between">
            <div className="relative">
              <img
                src={provider.image}
                alt={provider.name}
                className="h-20 w-20 rounded-2xl border-4 border-background object-cover shadow-sm"
              />
              {provider.verified && (
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-background">
                  <BadgeCheck className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{provider.name}</h3>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{provider.title}</p>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-medium text-foreground">{provider.rating}</span>
              <span className="text-muted-foreground">({provider.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{provider.location}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
            <div>
              <span className="text-lg font-bold text-foreground">
                ${provider.price}
              </span>
              <span className="text-sm text-muted-foreground">/hr</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View Profile
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
