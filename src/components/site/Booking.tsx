import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  Users,
  MapPin,
  Clock,
  User,
  Globe,
  Sparkles,
  Percent,
  RefreshCw,
  Map,
  ShieldCheck,
  Check
} from "lucide-react";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  // Form states
  const [serviceType, setServiceType] = useState("Swedish/Relaxation");
  const [duration, setDuration] = useState(90); // default 90 min (recommended)
  const [therapistGender, setTherapistGender] = useState("no_preference");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [personsCount, setPersonsCount] = useState(1);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [directBilling, setDirectBilling] = useState(false);
  const [insurer, setInsurer] = useState("Alberta Blue Cross");

  // Geolocation fetching state
  const [locating, setLocating] = useState(false);

  // Calendar state
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("avion_booking_flow");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.serviceType) setServiceType(data.serviceType);
        if (data.duration) setDuration(Number(data.duration));
        if (data.therapistGender) setTherapistGender(data.therapistGender);
        if (data.date) setDate(data.date);
        if (data.timeSlot) setTimeSlot(data.timeSlot);
        if (data.frequency) setFrequency(data.frequency);
        if (data.personsCount) setPersonsCount(Number(data.personsCount));
        if (data.address) setAddress(data.address);
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.countryCode) setCountryCode(data.countryCode);
        if (data.directBilling !== undefined) setDirectBilling(data.directBilling);
        if (data.insurer) setInsurer(data.insurer);
        if (data.step) setStep(Number(data.step));
      } catch (e) {
        console.error("Error loading booking cache:", e);
      }
    }
  }, []);

  // Save state to localStorage on any change
  useEffect(() => {
    const data = {
      serviceType,
      duration,
      therapistGender,
      date,
      timeSlot,
      frequency,
      personsCount,
      address,
      name,
      email,
      phone,
      countryCode,
      directBilling,
      insurer,
      step,
    };
    localStorage.setItem("avion_booking_flow", JSON.stringify(data));
  }, [
    serviceType,
    duration,
    therapistGender,
    date,
    timeSlot,
    frequency,
    personsCount,
    address,
    name,
    email,
    phone,
    countryCode,
    directBilling,
    insurer,
    step,
  ]);

  const resetForm = () => {
    localStorage.removeItem("avion_booking_flow");
    setServiceType("Swedish/Relaxation");
    setDuration(90);
    setTherapistGender("no_preference");
    setDate("");
    setTimeSlot("");
    setFrequency("one-time");
    setPersonsCount(1);
    setAddress("");
    setName("");
    setEmail("");
    setPhone("");
    setCountryCode("+1");
    setDirectBilling(false);
    setInsurer("Alberta Blue Cross");
    setStep(1);
    setSubmitted(false);
  };

  // Pricing calculations
  const getBasePrice = () => {
    if (duration === 60) return 120;
    if (duration === 90) return 165;
    return 220; // 120 min
  };

  const getDiscountRate = () => {
    if (personsCount === 2) return 0.10; // 10%
    if (personsCount === 3) return 0.15; // 15%
    if (personsCount >= 4) return 0.20; // 20%
    return 0;
  };

  const basePrice = getBasePrice();
  const subtotal = basePrice * personsCount;
  const discountRate = getDiscountRate();
  const discountAmount = subtotal * discountRate;
  const totalAmount = subtotal - discountAmount;

  // Format Date beautifully
  const formatSelectedDate = () => {
    if (!date) return "";
    return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Browser Geolocation
  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Fetch reverse geocode from OpenStreetMap (Nominatim API)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          if (data && data.display_name) {
            // Shorten coordinates if too long or use returned address
            setAddress(data.display_name);
          } else {
            setAddress(`Calgary, AB (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          }
        } catch (error) {
          console.error("OSM Geocoding Error:", error);
          setAddress(`Calgary, AB (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation Error:", error);
        alert("Unable to get your location. Please check browser location permissions.");
        setLocating(false);
      }
    );
  };

  // Submit flow
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDateString = formatSelectedDate();
    const frequencyLabel = frequency === "one-time" ? "One-Time Session" : `Regular (${frequency})`;

    const message = `*Avion Mobile Massage Booking Inquiry*
----------------------------------------
*Service Type:* ${serviceType}
*Session Duration:* ${duration} Min
*Therapist Gender:* ${
      therapistGender === "female"
        ? "Female Therapist"
        : therapistGender === "male"
        ? "Male Therapist"
        : "Either (No Preference)"
    }
*Date & Time:* ${formattedDateString} at ${timeSlot}
*Frequency:* ${frequencyLabel}
*Group Size:* ${personsCount} Person${personsCount > 1 ? "s" : ""}
*Service Location:* ${address}

*Client Details:*
- Client Name: ${name}
- Email Address: ${email}
- Contact Phone: ${countryCode} ${phone}
- Direct Billing: ${directBilling ? `Yes - ${insurer}` : "No (Self-pay)"}

*Pricing Summary:*
- Session Base Price: $${basePrice} CAD
- Subtotal: $${subtotal} CAD
- Group Discount Applied: ${discountRate * 100}% (-$${discountAmount.toFixed(2)} CAD)
- *Estimated Total:* $${totalAmount.toFixed(2)} CAD`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/14039230323?text=${encoded}`;

    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
    // Clear cache upon successful submit
    localStorage.removeItem("avion_booking_flow");
  };

  // Custom Calendar Generator
  const generateDays = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    
    // First day of month index (0-6)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Total days in month
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Placeholders for previous month alignment
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    // Days of current month
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const changeMonth = (offset: number) => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + offset, 1));
  };

  const isDateSelected = (day: Date) => {
    if (!date) return false;
    const [y, m, d] = date.split("-").map(Number);
    return day.getFullYear() === y && day.getMonth() === m - 1 && day.getDate() === d;
  };

  const handleDateSelect = (day: Date) => {
    const y = day.getFullYear();
    const m = String(day.getMonth() + 1).padStart(2, "0");
    const d = String(day.getDate()).padStart(2, "0");
    setDate(`${y}-${m}-${d}`);
  };

  const isDateInPast = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Map Embed URL
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    address || "Calgary, AB"
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  // Time Slots definitions
  const timeSlots = [
    { time: "9:00 AM", label: "Morning" },
    { time: "10:30 AM", label: "Morning" },
    { time: "12:00 PM", label: "Midday" },
    { time: "1:30 PM", label: "Afternoon" },
    { time: "3:00 PM", label: "Afternoon" },
    { time: "4:30 PM", label: "Late Afternoon" },
    { time: "6:00 PM", label: "Evening Slot", priority: true },
    { time: "7:30 PM", label: "Evening Slot", priority: true },
  ];

  // Helper validation per step
  const canGoNext = () => {
    if (step === 1) return serviceType && duration && therapistGender;
    if (step === 2) return date && timeSlot;
    if (step === 3) return frequency && personsCount > 0;
    if (step === 4) return address.trim().length > 5;
    if (step === 5) return name.trim().length > 1 && email.includes("@") && phone.trim().length >= 7;
    return true;
  };

  const nextStep = () => {
    if (canGoNext()) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <section id="book" className="w-full py-28 md:py-36 px-6 bg-charcoal text-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute top-0 right-0 w-[480px] h-[480px] bg-sage rounded-full blur-[120px] opacity-20" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] bg-soft-blue rounded-full blur-[120px] opacity-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-soft-blue tracking-[0.32em] uppercase text-[11px] font-semibold mb-4">
            Easy Online Scheduling
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-soft-blue">
            Book a <span className="italic font-serif font-medium text-white">Session</span>
          </h2>
          <p className="mt-5 text-white/60 max-w-xl mx-auto text-[15px] leading-relaxed">
            Select your preferences below to reserve your custom RMT session. We will handle claim filing, travel setup, and match you with a certified therapist.
          </p>
        </div>

        {submitted ? (
          <div className="py-20 text-center flex flex-col items-center bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-premium max-w-2xl mx-auto animate-fade-in">
            <div className="h-16 w-16 rounded-full bg-sage/20 border border-sage flex items-center justify-center mb-6 text-sage animate-bounce">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="font-display text-3xl font-bold text-soft-blue">
              Booking Inquiry <span className="italic font-serif font-medium text-white">Prefilled</span>
            </h3>
            <p className="mt-4 text-[15.5px] text-white/70 max-w-md leading-relaxed">
              We have opened WhatsApp to send your complete booking inquiry. If it didn't open or you need to start over, click the button below. We will reach back shortly to confirm your booking!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleFinalSubmit}
                className="inline-flex items-center gap-2 bg-sage hover:bg-sage-hover text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              >
                <MessageCircle className="h-4 w-4" /> Re-open WhatsApp
              </button>
              <button
                onClick={resetForm}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              >
                <RefreshCw className="h-4 w-4" /> New Booking
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md shadow-premium">
            
            {/* Step Progress Indicators */}
            <div className="flex border-b border-white/10 overflow-x-auto scrollbar-none select-none py-4 px-6 gap-6 justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/40">
              {[
                { s: 1, label: "Service" },
                { s: 2, label: "Schedule" },
                { s: 3, label: "Quantity" },
                { s: 4, label: "Location" },
                { s: 5, label: "Contact" },
                { s: 6, label: "Review" },
              ].map((item) => (
                <div
                  key={item.s}
                  onClick={() => item.s < step && setStep(item.s)}
                  className={`flex items-center gap-2 cursor-pointer transition-colors ${
                    step === item.s
                      ? "text-soft-blue font-extrabold"
                      : item.s < step
                      ? "text-sage hover:text-sage-hover"
                      : "cursor-not-allowed text-white/25"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] border transition-all ${
                      step === item.s
                        ? "border-soft-blue bg-soft-blue/10 text-soft-blue"
                        : item.s < step
                        ? "border-sage bg-sage text-white"
                        : "border-white/10 text-white/20"
                    }`}
                  >
                    {item.s < step ? <Check className="h-3 w-3" /> : item.s}
                  </span>
                  <span className="hidden sm:inline whitespace-nowrap">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Form Step Body */}
            <div className="p-6 md:p-10 min-h-[350px]">
              
              {/* STEP 1: SERVICE & DURATION */}
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5 text-sage" /> Choose Service Type
                    </h3>
                    <p className="text-white/60 text-xs tracking-wider uppercase mb-5">
                      All therapists are fully licensed, insured, and certified RMTs.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          name: "Swedish/Relaxation",
                          tagline: "Stress relief & ultimate calming flow",
                          desc: "A flowing session designed to calm the nervous system and quiet mind."
                        },
                        {
                          name: "Deep Tissue",
                          tagline: "Chronic tension & muscle release",
                          desc: "Targeted focus on deeper layers of muscle to break up tight knots."
                        },
                        {
                          name: "Therapeutic",
                          tagline: "Injury recovery & dynamic mobility",
                          desc: "Personalized treatments focusing on range of motion and pain patterns."
                        },
                        {
                          name: "Prenatal",
                          tagline: "Safe prenatal care for mothers",
                          desc: "Comfortable, specialized side-lying support for expectant moms."
                        }
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setServiceType(item.name)}
                          className={`text-left p-5 rounded-2xl border transition-all relative ${
                            serviceType === item.name
                              ? "bg-sage/10 border-sage shadow-md text-white"
                              : "bg-white/5 border-white/10 hover:border-white/30 text-white/80"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-display font-semibold text-[15.5px]">{item.name}</span>
                            {serviceType === item.name && (
                              <span className="h-4 w-4 rounded-full bg-sage flex items-center justify-center text-white">
                                <Check className="h-2.5 w-2.5" />
                              </span>
                            )}
                          </div>
                          <span className="block text-[11px] font-semibold tracking-wider text-sage mb-2 uppercase">
                            {item.tagline}
                          </span>
                          <span className="block text-xs text-white/50 leading-relaxed font-light">
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-sage" /> Select Session Duration
                    </h3>
                    <p className="text-white/60 text-xs tracking-wider uppercase mb-5">
                      Prices match basic Canadian RMT service rates. No travel fees are added.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          min: 60,
                          price: 120,
                          rec: "Targeted focus / quick reset",
                          desc: "Best for targeting one or two specific areas (e.g. neck & shoulders) or a quick overall muscle flush."
                        },
                        {
                          min: 90,
                          price: 165,
                          rec: "Highly Recommended Sweet Spot",
                          desc: "Allows the therapist to deliver a comprehensive full-body session while addressing specific areas of deep tightness.",
                          recommended: true
                        },
                        {
                          min: 120,
                          price: 220,
                          rec: "Ultimate therapeutic restoration",
                          desc: "Perfect for deep recovery, long-standing chronic tightness, or severe stiffness requiring slow, extended attention."
                        }
                      ].map((item) => (
                        <button
                          key={item.min}
                          type="button"
                          onClick={() => setDuration(item.min)}
                          className={`text-left p-5 rounded-2xl border transition-all relative ${
                            duration === item.min
                              ? "bg-sage/10 border-sage shadow-md text-white"
                              : "bg-white/5 border-white/10 hover:border-white/30 text-white/80"
                          }`}
                        >
                          {item.recommended && (
                            <span className="absolute -top-3 left-4 bg-sage text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-charcoal">
                              Recommended
                            </span>
                          )}
                          <div className="flex justify-between items-baseline mb-2 mt-1">
                            <span className="font-display font-bold text-lg">{item.min} Minutes</span>
                            <span className="font-display font-semibold text-base text-sage">${item.price} CAD</span>
                          </div>
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-soft-blue mb-2.5">
                            {item.rec}
                          </span>
                          <p className="text-xs text-white/50 leading-relaxed font-light">
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-4">
                      <User className="h-5 w-5 text-sage" /> Therapist Gender Preference
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "no_preference", label: "Either (No Preference)", desc: "Match with first available therapist." },
                        { id: "female", label: "Female Therapist", desc: "Registered female therapist." },
                        { id: "male", label: "Male Therapist", desc: "Registered male therapist." }
                      ].map((pref) => (
                        <button
                          key={pref.id}
                          type="button"
                          onClick={() => setTherapistGender(pref.id)}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            therapistGender === pref.id
                              ? "bg-sage/10 border-sage text-white"
                              : "bg-white/5 border-white/10 hover:border-white/30 text-white/70"
                          }`}
                        >
                          <div className="font-display font-semibold text-sm mb-1">{pref.label}</div>
                          <div className="text-[11px] text-white/45 font-light">{pref.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: DATE & TIME SELECTOR */}
              {step === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in">
                  
                  {/* Calendar Widget */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-display text-lg font-bold text-soft-blue flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-sage" /> Select Date
                      </h3>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => changeMonth(-1)}
                          className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80 disabled:opacity-30 disabled:pointer-events-none"
                          disabled={
                            calendarDate.getFullYear() === new Date().getFullYear() &&
                            calendarDate.getMonth() === new Date().getMonth()
                          }
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-display text-sm font-semibold self-center px-2">
                          {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeMonth(1)}
                          className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 py-1">
                      <span>Su</span>
                      <span>Mo</span>
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {generateDays().map((day, idx) => {
                        if (!day) {
                          return <div key={`empty-${idx}`} className="aspect-square" />;
                        }
                        
                        const selected = isDateSelected(day);
                        const disabled = isDateInPast(day);
                        
                        return (
                          <button
                            key={day.toISOString()}
                            type="button"
                            disabled={disabled}
                            onClick={() => handleDateSelect(day)}
                            className={`aspect-square rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                              selected
                                ? "bg-sage text-white font-bold scale-105"
                                : disabled
                                ? "text-white/10 cursor-not-allowed"
                                : "bg-white/5 border border-white/5 text-white hover:border-sage hover:bg-white/10"
                            }`}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>

                    {date && (
                      <p className="mt-4 text-xs text-sage font-medium">
                        Selected date: <span className="underline">{formatSelectedDate()}</span>
                      </p>
                    )}
                  </div>

                  {/* Time Slots grid */}
                  <div>
                    <h3 className="font-display text-lg font-bold text-soft-blue flex items-center gap-2 mb-5">
                      <Clock className="h-4 w-4 text-sage" /> Pick Time Slot
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => {
                        const isSelected = timeSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setTimeSlot(slot.time)}
                            className={`p-4 rounded-xl border text-center transition-all relative ${
                              isSelected
                                ? "bg-sage/15 border-sage text-white font-bold shadow-md"
                                : "bg-white/5 border-white/10 hover:border-white/30 text-white/70"
                            }`}
                          >
                            <div className="font-display text-sm font-semibold">{slot.time}</div>
                            <div className="text-[10px] text-white/40 mt-1 uppercase tracking-wider font-light flex items-center justify-center gap-1">
                              {slot.priority && <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />}
                              {slot.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/15 text-xs text-white/60 leading-relaxed font-light">
                      <span className="font-semibold text-soft-blue uppercase block mb-1">Evening &amp; Weekend Booking Note</span>
                      Avion's evening (6:00 PM onwards) and weekend sessions book out quickly. We hold your chosen slot for up to 10 minutes while you finalize this inquiry.
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 3: FREQUENCY & QUANTITY */}
              {step === 3 && (
                <div className="space-y-10 animate-fade-in">
                  
                  {/* Frequency of bookings */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-2">
                      <RefreshCw className="h-5 w-5 text-sage" /> Booking Frequency
                    </h3>
                    <p className="text-white/60 text-xs tracking-wider uppercase mb-5">
                      Select if this is a one-time session or if you'd like to lock in this recurring schedule.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {[
                        { id: "one-time", label: "One-Time", desc: "Just single session" },
                        { id: "weekly", label: "Weekly", desc: "Hold same slot weekly" },
                        { id: "bi-weekly", label: "Bi-Weekly", desc: "Hold slot bi-weekly" },
                        { id: "monthly", label: "Monthly", desc: "Hold slot monthly" },
                      ].map((freq) => (
                        <button
                          key={freq.id}
                          type="button"
                          onClick={() => setFrequency(freq.id)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            frequency === freq.id
                              ? "bg-sage/10 border-sage text-white"
                              : "bg-white/5 border-white/10 hover:border-white/30 text-white/70"
                          }`}
                        >
                          <div className="font-display font-semibold text-sm mb-1">{freq.label}</div>
                          <div className="text-[11px] text-white/45 font-light">{freq.desc}</div>
                        </button>
                      ))}
                    </div>
                    {frequency !== "one-time" && (
                      <p className="mt-3 text-xs text-sage leading-relaxed font-light">
                        <strong>🔒 Reserved Slot:</strong> We will hold this exact day and time slot for you recurringly. You are under no contract; change frequency or cancel any future sessions at your convenience.
                      </p>
                    )}
                  </div>

                  {/* Persons / Quantities with discount */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-sage" /> Number of Persons
                    </h3>
                    <p className="text-white/60 text-xs tracking-wider uppercase mb-5">
                      Save on travel costs by booking back-to-back sessions at the same address.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {[
                        { count: 1, label: "1 Person", note: "Standard rate" },
                        { count: 2, label: "2 Persons", note: "Save 10% total", discount: "10% Off" },
                        { count: 3, label: "3 Persons", note: "Save 15% total", discount: "15% Off" },
                        { count: 4, label: "4+ Persons", note: "Save 20% total", discount: "20% Off" },
                      ].map((item) => (
                        <button
                          key={item.count}
                          type="button"
                          onClick={() => setPersonsCount(item.count)}
                          className={`p-5 rounded-2xl border text-left transition-all relative ${
                            personsCount === item.count
                              ? "bg-sage/10 border-sage text-white"
                              : "bg-white/5 border-white/10 hover:border-white/30 text-white/70"
                          }`}
                        >
                          {item.discount && (
                            <span className="absolute top-3 right-3 bg-sage text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                              {item.discount}
                            </span>
                          )}
                          <div className="font-display font-bold text-lg mb-1">{item.label}</div>
                          <div className="text-xs text-white/45 font-light">{item.note}</div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                      <Percent className="h-6 w-6 text-sage shrink-0 mt-0.5" />
                      <div className="text-xs leading-relaxed text-white/60 font-light">
                        <span className="font-semibold text-soft-blue uppercase block mb-1">Group Booking Discount Explanation</span>
                        Since mobile massage RMTs spend significant time and transport overhead traveling between locations, booking multiple sessions sequentially in the same house is much more efficient. We pass these resource savings directly back to you as an automatic discount.
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 4: LOCATION & ADDRESS MAP PICKER */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-sage" /> Service Location
                    </h3>
                    <p className="text-white/60 text-xs tracking-wider uppercase mb-5">
                      Tell us where we should set up our tables. Must be in Calgary or nearby limits.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your street address, city (e.g. 123 Main St, Calgary, AB)"
                          className="w-full bg-white/5 border border-white/15 rounded-2xl pl-6 pr-12 py-4 text-[15px] text-white placeholder-white/30 outline-none focus:border-sage transition-colors"
                        />
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
                      </div>
                      <button
                        type="button"
                        onClick={handleGeolocate}
                        disabled={locating}
                        className="bg-white/10 border border-white/15 hover:bg-white/20 text-white rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest shrink-0 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {locating ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Locating…
                          </>
                        ) : (
                          <>
                            <Globe className="h-3.5 w-3.5" /> Use My Location
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* OpenStreetMap Map Embed */}
                  <div>
                    <p className="text-xs text-white/40 tracking-wider uppercase mb-2">
                      Live Map Verification
                    </p>
                    <div className="w-full h-60 md:h-72 rounded-2xl overflow-hidden border border-white/10 relative bg-white/5 shadow-inner">
                      <iframe
                        title="Service Location Address Map Preview"
                        width="100%"
                        height="100%"
                        src={mapEmbedUrl}
                        className="border-0 opacity-80"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-2 text-[10px] text-white/35 font-light text-right flex items-center justify-end gap-1">
                      <Map className="h-3 w-3" /> Address matched on verified geographic coordinates.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 5: CONTACT DETAILS & DIRECT INSURANCE BILLING */}
              {step === 5 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/50 px-2">
                        Full Name
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        required
                        className="w-full bg-white/5 border border-white/15 rounded-2xl px-6 py-4 text-[15px] text-white placeholder-white/30 outline-none focus:border-sage transition-colors"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/50 px-2">
                        Email Address
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        required
                        className="w-full bg-white/5 border border-white/15 rounded-2xl px-6 py-4 text-[15px] text-white placeholder-white/30 outline-none focus:border-sage transition-colors"
                      />
                    </label>

                    <label className="flex flex-col gap-2 md:col-span-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/50 px-2">
                        Phone Number
                      </span>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-white/5 border border-white/15 rounded-2xl px-4 py-4 text-xs font-bold text-white outline-none focus:border-sage transition-colors cursor-pointer shrink-0"
                        >
                          <option value="+1" className="bg-charcoal text-white">🇨🇦 CA (+1)</option>
                          <option value="+1-US" className="bg-charcoal text-white">🇺🇸 US (+1)</option>
                          <option value="+44" className="bg-charcoal text-white">🇬🇧 UK (+44)</option>
                          <option value="+61" className="bg-charcoal text-white">🇦🇺 AU (+61)</option>
                          <option value="+91" className="bg-charcoal text-white">🇮🇳 IN (+91)</option>
                        </select>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(403) 555-0199"
                          required
                          className="w-full flex-1 bg-white/5 border border-white/15 rounded-2xl px-6 py-4 text-[15px] text-white placeholder-white/30 outline-none focus:border-sage transition-colors"
                        />
                      </div>
                    </label>
                  </div>

                  {/* Direct Insurance Billing Option */}
                  <div className="border-t border-white/10 pt-8 mt-4">
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-center h-6 shrink-0">
                        <input
                          id="direct-billing-check"
                          type="checkbox"
                          checked={directBilling}
                          onChange={(e) => setDirectBilling(e.target.checked)}
                          className="h-4.5 w-4.5 rounded border-white/20 bg-transparent text-sage focus:ring-sage checked:bg-sage focus:ring-2 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="direct-billing-check" className="font-display font-bold text-[15.5px] text-white cursor-pointer select-none">
                          Request Direct Insurance Billing
                        </label>
                        <span className="block text-xs text-white/50 leading-relaxed font-light mt-1.5">
                          Check this box if you have an extended health insurance policy and wish to submit this claim directly. Avion RMTs bill most providers directly in Alberta.
                        </span>
                      </div>
                    </div>

                    {directBilling && (
                      <div className="mt-5 p-5 rounded-2xl bg-sage/5 border border-sage/30 animate-fade-in space-y-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-sage">
                            Select Insurance Provider
                          </span>
                          <select
                            value={insurer}
                            onChange={(e) => setInsurer(e.target.value)}
                            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sage transition-colors cursor-pointer"
                          >
                            <option value="Alberta Blue Cross" className="bg-charcoal text-white">Alberta Blue Cross</option>
                            <option value="Sun Life" className="bg-charcoal text-white">Sun Life Financial</option>
                            <option value="Manulife" className="bg-charcoal text-white">Manulife Financial</option>
                            <option value="Canada Life" className="bg-charcoal text-white">Canada Life</option>
                            <option value="Desjardins Insurance" className="bg-charcoal text-white">Desjardins Insurance</option>
                            <option value="Green Shield Canada" className="bg-charcoal text-white">Green Shield Canada</option>
                            <option value="Equitable Life" className="bg-charcoal text-white">Equitable Life</option>
                            <option value="Empire Life" className="bg-charcoal text-white">Empire Life</option>
                            <option value="ClaimSecure" className="bg-charcoal text-white">ClaimSecure</option>
                            <option value="Other" className="bg-charcoal text-white">Other Provider (Specify in notes)</option>
                          </select>
                        </div>
                        <div className="flex gap-2 text-[11px] text-white/50 leading-relaxed font-light">
                          <ShieldCheck className="h-4 w-4 text-sage shrink-0" />
                          <span>We will request your health claim information via email/SMS to file on your behalf. Direct billing is subject to individual policy limits.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 6: SUMMARY REVIEW & SUBMIT */}
              {step === 6 && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-sage" /> Verify Appointment Summary
                  </h3>
                  <p className="text-white/60 text-xs tracking-wider uppercase mb-6">
                    Review your details below before launching the secure booking inquiry.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 border border-white/10 rounded-2xl p-6">
                    
                    {/* Selected Info Summary */}
                    <div className="space-y-4 text-sm font-medium">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Service &amp; Modality</span>
                        <span className="text-white text-base font-bold">{serviceType} Massage</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Duration</span>
                          <span className="text-white">{duration} Minutes</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Therapist preference</span>
                          <span className="text-white capitalize">
                            {therapistGender === "no_preference" ? "Either/No preference" : `${therapistGender}`}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Scheduled Date</span>
                          <span className="text-white">{formatSelectedDate()}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Time Slot</span>
                          <span className="text-white">{timeSlot}</span>
                        </div>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Booking frequency</span>
                        <span className="text-white capitalize">{frequency === "one-time" ? "One-time session" : `Regular (${frequency})`}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Service Address</span>
                        <span className="text-white block truncate max-w-sm">{address}</span>
                      </div>
                    </div>

                    {/* Costing Breakdowns */}
                    <div className="border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs text-white/60 font-light">
                          <span>Base Rate per person</span>
                          <span>${basePrice}.00 CAD</span>
                        </div>
                        <div className="flex justify-between text-xs text-white/60 font-light">
                          <span>Quantity booked ({personsCount} person{personsCount > 1 ? "s" : ""})</span>
                          <span>x {personsCount}</span>
                        </div>
                        <div className="flex justify-between text-xs text-white/60 font-light border-b border-white/5 pb-2">
                          <span>Raw Subtotal</span>
                          <span>${subtotal}.00 CAD</span>
                        </div>
                        {personsCount > 1 && (
                          <div className="flex justify-between text-xs text-sage font-bold">
                            <span>Group Discount ({discountRate * 100}%)</span>
                            <span>-${discountAmount.toFixed(2)} CAD</span>
                          </div>
                        )}
                        {directBilling && (
                          <div className="flex justify-between text-[11px] text-soft-blue font-semibold bg-white/5 p-2 rounded-lg border border-white/5">
                            <span>Submit insurance claim to</span>
                            <span>{insurer}</span>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-white/10 pt-4 mt-4">
                        <div className="flex justify-between items-baseline mb-2">
                          <span className="text-xs uppercase tracking-wider text-white/40 font-bold">Estimated Total</span>
                          <span className="font-display font-bold text-2xl text-soft-blue">${totalAmount.toFixed(2)} CAD</span>
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/35 font-light">
                          *Tax included. Final pricing is confirmed on check-in. If claim submission fails, receipts will be provided.
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Wizard Navigation Action Bar */}
            <div className="border-t border-white/10 py-5 px-6 flex justify-between items-center bg-white/5">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="group flex items-center gap-2 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors py-2"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                )}
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-white/40 hover:text-white/70 text-[10px] font-bold uppercase tracking-widest transition-colors px-3 py-2"
                >
                  Start Over
                </button>
                
                {step < 6 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canGoNext()}
                    className="group inline-flex items-center gap-2 bg-sage hover:bg-sage-hover disabled:bg-white/10 disabled:text-white/30 disabled:border-white/5 text-white px-7 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:shadow-premium"
                  >
                    Next Step <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="group inline-flex items-center gap-2 bg-sage hover:bg-sage-hover text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all shadow-premium"
                  >
                    Submit Booking <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Support Grid Footer */}
        <div className="mt-20 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <ContactPill icon={Phone} label="Call us" value="+1 (403) 923-0323" href="tel:+14039230323" />
          <ContactPill icon={MessageCircle} label="WhatsApp" value="+1 (403) 923-0323" href="https://wa.me/14039230323" external />
          <ContactPill icon={Mail} label="Email us" value="avionmobilemassage@outlook.com" href="mailto:avionmobilemassage@outlook.com" />
        </div>
      </div>
    </section>
  );
}

function ContactPill({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-soft-blue group-hover:bg-sage group-hover:text-white group-hover:border-sage transition-all">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold">{label}</span>
      <span className="font-display font-medium text-white group-hover:text-soft-blue transition-colors break-all text-[14px]">
        {value}
      </span>
    </a>
  );
}
