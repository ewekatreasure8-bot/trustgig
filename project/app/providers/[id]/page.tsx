"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  MapPin,
  BadgeCheck,
  Lock,
  Clock,
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getProviderById } from "@/lib/providers";

const reviews = [
  {
    name: "Rachel Kim",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely fantastic work. Showed up on time, communicated clearly throughout, and delivered beyond what was promised. The escrow process made everything feel safe.",
    avatar: "https://images.pexels.com/photos/7752788/pexels-photo-7752788.jpeg?auto=compress&cs=tinysrgb&h=80&w=80",
  },
  {
    name: "Tom Bradley",
    rating: 5,
    date: "1 month ago",
    comment:
      "Professional from start to finish. The live location tracking gave me peace of mind knowing exactly when they would arrive. Would hire again in a heartbeat.",
    avatar: "https://images.pexels.com/photos/5197205/pexels-photo-5197205.jpeg?auto=compress&cs=tinysrgb&h=80&w=80",
  },
  {
    name: "Lisa Wang",
    rating: 4,
    date: "2 months ago",
    comment:
      "Great quality work and fair pricing. Took a little longer than expected but the end result was excellent. Escrow release was smooth and easy.",
    avatar: "https://images.pexels.com/photos/7640433/pexels-photo-7640433.jpeg?auto=compress&cs=tinysrgb&h=80&w=80",
  },
];

export default function ProviderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const provider = getProviderById(id);

  if (!provider) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/search"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>

        {/* Profile header */}
        <Card className="mb-8 overflow-hidden border-border/60">
          <div className="h-32 bg-gradient-to-br from-primary/10 via-accent to-primary/5" />
          <CardContent className="p-6 pt-0">
            <div className="-mt-16 flex flex-col gap-6 sm:flex-row sm:items-end">
              <div className="relative">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="h-28 w-28 rounded-2xl border-4 border-background object-cover shadow-md"
                />
                {provider.verified && (
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-background">
                    <BadgeCheck className="h-7 w-7 text-primary" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    {provider.name}
                  </h1>
                  {provider.verified && (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                      <BadgeCheck className="mr-1 h-3.5 w-3.5" />
                      Identity Verified
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-muted-foreground">{provider.title}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-semibold text-foreground">
                      {provider.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({provider.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {provider.location}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Responds {provider.responseTime}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {provider.jobsCompleted} jobs completed
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 gap-3">
                <Button size="lg">Hire Now</Button>
                <Button size="lg" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <h2 className="mb-3 text-lg font-semibold text-foreground">
                      About {provider.name}
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      {provider.about}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-lg font-semibold text-foreground">
                      Skills & Expertise
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {provider.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-3 py-1.5"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-lg font-semibold text-foreground">
                      Verification Details
                    </h2>
                    <div className="space-y-3">
                      {[
                        { label: "Identity Verified", icon: BadgeCheck },
                        { label: "Background Check Passed", icon: Shield },
                        { label: "Payment Method Confirmed", icon: Lock },
                        { label: "Available for New Jobs", icon: Zap },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                            <item.icon className="h-4 w-4 text-success" />
                          </div>
                          <span className="text-sm text-foreground">
                            {item.label}
                          </span>
                          <CheckCircle2 className="ml-auto h-4 w-4 text-success" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="mb-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      {provider.rating}
                    </span>
                    <div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.round(provider.rating)
                                ? "fill-warning text-warning"
                                : "text-border"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {provider.reviews} reviews
                      </p>
                    </div>
                  </div>
                </div>
                <Separator className="mb-4" />
                {reviews.map((review, i) => (
                  <Card key={i} className="border-border/60">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">
                              {review.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <div className="mt-0.5 flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3.5 w-3.5 ${
                                  star <= review.rating
                                    ? "fill-warning text-warning"
                                    : "text-border"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="portfolio">
                <Card className="border-border/60">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">
                      Portfolio samples will appear here once the provider uploads
                      their work.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-border/60">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    ${provider.price}
                    <span className="text-base font-normal text-muted-foreground">
                      /hr
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Starting rate
                  </p>
                </div>
                <Separator className="my-5" />
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium text-foreground">
                      {provider.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-foreground">
                      {provider.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Response</span>
                    <span className="font-medium text-foreground">
                      {provider.responseTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Jobs Done</span>
                    <span className="font-medium text-foreground">
                      {provider.jobsCompleted}
                    </span>
                  </div>
                </div>
                <Button className="mt-5 w-full" size="lg">
                  Hire Now
                </Button>
                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  size="lg"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Escrow Protected
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Funds are held securely in escrow and only released when
                      both parties confirm the job is complete.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {provider.isLocal && (
              <Card className="border-border/60">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Live Location Tracking
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Track your provider in real-time on the way to your job
                        for added safety and convenience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
