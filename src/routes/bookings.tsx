import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Lock,
  Search,
  Filter,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Phone,
  Mail,
  RefreshCw,
  LogOut,
  ChevronDown
} from "lucide-react";

export const Route = createFileRoute("/bookings")({
  component: BookingsDashboard,
});

interface BookingRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  duration: number;
  therapistGender: string;
  date: string;
  timeSlot: string;
  frequency: string;
  personsCount: number;
  address: string;
  directBilling: boolean;
  insurer: string;
  totalAmount: number;
  status: string; // "Pending" | "Approved" | "Completed" | "Missed" | "Rejected"
  createdAt: string;
}

const mockBookings: BookingRecord[] = [
  {
    id: "AV8139",
    name: "Sarah Jenkins",
    email: "sarah.j@gmail.com",
    phone: "+1 (403) 555-1234",
    serviceType: "Swedish/Relaxation",
    duration: 90,
    therapistGender: "female",
    date: "2026-06-12",
    timeSlot: "6:30 PM",
    frequency: "weekly",
    personsCount: 1,
    address: "728 12 Ave SW, Calgary, AB",
    directBilling: true,
    insurer: "Alberta Blue Cross",
    totalAmount: 165.0,
    status: "Pending",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hrs ago
  },
  {
    id: "AV4291",
    name: "Marcus Brody",
    email: "marcus.b@outlook.com",
    phone: "+1 (403) 555-9876",
    serviceType: "Deep Tissue",
    duration: 120,
    therapistGender: "no_preference",
    date: "2026-06-13",
    timeSlot: "1:30 PM",
    frequency: "one-time",
    personsCount: 2,
    address: "1123 Crestwood Rd SE, Calgary, AB",
    directBilling: false,
    insurer: "Self-pay",
    totalAmount: 396.0,
    status: "Approved",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString() // 18 hrs ago
  },
  {
    id: "AV5521",
    name: "Elena Rostova",
    email: "elena.r@yahoo.com",
    phone: "+1 (587) 555-4321",
    serviceType: "Prenatal",
    duration: 90,
    therapistGender: "female",
    date: "2026-06-04",
    timeSlot: "5:00 PM",
    frequency: "one-time",
    personsCount: 1,
    address: "240 Sandstone Dr NW, Calgary, AB",
    directBilling: true,
    insurer: "Manulife Financial",
    totalAmount: 165.0,
    status: "Completed",
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
  },
  {
    id: "AV2231",
    name: "Tom Sterling",
    email: "tom@sterlingholdings.ca",
    phone: "+1 (403) 555-5000",
    serviceType: "Deep Tissue",
    duration: 90,
    therapistGender: "male",
    date: "2026-06-14",
    timeSlot: "10:30 AM",
    frequency: "bi-weekly",
    personsCount: 1,
    address: "220 Lake Bonavista Dr SE, Calgary, AB",
    directBilling: true,
    insurer: "Sun Life",
    totalAmount: 165.0,
    status: "Approved",
    createdAt: new Date(Date.now() - 3600000 * 40).toISOString()
  },
  {
    id: "AV1182",
    name: "David Vance",
    email: "dvance@energycorp.ca",
    phone: "+1 (403) 555-2244",
    serviceType: "Therapeutic",
    duration: 60,
    therapistGender: "no_preference",
    date: "2026-06-02",
    timeSlot: "7:30 PM",
    frequency: "one-time",
    personsCount: 1,
    address: "555 4 Ave SW, Calgary, AB (Office)",
    directBilling: false,
    insurer: "Self-pay",
    totalAmount: 120.0,
    status: "Missed",
    createdAt: new Date(Date.now() - 3600000 * 80).toISOString()
  },
  {
    id: "AV9028",
    name: "Rachel Green",
    email: "rachel.g@gmail.com",
    phone: "+1 (403) 555-8811",
    serviceType: "Swedish/Relaxation",
    duration: 90,
    therapistGender: "female",
    date: "2026-06-01",
    timeSlot: "8:00 PM",
    frequency: "one-time",
    personsCount: 1,
    address: "1515 8 St NW, Calgary, AB",
    directBilling: true,
    insurer: "Alberta Blue Cross",
    totalAmount: 165.0,
    status: "Rejected",
    createdAt: new Date(Date.now() - 3600000 * 95).toISOString()
  }
];

export function BookingsDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");

  // Bookings list state
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [filterTab, setFilterTab] = useState<string>("All"); // All, Pending, Approved, Completed, Missed, Rejected
  const [searchQuery, setSearchQuery] = useState("");

  // Manual Add Booking form toggle
  const [showAddForm, setShowAddForm] = useState(false);

  // Manual Add Form fields
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [addAddress, setAddAddress] = useState("");
  const [addService, setAddService] = useState("Swedish/Relaxation");
  const [addDuration, setAddDuration] = useState(90);
  const [addGender, setAddGender] = useState("no_preference");
  const [addDate, setAddDate] = useState("");
  const [addTime, setAddTime] = useState("6:00 PM");
  const [addPersons, setAddPersons] = useState(1);
  const [addBilling, setAddBilling] = useState(false);
  const [addInsurer, setAddInsurer] = useState("Alberta Blue Cross");
  const [addStatus, setAddStatus] = useState("Pending");

  // Check auth session storage on mount
  useEffect(() => {
    if (sessionStorage.getItem("avion_admin_auth") === "true") {
      setIsAuthorized(true);
    }
    loadBookings();
  }, []);

  const loadBookings = () => {
    const stored = localStorage.getItem("avion_all_bookings");
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        console.error("Error reading stored bookings:", e);
        setBookings(mockBookings);
      }
    } else {
      localStorage.setItem("avion_all_bookings", JSON.stringify(mockBookings));
      setBookings(mockBookings);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Avion$$$123") {
      setIsAuthorized(true);
      sessionStorage.setItem("avion_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid password. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem("avion_admin_auth");
    setPassword("");
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    const updated = bookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem("avion_all_bookings", JSON.stringify(updated));
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm(`Are you sure you want to delete booking ${id}?`)) {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem("avion_all_bookings", JSON.stringify(updated));
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm("This will reset all bookings data back to sample bookings. Continue?")) {
      localStorage.setItem("avion_all_bookings", JSON.stringify(mockBookings));
      setBookings(mockBookings);
    }
  };

  const handleManualAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // calculate manual base price
    let base = 130;
    if (addPersons === 1) {
      if (addDuration === 30) base = 80;
      else if (addDuration === 45) base = 100;
      else if (addDuration === 60) base = 130;
      else if (addDuration === 90) base = 175;
    } else {
      if (addDuration === 30) base = 80;
      else if (addDuration === 45) base = 95;
      else if (addDuration === 60) base = 125;
      else if (addDuration === 90) base = 165;
    }
    const finalAmount = base * addPersons;

    const newRec: BookingRecord = {
      id: "AV" + Math.floor(1000 + Math.random() * 9000),
      name: addName,
      email: addEmail,
      phone: addPhone,
      serviceType: addService,
      duration: addDuration,
      therapistGender: addGender,
      date: addDate,
      timeSlot: addTime,
      frequency: "one-time",
      personsCount: addPersons,
      address: addAddress,
      directBilling: addBilling,
      insurer: addBilling ? addInsurer : "Self-pay",
      totalAmount: finalAmount,
      status: addStatus,
      createdAt: new Date().toISOString()
    };

    const updated = [newRec, ...bookings];
    setBookings(updated);
    localStorage.setItem("avion_all_bookings", JSON.stringify(updated));

    // Clear form fields
    setAddName("");
    setAddEmail("");
    setAddPhone("");
    setAddAddress("");
    setAddBilling(false);
    setAddStatus("Pending");
    setShowAddForm(false);
  };

  // KPI math
  const getKpis = () => {
    const pending = bookings.filter((b) => b.status === "Pending").length;
    const approved = bookings.filter((b) => b.status === "Approved").length;
    const completed = bookings.filter((b) => b.status === "Completed").length;
    
    // Sum of completed or approved amount
    const revenue = bookings
      .filter((b) => b.status === "Completed" || b.status === "Approved")
      .reduce((sum, b) => sum + b.totalAmount, 0);

    return { pending, approved, completed, revenue };
  };

  const kpis = getKpis();

  // Filter & Search logic
  const filteredBookings = bookings.filter((b) => {
    const matchesTab = filterTab === "All" || b.status.toLowerCase() === filterTab.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      b.name.toLowerCase().includes(query) ||
      b.address.toLowerCase().includes(query) ||
      b.serviceType.toLowerCase().includes(query) ||
      b.id.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/25";
      case "Approved":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/25";
      case "Completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
      case "Missed":
        return "bg-rose-500/10 text-rose-400 border-rose-500/25";
      case "Rejected":
        return "bg-charcoal-muted/20 text-charcoal-muted border-charcoal-muted/30";
      default:
        return "bg-white/5 text-white/50 border-white/10";
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-charcoal text-white flex items-center justify-center px-6 grain select-none relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-sage rounded-full blur-[140px] opacity-15" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-soft-blue rounded-full blur-[140px] opacity-10" />

        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-premium relative z-10">
          <div className="text-center mb-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage/20 text-sage mb-4">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="font-display text-2xl font-bold text-soft-blue">Avion Admin Portal</h1>
            <p className="text-xs text-white/50 uppercase tracking-[0.25em] mt-2">Bookings Control Panel</p>
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
              className="w-full py-4.5 bg-sage hover:bg-sage-hover text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:shadow-premium"
            >
              Authorize Access
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
      
      {/* Admin header */}
      <header className="bg-charcoal text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-md relative z-20">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-lg tracking-wider text-soft-blue">Avion</span>
          <span className="h-4 w-px bg-white/20" />
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">Booking Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleResetToDefaults}
            title="Reset storage to default mockup bookings"
            className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-white/40 hover:text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 uppercase font-bold tracking-widest transition-all"
          >
            <RefreshCw className="h-3 w-3" /> Reset Database
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-[10px] text-white/65 hover:text-white bg-sage hover:bg-sage-hover rounded-full px-4 py-2 uppercase font-bold tracking-widest transition-all"
          >
            <LogOut className="h-3.5 w-3.5" /> Log Out
          </button>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <section className="max-w-7xl mx-auto mt-10 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-border rounded-2xl p-6 shadow-soft flex items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-charcoal-muted font-bold mb-0.5">Pending Requests</span>
            <span className="font-display font-bold text-2xl text-charcoal">{kpis.pending}</span>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6 shadow-soft flex items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-charcoal-muted font-bold mb-0.5">Active Bookings</span>
            <span className="font-display font-bold text-2xl text-charcoal">{kpis.approved}</span>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6 shadow-soft flex items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-charcoal-muted font-bold mb-0.5">Completed Sessions</span>
            <span className="font-display font-bold text-2xl text-charcoal">{kpis.completed}</span>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6 shadow-soft flex items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-charcoal-muted font-bold mb-0.5">Approved Revenue</span>
            <span className="font-display font-bold text-2xl text-charcoal">${kpis.revenue.toFixed(2)} CAD</span>
          </div>
        </div>
      </section>

      {/* Main filter & table panel */}
      <section className="max-w-7xl mx-auto mt-10 px-6">
        <div className="bg-white border border-border rounded-3xl shadow-soft overflow-hidden">
          
          {/* Filters Bar */}
          <div className="p-6 border-b border-border flex flex-col md:flex-row gap-5 justify-between items-stretch md:items-center bg-white/50">
            
            {/* Left: Tab selectors */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {["All", "Pending", "Approved", "Completed", "Missed", "Rejected"].map((tab) => {
                const count = tab === "All" 
                  ? bookings.length 
                  : bookings.filter((b) => b.status.toLowerCase() === tab.toLowerCase()).length;
                
                return (
                  <button
                    key={tab}
                    onClick={() => setFilterTab(tab)}
                    className={`px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                      filterTab === tab
                        ? "bg-charcoal text-white shadow-soft"
                        : "bg-background border border-border hover:border-charcoal-muted/30 text-charcoal/70"
                    }`}
                  >
                    {tab} <span className="opacity-60 ml-1">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Right Actions: Search & Add */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search client, address, ID…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-5 py-2.5 rounded-xl border border-border outline-none focus:border-sage bg-background text-sm w-full sm:w-64 transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-muted/50" />
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-sage hover:bg-sage-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Plus className="h-4 w-4" /> Create Booking
              </button>
            </div>

          </div>

          {/* MANUAL CREATE FORM INLINE ACCORDION */}
          {showAddForm && (
            <div className="p-6 md:p-8 border-b border-border bg-sage-light/20 animate-fade-in">
              <h3 className="font-display font-bold text-lg text-charcoal mb-4 flex items-center gap-1.5">
                💼 Manually Log Client Appointment
              </h3>
              <form onSubmit={handleManualAddSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                  Client Name
                  <input
                    type="text"
                    required
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    placeholder="Jane Doe"
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                  Email Address
                  <input
                    type="email"
                    required
                    value={addEmail}
                    onChange={(e) => setAddEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                  Phone Number
                  <input
                    type="tel"
                    required
                    value={addPhone}
                    onChange={(e) => setAddPhone(e.target.value)}
                    placeholder="+1 (403) 555-1234"
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70 md:col-span-2">
                  Service Address
                  <input
                    type="text"
                    required
                    value={addAddress}
                    onChange={(e) => setAddAddress(e.target.value)}
                    placeholder="123 Main St SW, Calgary, AB"
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                  Appointment Date
                  <input
                    type="date"
                    required
                    value={addDate}
                    onChange={(e) => setAddDate(e.target.value)}
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                  Service Modality
                  <select
                    value={addService}
                    onChange={(e) => setAddService(e.target.value)}
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage cursor-pointer"
                  >
                    <option value="Swedish/Relaxation">Swedish/Relaxation</option>
                    <option value="Deep Tissue">Deep Tissue</option>
                    <option value="Therapeutic">Therapeutic</option>
                    <option value="Prenatal">Prenatal</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                  Duration (Mins)
                  <select
                    value={addDuration}
                    onChange={(e) => setAddDuration(Number(e.target.value))}
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage cursor-pointer"
                  >
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                    <option value={90}>90 Minutes</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                  Scheduled Time
                  <input
                    type="text"
                    required
                    value={addTime}
                    onChange={(e) => setAddTime(e.target.value)}
                    placeholder="e.g. 6:30 PM"
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                  Therapist preference
                  <select
                    value={addGender}
                    onChange={(e) => setAddGender(e.target.value)}
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage cursor-pointer"
                  >
                    <option value="no_preference">Either (No Preference)</option>
                    <option value="female">Female Therapist</option>
                    <option value="male">Male Therapist</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                  Number of Persons
                  <input
                    type="number"
                    min={1}
                    required
                    value={addPersons}
                    onChange={(e) => setAddPersons(Number(e.target.value))}
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-bold text-charcoal/70">
                  Dashboard Status
                  <select
                    value={addStatus}
                    onChange={(e) => setAddStatus(e.target.value)}
                    className="p-3 border border-border rounded-xl bg-white text-sm text-charcoal font-medium outline-none focus:border-sage cursor-pointer"
                  >
                    <option value="Pending">Pending Approval</option>
                    <option value="Approved">Approved / Booked</option>
                    <option value="Completed">Completed Session</option>
                    <option value="Missed">Missed Appointment</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </label>

                <div className="flex flex-col gap-3 justify-center pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-charcoal/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addBilling}
                      onChange={(e) => setAddBilling(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-sage focus:ring-sage checked:bg-sage"
                    />
                    Requires Direct Billing
                  </label>
                  {addBilling && (
                    <select
                      value={addInsurer}
                      onChange={(e) => setAddInsurer(e.target.value)}
                      className="p-2 border border-border rounded-xl bg-white text-xs font-medium outline-none focus:border-sage cursor-pointer"
                    >
                      <option value="Alberta Blue Cross">Alberta Blue Cross</option>
                      <option value="Sun Life">Sun Life Financial</option>
                      <option value="Manulife">Manulife Financial</option>
                      <option value="Canada Life">Canada Life</option>
                      <option value="Desjardins Insurance">Desjardins Insurance</option>
                      <option value="Cooperators">Cooperators</option>
                      <option value="Medavie Blue Cross">Medavie Blue Cross</option>
                      <option value="Other">Other Provider</option>
                    </select>
                  )}
                </div>

                <div className="md:col-span-3 flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-5 py-2.5 border border-border rounded-full text-xs uppercase tracking-widest font-bold text-charcoal/60 hover:bg-background"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2.5 bg-sage hover:bg-sage-hover text-white rounded-full text-xs uppercase tracking-widest font-bold shadow-sm"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* BOOKINGS TABLE */}
          {filteredBookings.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <AlertCircle className="h-10 w-10 text-charcoal-muted/30 mb-4" />
              <h4 className="font-display font-bold text-charcoal text-[17px]">No bookings found</h4>
              <p className="text-xs text-charcoal-muted mt-1">Try resetting the database or adjusting filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-background border-b border-border text-[10px] uppercase font-bold tracking-widest text-charcoal-muted/80">
                    <th className="py-4.5 px-6">ID / Created</th>
                    <th className="py-4.5 px-6">Client Profile</th>
                    <th className="py-4.5 px-6">Modality &amp; Duration</th>
                    <th className="py-4.5 px-6">Scheduled details</th>
                    <th className="py-4.5 px-6">Service Address</th>
                    <th className="py-4.5 px-6">Billing Info</th>
                    <th className="py-4.5 px-6">Status Status</th>
                    <th className="py-4.5 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-medium">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-background/40 transition-colors">
                      {/* Booking ID & Date Created */}
                      <td className="py-5 px-6 text-xs text-charcoal-muted font-light whitespace-nowrap">
                        <span className="font-display font-semibold text-charcoal text-[13px] block mb-1">{b.id}</span>
                        {new Date(b.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>

                      {/* Client profile */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-display text-[14px] font-bold text-charcoal">{b.name}</span>
                          <span className="text-[11.5px] text-charcoal-muted font-light flex items-center gap-1">
                            <Mail className="h-3 w-3 shrink-0 opacity-60" /> {b.email}
                          </span>
                          <span className="text-[11.5px] text-charcoal-muted font-light flex items-center gap-1">
                            <Phone className="h-3 w-3 shrink-0 opacity-60" /> {b.phone}
                          </span>
                        </div>
                      </td>

                      {/* Modality & Duration */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-charcoal text-xs font-bold uppercase tracking-wider">{b.serviceType}</span>
                          <span className="text-[11px] text-sage font-bold flex items-center gap-1.5 uppercase tracking-wide">
                            <Clock className="h-3 w-3 text-sage shrink-0" /> {b.duration} Minutes
                          </span>
                          <span className="text-[10px] text-charcoal-muted font-light italic">
                            Therapist preference: {b.therapistGender === "no_preference" ? "Either" : b.therapistGender}
                          </span>
                        </div>
                      </td>

                      {/* Scheduled Day / Time */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-display font-bold text-charcoal flex items-center gap-1 text-[13px]">
                            <Calendar className="h-3.5 w-3.5 text-sage shrink-0" />
                            {b.date ? new Date(b.date + "T00:00:00").toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric"
                            }) : "N/A"}
                          </span>
                          <span className="text-xs text-soft-blue-hover font-bold uppercase tracking-wide pl-4.5">
                            at {b.timeSlot}
                          </span>
                          <span className="text-[10.5px] text-charcoal-muted font-light uppercase tracking-widest pl-4.5">
                            {b.frequency === "one-time" ? "Single Session" : `${b.frequency}`}
                          </span>
                        </div>
                      </td>

                      {/* Location address */}
                      <td className="py-5 px-6 max-w-xs font-light text-xs text-charcoal-muted leading-relaxed">
                        <div className="flex items-start gap-1">
                          <MapPin className="h-3.5 w-3.5 text-sage shrink-0 mt-0.5" />
                          <span className="truncate block" title={b.address}>{b.address}</span>
                        </div>
                      </td>

                      {/* Pricing / Insurer */}
                      <td className="py-5 px-6 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-display font-bold text-charcoal text-sm">${b.totalAmount.toFixed(2)} CAD</span>
                          <span className="text-[10.5px] text-white bg-sage px-2 py-0.5 rounded-full inline-flex font-bold uppercase tracking-widest self-start mt-1">
                            {b.directBilling ? b.insurer : "Self-Pay"}
                          </span>
                          {b.personsCount > 1 && (
                            <span className="text-[9.5px] text-charcoal-muted italic font-light mt-0.5">
                              {b.personsCount}-person group booking
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Administrative status selection */}
                      <td className="py-5 px-6">
                        <div className="relative inline-block">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                            className={`pl-3.5 pr-8 py-1.5 text-xs font-extrabold uppercase tracking-widest rounded-xl border appearance-none cursor-pointer outline-none transition-all ${getStatusColor(
                              b.status
                            )} bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_8px_center] bg-no-repeat`}
                          >
                            <option value="Pending" className="bg-charcoal text-white">Pending</option>
                            <option value="Approved" className="bg-charcoal text-white">Approved</option>
                            <option value="Completed" className="bg-charcoal text-white">Completed</option>
                            <option value="Missed" className="bg-charcoal text-white">Missed</option>
                            <option value="Rejected" className="bg-charcoal text-white">Rejected</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions (Delete) */}
                      <td className="py-5 px-6 text-center">
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          title="Delete Booking Record"
                          className="h-8 w-8 rounded-full border border-border hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 text-charcoal-muted flex items-center justify-center transition-all mx-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* List stats footer */}
          <div className="bg-background/60 p-4 border-t border-border text-center text-xs text-charcoal-muted">
            Displaying {filteredBookings.length} booking record{filteredBookings.length === 1 ? "" : "s"}. Stored in local browser context database.
          </div>

        </div>
      </section>

    </div>
  );
}
