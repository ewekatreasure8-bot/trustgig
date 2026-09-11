"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield, User, Briefcase, MapPin, DollarSign, FileText, Tag,
  ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { saveProfile, getProfile, type ProfileData } from "@/lib/profile";
import { categories } from "@/lib/providers";
import { saveProfile, getProfile, type ProfileData } from "@/lib/profile";

const responseTimeOptions = ["Under 1 hour", "Under 2 hours", "Under 4 hours", "Under 24 hours"];

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isLocal, setIsLocal] = useState(false);
  const [price, setPrice] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [responseTime, setResponseTime] = useState("");

  useEffect(() => {
    if (!authLoading && !user) router.push("/signin");
    if (user) setFullName(user.fullName);
  }, [user, authLoading, router]);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 10) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !title || !category) { setError("Please fill in all required fields."); return; }
    setError(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push("/signin"); return; }
    if (!location || !price || !about || skills.length === 0 || !responseTime) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);

    const profile: ProfileData = {
      fullName, title, category, location, isLocal,
      price: parseInt(price, 10) || 0, about, skills, responseTime,
    };

    saveProfile(profile);
    router.push("/profile/me");
    router.refresh();
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-secondary/20">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-semibold">1</span>}
            </div>
            <div><p className="text-sm font-medium text-foreground">Basic Info</p><p className="text-xs text-muted-foreground">Name &amp; category</p></div>
          </div>
          <div className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              <span className="text-sm font-semibold">2</span>
            </div>
            <div><p className="text-sm font-medium text-foreground">Details</p><p className="text-xs text-muted-foreground">Rate, skills &amp; bio</p></div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-xl">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-center text-2xl font-bold tracking-tight text-foreground">Set up your professional profile</h1>
            <p className="mt-1 text-center text-sm text-muted-foreground">This is how clients will find and hire you on TrustGig</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-5">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === 1 && (
            <form onSubmit={handleStep1Next} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="fullName" type="text" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-12 pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Professional Title</Label>
                <div className="relative">
                  <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="title" type="text" placeholder="e.g. Graphic Designer, Home Repair Specialist" value={title} onChange={(e) => setTitle(e.target.value)} className="h-12 pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">Service Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="h-12"><SelectValue placeholder="Choose your main category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="lg" className="h-12 w-full text-base">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="location" type="text" placeholder="e.g. San Francisco, CA or Remote" value={location} onChange={(e) => setLocation(e.target.value)} className="h-12 pl-10" required />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 p-4">
                <div><p className="text-sm font-medium text-foreground">Offer local services</p><p className="text-xs text-muted-foreground">Enable if you serve clients in person</p></div>
                <Switch checked={isLocal} onCheckedChange={setIsLocal} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium">Hourly Rate ($)</Label>
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="price" type="number" min="1" placeholder="e.g. 65" value={price} onChange={(e) => setPrice(e.target.value)} className="h-12 pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="responseTime" className="text-sm font-medium">Response Time</Label>
                <Select value={responseTime} onValueChange={setResponseTime}>
                  <SelectTrigger id="responseTime" className="h-12"><SelectValue placeholder="How fast do you respond?" /></SelectTrigger>
                  <SelectContent>
                    {responseTimeOptions.map((rt) => (<SelectItem key={rt} value={rt}>{rt}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Skills (up to 10)</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="text" placeholder="Add a skill and press Enter" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} className="h-12 pl-10" />
                  </div>
                  <Button type="button" variant="outline" className="h-12" onClick={addSkill}>Add</Button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1 px-3 py-1.5">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="ml-1 text-muted-foreground hover:text-foreground">&times;</button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="about" className="text-sm font-medium">About / Bio</Label>
                <div className="relative">
                  <FileText className="pointer-events-none absolute left-3 top-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Textarea id="about" placeholder="Describe your experience, what you offer, and why clients should hire you..." value={about} onChange={(e) => setAbout(e.target.value)} className="min-h-[120px] pl-10 pt-3" required />
                </div>
                <p className="text-xs text-muted-foreground">{about.length} / 500 characters</p>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" size="lg" className="h-12 flex-1" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />Back
                </Button>
                <Button type="submit" size="lg" className="h-12 flex-1 text-base">Publish Profile</Button>
              </div>
            </form>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
