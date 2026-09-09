"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense, useEffect } from "react";
import { Search, SlidersHorizontal, X, MapPin, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProviderCard } from "@/components/provider-card";
import { providers, categories as defaultCategories } from "@/lib/providers";

const CUSTOM_CATEGORIES_KEY = "trustgig_custom_categories";

function getCustomCategories(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_CATEGORIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustomCategories(cats: string[]) {
  localStorage.setItem(CUSTOM_CATEGORIES_KEY, JSON.stringify(cats));
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [priceRange, setPriceRange] = useState(searchParams.get("price") || "any");
  const [locationType, setLocationType] = useState(searchParams.get("location") || "any");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "rating");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [showCreateCat, setShowCreateCat] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [catError, setCatError] = useState<string | null>(null);

  useEffect(() => {
    setCustomCategories(getCustomCategories());
  }, []);

  const allCategories = [...defaultCategories, ...customCategories];

  const handleCreateCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) { setCatError("Enter a category name."); return; }
    if (allCategories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setCatError("This category already exists.");
      return;
    }
    const updated = [...customCategories, trimmed];
    setCustomCategories(updated);
    saveCustomCategories(updated);
    setCategory(trimmed);
    setNewCategory("");
    setCatError(null);
    setShowCreateCat(false);
  };

  const filtered = useMemo(() => {
    let result = [...providers];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (priceRange !== "any") {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter(
        (p) => p.price >= min && (isNaN(max) || p.price <= max)
      );
    }

    if (locationType === "local") {
      result = result.filter((p) => p.isLocal);
    } else if (locationType === "remote") {
      result = result.filter((p) => !p.isLocal);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "reviews") {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [query, category, priceRange, locationType, sortBy]);

  const hasActiveFilters =
    query || category !== "all" || priceRange !== "any" || locationType !== "any";

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setPriceRange("any");
    setLocationType("any");
    router.push("/search");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Browse Professionals
          </h1>
          <p className="mt-1 text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "professional" : "professionals"} found
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, skill, or service..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 pl-10 text-base"
            />
          </div>
        </div>

        {/* Quick filter pills */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setLocationType("any")}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              locationType === "any"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Jobs
          </button>
          <button
            onClick={() => setLocationType("local")}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors ${
              locationType === "local"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            Local
          </button>
          <button
            onClick={() => setLocationType("remote")}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors ${
              locationType === "remote"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            Online
          </button>
          <div className="ml-auto">
            <button
              onClick={() => setShowCreateCat(true)}
              className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary transition-colors hover:bg-primary/10"
            >
              <Plus className="h-3.5 w-3.5" />
              Can&apos;t find your category? Create one
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filters sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-primary hover:underline">
                    <X className="h-3 w-3" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {allCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                        {customCategories.includes(cat) && " (Custom)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="0-50">$0 - $50/hr</SelectItem>
                    <SelectItem value="50-100">$50 - $100/hr</SelectItem>
                    <SelectItem value="100-999">$100+/hr</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Job Type</Label>
                <Select value={locationType} onValueChange={setLocationType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">All Jobs</SelectItem>
                    <SelectItem value="local">Local Only</SelectItem>
                    <SelectItem value="remote">Online Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviewed</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {hasActiveFilters && (
              <div className="mb-4 flex flex-wrap gap-2">
                {query && (
                  <Badge variant="secondary" className="gap-1">
                    &ldquo;{query}&rdquo;
                    <button onClick={() => setQuery("")}><X className="h-3 w-3" /></button>
                  </Badge>
                )}
                {category !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {category}
                    <button onClick={() => setCategory("all")}><X className="h-3 w-3" /></button>
                  </Badge>
                )}
                {priceRange !== "any" && (
                  <Badge variant="secondary" className="gap-1">
                    {priceRange === "0-50" ? "$0 - $50/hr" : priceRange === "50-100" ? "$50 - $100/hr" : "$100+/hr"}
                    <button onClick={() => setPriceRange("any")}><X className="h-3 w-3" /></button>
                  </Badge>
                )}
                {locationType !== "any" && (
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {locationType === "local" ? "Local" : "Online"}
                    <button onClick={() => setLocationType("any")}><X className="h-3 w-3" /></button>
                  </Badge>
                )}
              </div>
            )}

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((provider, i) => (
                  <div key={provider.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                    <ProviderCard provider={provider} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground/40" />
                <h3 className="text-lg font-semibold text-foreground">No professionals found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Category Dialog */}
      <Dialog open={showCreateCat} onOpenChange={setShowCreateCat}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Create a Custom Category
            </DialogTitle>
          </DialogHeader>
          {catError && (
            <p className="text-sm text-destructive">{catError}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="new-category">Category Name</Label>
            <Input
              id="new-category"
              placeholder="e.g. Photography, Tutoring, Event Planning"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleCreateCategory(); }}
            />
            <p className="text-xs text-muted-foreground">
              Your custom category will be added to the filter list and saved for future visits.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateCat(false)}>Cancel</Button>
            <Button onClick={handleCreateCategory}>Create Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
