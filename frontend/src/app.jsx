import React, { useState, useEffect } from 'react';

const API_BASE = "http://127.0.0.1:8000";

const INITIAL_EVENTS = [
  {
    id: 101,
    title: "Business Summit",
    category: "BUSINESS",
    categoryColor: "bg-blue-600",
    event_date: "20 October 2026",
    venue_name: "Main Auditorium",
    ticket_price: 49,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    description: "Join international industry leaders and entrepreneurs discussing enterprise strategies and innovation."
  },
  {
    id: 102,
    title: "Wedding Expo",
    category: "WEDDING",
    categoryColor: "bg-rose-500",
    event_date: "25 October 2026",
    venue_name: "Grand Convention Center",
    ticket_price: 75,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    description: "Discover premier bridal designers, luxury floral masters, and gourmet catering for your special day."
  },
  {
    id: 103,
    title: "Music Festival",
    category: "MUSIC",
    categoryColor: "bg-purple-600",
    event_date: "12 November 2026",
    venue_name: "City Arena",
    ticket_price: 60,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    description: "An electrifying night featuring top chart bands, live laser production, and festival beats."
  },
  {
    id: 104,
    title: "Food & Culture Festival",
    category: "FOOD",
    categoryColor: "bg-amber-600",
    event_date: "28 November 2026",
    venue_name: "Riverside Park",
    ticket_price: 40,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    description: "Celebrate international street foods, artisan vendors, and acoustic live stage performances."
  }
];

export default function App() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookedTicket, setBookedTicket] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const [formData, setFormData] = useState({
    title: "", description: "", category: "BUSINESS",
    event_date: "2026-11-20", ticket_price: 50, venue_name: "Grand Hall"
  });

  useEffect(() => {
    fetch(`${API_BASE}/events/`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((ev, i) => ({
            id: ev.id,
            title: ev.title,
            category: (ev.category || "EVENT").toUpperCase(),
            categoryColor: ev.category?.toLowerCase() === "wedding" ? "bg-rose-500" :
                           ev.category?.toLowerCase() === "music" ? "bg-purple-600" :
                           ev.category?.toLowerCase() === "food" ? "bg-amber-600" : "bg-blue-600",
            event_date: ev.event_date,
            venue_name: "Main Auditorium",
            ticket_price: Number(ev.ticket_price) || 0,
            image: INITIAL_EVENTS[i % INITIAL_EVENTS.length].image,
            description: ev.description || "Campus event experience."
          }));
          setEvents(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const handleBook = (ev) => {
    const code = "TCK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setBookedTicket({ code, title: ev.title, venue: ev.venue_name, date: ev.event_date });
    setSelectedEvent(null);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newEv = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      categoryColor: "bg-purple-600",
      event_date: formData.event_date,
      venue_name: formData.venue_name,
      ticket_price: formData.ticket_price,
      image: INITIAL_EVENTS[0].image,
      description: formData.description
    };
    setEvents([newEv, ...events]);
    setShowCreateModal(false);
    alert("Event created successfully! 🎉");
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#070b15]/95 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
              ✦
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Eventora</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#home" className="text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-500">Home</a>
            <a href="#events" className="text-slate-300 hover:text-white transition">Events</a>
            <a href="#services" className="text-slate-300 hover:text-white transition">Services</a>
            <a href="#about" className="text-slate-300 hover:text-white transition">About</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
          </div>

          <div className="flex items-center space-x-3">
            <a href="#events" className="text-slate-300 hover:text-white p-2">🔍</a>
            <button onClick={() => { setAuthMode("login"); setShowAuthModal(true); }} className="text-xs font-semibold text-white px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition">Login</button>
            <button onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }} className="text-xs font-semibold text-white px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 shadow transition">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative bg-[#070b15] pt-24 pb-36 px-6 lg:px-12 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=2200&q=85')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#060913]/95 via-[#060913]/85 to-[#060913]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-2xl text-left">
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/15 text-[11px] font-semibold text-indigo-300 uppercase tracking-widest mb-6">
              YOUR EVENTS, ONE PLATFORM
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
              Turn Your Ideas Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-300">
                Unforgettable Events
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              From weddings to corporate events, birthdays to concerts — we make every moment special. Plan, book and manage your events all in one place.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#events" className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white font-semibold text-xs shadow-lg transition">
                <span>Explore Events</span>
                <span>→</span>
              </a>
              <button onClick={() => setShowCreateModal(true)} className="px-6 py-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white font-semibold text-xs border border-white/20 transition">
                Create Your Event
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR FEATURE CARDS */}
      <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white p-7 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl font-bold">📅</div>
            <div><h3 className="text-sm font-bold text-slate-900">Easy Booking</h3><p className="text-xs text-slate-500 mt-0.5">Book events in just a few clicks.</p></div>
          </div>
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 text-xl font-bold">👥</div>
            <div><h3 className="text-sm font-bold text-slate-900">Expert Organizers</h3><p className="text-xs text-slate-500 mt-0.5">Professional support always.</p></div>
          </div>
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl font-bold">🛡️</div>
            <div><h3 className="text-sm font-bold text-slate-900">Secure Payments</h3><p className="text-xs text-slate-500 mt-0.5">Safe & reliable transactions.</p></div>
          </div>
          <div className="flex items-center space-x-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 text-xl font-bold">🎧</div>
            <div><h3 className="text-sm font-bold text-slate-900">24/7 Support</h3><p className="text-xs text-slate-500 mt-0.5">We're here whenever you need us.</p></div>
          </div>
        </div>
      </section>

      {/* 4. UPCOMING EVENTS */}
      <section id="events" className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-16">
        <div className="flex items-center justify-between pb-8">
          <div>
            <div className="w-8 h-1 bg-indigo-600 rounded-full mb-3"></div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">Upcoming Events</h2>
          </div>
          <a href="#events" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View All Events →</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((ev) => (
            <div key={ev.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition flex flex-col justify-between">
              <div className="relative h-44 w-full">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold text-white uppercase px-2.5 py-0.5 rounded-full ${ev.categoryColor}`}>
                  {ev.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{ev.title}</h3>
                  <div className="space-y-1 text-xs text-slate-500 mb-4">
                    <p>📅 {ev.event_date}</p>
                    <p>📍 {ev.venue_name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-base font-extrabold text-slate-900">${ev.ticket_price}</span>
                  <button onClick={() => setSelectedEvent(ev)} className="text-xs font-semibold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 shadow">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="relative rounded-3xl overflow-hidden px-8 py-12 text-white bg-cover bg-center shadow-2xl" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0725]/95 via-[#1a0f44]/90 to-[#120a32]/85"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="block text-[11px] font-bold text-indigo-300 uppercase tracking-widest mb-2">READY TO PLAN YOUR NEXT EVENT?</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 font-serif">Make It Happen with Eventora</h2>
              <p className="text-slate-300 text-xs md:text-sm">Create, customize and manage your perfect event — anytime, anywhere.</p>
            </div>
            <button onClick={() => setShowCreateModal(true)} className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-lg hover:opacity-95 shrink-0">
              Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer id="contact" className="bg-[#060b18] text-slate-300 pt-16 pb-8 border-t border-white/5 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg">✦</span>
              <span className="text-lg font-bold text-white">Eventora</span>
            </div>
            <p className="text-slate-400 mb-4 leading-relaxed">Making every event memorable.</p>
            <div className="flex space-x-2 text-slate-400">
              {['FB', 'IG', 'X', 'IN', 'YT'].map(n => (
                <span key={n} className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center font-bold text-[9px] hover:bg-indigo-600 cursor-pointer">{n}</span>
              ))}
            </div>
          </div>

          <div id="about">
            <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#home">Home</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div id="services">
            <h4 className="text-white font-bold text-sm mb-3">Services</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Event Planning</li>
              <li>Venue Management</li>
              <li>Vendor Management</li>
              <li>Online Ticketing</li>
              <li>Photography</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Contact Us</h4>
            <ul className="space-y-2 text-slate-400">
              <li>📞 +92 300 1234567</li>
              <li>✉️ info@eventora.com</li>
              <li>📍 Islamabad, Pakistan</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-2">Subscribe to Our Newsletter</h4>
            <p className="text-slate-400 mb-3">Get the latest events and updates.</p>
            {subscribed ? (
              <p className="text-emerald-400">✓ Subscribed successfully!</p>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (emailInput) setSubscribed(true); }} className="space-y-2">
                <input type="email" required placeholder="Your email address" value={emailInput} onChange={e => setEmailInput(e.target.value)} className="w-full bg-[#0a1224] border border-white/10 rounded-xl px-3 py-2 text-white text-xs" />
                <button type="submit" className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xs rounded-xl">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2">
          <p>Event Management System © 2026</p>
          <p>Privacy Policy | Terms & Conditions</p>
        </div>
      </footer>

      {/* EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-6">
            <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-40 object-cover rounded-xl mb-4" />
            <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${selectedEvent.categoryColor}`}>{selectedEvent.category}</span>
            <h3 className="text-xl font-bold mt-2">{selectedEvent.title}</h3>
            <p className="text-xs text-slate-600 my-2">{selectedEvent.description}</p>
            <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1 mb-4">
              <p>📅 <strong>Date:</strong> {selectedEvent.event_date}</p>
              <p>📍 <strong>Venue:</strong> {selectedEvent.venue_name}</p>
              <p>💵 <strong>Price:</strong> ${selectedEvent.ticket_price}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setSelectedEvent(null)} className="w-1/2 py-2 border rounded-xl text-xs">Close</button>
              <button onClick={() => handleBook(selectedEvent)} className="w-1/2 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">Book Ticket 🎟️</button>
            </div>
          </div>
        </div>
      )}

      {/* QR TICKET MODAL */}
      {bookedTicket && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Ticket Confirmed</span>
            <h3 className="text-lg font-bold mt-2">{bookedTicket.title}</h3>
            <div className="bg-slate-50 p-4 rounded-xl inline-block my-4 border">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${bookedTicket.code}`} alt="QR" className="w-36 h-36 mx-auto" />
            </div>
            <p className="font-mono text-base font-bold text-indigo-600 bg-slate-100 py-2 rounded-xl mb-4">{bookedTicket.code}</p>
            <button onClick={() => setBookedTicket(null)} className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl">Done</button>
          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Create New Event</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <input type="text" required placeholder="Event Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border rounded-xl p-2" />
              <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded-xl p-2" rows="2"></textarea>
              <div className="grid grid-cols-2 gap-2">
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="border rounded-xl p-2 bg-white">
                  <option value="BUSINESS">Business</option>
                  <option value="WEDDING">Wedding</option>
                  <option value="MUSIC">Music</option>
                  <option value="FOOD">Food</option>
                </select>
                <input type="date" required value={formData.event_date} onChange={e => setFormData({...formData, event_date: e.target.value})} className="border rounded-xl p-2" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Price ($)" value={formData.ticket_price} onChange={e => setFormData({...formData, ticket_price: Number(e.target.value)})} className="border rounded-xl p-2" />
                <input type="text" placeholder="Venue" value={formData.venue_name} onChange={e => setFormData({...formData, venue_name: e.target.value})} className="border rounded-xl p-2" />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold">Publish Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LOGIN / SIGNUP MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-xs">
            <h3 className="text-lg font-bold mb-4">{authMode === "login" ? "Login to Eventora" : "Create Eventora Account"}</h3>
            <form onSubmit={e => { e.preventDefault(); alert("Success!"); setShowAuthModal(false); }} className="space-y-3">
              {authMode === "signup" && <input type="text" required placeholder="Full Name" className="w-full border rounded-xl p-2" />}
              <input type="email" required placeholder="Email Address" className="w-full border rounded-xl p-2" />
              <input type="password" required placeholder="Password" className="w-full border rounded-xl p-2" />
              <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-xl font-semibold">{authMode === "login" ? "Login" : "Sign Up"}</button>
              <p className="text-center text-slate-500 mt-2">
                <button type="button" onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="text-indigo-600 font-bold underline">
                  {authMode === "login" ? "Need an account? Sign Up" : "Have an account? Login"}
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}