import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { submitLead } from "@/lib/actions";
import { trackEvent } from "@/lib/meta-pixel";
import logo from "@/assets/visarth-veda-logo.png";
import heroImg from "@/assets/hero-transformation.jpg";
import detoxDemoImg from "@/assets/detox-patch-demo.jpg";
import productBoxImg from "@/assets/product-box.jpg";
import gymImg from "@/assets/gym-frustration.jpg";
import dietImg from "@/assets/dieting-frustration.jpg";
import nightImg from "@/assets/night-routine.jpg";
import doctorAvatar from "@/assets/doctor-avatar.png";

import beforeAfterImg from "@/assets/before-after.gif";
import productImg from "@/assets/product-shot.jpg";
import review1Img from "@/assets/review-1.png";
import review2Img from "@/assets/review-2.png";
import review3Img from "@/assets/review-3.png";
import review4Img from "@/assets/review-4.png";
import review5Img from "@/assets/review-5.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Visarth Veda Detox Foot Pads – Lighter Mornings, ₹1499/45 Days" },
      {
        name: "description",
        content:
          "Gym jaake bhi weight loss nahi ho raha? Visarth Veda Detox Foot Pads — overnight wellness routine for lighter, fresher mornings. 45 Days Supply ₹1499.",
      },
      { property: "og:title", content: "Visarth Veda Detox Foot Pads – ₹1499" },
      {
        property: "og:description",
        content:
          "Overnight foot pad routine that supports your fat-loss journey with lighter, fresher mornings.",
      },
      { property: "og:image", content: heroImg },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
});

const OPEN_ORDER_EVENT = "visarthveda:open-order";

function openOrder(e?: React.MouseEvent) {
  if (e) e.preventDefault();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_ORDER_EVENT));
  }
}

function CTAButton({ children, className = "", variant = "primary" }: { children: React.ReactNode; className?: string; variant?: "primary" | "gold" }) {
  const base = variant === "gold"
    ? "bg-gold text-ink"
    : "bg-gradient-herb text-primary-foreground";
  return (
    <button
      type="button"
      onClick={openOrder}
      className={`inline-flex items-center justify-center rounded-full ${base} px-8 py-4 text-base font-bold shadow-soft animate-cta-shake hover:scale-[1.03] active:scale-[0.97] transition-transform ${className}`}
    >
      {children}
      <span className="ml-2">→</span>
    </button>
  );
}

function Logo({ className = "h-10" }: { className?: string }) {
  return <img src={logo} alt="Visarth Veda" className={`${className} w-auto`} />;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-herb/20 bg-cream px-3 py-1.5 text-xs font-semibold text-herb">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-herb" />
      {children}
    </span>
  );
}

function FatLossTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/25 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
      🔥 Fat-Loss Support Routine
    </span>
  );
}

function SectionTitle({ kicker, children }: { kicker?: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">{kicker}</p>
      )}
      <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
        {children}
      </h2>
    </div>
  );
}

function useCountdown(minutes: number) {
  const [secs, setSecs] = useState(minutes * 60);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : minutes * 60)), 1000);
    return () => clearInterval(id);
  }, [minutes]);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function ExpertCard() {
  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-3xl bg-card p-6 shadow-card ring-1 ring-herb-deep/10 sm:p-8">
      <p className="text-center text-sm font-bold uppercase tracking-wider text-herb sm:text-left">
        👨‍⚕️ Meet Your Fat Loss Wellness Advisor
      </p>
      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="relative flex-none">
          <img
            src={doctorAvatar}
            alt="Dr. Rakesh K."
            width={96}
            height={96}
            loading="lazy"
            className="h-24 w-24 rounded-full object-cover ring-4 ring-herb/20 shadow-soft"
          />
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-herb text-xs text-primary-foreground shadow-sm">
            ✓
          </span>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Dr. Rakesh K. <span className="text-herb">(BAMS)</span>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Senior Wellness Advisor • Holistic Foot Care Specialist
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          {
            i: "🩺",
            t: "15+ Years Helping People With Fat Loss Wellness Support",
            d: "Helping people improve comfort, relaxation & daily foot care naturally.",
          },
          {
            i: "🌿",
            t: "Natural Detox Foot Patch Guidance",
            d: "Supports overnight relaxation, tired feet relief & wellness recovery.",
          },
          {
            i: "🗣️",
            t: "தமிழ், English, हिंदी Support Available",
            d: "Easy consultation in your preferred language.",
          },
          {
            i: "🛡️",
            t: "Safe & Easy To Use At Home",
            d: "No painful procedures • No complicated routines.",
          },
        ].map((b) => (
          <div key={b.t} className="flex items-start gap-3 rounded-2xl border border-border bg-beige/40 p-4 text-center sm:text-left">
            <span className="hidden text-2xl leading-none sm:inline">{b.i}</span>
            <div className="w-full">
              <p className="text-sm font-bold text-foreground"><span className="sm:hidden">{b.i} </span>{b.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", address: "", pincode: "" });
  const [errors, setErrors] = useState<{ name?: string; contact?: string; address?: string; pincode?: string }>({});
  const [duplicateMsg, setDuplicateMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timer = useCountdown(30);

  useEffect(() => {
    const handler = () => {
      setOrderOpen(true);
      try {
        trackEvent("InitiateCheckout", {
          content_name: "visarth_veda_detox_foot_pads",
          content_category: "detox_patch",
        });
      } catch (err) {
        console.error("Failed to track pixel InitiateCheckout event:", err);
      }
    };
    window.addEventListener(OPEN_ORDER_EVENT, handler);
    return () => window.removeEventListener(OPEN_ORDER_EVENT, handler);
  }, []);

  useEffect(() => {
    if (orderOpen || submitted) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [orderOpen, submitted]);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.contact.trim())) e.contact = "Enter a valid 10-digit mobile number";
    if (!form.address.trim() || form.address.trim().length < 8) e.address = "Please enter your full address (min 8 characters)";
    if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (isSubmitting) return;

    // Client-side 24hr check via localStorage
    const STORAGE_KEY = "visarthveda_lead_submitted";
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { phone: storedPhone, timestamp } = JSON.parse(stored);
        const elapsed = Date.now() - timestamp;
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
        if (storedPhone === form.contact.trim() && elapsed < TWENTY_FOUR_HOURS) {
          setDuplicateMsg(`Aapne already form submit kiya hai. Please 24hr wait karein, our representative will connect with you.`);
          setOrderOpen(false);
          return;
        }
      } catch { /* corrupted storage, ignore */ }
    }

    setIsSubmitting(true);
    try {
      const result = await submitLead({
        data: {
          name: form.name,
          phone: form.contact,
          address: form.address,
          pincode: form.pincode,
          productName: "Visarth Veda Detox Foot Pads",
          price: "1499",
          submittedAt: new Date().toISOString(),
        },
      });

      // Check if server says duplicate
      if (result.duplicate) {
        setDuplicateMsg(result.message);
        setOrderOpen(false);
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("Lead submission error:", error);
    }

    // Save to localStorage on success
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      phone: form.contact.trim(),
      timestamp: Date.now(),
    }));

    // Fire Meta Pixel Lead and Purchase events on successful order placement
    try {
      trackEvent("Lead", {
        content_name: "visarth_veda_detox_foot_pads",
        content_category: "detox_patch",
      });
    } catch (err) {
      console.error("Failed to track pixel Lead event:", err);
    }

    try {
      trackEvent("Purchase", {
        content_name: "visarth_veda_detox_foot_pads",
        content_category: "detox_patch",
        value: 1499.00,
        currency: "INR",
      });
    } catch (err) {
      console.error("Failed to track pixel Purchase event:", err);
    }

    setOrderOpen(false);
    setSubmitted(true);
    setForm({ name: "", contact: "", address: "", pincode: "" });
    setIsSubmitting(false);
  };

  const problems = [
    {
      h: "Gym Mehnat Kar Rahe Ho… Par Body Still Heavy?",
      c: "Workout ke baad bhi morning mein body puffy aur tired feel hoti hai?",
    },
    {
      h: "Dieting Karke Mood Kharab Ho Gaya?",
      c: "Kam khana, cravings control karna, phir bhi mirror mein difference slow?",
    },
    {
      h: "Subah Uthte Hi Body Bhaari Lagti Hai?",
      c: "Heavy start ka matlab movement aur workout dono difficult lagte hain.",
    },
    {
      h: "Pet Bloated Dikhta Hai?",
      c: "Bloating aur fluid retention feeling se midsection aur zyada heavy appear kar sakta hai.",
    },
  ];

  const benefits = [
    { i: "🌿", t: "Natural Internal Cleansing Support" },
    { i: "💧", t: "Helps Reduce Heavy / Bloated Feeling" },
    { i: "🌙", t: "Works While You Sleep" },
    { i: "🏃", t: "Wake Up Ready For Movement" },
    { i: "✨", t: "Lighter & Fresher Morning Feeling" },
    { i: "🙌", t: "Easy Routine For Busy People" },
  ];

  const supportCards = [
    {
      h: "Less Bloated Feeling",
      c: "Bloating kam feel ho toh body visually lighter aur midsection flatter appear kar sakta hai.",
    },
    {
      h: "Lighter Morning Start",
      c: "Fresh morning = walking, workout aur daily movement start karna easier.",
    },
    {
      h: "Internal Cleansing Support",
      c: "Overnight routine body ke natural cleansing process ko support karta hai.",
    },
    {
      h: "Movement Motivation",
      c: "Jab body heavy feel nahi hoti, toh daily activity naturally better feel hoti hai.",
    },
  ];

  const testimonials = [
    {
      n: "Priya S.",
      city: "Delhi",
      usage: "Used for 12 nights",
      rating: 5,
      proof: review1Img,
      q: "Honestly, mera goal tha body fat thoda reduce karna. Raat ko lagana very easy hai. 12 raat ke baad belly thodi less heavy lagti hai, morning mein feet relaxed aur overall body lighter feel hui. No pills, no extra effort — fat-loss routine ke saath perfect support.",
    },
    {
      n: "Meena R.",
      city: "Lucknow",
      usage: "Used for 2 weeks",
      rating: 5,
      proof: review4Img,
      q: "Mere feet aur waist shaam tak heavy feel hote the. Isko night routine mein add kiya, walking continue rakhi, aur 2 hafte mein body thodi toned aur lighter lagne lagi. Bloating bhi kam, morning freshness clearly better.",
    },
    {
      n: "Rahul K.",
      city: "Pune",
      usage: "Used for 10 days",
      rating: 4.8,
      proof: review2Img,
      q: "Gym aur office ke baad body bahut tired rehti thi, fat loss plateau pe atak gaya tha. Ye pads use karne ke baad morning fresh, energy better, aur fat-loss journey ko ek push mila. Good for night self-care.",
    },
    {
      n: "Anita M.",
      city: "Jaipur",
      usage: "Used for 15 nights",
      rating: 5,
      proof: review5Img,
      q: "Tired mornings se irritate hoti thi aur weight bhi stuck tha. Routine simple hai — sone se pehle stick karo. 15 raat mein belly area lighter, feet relaxed, aur clothes thodi loose feel hone lagi.",
    },
    {
      n: "Suresh P.",
      city: "Mumbai",
      usage: "Used for 1 month",
      rating: 4.9,
      proof: review3Img,
      q: "1 month complete kiya. No taste, no pills, no complicated process. Daily walk + ye night routine combine kiya toh body fat journey mein clear difference feel hua. Lighter morning feeling sabse achi cheez.",
    },
    {
      n: "Neha A.",
      city: "Chandigarh",
      usage: "Used for 9 nights",
      rating: 5,
      q: "Packaging premium hai aur use karna bhi easy. Mere liye ye bedtime relaxation + fat-loss support routine jaisa ban gaya. 9 raat mein bloating kam, morning mein body actively lighter feel hoti hai.",
    },
  ];

  const faqs = [
    {
      q: "Kya ye fat ko instantly melt karta hai?",
      a: "No. Ye direct fat-melting product nahi hai. Ye fat-loss journey ko support karta hai by helping with lighter morning feeling, bloating support, natural cleansing support, and better readiness for movement.",
    },
    {
      q: "Kya gym aur diet ke bina weight loss hoga?",
      a: "Best results ke liye hydration, movement, balanced food, and proper sleep important hain. Ye product aapke routine ko support karta hai.",
    },
    { q: "Kab use karna hai?", a: "Raat ko sone se pehle apply karein aur subah remove karein." },
    {
      q: "Kitne din use karna chahiye?",
      a: "Consistent 45 days routine recommended hai.",
    },
    {
      q: "Kya ye pills ya drink hai?",
      a: "Nahi. Ye simple foot pad routine hai — no pills, no drink, no taste, no complicated process.",
    },
    {
      q: "Main kya feel kar sakta/sakti hoon?",
      a: "Many users describe feeling lighter, fresher, less heavy and more active in the morning. Results vary person to person.",
    },
  ];

  const trustBadges = ["No Pills", "Night Routine", "Lighter Morning Support", "45 Days Supply", "₹1499 Only"];

  const ReviewsBlock = (
    <section id="reviews" className="bg-beige py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle kicker="Real Reviews">
          Real Users. Real Night Routine. <span className="text-herb">Real Fat-Loss Support.</span>
        </SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
          Customers who added Visarth Veda Foot Detox Pads to their bedtime routine shared how their body felt lighter, fat-loss journey got a push, and mornings became fresher and more relaxed.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => {
            const initials = t.n.split(" ").map((w) => w[0]).join("");
            const tilt = i % 3 === 1 ? "lg:translate-y-3" : i % 3 === 2 ? "lg:-translate-y-2" : "";
            return (
              <article
                key={t.n}
                className={`flex flex-col rounded-3xl bg-card p-6 shadow-card ring-1 ring-border/60 ${tilt}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-herb text-base font-bold text-primary-foreground shadow-soft">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[15px] font-bold text-foreground">{t.n}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-herb/10 px-2 py-0.5 text-[10px] font-semibold text-herb">
                        <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                          <path d="M10 0l2.4 2.6 3.5-.4.7 3.4 3 1.8-1.6 3.1 1.6 3.1-3 1.8-.7 3.4-3.5-.4L10 20l-2.4-2.6-3.5.4-.7-3.4-3-1.8L2 10 .4 6.9l3-1.8.7-3.4 3.5.4L10 0zm-.9 13.4l5.3-5.3-1.4-1.4-3.9 3.9-1.7-1.7-1.4 1.4 3.1 3.1z" />
                        </svg>
                        Verified Buyer
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">📍 {t.city}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="text-gold text-sm tracking-tight">★★★★★</div>
                  <span className="text-xs font-semibold text-foreground">{t.rating.toFixed(1)}</span>
                </div>

                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-foreground/90">
                  "{t.q}"
                </p>

                {t.proof && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-border">
                    <img
                      src={t.proof}
                      alt={`${t.n} ka Visarth Veda night routine proof`}
                      loading="lazy"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-xs">
                  <span className="rounded-full bg-beige px-3 py-1 font-semibold text-herb">
                    🌙 {t.usage}
                  </span>
                  <span className="text-muted-foreground">Visarth Veda Pads</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {["45 Days Routine", "No Pills", "Easy Night Use", "Wellness Support", "₹1499 Only"].map((t) => (
            <span key={t} className="rounded-full border border-herb/30 bg-card px-4 py-2 text-xs font-semibold text-herb shadow-card sm:text-sm">
              ✓ {t}
            </span>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CTAButton>Start Your 45 Days Routine – ₹1499</CTAButton>
          <p className="mt-3 text-xs text-muted-foreground">COD available • 45 Days Supply • Easy Night Routine</p>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo className="h-16 sm:h-24" />
          <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 lg:flex">
            <a href="#problem" className="hover:text-herb">Problem</a>
            <a href="#how" className="hover:text-herb">How It Works</a>
            <a href="#feeling" className="hover:text-herb">Results Feeling</a>
            <a href="#reviews" className="hover:text-herb">Reviews</a>
            <a href="#faq" className="hover:text-herb">FAQ</a>
          </nav>
          <button
            type="button"
            onClick={openOrder}
            className="inline-flex rounded-full bg-gradient-herb px-4 py-2 text-xs font-bold text-primary-foreground shadow-soft animate-cta-shake sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Order Now
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-cream">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-herb-deep/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-6 sm:px-6 md:grid-cols-2 md:py-8">
          <div className="text-center md:text-left">
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <Badge>Premium Herbal Wellness · Made in India</Badge>
              <FatLossTag />
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              Gym Jaake Bhi <span className="text-herb">Weight Loss</span> Nahi Ho Raha?
            </h1>
            <p className="mt-3 text-sm font-bold uppercase tracking-wider text-gold">
              Overnight Fat-Loss Wellness Routine · Lighter Mornings, Slimmer Feeling
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Dieting karke thak gaye? Heavy body, bloating aur tired mornings aapki fat-loss
              journey ko slow feel kara sakte hain. <b className="text-foreground">Visarth Veda Detox Foot Pads</b> ek
              simple overnight wellness routine hai jo aapko morning mein <i>lighter, fresher</i> aur
              more active feel karne mein support karta hai.
            </p>

            <div className="mt-5 overflow-hidden rounded-3xl shadow-soft ring-1 ring-herb-deep/10 md:hidden">
              <img src={heroImg} alt="Before and after transformation feeling with Visarth Veda" width={1536} height={1024} className="h-full w-full object-cover" />
            </div>

            <ul className="mx-auto mt-6 grid max-w-md gap-2.5 text-sm font-medium text-foreground sm:text-base md:mx-0 md:max-w-none">
              {["No pills, no drinks", "Works while you sleep", "Supports lighter morning feeling", "Helps reduce bloated/heavy feeling", "45 days supply only ₹1499"].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-left">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-herb text-[11px] font-bold text-primary-foreground">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
              <CTAButton>Start 45 Days Routine – ₹1499</CTAButton>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-gold">★★★★★</span> 4.8 · Loved by 10,000+ users
              </div>
            </div>
            <p className="mx-auto mt-4 max-w-lg text-xs italic text-muted-foreground md:mx-0">
              Fat-loss journey ko support karein with better routine, movement, hydration & overnight wellness support.
            </p>
          </div>

          <div className="relative">
            <div className="mt-4 overflow-hidden rounded-3xl shadow-soft ring-1 ring-herb-deep/10">
              <img src={detoxDemoImg} alt="Detox patch demonstration showing used patch after overnight wear" width={1280} height={720} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 left-4 right-4 mx-auto flex max-w-md items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-card sm:left-auto sm:-right-4 sm:max-w-xs">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">45 Days Supply</p>
                <p className="text-2xl font-extrabold text-herb">₹1499</p>
              </div>
              <button type="button" onClick={openOrder} className="rounded-full bg-herb px-4 py-2 text-xs font-bold text-primary-foreground animate-cta-shake">Buy Now</button>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-6 sm:px-6">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl shadow-soft ring-1 ring-herb-deep/10">
            <img src={productBoxImg} alt="Visarth Veda Foot Detox Patch product box with 45 pads" width={1280} height={1280} className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>



        {/* Expert credibility card */}
        <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6">
          <ExpertCard />
        </div>

        {/* trust strip */}
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {trustBadges.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN AMPLIFIER — why fat-loss feels slow */}
      <section className="bg-herb relative overflow-hidden py-8 text-primary-foreground sm:py-12">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <div className="text-center md:text-left">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">Why fat-loss feels slow</p>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Yahi Reason Hai Ki Aapka <span className="text-gold">Fat-Loss Journey</span> Slow Feel Hota Hai
            </h2>
            <ul className="mx-auto mt-7 max-w-xl space-y-4 md:mx-0">
              {[
                "Aap gym jaate ho, par subah energy low hoti hai.",
                "Aap diet karte ho, par bloating confidence tod deti hai.",
                "Aap weight loss chahte ho, par body heavy aur stuck feel hoti hai.",
                "Aap movement start karna chahte ho, par tired mornings rok deti hain.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-left text-base sm:text-lg">
                  <span className="mt-2 h-1.5 w-6 flex-none rounded-full bg-gold" />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <button type="button" onClick={openOrder} className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-base font-bold text-ink shadow-soft animate-cta-shake hover:scale-[1.03] transition-transform">
                Try Overnight Detox Routine →
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-white/10">
            <img src={gymImg} alt="Gym frustration — tired after workout" loading="lazy" width={1280} height={896} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="bg-background py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle kicker="The Real Problem · Fat-Loss Stuck?">
            Problem Fat Nahi… <span className="text-herb">Heavy Body Feeling</span> Bhi Ho Sakti Hai
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-2xl text-center text-muted-foreground">
            Kabhi kabhi body sirf fat ki wajah se heavy nahi lagti — bloating, water retention
            feeling, low energy aur sluggish mornings bhi aapko stuck feel kara sakte hain.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p, i) => (
              <div key={p.h} className="group rounded-3xl border border-border bg-card p-6 text-center shadow-card transition-transform hover:-translate-y-1 sm:text-left">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-herb text-sm font-bold text-primary-foreground sm:mx-0">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-lg font-bold leading-snug text-foreground">{p.h}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* PRODUCT SOLUTION */}
      <section id="how" className="bg-background py-6 sm:py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="overflow-hidden rounded-3xl bg-beige shadow-card">
              <img src={productImg} alt="Visarth Veda Detox Foot Pads product" loading="lazy" width={1280} height={1280} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="order-1 text-center md:order-2 md:text-left">
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <Badge>The Solution</Badge>
              <FatLossTag />
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Meet <span className="text-herb">Visarth Veda Detox Foot Pads</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Raat ko sone se pehle foot pads apply karo. Ye simple overnight wellness routine
              aapke body's natural balance, internal cleansing support aur refreshed morning feeling
              ko support karta hai — <b className="text-foreground">bina pills, bina drinks, bina complicated routine.</b>
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.t} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left">
                  <span className="text-2xl leading-none">{b.i}</span>
                  <span className="text-sm font-semibold text-foreground">{b.t}</span>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <CTAButton>Get Yours – ₹1499</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS — moved here, right below Meet Detox Foot Pads */}
      {ReviewsBlock}

      {/* BEFORE / AFTER FEELING */}
      <section id="feeling" className="bg-background py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle kicker="From → To · Fat-Loss Feeling">
            From <span className="text-muted-foreground">Heavy Body Feeling</span> To <span className="text-herb">Lighter Starts</span>
          </SectionTitle>
          <div className="mt-10 overflow-hidden rounded-3xl shadow-soft ring-1 ring-border">
            <img src={beforeAfterImg} alt="Before and after lighter morning feeling" loading="lazy" width={1920} height={1080} className="h-full w-full object-cover" />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-7 text-center sm:text-left">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Before</p>
              <h3 className="font-display text-2xl font-bold text-foreground">Heavy & stuck</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {["Gym ke baad bhi tired", "Diet ke baad bhi bloated", "Subah body heavy", "Low motivation", "Pet puffy appearance"].map((t) => (
                  <li key={t} className="flex justify-center gap-2 sm:justify-start"><span className="text-destructive">✕</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-gradient-herb p-7 text-center text-primary-foreground shadow-soft sm:text-left">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gold">After</p>
              <h3 className="font-display text-2xl font-bold">Lighter & active</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {["Fresh morning feeling", "Less bloated appearance", "Lighter body feel", "More active start", "Ready for movement"].map((t) => (
                  <li key={t} className="flex justify-center gap-2 sm:justify-start"><span className="text-gold">✓</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center"><CTAButton>Start My 45 Days Routine</CTAButton></div>
        </div>
      </section>

      {/* FAT-LOSS SUPPORT EXPLAINER */}
      <section className="bg-beige py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle kicker="Honest Promise · Fat-Loss Support">
            Ye Direct Fat Burner Nahi — But <span className="text-herb">Fat-Loss Journey</span> Ko Strong Support Deta Hai
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-3xl text-center text-muted-foreground">
            Visarth Veda Detox Foot Pads fat ko overnight melt karne ka claim nahi karta. Ye aapke
            wellness routine ko support karta hai by helping you feel lighter, less sluggish, and
            more ready to move — which can support your overall fat-loss lifestyle.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {supportCards.map((c) => (
              <div key={c.h} className="rounded-3xl bg-card p-6 text-center shadow-card sm:text-left">
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gradient-herb sm:mx-0" />
                <h3 className="text-lg font-bold text-foreground">{c.h}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* HOW TO USE */}
      <section className="bg-cream py-6 sm:py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-soft ring-1 ring-herb-deep/10">
            <img src={nightImg} alt="Night routine — applying detox foot pads" loading="lazy" width={1280} height={896} className="h-full w-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <Badge>4-Step Night Ritual</Badge>
              <FatLossTag />
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Bas Raat Ko Lagao, <span className="text-herb">Subah Fresh</span> Feel Karo
            </h2>
            <ol className="mt-7 space-y-4">
              {["Feet clean & dry karo", "One pad each foot par stick karo", "Raat bhar sleep karo", "Morning mein remove karo", "Hydration + movement ke saath routine continue karo"].map((s, i) => (
                <li key={s} className="flex gap-4 rounded-2xl bg-card p-4 text-left shadow-card">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-herb text-sm font-bold text-primary-foreground">{i + 1}</span>
                  <span className="self-center font-medium text-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* STRONG TRIGGER */}
      <section className="bg-background py-6 sm:py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-5">
          <div className="text-center md:col-span-3 md:text-left">
            <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Diet Aur Gym Tabhi Easy Lagte Hain Jab <span className="text-herb">Body Light Feel Kare</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Agar subah uthte hi body heavy, puffy aur tired feel hoti hai, toh fat-loss journey
              mentally aur physically hard lagti hai. Visarth Veda Detox Foot Pads ek simple support
              routine hai jo aapko lighter start dene mein help karta hai.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Heavy Morning = Slow Start",
                "Slow Start = Less Movement",
                "Less Movement = Fat-Loss Journey Slow",
                "Lighter Start = Better Daily Action",
              ].map((t) => (
                <div key={t} className="rounded-2xl border border-herb-deep/15 bg-cream p-4 text-left text-sm font-bold text-herb">→ {t}</div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-card md:col-span-2">
            <img src={dietImg} alt="Dieting frustration" loading="lazy" width={1280} height={896} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section id="offer" className="relative overflow-hidden bg-gradient-cream py-6 sm:py-10">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-herb-deep/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <SectionTitle kicker="Limited Stock · Fat-Loss Support">
            Start Your <span className="text-herb">45 Days Fat-Loss Support</span> Routine
          </SectionTitle>

          <div className="mt-12 overflow-hidden rounded-[2rem] bg-card shadow-soft ring-1 ring-herb-deep/10">
            <div className="grid md:grid-cols-2">
              <div className="bg-beige p-8 sm:p-10">
                <Logo className="mx-auto h-12 md:mx-0" />
                <div className="mt-6 overflow-hidden rounded-2xl">
                  <img src={productImg} alt="Visarth Veda pack" loading="lazy" width={1280} height={1280} className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="p-8 text-center sm:p-10 md:text-left">
                <Badge>Best Value Pack</Badge>
                <h3 className="mt-4 font-display text-3xl font-bold text-foreground">Visarth Veda Detox Foot Pads</h3>
                <p className="text-sm text-muted-foreground">45 Days Supply · 45 Pads</p>

                <div className="mt-5 flex items-end justify-center gap-3 md:justify-start">
                  <span className="text-5xl font-black text-herb">₹1499</span>
                  <span className="mb-2 text-lg text-muted-foreground line-through">₹2,499</span>
                  <span className="mb-2 rounded-full bg-gold/30 px-2.5 py-1 text-xs font-bold text-ink">Save 40%</span>
                </div>

                <ul className="mx-auto mt-6 max-w-md space-y-2.5 text-sm md:mx-0">
                  {["Overnight foot pad routine", "Easy to use — no pills, no drinks", "Herbal wellness support", "Free shipping across India", "Cash on Delivery available"].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-left">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-herb text-[11px] font-bold text-primary-foreground">✓</span>
                      <span className="text-foreground">{t}</span>
                    </li>
                  ))}
                </ul>

                <button type="button" onClick={openOrder} className="mt-7 flex w-full items-center justify-center rounded-full bg-gradient-herb px-8 py-4 text-base font-bold text-primary-foreground shadow-soft animate-cta-shake hover:scale-[1.03] transition-transform">
                  Order Now – ₹1499 →
                </button>
                <p className="mt-3 text-center text-xs font-semibold text-destructive">⚡ Limited stock available for this batch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background py-6 sm:py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionTitle kicker="FAQ">Aapke Sawaal, Honest Jawaab</SectionTitle>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-bold text-foreground">{f.q}</span>
                    <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-full bg-herb text-primary-foreground transition-transform ${open ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {open && <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-herb relative overflow-hidden py-8 text-primary-foreground sm:py-12">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Logo className="mx-auto h-14" />
          <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Ab Heavy Morning Ko <span className="text-gold">Normal Mat Samjho</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg">
            Start Visarth Veda Detox Foot Pads 45 days routine and support your fat-loss journey with
            lighter, fresher mornings.
          </p>
          <button type="button" onClick={openOrder} className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-10 py-5 text-lg font-bold text-ink shadow-soft animate-cta-shake hover:scale-[1.03] transition-transform">
            Get 45 Days Supply – ₹1499 →
          </button>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {trustBadges.map((t) => (
              <span key={t} className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink py-12 text-cream/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <Logo className="h-12" />
            <nav className="flex flex-wrap justify-center gap-5 text-sm">
              <a href="#problem">Problem</a>
              <a href="#how">How It Works</a>
              <a href="#reviews">Reviews</a>
              <a href="#faq">FAQ</a>
            </nav>
          </div>
          <p className="mt-6 text-center text-xs text-cream/40">© {new Date().getFullYear()} Visarth Veda. All rights reserved.</p>
        </div>
      </footer>

      {/* STICKY ORDER STRIP */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-herb-deep/20 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-2.5 sm:px-6 sm:py-3">
          <div className="hidden sm:flex flex-col">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-destructive">
              <span className="h-2 w-2 animate-ping rounded-full bg-destructive" /> Limited stock
            </span>
            <span className="text-xs text-muted-foreground">Only few packs left in this batch</span>
          </div>
          <div className="flex-1 sm:flex-none flex items-center gap-2">
            <div className="rounded-xl bg-herb px-3 py-1.5 text-primary-foreground">
              <p className="text-[9px] uppercase tracking-wider opacity-80 leading-none">Offer ends in</p>
              <p className="font-mono text-base font-bold leading-tight tabular-nums">{timer}</p>
            </div>
            <div className="hidden sm:flex flex-col">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground leading-none">45 Days Supply</p>
              <p className="text-lg font-black leading-tight text-herb">₹1499 <span className="text-xs font-medium text-muted-foreground line-through">₹2,499</span></p>
            </div>
          </div>
          <button
            type="button"
            onClick={openOrder}
            className="ml-auto flex-1 sm:flex-none rounded-full bg-gradient-herb px-5 py-3 text-center text-sm font-bold text-primary-foreground shadow-soft animate-cta-shake sm:px-8"
          >
            Order Now – ₹1499 →
          </button>
        </div>
      </div>

      {/* ORDER MODAL */}
      {orderOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 px-3 py-6 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setOrderOpen(false)}>
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-herb-deep/10 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOrderOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-foreground hover:bg-beige"
            >
              ✕
            </button>
            <div className="bg-gradient-herb px-6 py-5 text-primary-foreground">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Complete Your Order</p>
              <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">Cash On Delivery (COD) Order Form</h3>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-white/15 px-2.5 py-1 font-semibold">₹1499 · 45 Days Supply</span>
                <span className="rounded-full bg-gold px-2.5 py-1 font-bold text-ink">⏳ {timer}</span>
                <span className="rounded-full bg-white/15 px-2.5 py-1 font-semibold">💵 COD</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} noValidate className="max-h-[70vh] overflow-y-auto p-6 sm:p-7">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Full Name (पूरा नाम)</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={60}
                    placeholder="Aapka pura naam"
                    className="w-full rounded-2xl border border-input bg-cream px-4 py-3 text-base text-foreground outline-none transition focus:border-herb focus:ring-2 focus:ring-herb/20"
                  />
                  {errors.name && <p className="mt-1 text-xs font-semibold text-destructive">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Contact Number (मोबाइल नंबर)</label>
                  <div className="flex items-stretch overflow-hidden rounded-2xl border border-input bg-cream focus-within:border-herb focus-within:ring-2 focus-within:ring-herb/20">
                    <span className="flex items-center bg-beige px-4 text-sm font-semibold text-herb">+91</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      className="w-full bg-cream px-4 py-3 text-base text-foreground outline-none"
                    />
                  </div>
                  {errors.contact && <p className="mt-1 text-xs font-semibold text-destructive">{errors.contact}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Full Address (पूरा पता)</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    maxLength={200}
                    rows={3}
                    placeholder="Flat/House No, Street, Landmark, City, State"
                    className="w-full rounded-2xl border border-input bg-cream px-4 py-3 text-base text-foreground outline-none transition focus:border-herb focus:ring-2 focus:ring-herb/20 resize-none"
                  />
                  {errors.address && <p className="mt-1 text-xs font-semibold text-destructive">{errors.address}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Pincode (पिनकोड)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                    maxLength={6}
                    placeholder="6-digit pincode"
                    className="w-full rounded-2xl border border-input bg-cream px-4 py-3 text-base text-foreground outline-none transition focus:border-herb focus:ring-2 focus:ring-herb/20"
                  />
                  {errors.pincode && <p className="mt-1 text-xs font-semibold text-destructive">{errors.pincode}</p>}
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center rounded-full bg-gradient-herb px-8 py-4 text-base font-black text-primary-foreground shadow-soft animate-cta-shake hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Place Order – ₹1499 (COD) →
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  No advance payment · Our representative will call you to confirm
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* THANK YOU MODAL */}
      {submitted && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-card p-8 text-center shadow-soft animate-in fade-in zoom-in-95">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-herb text-3xl text-primary-foreground shadow-soft">
              ✓
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">Thank You!</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-semibold text-foreground">
              Our representative will call you in a while to confirm your order.
            </p>
            <p className="mt-2 text-xs font-semibold text-herb">Please keep your phone reachable.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-herb px-6 py-3 text-sm font-bold text-primary-foreground shadow-soft"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* DUPLICATE LEAD MODAL */}
      {duplicateMsg && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-card p-8 text-center shadow-soft animate-in fade-in zoom-in-95">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold/30 text-3xl shadow-soft">
              ⏳
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">Already Submitted!</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {duplicateMsg}
            </p>

            <button
              onClick={() => setDuplicateMsg(null)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-herb px-6 py-3 text-sm font-bold text-primary-foreground shadow-soft"
            >
              OK, Samajh Gaya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
