"use client";

import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { DetailedPrompt } from "../marketplace-data";
import { useAuth } from "../auth/AuthContext";

type Review = {
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  is_verified_purchase: boolean;
  created_at: string;
  reviewer?: {
    display_name?: string;
    username?: string;
    avatar_url?: string | null;
  };
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function ReviewsPanel({ prompt }: { prompt: DetailedPrompt }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const isDbPrompt = UUID_RE.test(prompt.id);

  useEffect(() => {
    if (!isDbPrompt) {
      setReviews([]);
      return;
    }

    const controller = new AbortController();
    fetch(`/api/prompts/${prompt.id}/reviews`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => setReviews(payload?.reviews ?? []))
      .catch(() => {});

    return () => controller.abort();
  }, [isDbPrompt, prompt.id]);

  const reviewSummary = useMemo(() => {
    if (reviews.length === 0) return "No verified reviews yet";
    const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return `${avg.toFixed(1)} average from ${reviews.length} review${reviews.length === 1 ? "" : "s"}`;
  }, [reviews]);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const res = await fetch(`/api/prompts/${prompt.id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, content }),
    });
    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
      setMessage(payload.error ?? "Review could not be submitted.");
      return;
    }

    setContent("");
    setMessage("Review saved.");
    const next = await fetch(`/api/prompts/${prompt.id}/reviews`).then((r) => r.json()).catch(() => null);
    setReviews(next?.reviews ?? reviews);
  }

  return (
    <section className="mt-6 rounded-2xl border border-[#202746] bg-[#0a1020] p-4">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-white">Creator Reviews</h2>
          <p className="mt-1 text-[12px] text-[#7f8aa5]">{reviewSummary}</p>
        </div>
        <span className="flex items-center gap-1 text-[12px] text-[#f7d45a]">
          <Star size={14} fill="currentColor" />
          {prompt._db?.avgRating ? Number(prompt._db.avgRating).toFixed(1) : reviews.length ? "" : "New"}
        </span>
      </header>

      <div className="space-y-4">
        {reviews.map((review) => (
          <article className="border-b border-[#202746] pb-4 last:border-b-0" key={review.id}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#28314f] text-[11px] text-white">
                  {(review.reviewer?.display_name ?? review.reviewer?.username ?? "U").slice(0, 1).toUpperCase()}
                </span>
                <strong className="truncate text-[12px] text-white">{review.reviewer?.display_name ?? review.reviewer?.username ?? "Buyer"}</strong>
                {review.is_verified_purchase ? <span className="rounded bg-[#153d2c] px-2 py-0.5 text-[9px] text-[#8df5c3]">Verified Purchase</span> : null}
              </div>
              <span className="shrink-0 text-[12px] text-white">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
            </div>
            {review.title ? <h3 className="ml-9 text-[12px] font-semibold text-white">{review.title}</h3> : null}
            {review.content ? <p className="ml-9 text-[12px] leading-relaxed text-[#c5ccdd]">{review.content}</p> : null}
          </article>
        ))}
      </div>

      {isDbPrompt && user ? (
        <form className="mt-5 grid gap-3 border-t border-[#202746] pt-4" onSubmit={submitReview}>
          <label className="text-[12px] font-semibold text-[#aeb5ca]">
            Rating
            <select className="ml-3 rounded-lg border border-[#202746] bg-[#11162a] px-2 py-1 text-white" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}
            </select>
          </label>
          <textarea
            className="min-h-20 rounded-xl border border-[#202746] bg-[#070b16] p-3 text-[13px] text-white outline-none placeholder:text-[#65708c]"
            placeholder="Share what worked after purchasing this prompt."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1500}
          />
          <button className="h-10 rounded-xl bg-[#7b3cff] text-[13px] font-bold text-white hover:bg-[#6a2ce6]">Submit verified review</button>
          {message ? <p className="text-[12px] text-[#aeb5ca]">{message}</p> : null}
        </form>
      ) : (
        <p className="mt-4 rounded-xl border border-[#202746] bg-[#070b16] p-3 text-[12px] text-[#7f8aa5]">
          {isDbPrompt ? "Sign in and purchase this prompt to leave a verified review." : "Reviews are available for database-backed prompts."}
        </p>
      )}
    </section>
  );
}
