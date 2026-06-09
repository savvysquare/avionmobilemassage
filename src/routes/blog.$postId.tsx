import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { db, BlogPost } from "@/lib/db";
import { ArrowLeft, Clock, Calendar, User, Sparkles, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/blog/$postId")({
  component: BlogPostDetail,
});

export function BlogPostDetail() {
  const { postId } = useParams({ from: "/blog/$postId" });
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const allPosts = db.getBlogPosts();
    const match = allPosts.find((p) => p.id === postId || p.slug === postId);
    if (match) {
      setPost(match);
    }
  }, [postId]);

  const renderContent = (content: string) => {
    if (!content) return null;
    return content.split("\n\n").map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={index} className="font-display font-bold text-2xl text-charcoal mt-8 mb-4 tracking-tight leading-tight">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      
      if (trimmed.startsWith("*  ") || trimmed.startsWith("* ")) {
        const lines = trimmed.split("\n").map(l => l.replace(/^\*\s*/, "").trim());
        return (
          <ul key={index} className="list-disc pl-6 my-4 space-y-2.5 text-[15px] leading-relaxed text-charcoal-muted font-light">
            {lines.map((line, i) => {
              const match = line.match(/^\*\*(.*?)\*\*(.*)$/);
              if (match) {
                return (
                  <li key={i} className="pl-1">
                    <strong className="text-charcoal font-semibold">{match[1]}</strong>
                    {match[2]}
                  </li>
                );
              }
              return <li key={i} className="pl-1">{line}</li>;
            })}
          </ul>
        );
      }

      return (
        <p key={index} className="text-[15.5px] leading-[1.9] text-charcoal-muted/95 font-light mb-6">
          {trimmed}
        </p>
      );
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center grain">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Link to="/blog" className="text-sage mt-4 inline-block underline">Return to blog index</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground grain flex flex-col justify-between">
      <div>
        <Nav />

        <main className="pt-32 md:pt-40 pb-20 px-6 max-w-4xl mx-auto w-full">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-charcoal/60 hover:text-sage transition-colors mb-10"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to Journal
          </Link>

          {/* Article Header */}
          <header className="space-y-6 mb-10">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1] tracking-tight">
              {post.title}
            </h1>

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted/75 border-b border-border/80 pb-6">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-sage" /> {post.date}
              </span>
              <span className="h-3 w-px bg-border" />
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-sage" /> {post.readTime}
              </span>
              <span className="h-3 w-px bg-border" />
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-sage" /> Written by {post.author}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[21/10] w-full overflow-hidden rounded-3xl shadow-premium border border-border/60 bg-soft-blue-light/10 mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800";
              }}
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-slate max-w-none text-left">
            {renderContent(post.content)}
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-sage-light/50 border border-sage/20 rounded-3xl p-8 text-center relative overflow-hidden shadow-soft">
            <div className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 bg-soft-blue/20 rounded-full blur-2xl" />
            <div className="relative z-10 space-y-5">
              <Sparkles className="h-6 w-6 text-sage mx-auto" />
              <h3 className="font-display font-bold text-xl md:text-2xl text-charcoal">
                Prioritize Your Recovery in Calgary
              </h3>
              <p className="text-xs text-charcoal-muted max-w-md mx-auto leading-relaxed">
                Avion's certified Registered Massage Therapists bring clinical expertise and professional equipment directly to your door. Evening and weekend sessions are available.
              </p>
              <div className="pt-2">
                <a
                  href="/#book"
                  className="inline-flex items-center gap-2 bg-sage hover:bg-sage-hover text-white px-7 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" /> Book Your Custom Session
                </a>
              </div>
            </div>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
