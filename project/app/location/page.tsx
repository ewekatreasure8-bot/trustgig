"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin, Shield, ArrowLeft, Navigation, AlertCircle, Clock,
  CheckCircle2, Power, Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAuth } from "@/components/auth-provider";

export default function LocationPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [locationOn, setLocationOn] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/signin");
  }, [user, loading, router]);

  const handleToggle = (enabled: boolean) => {
    if (enabled) {
      setError(null);
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        return;
      }
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          setError(err.message === "User denied Geolocation" ? "Location permission denied. Please allow location access in your browser." : err.message);
          setLocationOn(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
      );
      setWatchId(id);
      setLocationOn(true);
    } else {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setCoords(null);
      setLocationOn(false);
    }
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [watchId]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <SiteHeader />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Live Location</h1>
              <p className="text-sm text-muted-foreground">Share your location during active local jobs</p>
            </div>
          </div>
        </div>

        {/* Info banner */}
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertDescription className="text-foreground">
            Location is only shared while the job is active. It turns off automatically when the job is marked complete.
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-border/60">
              <div className="relative h-[400px] bg-secondary">
                {/* Placeholder map */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary to-primary/10">
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                  {/* Roads */}
                  <div className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2 bg-border/40" />
                  <div className="absolute bottom-0 left-1/3 top-0 w-3 -translate-x-1/2 bg-border/40" />
                  <div className="absolute left-0 right-0 top-1/4 h-2 bg-border/30" />

                  {/* Location pin */}
                  {locationOn && coords ? (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="absolute -inset-8 animate-ping rounded-full bg-primary/20" />
                        <div className="absolute -inset-4 animate-pulse rounded-full bg-primary/30" />
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg">
                          <Navigation className="h-6 w-6 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <MapPin className="mx-auto mb-2 h-12 w-12 text-muted-foreground/40" />
                      <p className="text-sm text-muted-foreground">
                        {locationOn ? "Waiting for location..." : "Turn on location sharing to see your position"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Status badge */}
                <div className="absolute right-4 top-4">
                  <Badge variant={locationOn ? "default" : "secondary"} className="gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${locationOn ? "bg-success animate-pulse" : "bg-muted-foreground"}`} />
                    {locationOn ? "Live" : "Off"}
                  </Badge>
                </div>
              </div>
              {coords && (
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Navigation className="h-4 w-4 text-primary" />
                    <span>Lat: {coords.lat.toFixed(4)}, Lng: {coords.lng.toFixed(4)}</span>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <Card className="border-border/60">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Power className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Location Sharing</h3>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/60 p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Share my location</p>
                    <p className="text-xs text-muted-foreground">Only during active jobs</p>
                  </div>
                  <Switch checked={locationOn} onCheckedChange={handleToggle} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-5">
                <h3 className="mb-4 font-semibold text-foreground">Active Job</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Job</span>
                    <span className="font-medium text-foreground">Kitchen Repair</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Provider</span>
                    <span className="font-medium text-foreground">Daniel Park</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="h-3 w-3" /> In Progress
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Started</span>
                    <span className="font-medium text-foreground">2 hours ago</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full" disabled={!locationOn}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Mark Job Complete
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Privacy Protected</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Your live location is only visible to the client or provider on your active job. It stops sharing the moment the job is completed.
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
