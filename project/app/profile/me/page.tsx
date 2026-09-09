"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield, Star, MapPin, BadgeCheck, Clock, CheckCircle2,
  ArrowLeft, Pencil, Loader2, Briefcase, Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAuth } from "@/components/auth-provider";
import { getProfile } from "@/lib/profile";

export default function MyProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/signin");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    setProfile(getProfile());
    setLoadingProfile(false);
  }, [user]);

  if (loading || loadingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  if (!profile) {
    return (
      <div className="min-h-screen bg-secondary/20">
        <SiteHeader />
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">No profile yet</h1>
          <p className="mt-2 text-muted-foreground">Set up your professional profile to start receiving hire requests.</p>
          <Button className="mt-6" size="lg" asChild>
            <Link href="/profile/setup">Create Profile</Link>
          </Button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile/edit">
              <Pencil className="mr-1.5 h-3.5 w-3.5" />
              Edit Profile
            </Link>
          </Button>
        </div>

        <Card className="mb-8 overflow-hidden border-border/60">
          <div className="h-32 bg-gradient-to-br from-primary/10 via-accent to-primary/5" />
          <CardContent className="p-6 pt-0">
            <div className="-mt-16 flex flex-col gap-6 sm:flex-row sm:items-end">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-background bg-primary/10 text-3xl font-bold text-primary shadow-md">
                  {profile.fullName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">{profile.fullName}</h1>
                  <Badge variant="secondary">Unverified</Badge>
                </div>
                {profile.title && <p className="mt-1 text-muted-foreground">{profile.title}</p>}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  {profile.location && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </div>
                  )}
                  {profile.responseTime && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Responds {profile.responseTime}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border/60">
              <CardContent className="p-6">
                <h2 className="mb-3 text-lg font-semibold text-foreground">About</h2>
                <p className="leading-relaxed text-muted-foreground">{profile.about || "No description added yet."}</p>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Skills &amp; Expertise</h2>
                {profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1.5">{skill}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No skills added yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="border-border/60">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    ${profile.price}<span className="text-base font-normal text-muted-foreground">/hr</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Starting rate</p>
                </div>
                <Separator className="my-5" />
                <div className="space-y-3 text-sm">
                  {profile.category && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium text-foreground">{profile.category}</span>
                    </div>
                  )}
                  {profile.location && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium text-foreground">{profile.location}</span>
                    </div>
                  )}
                  {profile.responseTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Response</span>
                      <span className="font-medium text-foreground">{profile.responseTime}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Service Type</span>
                    <span className="font-medium text-foreground">{profile.isLocal ? "Local" : "Remote"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Verification Pending</h3>
                    <p className="mt-1 text-xs text-muted-foreground">Verified profiles get more hires. Verification is reviewed by our team after you publish.</p>
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
