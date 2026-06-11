import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { db, BlogPost } from "@/lib/db";
import { ArrowRight, BookOpen, Clock, Calendar, User } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
});

export function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(db.getBlogPosts());
  }, []);

  return (
    <main className="pt-32 md:pt-40 pb-20 px-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-16 md:mb-20">
        <span className="inline-flex h-9 items-center justify-center rounded-full bg-sage/10 text-sage border border-sage/15 px-4.5 py-1 text-[10px] font-bold uppercase tracking-wider mb-4">
          <BookOpen className="h-3 w-3 shrink-0 mr-1.5" /> The Avion Journal
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal">
          Wellness <span className="text-sage italic font-serif font-medium">Insights</span>
        </h1>
        <p className="mt-5 text-charcoal-muted text-[15px] max-w-xl mx-auto leading-relaxed">
          Expert tips, therapeutic advice, and recovery guidance from Calgary's premier mobile Registered Massage Therapists.
        </p>
      </div>

      {/* Grid of articles */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-charcoal-muted text-sm font-light">No articles published yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-12">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between bg-white border border-border/80 rounded-3xl overflow-hidden shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-500 group"
            >
              <div>
                {/* Featured Image */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-soft-blue-light/20 relative border-b border-border/50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent opacity-60 mix-blend-multiply" />
                </div>

                {/* Metadata */}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-charcoal-muted/70">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-sage" /> {post.date}
                    </span>
                    <span className="h-3 w-px bg-border" />
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-sage" /> {post.readTime}
                    </span>
                    <span className="h-3 w-px bg-border" />
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-sage" /> {post.author}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-charcoal group-hover:text-sage transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-[14.5px] leading-[1.75] text-charcoal-muted/90 font-light line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2">
                <Link
                  to="/blog/$postId"
                  params={{ postId: post.id }}
                  className="group/btn inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sage border border-sage hover:bg-sage hover:text-white rounded-full px-5 py-2.5 transition-all duration-300 shadow-sm"
                >
                  Read Full Article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
