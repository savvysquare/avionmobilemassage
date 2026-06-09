import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Lock,
  BookOpen,
  DollarSign,
  Calendar,
  Users,
  Settings,
  LogOut,
  Edit2,
  Trash2,
  Plus,
  Save,
  CheckCircle,
  Undo
} from "lucide-react";
import { db, BlogPost, Therapist, PricingOption, Availability, GeneralContent } from "@/lib/db";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"blog" | "pricing" | "availability" | "therapists" | "general">("blog");
  const [toastMessage, setToastMessage] = useState("");

  // Blog states
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  // Pricing states
  const [pricingTiers, setPricingTiers] = useState<PricingOption[]>([]);

  // Availability state
  const [availability, setAvailability] = useState<Availability>({ weekdays: "", weekends: "" });

  // Therapists state
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [editingTherapist, setEditingTherapist] = useState<Therapist | null>(null);

  // General content state
  const [generalContent, setGeneralContent] = useState<GeneralContent>({ phone: "", email: "", whatsapp: "", instagram: "" });

  useEffect(() => {
    if (sessionStorage.getItem("avion_admin_auth") === "true") {
      setIsAuthorized(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setPosts(db.getBlogPosts());
    setPricingTiers(db.getPricing());
    setAvailability(db.getAvailability());
    setTherapists(db.getTherapists());
    setGeneralContent(db.getGeneralContact());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Avion$$$123") {
      setIsAuthorized(true);
      sessionStorage.setItem("avion_admin_auth", "true");
      setAuthError("");
      loadData();
    } else {
      setAuthError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem("avion_admin_auth");
    setPassword("");
  };

  // Blog CRUD
  const handleEditPost = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsNewPost(false);
  };

  const handleCreatePostClick = () => {
    setEditingPost({
      id: "post-" + Date.now(),
      title: "",
      slug: "",
      summary: "",
      content: "",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: "5 min read",
      author: "Avion Team"
    });
    setIsNewPost(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    // Auto slugify if blank
    let finalSlug = editingPost.slug.trim();
    if (!finalSlug) {
      finalSlug = editingPost.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const updatedPost = { ...editingPost, slug: finalSlug };
    db.saveBlogPost(updatedPost);
    setEditingPost(null);
    setPosts(db.getBlogPosts());
    showToast("Blog post saved successfully!");
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      db.deleteBlogPost(id);
      setPosts(db.getBlogPosts());
      showToast("Blog post deleted!");
    }
  };

  // Pricing Update
  const handlePricingChange = (idx: number, field: "priceSingle" | "priceMultiple" | "rec" | "description", val: string | number) => {
    const updated = [...pricingTiers];
    updated[idx] = { ...updated[idx], [field]: val };
    setPricingTiers(updated);
  };

  const handleSavePricing = () => {
    db.savePricing(pricingTiers);
    showToast("Pricing tiers saved!");
  };

  // Availability Update
  const handleSaveAvailability = () => {
    db.saveAvailability(availability);
    showToast("Availability hours saved!");
  };

  // Therapists Update
  const handleEditTherapist = (therapist: Therapist) => {
    setEditingTherapist({ ...therapist });
  };

  const handleSaveTherapist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTherapist) return;

    const updatedList = therapists.map((t) => (t.id === editingTherapist.id ? editingTherapist : t));
    setTherapists(updatedList);
    db.saveTherapists(updatedList);
    setEditingTherapist(null);
    showToast("Therapist profile saved!");
  };

  // General Contact Update
  const handleSaveGeneral = () => {
    db.saveGeneralContact(generalContent);
    showToast("General settings saved!");
  };

  // Reset all
  const handleResetData = () => {
    if (window.confirm("Reset all settings, blog posts, pricing, and availability back to defaults?")) {
      db.resetToDefaults();
      loadData();
      showToast("Restored system default data.");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-charcoal text-white flex items-center justify-center px-6 grain select-none relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-sage rounded-full blur-[140px] opacity-15" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-soft-blue rounded-full blur-[140px] opacity-10" />

        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-premium relative z-10">
          <div className="text-center mb-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage/20 text-sage mb-4 animate-pulse">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="font-display text-2xl font-bold text-soft-blue">Avion Admin Console</h1>
            <p className="text-xs text-white/50 uppercase tracking-[0.25em] mt-2">Administrative Hub</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/50 px-2">
                Enter Admin Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-white/5 border border-white/15 rounded-2xl px-6 py-4 text-center text-[15px] text-white placeholder-white/30 outline-none focus:border-sage transition-colors tracking-widest"
              />
            </label>

            {authError && (
              <p className="text-rose-400 text-xs text-center font-medium bg-rose-500/10 border border-rose-500/20 py-2.5 rounded-xl">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4.5 bg-sage hover:bg-sage-hover text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:shadow-premium cursor-pointer"
            >
              Authenticate
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/10 pt-5">
            <Link to="/" className="text-xs text-white/40 hover:text-white/60 underline tracking-wider">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 grain font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-charcoal text-white px-6 py-3.5 rounded-2xl shadow-premium border border-sage flex items-center gap-3 animate-fade-in">
          <CheckCircle className="h-5 w-5 text-sage" />
          <span className="text-xs font-bold uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-charcoal text-white py-4.5 px-6 md:px-12 flex justify-between items-center shadow-md relative z-20">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-lg tracking-wider text-soft-blue">Avion</span>
          <span className="h-4 w-px bg-white/20" />
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">Admin Console</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/bookings"
            className="text-[10px] text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4.5 py-2 uppercase font-bold tracking-widest transition-all"
          >
            Booking Logs
          </Link>
          <button
            onClick={handleResetData}
            title="Restore original static data sets"
            className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-white/45 hover:text-white/80 bg-white/5 hover:bg-white/10 rounded-full px-4 py-2 uppercase font-bold tracking-widest transition-all"
          >
            <Undo className="h-3 w-3" /> Reset Defaults
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-[10px] text-white bg-sage hover:bg-sage-hover rounded-full px-4 py-2 uppercase font-bold tracking-widest transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" /> Log Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto mt-10 px-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-border mb-8">
          {[
            { id: "blog", label: "Blog Posts", icon: BookOpen },
            { id: "pricing", label: "Pricing Tiers", icon: DollarSign },
            { id: "availability", label: "Availability", icon: Calendar },
            { id: "therapists", label: "Therapists", icon: Users },
            { id: "general", label: "General Content", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setEditingPost(null); setEditingTherapist(null); }}
                className={`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? "bg-charcoal text-white shadow-soft"
                    : "bg-white border border-border text-charcoal/60 hover:text-charcoal"
                }`}
              >
                <Icon className="h-4 w-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: BLOG POSTS CRUD */}
        {activeTab === "blog" && (
          <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-soft">
            {!editingPost ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-bold text-xl text-charcoal">Journal Articles</h3>
                    <p className="text-xs text-charcoal-muted mt-1">Manage and edit the prefilled informative blog posts displayed on the site.</p>
                  </div>
                  <button
                    onClick={handleCreatePostClick}
                    className="bg-sage hover:bg-sage-hover text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="h-4 w-4" /> Create Article
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                  {posts.map((post) => (
                    <div key={post.id} className="border border-border rounded-2xl p-5 hover:border-sage/30 transition-all flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] text-sage font-bold uppercase tracking-wider">{post.date}</span>
                        <h4 className="font-display font-bold text-base text-charcoal mt-1 line-clamp-1">{post.title}</h4>
                        <p className="text-xs text-charcoal-muted mt-2 line-clamp-2 leading-relaxed">{post.summary}</p>
                      </div>
                      <div className="flex justify-end gap-3 pt-3 border-t border-border/60">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 bg-sage-light hover:bg-sage/20 text-sage rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSavePost} className="space-y-6">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    {isNewPost ? "New Blog Post" : `Edit Post: ${editingPost.title}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="text-xs text-charcoal-muted hover:text-charcoal underline"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                    Article Title
                    <input
                      type="text"
                      required
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      placeholder="e.g. 5 Ways Massage Helps Calgary..."
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                    Url Slug (Optional - auto generated from title if empty)
                    <input
                      type="text"
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                      placeholder="e.g. mobile-massage-calgary"
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70 md:col-span-2">
                    Brief Summary / Card description
                    <textarea
                      required
                      rows={2}
                      value={editingPost.summary}
                      onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                      placeholder="A short summary of the article contents for indexing..."
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage leading-relaxed"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70 md:col-span-2">
                    Full Content (Supports Markdown / Rich Text formatting)
                    <textarea
                      required
                      rows={12}
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      placeholder="Write your article body here. Use standard Markdown tags..."
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage font-mono leading-relaxed"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                    Featured Image URL
                    <input
                      type="text"
                      required
                      value={editingPost.image}
                      onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                      Author
                      <input
                        type="text"
                        required
                        value={editingPost.author}
                        onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                        className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                      Date
                      <input
                        type="text"
                        required
                        value={editingPost.date}
                        onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                        className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                      Read Time
                      <input
                        type="text"
                        required
                        value={editingPost.readTime}
                        onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                        className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-5 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="px-6 py-3 border border-border rounded-full text-xs font-bold uppercase tracking-widest text-charcoal/60 hover:bg-background"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-sage hover:bg-sage-hover text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="h-4 w-4" /> Save Article
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: PRICING EDIT */}
        {activeTab === "pricing" && (
          <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
            <div>
              <h3 className="font-display font-bold text-xl text-charcoal">Session Pricing Config</h3>
              <p className="text-xs text-charcoal-muted mt-1">Modify single and group RMT prices across the booking calculator and services list.</p>
            </div>

            <div className="space-y-6 pt-4">
              {pricingTiers.map((tier, idx) => (
                <div key={tier.min} className="border border-border rounded-2xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <span className="text-sm font-bold text-charcoal block">{tier.min} Minute Session</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-sage">{tier.restricted ? "Restricted: Bulk only" : "All Bookings"}</span>
                  </div>

                  <label className="flex flex-col gap-1 text-[11px] font-bold text-charcoal/60">
                    Single Price (CAD)
                    <input
                      type="number"
                      required
                      value={tier.priceSingle}
                      onChange={(e) => handlePricingChange(idx, "priceSingle", Number(e.target.value))}
                      className="p-3 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-[11px] font-bold text-charcoal/60">
                    Group Rate Price (CAD)
                    <input
                      type="number"
                      required
                      value={tier.priceMultiple}
                      onChange={(e) => handlePricingChange(idx, "priceMultiple", Number(e.target.value))}
                      className="p-3 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-[11px] font-bold text-charcoal/60">
                    Note (e.g. Recommended, Sweet Spot)
                    <input
                      type="text"
                      required
                      value={tier.rec}
                      onChange={(e) => handlePricingChange(idx, "rec", e.target.value)}
                      className="p-3 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-6 border-t border-border">
                <button
                  onClick={handleSavePricing}
                  className="px-8 py-3.5 bg-sage hover:bg-sage-hover text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="h-4 w-4" /> Save Rates
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AVAILABILITY EDIT */}
        {activeTab === "availability" && (
          <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
            <div>
              <h3 className="font-display font-bold text-xl text-charcoal">Operating Hours</h3>
              <p className="text-xs text-charcoal-muted mt-1">Configure slot filters for booking calendar validation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                Monday – Thursday Hours
                <input
                  type="text"
                  required
                  value={availability.weekdays}
                  onChange={(e) => setAvailability({ ...availability, weekdays: e.target.value })}
                  placeholder="e.g. 4:00 PM – 8:00 PM only"
                  className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                Friday, Saturday, Sunday Hours
                <input
                  type="text"
                  required
                  value={availability.weekends}
                  onChange={(e) => setAvailability({ ...availability, weekends: e.target.value })}
                  placeholder="e.g. All day"
                  className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                />
              </label>
            </div>

            <div className="flex justify-end pt-6 border-t border-border mt-6">
              <button
                onClick={handleSaveAvailability}
                className="px-8 py-3.5 bg-sage hover:bg-sage-hover text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm"
              >
                <Save className="h-4 w-4" /> Save Availability
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: THERAPISTS EDIT */}
        {activeTab === "therapists" && (
          <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-soft">
            {!editingTherapist ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-xl text-charcoal">Therapists Profiles</h3>
                  <p className="text-xs text-charcoal-muted mt-1">Edit registered massage therapists bios and specializations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {therapists.map((t) => (
                    <div key={t.id} className="border border-border rounded-2xl p-5 hover:border-sage/30 transition-all flex justify-between gap-4">
                      <div className="flex gap-4">
                        <img src={t.photo} alt={t.name} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-border bg-soft-blue-light/20" />
                        <div>
                          <h4 className="font-display font-bold text-base text-charcoal">{t.name}</h4>
                          <span className="text-[10px] text-sage font-bold uppercase tracking-wider">{t.title}</span>
                          <p className="text-xs text-charcoal-muted mt-2 line-clamp-2 leading-relaxed">{t.bio}</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-start">
                        <button
                          onClick={() => handleEditTherapist(t)}
                          className="p-2 bg-sage-light hover:bg-sage/20 text-sage rounded-lg transition-colors shrink-0"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveTherapist} className="space-y-6">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    Edit Therapist: {editingTherapist.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingTherapist(null)}
                    className="text-xs text-charcoal-muted hover:text-charcoal underline"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                    Full Name
                    <input
                      type="text"
                      required
                      value={editingTherapist.name}
                      onChange={(e) => setEditingTherapist({ ...editingTherapist, name: e.target.value })}
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                    Professional Title
                    <input
                      type="text"
                      required
                      value={editingTherapist.title}
                      onChange={(e) => setEditingTherapist({ ...editingTherapist, title: e.target.value })}
                      placeholder="e.g. Registered Massage Therapist"
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70 md:col-span-2">
                    Biography Details
                    <textarea
                      required
                      rows={5}
                      value={editingTherapist.bio}
                      onChange={(e) => setEditingTherapist({ ...editingTherapist, bio: e.target.value })}
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage leading-relaxed"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70 md:col-span-2">
                    Areas of Focus (Comma separated)
                    <input
                      type="text"
                      required
                      value={editingTherapist.focus.join(", ")}
                      onChange={(e) => setEditingTherapist({ ...editingTherapist, focus: e.target.value.split(",").map(f => f.trim()) })}
                      placeholder="Neck & shoulder tension relief, Facial & head stress relaxation..."
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                    Treatment Style Note
                    <input
                      type="text"
                      required
                      value={editingTherapist.style}
                      onChange={(e) => setEditingTherapist({ ...editingTherapist, style: e.target.value })}
                      placeholder="e.g. Gentle, consistent, and comfort-focused..."
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                    Photo URL or path
                    <input
                      type="text"
                      required
                      value={editingTherapist.photo}
                      onChange={(e) => setEditingTherapist({ ...editingTherapist, photo: e.target.value })}
                      className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                    />
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-5 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setEditingTherapist(null)}
                    className="px-6 py-3 border border-border rounded-full text-xs font-bold uppercase tracking-widest text-charcoal/60 hover:bg-background"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-sage hover:bg-sage-hover text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="h-4 w-4" /> Save Profile
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 5: GENERAL SETTINGS */}
        {activeTab === "general" && (
          <div className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
            <div>
              <h3 className="font-display font-bold text-xl text-charcoal">General Settings</h3>
              <p className="text-xs text-charcoal-muted mt-1">Manage numbers, emails, and social media handles globally linked in headers and footers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                Official Phone Number
                <input
                  type="text"
                  required
                  value={generalContent.phone}
                  onChange={(e) => setGeneralContent({ ...generalContent, phone: e.target.value })}
                  className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                Official Email
                <input
                  type="email"
                  required
                  value={generalContent.email}
                  onChange={(e) => setGeneralContent({ ...generalContent, email: e.target.value })}
                  className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                WhatsApp Phone Link
                <input
                  type="text"
                  required
                  value={generalContent.whatsapp}
                  onChange={(e) => setGeneralContent({ ...generalContent, whatsapp: e.target.value })}
                  className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                Instagram URL
                <input
                  type="text"
                  required
                  value={generalContent.instagram}
                  onChange={(e) => setGeneralContent({ ...generalContent, instagram: e.target.value })}
                  className="p-3.5 border border-border rounded-xl bg-background text-sm text-charcoal font-medium outline-none focus:border-sage"
                />
              </label>
            </div>

            <div className="flex justify-end pt-6 border-t border-border mt-6">
              <button
                onClick={handleSaveGeneral}
                className="px-8 py-3.5 bg-sage hover:bg-sage-hover text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm"
              >
                <Save className="h-4 w-4" /> Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
