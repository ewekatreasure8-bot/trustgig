"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User, Briefcase, MapPin, DollarSign, FileText, Tag,
  ArrowLeft, AlertCircle, Loader2, CheckCircle2,
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
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAuth } from "@/components/auth-provider";
import { saveProfile, getProfile } from "@/lib/profile";
import { categories } from "@/lib/providers";

const responseTimeOptions = ["Under 1 hour", "Under 2 hours", "Under 4 hours", "Under 24 hours"];

export default function EditProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

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
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    try {
      const data = getProfile();
      if (data) {
        setFullName(data.fullName || "");
        setTitle(data.title || "");
        setCategory(data.category || "");
        setLocation(data.location || "");
        setIsLocal(data.isLocal || false);
        setPrice(data.price?.toString() || "");
        setAbout(data.about || "");
        setSkills(data.skills || []);
        setResponseTime(data.responseTime || "");
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [user]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setSaving(true);
    setSaved(false);

    const profile = {
      fullName, title, category, location, isLocal,
      price: parseInt(price, 10) || 0, about, skills, responseTime,
    };

    saveProfile(profile);
    setSaving(false);
    setSaved(true);
    setTimeout(() => router.push("/profile/me"), 800);
  };

  if (authLoading || loading) {
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
        <Link href="/profile/me" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>

        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-xl">
          <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Edit Profile</h1>

          {error && (
            <Alert variant="destructive" className="mb-5">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {saved && (
            <Alert className="mb-5 border-success/30 bg-success/10">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <AlertDescription className="text-success">Profile saved! Redirecting...</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-12 pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">Professional Title</Label>
              <div className="relative">
                <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="h-12 pl-10" />
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
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">Location</Label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="h-12 pl-10" />
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
                <Input id="price" type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} className="h-12 pl-10" />
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
                <Textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} className="min-h-[120px] pl-10 pt-3" />
              </div>
              <p className="text-xs text-muted-foreground">{about.length} / 500 characters</p>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" size="lg" className="h-12 flex-1" asChild>
                <Link href="/profile/me">Cancel</Link>
              </Button>
              <Button type="submit" size="lg" className="h-12 flex-1" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
