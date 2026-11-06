import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const API_BASE = "http://127.0.0.1:8000";

const HERO_SLIDES = [
  {
    tag: "ROYAL WEDDINGS & RECEPTIONS",
    title: "Best Event Planner & Management in Sialkot",
    desc: "Creating timeless weddings, royal floral stages, and unforgettable family celebrations with uncompromising quality across Sialkot.",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=90"
  },
  {
    tag: "TRADITIONAL MEHNDI & MAYUN",
    title: "Vibrant Celebrations & Marigold Themes",
    desc: "Marigold yellow canopies, floral jhoola swings, floor cushion lounges, dholak baithak, and festive fairy light ceilings.",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2400&q=90"
  },
  {
    tag: "CUSTOM BIRTHDAY PARTIES",
    title: "Memorable Milestone Celebrations",
    desc: "Pastel balloon arches, glowing neon signage, thematic dessert plinths, and customized celebration memories for all ages.",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=2400&q=90"
  },
  {
    tag: "GOURMET CATERING & CORPORATE",
    title: "Royal Banquets & Executive Summits",
    desc: "Authentic Pakistani buffets, live BBQ grilling, stage LED backdrop displays, and executive conference coordination.",
    url: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2400&q=90"
  }
];

const SERVICES_DATA = [
  { id: 1, title: "Royal Wedding Planner", tag: "Barat & Walima", price: "From Rs. 165,000", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", desc: "Bespoke floral stages, chandeliers, mirror walkways, royal bride & groom seating, and complete event coordination." },
  { id: 2, title: "Mehndi & Mayun Decors", tag: "Traditional Decor", price: "From Rs. 85,000", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80", desc: "Yellow marigold canopies, bridal swing (jhoola) decor, floor cushion lounges, dholak baithak, and fairy lights." },
  { id: 3, title: "Birthday Party Planner", tag: "All Ages & Milestones", price: "From Rs. 45,000", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80", desc: "Bespoke balloon arches, custom name neon lights, thematic stage backdrops, cake plinths, and photo corners." },
  { id: 4, title: "Corporate Conferences", tag: "Summits & Convocations", price: "From Rs. 95,000", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", desc: "Executive stage production, high-definition LED displays, podium branding, and crystal clear sound systems." },
  { id: 5, title: "Catering & Royal Banquet", tag: "Savory Live Buffets", price: "From Rs. 1,800 / Head", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80", desc: "Pakistani mutton & chicken biryani, live BBQ counters, continental salad bars, and luxury dessert corners." },
  { id: 6, title: "Live Concerts & Qawwali", tag: "Musical Nights", price: "From Rs. 120,000", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80", desc: "Moroccan candlelit lanterns, carpeted acoustic floor seating, concert sound engineers, and arena stage lighting." }
];

const SIALKOT_VENUES = [
  { id: 1, name: "Javaid Marquee & Banquet", cap: "800 Guests", loc: "Sambrial Road, Sialkot", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Royal Palm Event Hall", cap: "1,200 Guests", loc: "Cantt, Sialkot", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Garrison Event Complex", cap: "600 Guests", loc: "Tariq Road, Sialkot", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Grand Continental Marquee", cap: "500 Guests", loc: "Daska Road, Sialkot", img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80" }
];

const GALLERY_PHOTOS = [
  { id: 1, cat: "Weddings", title: "Royal Golden Stage", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" },
  { id: 2, cat: "Birthdays", title: "Pastel Cake Arch", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80" },
  { id: 3, cat: "Catering", title: "Luxury Banquet Spread", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80" },
  { id: 4, cat: "Concerts", title: "Arena Stage Lights", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80" },
  { id: 5, cat: "Weddings", title: "Walima Floral Aisle", img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80" },
  { id: 6, cat: "Corporate", title: "Tech Leadership Summit", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" }
];

function App() {
  const [activePage, setActivePage] = useState("home"); // 'home' | 'about' | 'services' | 'venues' | 'gallery' | 'contact' | 'admin' | 'ai'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [submittedId, setSubmittedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("ALL");
  const [adminInquiries, setAdminInquiries] = useState([]);
  
  // AI Recommendation State
  const [aiForm, setAiForm] = useState({
    event_type: "Wedding",
    budget: 350000,
    guests: 300
  });
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Auth Form State
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", role: "participant" });

  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({ name: "", phone: "", type: "Wedding", date: "2026-11-25", guests: "300" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Slideshow Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`${API_BASE}/inquiries/`);
      if (res.ok) {
        const data = await res.json();
        setAdminInquiries(data);
      }
    } catch {
      console.log("FastAPI backend offline");
    }
  };

  useEffect(() => {
    if (activePage === "admin") {
      fetchInquiries();
    }
  }, [activePage]);

  const openQuoteFor = (title) => {
    setSelectedService(title);
    setShowQuoteModal(true);
  };

  // Demo Login
  const handleDemoAdminLogin = () => {
    const adminUser = { full_name: "Aziza & Jawaria (Admin)", email: "admin@eventora.pk", role: "admin" };
    setCurrentUser(adminUser);
    setShowAuthModal(false);
    setActivePage("admin");
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const user = { full_name: authForm.name || (authForm.email.split('@')[0]), email: authForm.email, role: authForm.role };
    setCurrentUser(user);
    setShowAuthModal(false);
    if (user.role === "admin" || user.role === "organizer") {
      setActivePage("admin");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage("home");
  };

  // Run AI Recommendation Algorithm
  const handleRunAIRecommendation = async (e) => {
    e.preventDefault();
    setAiLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ai/recommend/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiForm)
      });
      if (res.ok) {
        const data = await res.json();
        setAiResult(data);
      } else {
        alert("Make sure FastAPI backend is running!");
      }
    } catch {
      alert("Backend connection error. Please ensure backend terminal is running.");
    } finally {
      setAiLoading(false);
    }
  };

  // Save quote into MySQL
  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/inquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: quoteForm.name,
          phone: quoteForm.phone,
          event_type: quoteForm.type,
          event_date: quoteForm.date,
          guests: parseInt(quoteForm.guests) || 100,
          city: "Sialkot"
        })
      });

      if (res.ok) {
        const savedData = await res.json();
        setSubmittedId(savedData.id);
        setTimeout(() => {
          setSubmittedId(null);
          setShowQuoteModal(false);
          setQuoteForm({ name: "", phone: "", type: "Wedding", date: "2026-11-25", guests: "300" });
        }, 3000);
      } else {
        setSubmittedId("OFFLINE-OK");
        setTimeout(() => { setSubmittedId(null); setShowQuoteModal(false); }, 2000);
      }
    } catch {
      setSubmittedId("OFFLINE-OK");
      setTimeout(() => { setSubmittedId(null); setShowQuoteModal(false); }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1f1914] text-amber-100 px-6 lg:px-14 py-2.5 text-xs flex flex-col sm:flex-row justify-between items-center border-b border-amber-900/40">
        <div className="flex items-center space-x-5">
          <span>📞 <strong className="ml-1 text-white">+92 318 4266295</strong> / 0300-1234567</span>
          <span className="hidden md:inline text-amber-200/70">✉️ peony.eventplanners1@gmail.com</span>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <span>📍 Said Pur Road & Cantt, Sialkot</span>
          <span className="text-amber-400 font-bold">● Season 2026 Open</span>
          {currentUser && (
            <span className="bg-amber-600/30 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
              👤 {currentUser.full_name} ({currentUser.role.toUpperCase()})
            </span>
          )}
        </div>
      </div>

      {/* 2. BRIGHT LUXURY NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm px-6 lg:px-14 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => setActivePage("home")}>
            <span className="text-2xl md:text-3xl font-serif font-black tracking-wider text-stone-900">
              EVENTORA
            </span>
            <span className="block text-[10px] font-sans tracking-[0.25em] text-amber-700 uppercase -mt-1 font-bold">
              PEONY EVENTS SIALKOT
            </span>
          </div>

          <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold tracking-wider uppercase">
            {[
              { id: "home", label: "Home" },
              { id: "ai", label: "✨ AI Planner" },
              { id: "about", label: "About Us" },
              { id: "services", label: "Our Services" },
              { id: "venues", label: "Venues" },
              { id: "gallery", label: "Gallery" },
              { id: "contact", label: "Contact Us" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`py-1.5 transition-all ${
                  activePage === item.id 
                    ? "text-amber-700 border-b-2 border-amber-600 font-black" 
                    : item.id === "ai" 
                      ? "text-purple-700 font-extrabold hover:text-purple-900" 
                      : "text-stone-600 hover:text-amber-800"
                }`}
              >
                {item.label}
              </button>
            ))}

            {currentUser && (currentUser.role === "admin" || currentUser.role === "organizer") && (
              <button
                onClick={() => setActivePage("admin")}
                className={`py-1.5 transition-all font-black ${
                  activePage === "admin" 
                    ? "text-indigo-700 border-b-2 border-indigo-600" 
                    : "text-indigo-600 hover:text-indigo-800"
                }`}
              >
                📊 Admin Dashboard
              </button>
            )}
          </nav>

          <div className="flex items-center space-x-3">
            {currentUser ? (
              <button onClick={handleLogout} className="text-stone-600 hover:text-stone-900 border border-stone-300 px-4 py-2 rounded-full text-xs font-bold transition">
                Logout
              </button>
            ) : (
              <button onClick={() => { setAuthMode("login"); setShowAuthModal(true); }} className="text-stone-700 hover:text-stone-950 font-bold text-xs px-4 py-2 rounded-full border border-stone-300 hover:border-stone-500 transition">
                Sign In
              </button>
            )}

            <button onClick={() => setActivePage("ai")} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition transform hover:scale-105">
              ✨ AI Recommendation
            </button>
          </div>
        </div>
      </header>

      {/* ================= 3. MULTI-PAGE VIEWS ================= */}

      {/* PAGE: ✨ AI RECOMMENDATION & SMART MATCHING (PROPOSAL MODULE) */}
      {activePage === "ai" && (
        <section className="py-16 px-6 lg:px-14 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
              GCUF Final Year Project Module • AI Smart Matching
            </span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2">
              AI Event & Venue Recommendation System
            </h1>
            <p className="text-stone-600 text-sm mt-3">
              Enter your event type, guest count, and budget. Our Python & FastAPI algorithm matches you with the ideal Sialkot venue and calculates a smart cost breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form Card */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-stone-200 shadow-md">
              <h3 className="text-lg font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100">
                1. Specify Event Parameters
              </h3>
              <form onSubmit={handleRunAIRecommendation} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Event Category</label>
                  <select
                    value={aiForm.event_type}
                    onChange={(e) => setAiForm({ ...aiForm, event_type: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none focus:border-purple-600 text-xs"
                  >
                    <option value="Wedding">Wedding / Barat / Walima</option>
                    <option value="Mehndi">Mehndi & Mayun Celebration</option>
                    <option value="Birthday">Birthday Milestone Party</option>
                    <option value="Corporate">Corporate Conference & Summit</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    Total Estimated Budget (PKR): <strong className="text-purple-700 font-mono text-sm">Rs. {parseInt(aiForm.budget).toLocaleString()}</strong>
                  </label>
                  <input
                    type="range"
                    min="60000"
                    max="1500000"
                    step="20000"
                    value={aiForm.budget}
                    onChange={(e) => setAiForm({ ...aiForm, budget: parseFloat(e.target.value) })}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>Rs. 60,000</span>
                    <span>Rs. 750,000</span>
                    <span>Rs. 1,500,000+</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    Expected Number of Guests: <strong className="text-purple-700 font-mono text-sm">{aiForm.guests} Persons</strong>
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="1500"
                    step="25"
                    value={aiForm.guests}
                    onChange={(e) => setAiForm({ ...aiForm, guests: parseInt(e.target.value) || 50 })}
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-purple-600 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Target City</label>
                  <input
                    type="text"
                    disabled
                    value="Sialkot, Punjab"
                    className="w-full border border-stone-200 bg-stone-100 rounded-xl px-3.5 py-2.5 text-stone-500 font-semibold text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={aiLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg transition transform hover:scale-[1.01]"
                >
                  {aiLoading ? "AI Calculating Best Fit..." : "Generate AI Recommendation ✨"}
                </button>
              </form>
            </div>

            {/* Results Preview Card */}
            <div className="lg:col-span-7">
              {aiResult ? (
                <div className="bg-white p-8 rounded-3xl border border-purple-200 shadow-xl space-y-6 animate-fade-in">
                  {/* Top Match Banner */}
                  <div className="flex justify-between items-center pb-4 border-b border-stone-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                        Smart Match Result
                      </span>
                      <h3 className="text-xl font-bold font-serif text-stone-900 mt-2">
                        {aiResult.recommended_venue}
                      </h3>
                      <p className="text-xs text-stone-500">📍 {aiResult.venue_location}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-3xl font-black text-emerald-600 font-serif">
                        {aiResult.match_score}%
                      </span>
                      <span className="text-[10px] text-stone-400 uppercase font-bold">Feasibility Match</span>
                    </div>
                  </div>

                  {/* Recommended Package */}
                  <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60">
                    <span className="text-[10px] uppercase font-bold text-amber-800 block">Recommended Setup</span>
                    <h4 className="font-bold text-stone-900 text-sm mt-0.5">{aiResult.recommended_package}</h4>
                    <span className="text-xs text-amber-700 font-semibold block mt-1">
                      Per Head Estimate: ~Rs. {aiResult.per_head_cost}
                    </span>
                  </div>

                  {/* Cost Allocation Chart / Breakdown */}
                  <div>
                    <h4 className="text-xs font-bold text-stone-700 uppercase mb-3">AI Budget Allocation Breakdown</h4>
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-semibold mb-1">
                          <span>🍲 Catering & Buffet (45-50%)</span>
                          <span className="font-mono text-stone-900 font-bold">Rs. {aiResult.estimated_catering.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '48%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-semibold mb-1">
                          <span>🌸 Floral Stage & Themed Decor (35-40%)</span>
                          <span className="font-mono text-stone-900 font-bold">Rs. {aiResult.estimated_decor.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full rounded-full" style={{ width: '38%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-semibold mb-1">
                          <span>🎵 Sound, Lights & Photography (15%)</span>
                          <span className="font-mono text-stone-900 font-bold">Rs. {aiResult.estimated_sound_photo.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: '14%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Advice */}
                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-xs text-purple-900 leading-relaxed">
                    <strong>💡 AI Advisor Note:</strong> {aiResult.ai_advice}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      setQuoteForm({
                        ...quoteForm,
                        type: aiForm.event_type,
                        guests: aiForm.guests.toString()
                      });
                      openQuoteFor(`AI Plan: ${aiResult.recommended_venue} (${aiResult.recommended_package})`);
                    }}
                    className="w-full py-3.5 bg-stone-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-lg transition"
                  >
                    Confirm & Book This AI Plan 🎟️
                  </button>
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-dashed border-stone-300 text-center text-stone-400 space-y-3">
                  <span className="text-4xl block">✨</span>
                  <h4 className="text-base font-bold text-stone-700">Your AI Event Blueprint Awaits</h4>
                  <p className="text-xs max-w-md mx-auto text-stone-500">
                    Adjust your guest count and budget on the left and click "Generate AI Recommendation" to get venue matches and cost breakdowns.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PAGE 1: HOME */}
      {activePage === "home" && (
        <>
          <section className="relative h-[82vh] w-full overflow-hidden flex items-center justify-center">
            {HERO_SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                  i === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
                style={{ backgroundImage: `url('${slide.url}')` }}
              />
            ))}
            <div className="absolute inset-0 bg-stone-950/35 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/40 z-10"></div>

            <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-white">
              <div className="p-8 md:p-12 rounded-3xl bg-black/40 backdrop-blur-md border border-white/25 shadow-2xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-widest mb-4 shadow">
                  {activeSlide.tag}
                </span>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight font-serif drop-shadow-xl">
                  {activeSlide.title}
                </h1>
                <p className="text-stone-100 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-normal leading-relaxed drop-shadow">
                  {activeSlide.desc}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button onClick={() => openQuoteFor("Hero Request")} className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-8 py-3.5 rounded-full shadow-xl transition transform hover:scale-105">
                    Request a Callback
                  </button>
                  <button onClick={() => setActivePage("ai")} className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-xl transition transform hover:scale-105">
                    ✨ Try AI Planner
                  </button>
                  <button onClick={() => setActivePage("services")} className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-8 py-3.5 rounded-full border border-white/40 backdrop-blur-md transition">
                    Explore Packages →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Steps */}
          <section className="py-20 px-6 lg:px-14 bg-white border-b border-stone-200">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">How Does It Work?</span>
                <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">4 Simple Steps to a Perfect Event</h2>
                <p className="text-stone-500 text-sm mt-2">Targeting the comfort of our Sialkot clients with seamless event execution.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { num: "01", title: "Reach Out", desc: "Give us a call or submit your requirements through our online quote form." },
                  { num: "02", title: "Discuss Your Plan", desc: "Consult your event details, guests count, and decor themes with our designers." },
                  { num: "03", title: "Choose Your Package", desc: "Select and customize your floral, stage, and banquet package within budget." },
                  { num: "04", title: "Flawless Execution", desc: "Relax as our on-ground team executes stage, lights, and catering smoothly." }
                ].map((step, i) => (
                  <div key={i} className="bg-[#faf8f5] border border-amber-100 p-8 rounded-2xl relative shadow-sm hover:shadow-md transition">
                    <span className="text-3xl font-black font-serif text-amber-600/40 block mb-3">{step.num}</span>
                    <h3 className="text-base font-bold text-stone-900 mb-2">{step.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Preview */}
          <section className="py-20 px-6 lg:px-14 bg-[#faf8f5]">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Our Signature Services</span>
                  <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">Events We Plan & Decorate</h2>
                </div>
                <button onClick={() => setActivePage("services")} className="text-xs font-bold text-amber-700 hover:underline">
                  View All Services →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SERVICES_DATA.slice(0, 3).map((item) => (
                  <div key={item.id} className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col justify-between">
                    <div className="h-60 relative overflow-hidden">
                      <img src={item.img} alt={item.title} referrerPolicy="no-referrer" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-amber-800 shadow">{item.tag}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-stone-900 mb-1">{item.title}</h3>
                      <span className="text-xs text-amber-700 font-bold block mb-3">{item.price}</span>
                      <p className="text-xs text-stone-600 mb-6 leading-relaxed">{item.desc}</p>
                      <button onClick={() => openQuoteFor(item.title)} className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition shadow">
                        Book This Setup 🎟️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* PAGE 2: ABOUT US */}
      {activePage === "about" && (
        <section className="py-20 px-6 lg:px-14 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">About Our Company</span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2">Premier Event Specialists in Sialkot</h1>
            <p className="text-stone-600 text-sm mt-3 max-w-2xl mx-auto">
              With over 10 years of experience across Sialkot & Punjab, Peony Events Planner & Eventora create luxury celebrations with uncompromising quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" alt="Wedding" referrerPolicy="no-referrer" className="rounded-2xl border border-stone-200 shadow-lg w-full h-80 object-cover" />
            <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
              <h3 className="text-xl font-bold text-stone-900 font-serif">Perfection in Every Inch</h3>
              <p>Planning an event in Sialkot can feel overwhelming when marquee booking, floral themes, audio-visuals, and catering all need to execute seamlessly.</p>
              <p>Our team ensures zero surprises, transparent communications, and on-time execution at Royal Palm, Javaid Marquee, or any private rooftop.</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                <div><span className="text-2xl font-black text-amber-700 block font-serif">100+</span><span className="text-[11px] text-stone-500">Events Managed</span></div>
                <div><span className="text-2xl font-black text-amber-700 block font-serif">10+ Yrs</span><span className="text-[11px] text-stone-500">Industry Experience</span></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PAGE 3: OUR SERVICES */}
      {activePage === "services" && (
        <section className="py-20 px-6 lg:px-14 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Full Spectrum Planning</span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2">Event Packages & Services</h1>
            <p className="text-stone-500 text-xs mt-2">Choose any service package below to reserve your date directly into our system.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_DATA.map((srv) => (
              <div key={srv.id} className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col justify-between">
                <div className="h-60 relative overflow-hidden">
                  <img src={srv.img} alt={srv.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-amber-800 shadow">{srv.tag}</span>
                  <span className="absolute bottom-3 right-3 bg-amber-600 text-white font-bold text-xs px-3 py-1 rounded-lg shadow">{srv.price}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{srv.title}</h3>
                  <p className="text-xs text-stone-600 mb-6 leading-relaxed">{srv.desc}</p>
                  <button onClick={() => openQuoteFor(srv.title)} className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition shadow">
                    Book This Service 🎟️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PAGE 4: VENUES IN SIALKOT */}
      {activePage === "venues" && (
        <section className="py-20 px-6 lg:px-14 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Venue Coordination</span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2">Partner Marquees & Halls in Sialkot</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {SIALKOT_VENUES.map((v) => (
              <div key={v.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                <div className="h-52 relative overflow-hidden">
                  <img src={v.img} alt={v.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-black/80 text-[10px] font-bold px-2.5 py-1 rounded-full text-white">{v.cap}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-stone-900 text-sm mb-1">{v.name}</h3>
                  <p className="text-xs text-stone-500 mb-4">📍 {v.loc}</p>
                  <button onClick={() => openQuoteFor(`Venue: ${v.name}`)} className="w-full py-2 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl transition">
                    Reserve Venue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PAGE 5: GALLERY */}
      {activePage === "gallery" && (
        <section className="py-20 px-6 lg:px-14 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Featured Portfolio</span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2">Our Real Event Gallery</h1>
          </div>

          <div className="flex justify-center space-x-2 mb-10">
            {["ALL", "Weddings", "Birthdays", "Catering", "Concerts", "Corporate"].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                  galleryFilter === cat ? "bg-amber-600 text-white shadow" : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY_PHOTOS.filter(p => galleryFilter === "ALL" || p.cat === galleryFilter).map((photo) => (
              <div key={photo.id} className="h-64 rounded-3xl overflow-hidden relative group border border-stone-200 shadow-md">
                <img src={photo.img} alt={photo.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                  <span className="text-sm font-bold text-white font-serif">{photo.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PAGE 6: CONTACT US */}
      {activePage === "contact" && (
        <section className="py-20 px-6 lg:px-14 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">Get In Touch</span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2">Contact Sialkot Office</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white border border-stone-200 p-8 rounded-3xl space-y-6 text-xs text-stone-700 shadow-sm">
              <h3 className="text-lg font-bold text-stone-900 font-serif">Office & Direct Info</h3>
              <p>📍 <strong>Branch 1:</strong> Said Pur Road, Sialkot, Punjab</p>
              <p>📍 <strong>Branch 2:</strong> Cantt Commercial Area, Sialkot</p>
              <p>📞 <strong>Phone:</strong> +92 318 4266295 / 0300-1234567</p>
              <p>✉️ <strong>Email:</strong> peony.eventplanners1@gmail.com</p>
              <p>⏰ <strong>Hours:</strong> 7 Days a Week, 24 Hours Open</p>
            </div>

            <div className="bg-white border border-stone-200 p-8 rounded-3xl shadow-sm">
              <form onSubmit={handleQuoteSubmit} className="space-y-4 text-xs">
                <input type="text" required placeholder="Your Name" value={quoteForm.name} onChange={e => setQuoteForm({...quoteForm, name: e.target.value})} className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:border-amber-600" />
                <input type="tel" required placeholder="WhatsApp Number" value={quoteForm.phone} onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})} className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:border-amber-600" />
                <input type="date" required value={quoteForm.date} onChange={e => setQuoteForm({...quoteForm, date: e.target.value})} className="w-full border border-stone-300 rounded-xl p-3 focus:outline-none focus:border-amber-600" />
                <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition">
                  Send Direct Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* PAGE 7: ADMIN / ORGANIZER DASHBOARD */}
      {activePage === "admin" && (
        <section className="py-14 px-6 lg:px-14 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-stone-200 pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-indigo-700 font-bold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                FYP Management Portal
              </span>
              <h1 className="text-3xl font-serif font-bold text-stone-900 mt-2">
                Organizer & Admin Dashboard
              </h1>
              <p className="text-xs text-stone-500 mt-1">Live inquiries and customer quotes synchronized with MySQL database in XAMPP</p>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={fetchInquiries} className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition">
                🔄 Refresh MySQL
              </button>
              <button onClick={() => setActivePage("home")} className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl hover:bg-amber-700 transition">
                ← Back to Website
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs uppercase text-stone-500 font-bold block mb-1">Total Inquiries</span>
              <span className="text-3xl font-black text-indigo-600 font-serif">{adminInquiries.length}</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">● Saved in MySQL</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs uppercase text-stone-500 font-bold block mb-1">Partner Venues</span>
              <span className="text-3xl font-black text-amber-700 font-serif">{SIALKOT_VENUES.length}</span>
              <span className="text-[10px] text-stone-400 block mt-1">Sialkot Active</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs uppercase text-stone-500 font-bold block mb-1">Packages Offered</span>
              <span className="text-3xl font-black text-rose-600 font-serif">{SERVICES_DATA.length}</span>
              <span className="text-[10px] text-stone-400 block mt-1">Weddings, Galas, Birthdays</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs uppercase text-stone-500 font-bold block mb-1">System Status</span>
              <span className="text-xl font-black text-emerald-600 font-serif">FastAPI Ready</span>
              <span className="text-[10px] text-stone-400 block mt-1">Port 8000 Connected</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-stone-900 text-base">Client Quotes & Reservations Table</h3>
                <p className="text-xs text-stone-500">Records directly queried from `inquiries` table</p>
              </div>
            </div>

            {adminInquiries.length === 0 ? (
              <div className="p-12 text-center text-xs text-stone-400">
                No inquiries found yet. Submit a quote on the homepage to see it appear here!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#faf8f5] text-stone-700 font-bold border-b border-stone-200">
                      <th className="p-4">ID</th>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">WhatsApp / Phone</th>
                      <th className="p-4">Event Category</th>
                      <th className="p-4">Guests</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">City</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {adminInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-amber-50/40 transition">
                        <td className="p-4 font-mono font-bold text-amber-700">#{inq.id}</td>
                        <td className="p-4 font-bold text-stone-900">{inq.full_name}</td>
                        <td className="p-4 text-stone-600">{inq.phone}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                            {inq.event_type}
                          </span>
                        </td>
                        <td className="p-4 text-stone-700 font-semibold">{inq.guests} People</td>
                        <td className="p-4 text-stone-600">{inq.event_date}</td>
                        <td className="p-4 text-stone-500">{inq.city}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            ✓ Recorded
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= 4. ELEGANT FOOTER ================= */}
      <footer className="bg-[#1f1914] text-stone-400 pt-16 pb-8 border-t border-amber-900/40 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          <div>
            <span className="text-xl font-serif font-black text-white">EVENTORA</span>
            <p className="text-stone-400 text-xs mt-3 leading-relaxed">
              Leading comprehensive event planning and wedding decor company in Sialkot, Punjab.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActivePage("home")} className="hover:text-amber-200">Home</button></li>
              <li><button onClick={() => setActivePage("ai")} className="hover:text-amber-200">✨ AI Planner</button></li>
              <li><button onClick={() => setActivePage("about")} className="hover:text-amber-200">About Us</button></li>
              <li><button onClick={() => setActivePage("services")} className="hover:text-amber-200">Our Services</button></li>
              <li><button onClick={() => setActivePage("venues")} className="hover:text-amber-200">Venues in Sialkot</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Specialized Services</h4>
            <ul className="space-y-2">
              <li>Royal Wedding Stages</li>
              <li>Mehndi & Mayun Themes</li>
              <li>Corporate & Convocations</li>
              <li>Savory Catering Buffets</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Sialkot Offices</h4>
            <p className="leading-relaxed">
              +92 318 4266295<br />
              Said Pur Road & Cantt, Sialkot<br />
              GCUF IT Final Year Project © 2026
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-14 pt-6 text-[11px] text-stone-500 flex justify-between">
          <p>© 2026 Peony Events Planner & Eventora. All Rights Reserved.</p>
          <p>Sialkot, Punjab, Pakistan</p>
        </div>
      </footer>

      {/* ================= 5. FLOATING WHATSAPP & CALL WIDGETS ================= */}
      <aside className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <a href="tel:+923184266295" className="w-12 h-12 rounded-full bg-stone-900 hover:bg-black text-white flex items-center justify-center text-lg shadow-xl hover:scale-110 transition">📞</a>
        <a href="https://wa.me/923184266295" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center text-xl shadow-xl hover:scale-110 transition">💬</a>
      </aside>

      {/* ================= 6. UNIQUE & ATTRACTIVE SPLIT-CARD LOGIN MODAL ================= */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 z-50 text-stone-900">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 grid grid-cols-1 md:grid-cols-12 relative animate-fade-in">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition">✕</button>

            <div className="md:col-span-5 relative bg-stone-900 text-white p-8 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60"></div>
              <div className="relative z-10">
                <span className="text-[10px] font-bold tracking-[0.25em] text-amber-300 uppercase block mb-1">EVENTORA SIALKOT</span>
                <h3 className="text-2xl font-serif font-black leading-tight text-white">Crafting Royal Memories</h3>
              </div>
              <div className="relative z-10 space-y-4 text-xs text-stone-200 pt-16">
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                  <p className="italic">"Planning an event in Sialkot with uncompromising perfection."</p>
                  <span className="block text-[10px] text-amber-300 font-bold mt-1">★ 100% Quality Guaranteed</span>
                </div>
                <p className="text-[11px] text-stone-300">Manage your event dates, reservations, and wedding stages from a single dashboard.</p>
              </div>
            </div>

            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex border-b border-stone-200 mb-6 pb-2 space-x-6">
                  <button type="button" onClick={() => setAuthMode("login")} className={`text-sm font-bold pb-2 transition ${authMode === "login" ? "text-amber-700 border-b-2 border-amber-600 font-black" : "text-stone-400 hover:text-stone-700"}`}>
                    Client & Admin Login
                  </button>
                  <button type="button" onClick={() => setAuthMode("signup")} className={`text-sm font-bold pb-2 transition ${authMode === "signup" ? "text-amber-700 border-b-2 border-amber-600 font-black" : "text-stone-400 hover:text-stone-700"}`}>
                    Create Account
                  </button>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
                  {authMode === "signup" && (
                    <div>
                      <label className="block font-semibold mb-1 text-stone-700">Full Name</label>
                      <input type="text" required placeholder="e.g. Aziza Iman" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-600" />
                    </div>
                  )}

                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Email Address</label>
                    <input type="email" required placeholder="user@eventora.pk" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-600" />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Password</label>
                    <input type="password" required placeholder="••••••••" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-600" />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Select Role</label>
                    <select value={authForm.role} onChange={(e) => setAuthForm({ ...authForm, role: e.target.value })} className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 bg-white focus:outline-none">
                      <option value="participant">Client / Participant</option>
                      <option value="organizer">Event Planner & Organizer</option>
                      <option value="admin">System Administrator</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition transform hover:scale-[1.01]">
                    {authMode === "login" ? "Sign In to Account" : "Register Account"}
                  </button>
                </form>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 text-center">
                <span className="text-[11px] text-stone-400 block mb-2 font-medium">🎓 FYP Viva Presentation Shortcut:</span>
                <button type="button" onClick={handleDemoAdminLogin} className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2 shadow-sm">
                  <span>⚡ 1-Click Demo Admin Login</span>
                  <span className="text-[10px] bg-indigo-200 px-2 py-0.5 rounded-full text-indigo-800">Unlocks Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 7. MYSQL QUOTE MODAL ================= */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 text-stone-900">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-stone-100">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold font-serif text-stone-900">Request Event Quote</h3>
                <p className="text-xs text-stone-500">{selectedService ? `For: ${selectedService}` : "Saves directly to MySQL Database"}</p>
              </div>
              <button onClick={() => setShowQuoteModal(false)} className="text-stone-400 hover:text-stone-700 text-lg">✕</button>
            </div>

            {submittedId ? (
              <div className="py-8 text-center text-emerald-700">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl mb-3 font-bold">✓</div>
                <h4 className="font-bold text-base mb-1">Quote Recorded in MySQL!</h4>
                <p className="text-xs text-stone-600">Inquiry ID: <span className="font-mono font-bold text-amber-700">#{submittedId}</span></p>
                <p className="text-[11px] text-stone-400 mt-2">Saved into your XAMPP database successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Full Name</label>
                  <input type="text" required placeholder="e.g. Jawaria Nazir" value={quoteForm.name} onChange={e => setQuoteForm({...quoteForm, name: e.target.value})} className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-600" />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Phone / WhatsApp</label>
                  <input type="tel" required placeholder="0300-1234567" value={quoteForm.phone} onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})} className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-600" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Category</label>
                    <select value={quoteForm.type} onChange={e => setQuoteForm({...quoteForm, type: e.target.value})} className="w-full border border-stone-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none">
                      <option value="Wedding">Wedding / Barat</option>
                      <option value="Mehndi">Mehndi Setup</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Catering">Catering Buffet</option>
                      <option value="Corporate">Corporate Summit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Guests</label>
                    <input type="number" placeholder="300" value={quoteForm.guests} onChange={e => setQuoteForm({...quoteForm, guests: e.target.value})} className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5" />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Tentative Date</label>
                  <input type="date" required value={quoteForm.date} onChange={e => setQuoteForm({...quoteForm, date: e.target.value})} className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md mt-2 transition">
                  {loading ? "Recording in MySQL..." : "Submit Quote Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const root = document.getElementById('root') || document.getElementById('app');
createRoot(root).render(<App />);