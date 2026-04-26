"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MARQUEE_IMAGES = [
  "/A_golden_retriever_sits_contentedly_on_a_grassy_QlXAm7ix.webp",
  "/In_a_minimalist_style_a_delicate_pink_hzs32ACd.webp",
  "/A_sage_green_pet_collar_displays_the_name_HARRY_2CvCRWm.webp",
  "/A_yellow_star-shaped_charm_is_attached_to_a_pink_jWdEg3nN.webp",
  "/In_a_cute_and_playful_style_pastel-colored_dog_plHj2W1q.webp",
  "/A_soft_sage_green_silicone_toy_with_a_sun-shaped_TAoMQ7Zb.webp",
  "/A_yellow_star-shaped_object_is_attached_to_a_GDnMbdUH.webp",

  "/A_man_and_a_woman_sit_on_a_couch_with_a_small_wj6F8xDr.webp",
  "/A_man_sits_at_an_outdoor_cafe_with_a_French_BfuQAh4h.webp",
  "/A_woman_and_her_golden_retriever_sit_together_on_jKVk75j-.webp",
  "/A_woman_with_brown_hair_runs_along_a_sandy_beach_pMc16cB6.webp",
  "/In_a_gentle_golden-hour_light_a_woman_with_FmObGqWG.webp",
];

interface FloatingHeroProps {
  className?: string;
}

const FADE_UP = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: (delay = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
};

export function FloatingHero({ className }: FloatingHeroProps) {
  return (
    <section
      className={cn("relative w-full h-screen overflow-hidden flex items-center justify-center", className)}
      style={{ background: "#FAF7F2" }}
    >
      {/* Background swirl — top-left pink */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, transform: "translate(-30%,-30%)", pointerEvents: "none", opacity: 0.55 }}
        width="600" height="600" viewBox="0 0 600 600" fill="none" aria-hidden
      >
        <path d="M515 181C378 52 129 136 51 294C-27 451 126 600 126 600" stroke="#F4B5C0" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* Background swirl — bottom-right sage */}
      <svg
        style={{ position: "absolute", bottom: 0, right: 0, transform: "translate(24%,24%)", pointerEvents: "none", opacity: 0.45 }}
        width="700" height="700" viewBox="0 0 700 700" fill="none" aria-hidden
      >
        <path d="M27 528C194 690 480 637 594 452C709 267 544 2 544 2" stroke="#A8D5A2" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* Background swirl — top-right sky dashed */}
      <svg
        style={{ position: "absolute", top: 60, right: 60, pointerEvents: "none", opacity: 0.3 }}
        width="300" height="300" viewBox="0 0 300 300" fill="none" aria-hidden
      >
        <path d="M260 40C320 120 290 240 180 270C70 300 20 210 60 130C100 50 200 30 260 40Z" stroke="#B8D8F4" strokeWidth="1.5" fill="none" strokeDasharray="8 6" />
      </svg>

      {/* ── FLOATING IMAGES — left column ── */}

      {/* Sage charm — top left edge */}
      <div className="float-c" style={{ position: "absolute", left: "2%", top: "8%", width: 110, filter: "drop-shadow(0 10px 24px rgba(168,213,162,0.4))", zIndex: 40 }}>
        <img src="/charm-z.png" alt="Sage charm" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      {/* Flower charm — mid left edge */}
      <div className="float-a" style={{ position: "absolute", left: "1%", top: "36%", width: 92, filter: "drop-shadow(0 8px 20px rgba(212,184,244,0.45))", zIndex: 40, animationDelay: "1.2s" }}>
        <img src="/charm-flower.png" alt="Flower charm" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      {/* Star charm — lower left edge */}
      <div className="float-d" style={{ position: "absolute", left: "2%", top: "62%", width: 96, filter: "drop-shadow(0 10px 22px rgba(249,228,160,0.5))", zIndex: 40 }}>
        <img src="/charm-star.png" alt="Star charm" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      {/* ── FLOATING IMAGES — right column ── */}

      {/* Heart charm — top right edge */}
      <div className="float-e" style={{ position: "absolute", right: "2%", top: "10%", width: 96, filter: "drop-shadow(0 10px 22px rgba(244,181,192,0.45))", zIndex: 40 }}>
        <img src="/charm-heart.png" alt="Heart charm" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      {/* Star charm — mid right edge */}
      <div className="float-b" style={{ position: "absolute", right: "1%", top: "38%", width: 78, filter: "drop-shadow(0 8px 18px rgba(249,228,160,0.4))", zIndex: 40, animationDelay: "0.9s" }}>
        <img src="/charm-star.png" alt="Star charm" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      {/* Paw charm — lower right edge */}
      <div className="float-f" style={{ position: "absolute", right: "2%", top: "60%", width: 104, filter: "drop-shadow(0 10px 22px rgba(184,216,244,0.5))", zIndex: 40 }}>
        <img src="/charm-paw.png" alt="Paw charm" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      {/* ── HAND-DRAWN ANNOTATIONS ── */}
      <svg style={{ position: "absolute", top: "14%", left: "11%", pointerEvents: "none" }} width="130" height="70" viewBox="0 0 130 70" fill="none">
        <text x="4" y="22" fontFamily="'Caveat',cursive" fontSize="18" fill="#9B948F" transform="rotate(-5,4,22)">made for</text>
        <text x="4" y="44" fontFamily="'Caveat',cursive" fontSize="18" fill="#9B948F" transform="rotate(-5,4,44)">your pup ♥</text>
        <path d="M 80 50 C 90 60, 100 62, 108 70" stroke="#9B948F" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>

      <svg style={{ position: "absolute", top: "62%", right: "10%", pointerEvents: "none" }} width="120" height="56" viewBox="0 0 120 56" fill="none">
        <text x="4" y="22" fontFamily="'Caveat',cursive" fontSize="17" fill="#A8D5A2" transform="rotate(3,4,22)">swap in 5 sec!</text>
        <path d="M 10 30 C 6 42, 8 50, 16 54" stroke="#A8D5A2" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M 16 54 L 9 48 M 16 54 L 22 47" stroke="#A8D5A2" strokeWidth="1.4" strokeLinecap="round" />
      </svg>

      {/* ── CENTRE TEXT CARD ── */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: { opacity: 0, scale: 0.94, y: 16 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
        style={{
          position: "relative", zIndex: 30, textAlign: "center",
          maxWidth: 520, padding: "40px 36px",
          background: "rgba(250,247,242,0.85)",
          borderRadius: 24, backdropFilter: "blur(8px)",
        }}
      >
        {/* Badge */}
        <motion.div
          custom={0.1} variants={FADE_UP} initial="hidden" animate="show"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F9E4A0", borderRadius: 100, padding: "6px 18px", fontSize: 13, fontWeight: 500, color: "#7a5010", marginBottom: 28 }}
        >
          ✦ Made in Lithuania · Waterproof
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.2} variants={FADE_UP} initial="hidden" animate="show"
          style={{ fontFamily: "'Mouse Memoirs', sans-serif", fontSize: "clamp(52px, 6vw, 74px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.02, color: "#3D3530", marginBottom: 20 }}
        >
          Collars made<br />for <span style={{ color: "#A8D5A2" }}>them.</span>
        </motion.h1>

        {/* Wavy underline */}
        <svg style={{ display: "block", margin: "-8px auto 20px", width: 110 }} viewBox="0 0 110 14" fill="none">
          <path d="M2 9 C18 2,34 14,50 7 S82 2,108 9" stroke="#A8D5A2" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>

        {/* Subtext */}
        <motion.p
          custom={0.3} variants={FADE_UP} initial="hidden" animate="show"
          style={{ fontSize: 18, color: "#6B6460", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 36px" }}
        >
          Waterproof. Personalised. Swappable charms in five seconds flat.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.4} variants={FADE_UP} initial="hidden" animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 10,
            width: "100%"
          }}
        >
          <Link
            href="/configure"
            style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 32px", borderRadius: 100, background: "#A8D5A2", color: "#2a5a25", textDecoration: "none", display: "block", textAlign: "center", transition: "background 150ms" }}
            onMouseOver={e => (e.currentTarget.style.background = "#8fc489")}
            onMouseOut={e => (e.currentTarget.style.background = "#A8D5A2")}
          >
            Build your collar →
          </Link>
          <Link
            href="/products"
            style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", borderRadius: 100, border: "2px solid #A8D5A2", color: "#A8D5A2", textDecoration: "none", background: "transparent", display: "block", textAlign: "center", transition: "background 150ms" }}
            onMouseOver={e => (e.currentTarget.style.background = "#D4EDD1")}
            onMouseOut={e => (e.currentTarget.style.background = "transparent")}
          >
            See all collars
          </Link>
        </motion.div>

      </motion.div>
      {/* ── MARQUEE STRIP ── */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/3 md:h-2/5 flex items-end"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 30%, black 80%, transparent)", zIndex: 5 }}
      >
        <div className="ticker-track gap-4" style={{ width: "max-content", willChange: "transform" }}>
          {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((src, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] h-48 md:h-56 flex-shrink-0"
              style={{ transform: `rotate(${i % 2 === 0 ? -2 : 4}deg)` }}
            >
              <img src={src} alt="" className="w-full h-full object-cover rounded-2xl shadow-md" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
