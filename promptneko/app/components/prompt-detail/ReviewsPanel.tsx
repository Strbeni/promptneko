"use client";

export function ReviewsPanel() {
  const reviews = ["Incredible detail and atmosphere. Works perfectly with Seedream 5!", "The lighting, motion, and composition are top tier. Exactly what I needed.", "Super cinematic! Cannot believe the level of realism from this prompt."];

  return (
    <section className="mt-6 grid grid-cols-[minmax(0,1fr)_380px] gap-5">
      <div className="rounded-2xl border border-[#202746] bg-[#0a1020] p-4">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-white">8 Creator Reviews</h2>
          <button className="text-[12px] text-[#d944d8]">Write a review</button>
        </header>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <article className="border-b border-[#202746] pb-4 last:border-b-0" key={review}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#28314f] text-[11px] text-white">{index === 0 ? "J" : "G"}</span>
                  <strong className="text-[12px] text-white">{index === 0 ? "@justart" : index === 1 ? "@galactic.visuals" : "@neon.dreams"}</strong>
                  <span className="rounded bg-[#153d2c] px-2 py-0.5 text-[9px] text-[#8df5c3]">Verified Purchase</span>
                </div>
                <span className="text-[12px] text-white">★★★★★</span>
              </div>
              <p className="ml-9 text-[12px] text-[#c5ccdd]">{review}</p>
              <button className="ml-auto mt-3 block rounded border border-[#202746] px-3 py-1 text-[11px] text-[#c5ccdd]">Helpful</button>
            </article>
          ))}
        </div>
        <button className="mt-4 h-9 w-full rounded-lg border border-[#6732d5] text-[12px] text-[#a463ff]">View all 8 reviews</button>
      </div>

      <aside className="rounded-2xl border border-[#202746] bg-[#0a1020] p-4">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-white">Related Prompts</h2>
          <button className="text-[12px] text-[#a463ff]">View all</button>
        </header>
        {["Alien Dropship in Storm", "Emerald Energy Core", "Thunderstorm Space Jump", "Cinematic Sci-Fi Airlock"].map((item, index) => (
          <div className="mb-4 grid grid-cols-[64px_1fr_auto] items-center gap-3 last:mb-0" key={item}>
            <span className="h-14 rounded-lg bg-[url('/explore.png')] bg-[length:1536px_1024px]" style={{ backgroundPosition: `-${228 + index * 120}px -344px` }} />
            <div>
              <strong className="block text-[12px] text-white">{item}</strong>
              <span className="text-[10px] text-[#7f8aa5]">sci-fi · storm</span>
            </div>
            <strong className="text-[12px] text-white">$5.49</strong>
          </div>
        ))}
      </aside>
    </section>
  );
}
