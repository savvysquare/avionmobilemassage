import React, { useState, useEffect, useRef } from "react";
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
  Check,
  ChevronDown,
  Upload,
  UserCheck
} from "lucide-react";
import { scrollToSection } from "@/lib/scrollTo";
import { db, PricingOption } from "@/lib/db";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [directBilling, setDirectBilling] = useState(false);
  const [insurer, setInsurer] = useState("Alberta Blue Cross");
  const [otherInsurer, setOtherInsurer] = useState("");
  
  // Insurance specific fields
  const [groupNo, setGroupNo] = useState("");
  const [memberId, setMemberId] = useState("");
  const [patientCode, setPatientCode] = useState("");
  const [dob, setDob] = useState("");
  const [cardFileName, setCardFileName] = useState("");

  const [serviceType, setServiceType] = useState("Swedish/Relaxation");
  const [duration, setDuration] = useState(60); 

  const [therapistGender, setTherapistGender] = useState("no_preference");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [personsCount, setPersonsCount] = useState(1);
  const [sessionsCount, setSessionsCount] = useState(1); // Package sessions: 1, 2, 3, 4
  const [address, setAddress] = useState("");

  // Returning client state
  const [isReturning, setIsReturning] = useState(false);
  const [returningSearchEmail, setReturningSearchEmail] = useState("");
  const [returningStatus, setReturningStatus] = useState<"idle" | "found" | "not_found">("idle");

  // Geolocation fetching state
  const [locating, setLocating] = useState(false);

  // Calendar state
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Pricing state loaded from DB
  const [pricingTiers, setPricingTiers] = useState<PricingOption[]>([]);

  useEffect(() => {
    setPricingTiers(db.getPricing());
  }, []);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("avion_booking_flow");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.countryCode) setCountryCode(data.countryCode);
        if (data.directBilling !== undefined) setDirectBilling(data.directBilling);
        if (data.insurer) setInsurer(data.insurer);
        if (data.otherInsurer) setOtherInsurer(data.otherInsurer);
        if (data.groupNo) setGroupNo(data.groupNo);
        if (data.memberId) setMemberId(data.memberId);
        if (data.patientCode) setPatientCode(data.patientCode);
        if (data.dob) setDob(data.dob);
        if (data.cardFileName) setCardFileName(data.cardFileName);
        
        if (data.serviceType) setServiceType(data.serviceType);
        if (data.duration) setDuration(Number(data.duration));
        if (data.therapistGender) setTherapistGender(data.therapistGender);
        if (data.date) setDate(data.date);
        if (data.timeSlot) setTimeSlot(data.timeSlot);
        if (data.frequency) setFrequency(data.frequency);
        if (data.personsCount) setPersonsCount(Number(data.personsCount));
        if (data.sessionsCount) setSessionsCount(Number(data.sessionsCount));
        if (data.address) setAddress(data.address);
        if (data.step) setStep(Number(data.step));
      } catch (e) {
        console.error("Error loading booking cache:", e);
      }
    }
  }, []);

  // Save state to localStorage on any change
  useEffect(() => {
    const data = {
      name,
      email,
      phone,
      countryCode,
      directBilling,
      insurer,
      otherInsurer,
      groupNo,
      memberId,
      patientCode,
      dob,
      cardFileName,
      serviceType,
      duration,
      therapistGender,
      date,
      timeSlot,
      frequency,
      personsCount,
      sessionsCount,
      address,
      step,
    };
    localStorage.setItem("avion_booking_flow", JSON.stringify(data));
  }, [
    name,
    email,
    phone,
    countryCode,
    directBilling,
    insurer,
    otherInsurer,
    groupNo,
    memberId,
    patientCode,
    dob,
    cardFileName,
    serviceType,
    duration,
    therapistGender,
    date,
    timeSlot,
    frequency,
    personsCount,
    sessionsCount,
    address,
    step,
  ]);

  // Adjust duration if no longer valid for selected service type
  useEffect(() => {
    if (serviceType === "Corporate Wellness") {
      if (duration !== 15 && duration !== 30) {
        setDuration(30);
      }
    } else {
      // For core services, make sure duration is valid RMT tier
      if (!pricingTiers.some(tier => tier.min === duration)) {
        setDuration(60);
      }
    }
  }, [serviceType, pricingTiers]);

  const resetForm = () => {
    localStorage.removeItem("avion_booking_flow");
    setName("");
    setEmail("");
    setPhone("");
    setCountryCode("+1");
    setDirectBilling(false);
    setInsurer("Alberta Blue Cross");
    setOtherInsurer("");
    setGroupNo("");
    setMemberId("");
    setPatientCode("");
    setDob("");
    setCardFileName("");
    setServiceType("Swedish/Relaxation");
    setDuration(60);
    setTherapistGender("no_preference");
    setDate("");
    setTimeSlot("");
    setFrequency("one-time");
    setPersonsCount(1);
    setSessionsCount(1);
    setAddress("");
    setStep(1);
    setIsReturning(false);
    setReturningStatus("idle");
    setReturningSearchEmail("");
    setSubmitted(false);
  };

  // Check Local Storage for returning client profile matching search email
  const handleCheckReturningClient = () => {
    if (!returningSearchEmail || !returningSearchEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Check returning client cache first
    const returningCached = localStorage.getItem("avion_returning_client_data");
    if (returningCached) {
      try {
        const client = JSON.parse(returningCached);
        if (client.email.toLowerCase().trim() === returningSearchEmail.toLowerCase().trim()) {
          setName(client.name);
          setEmail(client.email);
          setPhone(client.phone);
          if (client.countryCode) setCountryCode(client.countryCode);
          if (client.address) setAddress(client.address);
          setReturningStatus("found");
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Check global bookings list to find last booking under this email
    const bookingsList = localStorage.getItem("avion_all_bookings");
    if (bookingsList) {
      try {
        const list = JSON.parse(bookingsList);
        const match = list.find((b: any) => b.email.toLowerCase().trim() === returningSearchEmail.toLowerCase().trim());
        if (match) {
          setName(match.name);
          setEmail(match.email);
          // Split phone if it contains code
          const phoneClean = match.phone.replace(/^\+1\s*/, "");
          setPhone(phoneClean);
          setCountryCode("+1");
          if (match.address) setAddress(match.address);
          setReturningStatus("found");
          
          // Cache this for quick lookup later
          localStorage.setItem("avion_returning_client_data", JSON.stringify({
            name: match.name,
            email: match.email,
            phone: phoneClean,
            countryCode: "+1",
            address: match.address
          }));
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    setReturningStatus("not_found");
  };

  // Pricing calculations
  const getBasePrice = () => {
    if (serviceType === "Corporate Wellness") {
      return duration === 15 ? 45 : 80;
    }
    const tier = pricingTiers.find(t => t.min === duration);
    if (!tier) return 130; // standard fallback
    return personsCount > 1 ? tier.priceMultiple : tier.priceSingle;
  };

  const getPackageDiscountRate = () => {
    if (sessionsCount === 2) return 0.05;
    if (sessionsCount === 3) return 0.10;
    if (sessionsCount >= 4) return 0.15;
    return 0;
  };

  const basePrice = getBasePrice();
  const rawSubtotal = basePrice * personsCount * sessionsCount;
  const packageDiscountRate = getPackageDiscountRate();
  const packageDiscountAmount = rawSubtotal * packageDiscountRate;
  const totalAmount = rawSubtotal - packageDiscountAmount;

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
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          if (data && data.display_name) {
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

  // Dynamic Time Slots definitions based on selected date
  const getAvailableTimeSlots = () => {
    if (!date) {
      // Default to weekdays after 4:00 PM if no date picked
      return [
        { time: "4:00 PM", label: "Late Afternoon" },
        { time: "5:30 PM", label: "Evening Slot", priority: true },
        { time: "7:00 PM", label: "Evening Slot", priority: true },
      ];
    }

    const selectedDate = new Date(date + "T00:00:00");
    const day = selectedDate.getDay();
    const isWeekend = day === 0 || day === 5 || day === 6; // Sunday (0), Friday (5), Saturday (6)

    if (isWeekend) {
      // Weekends (Fri, Sat, Sun): All day
      return [
        { time: "9:00 AM", label: "Weekend Morning" },
        { time: "10:30 AM", label: "Weekend Morning" },
        { time: "12:00 PM", label: "Weekend Midday" },
        { time: "1:30 PM", label: "Weekend Afternoon" },
        { time: "3:00 PM", label: "Weekend Afternoon" },
        { time: "4:30 PM", label: "Weekend Late Afternoon" },
        { time: "6:00 PM", label: "Weekend Evening", priority: true },
        { time: "7:30 PM", label: "Weekend Evening", priority: true },
      ];
    } else {
      // Weekdays (Mon-Thu): 4:00 PM - 8:00 PM only
      return [
        { time: "4:00 PM", label: "Late Afternoon" },
        { time: "5:30 PM", label: "Evening Slot", priority: true },
        { time: "7:00 PM", label: "Evening Slot", priority: true },
      ];
    }
  };

  // Custom Calendar Generator
  const generateDays = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
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
    const newDateStr = `${y}-${m}-${d}`;
    setDate(newDateStr);

    // Filter valid slots
    const dayOfWeek = day.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
    if (!isWeekend) {
      const validSlots = ["4:00 PM", "5:30 PM", "7:00 PM"];
      if (timeSlot && !validSlots.includes(timeSlot)) {
        setTimeSlot("");
      }
    }
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

  // Handle image upload mock
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCardFileName(e.target.files[0].name);
    }
  };

  // Submit flow
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDateString = formatSelectedDate();
    const frequencyLabel = frequency === "one-time" ? "One-Time Session" : `Regular (${frequency})`;
    const resolvedInsurer = insurer === "Other" ? (otherInsurer || "Other") : insurer;

    // Double-spaced, precomposed WhatsApp message
    const message = `✨ *Avion Mobile Massage — Booking Inquiry* ✨

👤 *Client Profile:*
• *Name:* ${name}
• *Email:* ${email}
• *Phone:* ${countryCode} ${phone}
• *Returning Patient:* ${isReturning ? "Yes" : "No (New Patient)"}

💆 *Session Preferences:*
• *Service Modality:* ${serviceType}
• *Duration:* ${duration} Minutes${serviceType === "Corporate Wellness" ? ` (per person)\n• *Total Massage Time:* ${personsCount * duration} mins (${Math.floor((personsCount * duration) / 60)}h ${(personsCount * duration) % 60}m)` : ""}
• *Therapist Preference:* ${
      therapistGender === "female"
        ? "Female Therapist"
        : therapistGender === "male"
        ? "Male Therapist"
        : "Either (No Preference)"
    }

📅 *Appointment Details:*
• *Requested Date:* ${formattedDateString}
• *Requested Time:* ${timeSlot}
• *Frequency:* ${frequencyLabel}
• *Group Size / Staff Count:* ${personsCount} Person${personsCount > 1 ? "s" : ""}
• *Package Size:* ${sessionsCount} Session${sessionsCount > 1 ? "s" : " (Single)"}

📍 *Location Details:*
• *Address:* ${address}

🛡️ *Direct Insurance Billing:*
${directBilling ? `• *Provider:* ${resolvedInsurer}
• *Group/Policy No:* ${groupNo}
• *Member ID No:* ${memberId}
• *Patient Code:* ${patientCode || "N/A"}
• *Date of Birth:* ${dob}
• *Card Attached:* ${cardFileName ? `Yes (${cardFileName})` : "No"}` : "• *Payment Modality:* Self-pay (Official RMT receipt will be issued)"}

💳 *Rates & Surcharges:*
• *Base Rate per Person:* $${basePrice} CAD
• *Number of Sessions:* ${sessionsCount}
• *Raw Subtotal:* $${rawSubtotal.toFixed(2)} CAD
${sessionsCount > 1 ? `• *Multi-Session Discount (${packageDiscountRate * 100}%):* -$${packageDiscountAmount.toFixed(2)} CAD` : ""}
• *Estimated Total Amount:* *$${totalAmount.toFixed(2)} CAD*

----------------------------------------
_Thank you for booking with Avion! We will verify therapist schedules and contact you directly to finalize your appointment._`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/14039230323?text=${encoded}`;

    // Add booking record to global admin list in localStorage
    const newBooking = {
      id: "AV" + Math.floor(1000 + Math.random() * 9000),
      name,
      email,
      phone: `${countryCode} ${phone}`,
      serviceType,
      duration,
      therapistGender,
      date,
      timeSlot,
      frequency,
      personsCount,
      sessionsCount,
      address,
      directBilling,
      insurer: directBilling ? resolvedInsurer : "Self-pay",
      groupNo: directBilling ? groupNo : "",
      memberId: directBilling ? memberId : "",
      patientCode: directBilling ? patientCode : "",
      dob: directBilling ? dob : "",
      cardFileName: directBilling ? cardFileName : "",
      totalAmount,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    const existingBookings = localStorage.getItem("avion_all_bookings");
    let bookingsList = [];
    if (existingBookings) {
      try {
        bookingsList = JSON.parse(existingBookings);
      } catch (err) {
        console.error("Error reading bookings list:", err);
      }
    }
    bookingsList.unshift(newBooking);
    localStorage.setItem("avion_all_bookings", JSON.stringify(bookingsList));

    // Cache the client's information to allow auto prefill next time
    localStorage.setItem("avion_returning_client_data", JSON.stringify({
      name,
      email,
      phone,
      countryCode,
      address
    }));

    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
    localStorage.removeItem("avion_booking_flow");
  };

  // Helper validation per step
  const canGoNext = () => {
    if (step === 1) {
      const basicValid = name.trim().length > 1 && email.includes("@") && phone.trim().length >= 7;
      if (directBilling) {
        return (
          basicValid &&
          groupNo.trim().length > 1 &&
          memberId.trim().length > 1 &&
          dob.trim().length > 4 &&
          (insurer !== "Other" || otherInsurer.trim().length > 1)
        );
      }
      return basicValid;
    }
    if (step === 2) {
      // 30 min is restricted only for family or bulk bookings (personsCount > 1 or sessionsCount > 1)
      if (duration === 30 && personsCount === 1 && sessionsCount === 1) {
        return false;
      }
      return serviceType && duration && therapistGender;
    }
    if (step === 3) return date && timeSlot;
    if (step === 4) return frequency && personsCount > 0 && sessionsCount > 0;
    if (step === 5) return address.trim().length > 5;
    return true;
  };

  // Country code dropdown
  const codeDropdownRef = useRef<HTMLDivElement>(null);
  const COUNTRY_OPTIONS = [
    { value: "+1",    flag: "🇨🇦", name: "Canada",        short: "CA", dial: "+1" },
    { value: "+1-US", flag: "🇺🇸", name: "United States", short: "US", dial: "+1" },
    { value: "+44",   flag: "🇬🇧", name: "United Kingdom",short: "UK", dial: "+44" },
    { value: "+61",   flag: "🇦🇺", name: "Australia",     short: "AU", dial: "+61" },
    { value: "+91",   flag: "🇮🇳", name: "India",         short: "IN", dial: "+91" },
  ];
  const [codeOpen, setCodeOpen] = useState(false);
  const selectedCountry = COUNTRY_OPTIONS.find((c) => c.value === countryCode) ?? COUNTRY_OPTIONS[0];

  useEffect(() => {
    if (!codeOpen) return;
    const handler = (e: MouseEvent) => {
      if (codeDropdownRef.current && !codeDropdownRef.current.contains(e.target as Node)) {
        setCodeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [codeOpen]);

  const scrollToFormTop = () => scrollToSection("#book");

  const nextStep = () => {
    if (canGoNext()) {
      setStep(step + 1);
      setTimeout(scrollToFormTop, 60);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setTimeout(scrollToFormTop, 60);
    }
  };

  return (
    <section id="book" className="w-full py-28 md:py-36 px-6 bg-charcoal text-white relative overflow-hidden scroll-mt-20">
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
            Select your preferences below to reserve your custom RMT session. We will handle travel setup and coordinate therapist details.
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
              We have opened WhatsApp to send your complete booking details. If you need to re-open or edit, click below. We will reach back shortly!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleFinalSubmit}
                className="inline-flex items-center gap-2 bg-sage hover:bg-sage-hover text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" /> Re-open WhatsApp
              </button>
              <button
                onClick={resetForm}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap"
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
                { s: 1, label: "Contact" },
                { s: 2, label: "Service" },
                { s: 3, label: "Schedule" },
                { s: 4, label: "Bundles" },
                { s: 5, label: "Location" },
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
              
              {/* STEP 1: CONTACT DETAILS & DIRECT INSURANCE BILLING */}
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Returning Client Toggle */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="flex items-center h-5 shrink-0 mt-0.5">
                        <input
                          id="returning-client-check"
                          type="checkbox"
                          checked={isReturning}
                          onChange={(e) => {
                            setIsReturning(e.target.checked);
                            setReturningStatus("idle");
                            if (!e.target.checked) {
                              setName("");
                              setEmail("");
                              setPhone("");
                              setAddress("");
                            }
                          }}
                          className="h-4.5 w-4.5 rounded border-white/20 bg-transparent text-sage focus:ring-sage checked:bg-sage focus:ring-2 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label htmlFor="returning-client-check" className="font-display font-bold text-[14.5px] text-white cursor-pointer select-none">
                          I am a returning client
                        </label>
                        <span className="block text-xs text-white/50 leading-relaxed font-light mt-0.5">
                          Check this box to pre-fill your previous contact details and address details.
                        </span>
                      </div>
                    </div>

                    {isReturning && returningStatus !== "found" && (
                      <div className="flex gap-2 w-full md:w-auto">
                        <input
                          type="email"
                          value={returningSearchEmail}
                          onChange={(e) => setReturningSearchEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-sage flex-1 md:w-48"
                        />
                        <button
                          type="button"
                          onClick={handleCheckReturningClient}
                          className="bg-sage hover:bg-sage-hover text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-1"
                        >
                          <UserCheck className="h-3.5 w-3.5" /> Find Info
                        </button>
                      </div>
                    )}

                    {isReturning && returningStatus === "found" && (
                      <span className="inline-flex items-center gap-1.5 bg-sage/20 border border-sage/30 text-sage rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shrink-0">
                        <CheckCircle className="h-3.5 w-3.5" /> Profile Loaded
                      </span>
                    )}
                  </div>

                  {/* Welcome banner for new clients */}
                  {!isReturning && (
                    <div className="bg-sage/10 border border-sage/20 rounded-2xl p-4 flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-sage shrink-0 animate-pulse" />
                      <p className="text-xs text-white/90 font-medium">
                        New patients are welcome! Book your first appointment today.
                      </p>
                    </div>
                  )}

                  {isReturning && returningStatus === "not_found" && (
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center gap-3">
                      <p className="text-xs text-rose-300 font-medium">
                        We couldn't find a cached profile for this email. Please fill out your details below to begin.
                      </p>
                    </div>
                  )}

                  <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-2">
                    <User className="h-5 w-5 text-sage" /> Contact Details
                  </h3>

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
                        <div ref={codeDropdownRef} className="relative shrink-0">
                          <button
                            type="button"
                            onClick={() => setCodeOpen((o) => !o)}
                            className="flex items-center gap-2.5 bg-white/5 border border-white/15 rounded-2xl pl-4 pr-3 py-4 text-xs font-bold text-white outline-none focus:border-sage transition-colors cursor-pointer h-full"
                          >
                            <span className="text-xl leading-none">{selectedCountry.flag}</span>
                            <span className="hidden md:inline text-white/90">{selectedCountry.name}</span>
                            <span className="md:hidden text-white/90">{selectedCountry.short}</span>
                            <ChevronDown className={`h-3.5 w-3.5 text-white/40 transition-transform duration-200 ${codeOpen ? "rotate-180" : ""}`} />
                          </button>
                          {codeOpen && (
                            <div className="absolute top-full left-0 mt-2 z-50 bg-charcoal border border-white/15 rounded-2xl shadow-2xl overflow-hidden min-w-[200px] animate-fade-in">
                              {COUNTRY_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => { setCountryCode(opt.value); setCodeOpen(false); }}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-white/10 transition-colors ${
                                    countryCode === opt.value ? "bg-sage/15 text-sage" : "text-white"
                                  }`}
                                >
                                  <span className="text-xl leading-none">{opt.flag}</span>
                                  <span className="font-semibold">{opt.name}</span>
                                  <span className="ml-auto text-white/40 text-xs">{opt.dial}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(403) 923-0323"
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
                        <label htmlFor="direct-billing-check" className="font-display font-bold text-[15.5px] text-white cursor-pointer select-none flex items-center gap-2">
                          Request Direct Insurance Billing
                        </label>
                        <span className="block text-xs text-white/50 leading-relaxed font-light mt-1.5">
                          Avion RMTs bill most providers directly in Alberta. Check this box to submit your extended health insurance details.
                        </span>
                      </div>
                    </div>

                    {directBilling && (
                      <div className="mt-5 p-5 rounded-2xl bg-sage/5 border border-sage/30 animate-fade-in space-y-5">
                        
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-sage">
                            Select Insurance Provider
                          </span>
                          <div className="relative">
                            <select
                              value={insurer}
                              onChange={(e) => setInsurer(e.target.value)}
                              className="w-full appearance-none bg-white/5 border border-white/15 rounded-xl pl-4 pr-11 py-3 text-sm text-white outline-none focus:border-sage transition-colors cursor-pointer"
                            >
                              <option value="Alberta Blue Cross" className="bg-charcoal text-white">Alberta Blue Cross</option>
                              <option value="Sun Life" className="bg-charcoal text-white">Sun Life Financial</option>
                              <option value="Manulife" className="bg-charcoal text-white">Manulife Financial</option>
                              <option value="Canada Life" className="bg-charcoal text-white">Canada Life</option>
                              <option value="Desjardins Insurance" className="bg-charcoal text-white">Desjardins Insurance</option>
                              <option value="Cooperators" className="bg-charcoal text-white">Cooperators</option>
                              <option value="Medavie Blue Cross" className="bg-charcoal text-white">Medavie Blue Cross</option>
                              <option value="Green Shield Canada" className="bg-charcoal text-white">Green Shield Canada</option>
                              <option value="Equitable Life" className="bg-charcoal text-white">Equitable Life</option>
                              <option value="Empire Life" className="bg-charcoal text-white">Empire Life</option>
                              <option value="ClaimSecure" className="bg-charcoal text-white">ClaimSecure</option>
                              <option value="Other" className="bg-charcoal text-white">Other Provider (Specify below)</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/35" />
                          </div>
                        </div>

                        {insurer === "Other" && (
                          <div className="flex flex-col gap-2 animate-fade-in">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-sage">
                              Specify Insurance Provider
                            </span>
                            <input
                              type="text"
                              value={otherInsurer}
                              onChange={(e) => setOtherInsurer(e.target.value)}
                              placeholder="Name of your insurance provider"
                              required
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 outline-none focus:border-sage transition-colors"
                            />
                          </div>
                        )}

                        {/* Direct billing fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className="flex flex-col gap-1.5">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">
                              Group / Policy / Plan / Contract No. *
                            </span>
                            <input
                              type="text"
                              value={groupNo}
                              onChange={(e) => setGroupNo(e.target.value)}
                              placeholder="e.g. 123456"
                              required
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/35 outline-none focus:border-sage transition-colors"
                            />
                          </label>

                          <label className="flex flex-col gap-1.5">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">
                              Member ID No. / Certificate No. *
                            </span>
                            <input
                              type="text"
                              value={memberId}
                              onChange={(e) => setMemberId(e.target.value)}
                              placeholder="e.g. 789012345"
                              required
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/35 outline-none focus:border-sage transition-colors"
                            />
                          </label>

                          <label className="flex flex-col gap-1.5">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">
                              Patient Code (e.g. 01 for primary member)
                            </span>
                            <input
                              type="text"
                              value={patientCode}
                              onChange={(e) => setPatientCode(e.target.value)}
                              placeholder="e.g. 01"
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/35 outline-none focus:border-sage transition-colors"
                            />
                          </label>

                          <label className="flex flex-col gap-1.5">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">
                              Date of Birth (YYYY-MM-DD) *
                            </span>
                            <input
                              type="text"
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                              placeholder="e.g. 1988-12-31"
                              required
                              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/35 outline-none focus:border-sage transition-colors"
                            />
                          </label>

                          {/* Optional Benefit Card Upload */}
                          <div className="md:col-span-2 flex flex-col gap-1.5">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">
                              Upload Benefit Card (Optional)
                            </span>
                            <div className="flex items-center justify-center border border-dashed border-white/20 hover:border-sage/50 rounded-xl p-4 bg-white/5 transition-colors relative cursor-pointer group">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                              <div className="text-center">
                                <Upload className="h-5 w-5 text-white/40 group-hover:text-sage mx-auto mb-1 transition-colors" />
                                <p className="text-[11px] font-bold text-white/60 group-hover:text-white transition-colors">
                                  {cardFileName || "Drag or browse photo of benefits card"}
                                </p>
                                <p className="text-[9px] text-white/35 mt-0.5">JPEG, PNG up to 10MB</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 text-[11px] text-white/50 leading-relaxed font-light pt-2">
                          <ShieldCheck className="h-4 w-4 text-sage shrink-0" />
                          <span>We submit your claims directly to save you out-of-pocket costs. Direct billing is subject to individual coverage parameters.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: SERVICE & DURATION */}
              {step === 2 && (
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
                        },
                        {
                          name: "Corporate Wellness",
                          tagline: "On-site wellness for workplaces",
                          desc: "Clothed chair or table massage for team events and employee wellness."
                        }
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setServiceType(item.name)}
                          className={`text-left p-5 rounded-2xl border transition-all relative ${
                            item.name === "Corporate Wellness" ? "sm:col-span-2" : ""
                          } ${
                            serviceType === item.name
                              ? "bg-sage/10 border-sage shadow-md text-white"
                              : "bg-white/5 border-white/10 hover:border-white/30 text-white/80"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-display font-semibold text-[15.5px] whitespace-nowrap">{item.name}</span>
                            {serviceType === item.name && (
                              <span className="h-4 w-4 rounded-full bg-sage flex items-center justify-center text-white shrink-0 ml-2">
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {serviceType === "Corporate Wellness" ? (
                        <>
                          {[
                            { min: 15, price: 45, rec: "Quick relief", desc: "For corporate chairs" },
                            { min: 30, price: 80, rec: "Standard corporate", desc: "Ideal wellness break" }
                          ].map((item) => (
                            <button
                              key={item.min}
                              type="button"
                              onClick={() => setDuration(item.min)}
                              className={`text-left p-5 rounded-2xl border transition-all md:col-span-2 ${
                                duration === item.min
                                  ? "bg-sage/10 border-sage shadow-md text-white"
                                  : "bg-white/5 border-white/10 hover:border-white/30 text-white/80"
                              }`}
                            >
                              <div className="flex justify-between items-baseline mb-2">
                                <span className="font-display font-bold text-lg">{item.min} Min</span>
                                <span className="font-display font-semibold text-base text-sage">${item.price} CAD</span>
                              </div>
                              <p className="text-xs text-white/50 leading-relaxed font-light">{item.desc}</p>
                            </button>
                          ))}
                        </>
                      ) : (
                        pricingTiers.map((item) => {
                          const isRestricted = item.restricted && personsCount === 1 && sessionsCount === 1;
                          const currentPrice = personsCount > 1 ? item.priceMultiple : item.priceSingle;

                          return (
                            <button
                              key={item.min}
                              type="button"
                              disabled={isRestricted}
                              onClick={() => setDuration(item.min)}
                              className={`text-left p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                                isRestricted
                                  ? "opacity-30 border-white/5 cursor-not-allowed text-white/30 bg-white/0"
                                  : duration === item.min
                                  ? "bg-sage/10 border-sage shadow-md text-white"
                                  : "bg-white/5 border-white/10 hover:border-white/30 text-white/80"
                              }`}
                            >
                              {item.recommended && (
                                <span className="absolute -top-3 left-4 bg-sage text-white text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-charcoal whitespace-nowrap">
                                  Recommended
                                </span>
                              )}
                              <div>
                                <div className="flex justify-between items-baseline mb-2 mt-1 gap-2">
                                  <span className="font-display font-bold text-base whitespace-nowrap">{item.min} Mins</span>
                                  <span className="font-display font-semibold text-sm text-sage whitespace-nowrap">${currentPrice} CAD</span>
                                </div>
                                <span className="block text-[9px] font-bold uppercase tracking-wider text-soft-blue mb-2.5">
                                  {item.rec}
                                </span>
                                <p className="text-[11px] text-white/50 leading-relaxed font-light mb-3">
                                  {item.description}
                                </p>
                              </div>
                              {item.restricted && (
                                <span className="block text-[9px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-lg">
                                  Requires family or bulk booking
                                </span>
                              )}
                            </button>
                          );
                        })
                      )}
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
                          <div className="font-display font-semibold text-sm mb-1 whitespace-nowrap">{pref.label}</div>
                          <div className="text-[11px] text-white/45 font-light">{pref.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DATE & TIME SELECTOR */}
              {step === 3 && (
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
                      {getAvailableTimeSlots().map((slot) => {
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
                      <span className="font-semibold text-soft-blue uppercase block mb-1">Availability Schedule</span>
                      <strong>Friday, Saturday, Sunday:</strong> All day operating hours. <br />
                      <strong>Monday – Thursday:</strong> 4:00 PM – 8:00 PM evening appointments only.
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 4: FREQUENCY, QUANTITY & MULTI-SESSION PACKAGES */}
              {step === 4 && (
                <div className="space-y-10 animate-fade-in">
                  
                  {/* Multi-session Packages */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-2">
                      <Percent className="h-5 w-5 text-sage" /> Multi-Session Packages
                    </h3>
                    <p className="text-white/60 text-xs tracking-wider uppercase mb-5">
                      Book multiple sessions together to lock in ongoing recovery and receive package discounts.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {[
                        { count: 1, label: "1 Session", note: "Standard rate", discount: "0% Off" },
                        { count: 2, label: "2 Sessions", note: "Save 5% on total", discount: "5% Off" },
                        { count: 3, label: "3 Sessions", note: "Save 10% on total", discount: "10% Off" },
                        { count: 4, label: "4+ Sessions", note: "Save 15% on total", discount: "15% Off" },
                      ].map((item) => (
                        <button
                          key={item.count}
                          type="button"
                          onClick={() => setSessionsCount(item.count)}
                          className={`p-5 rounded-2xl border text-left transition-all relative ${
                            sessionsCount === item.count
                              ? "bg-sage/10 border-sage text-white"
                              : "bg-white/5 border-white/10 hover:border-white/30 text-white/70"
                          }`}
                        >
                          {item.discount && item.count > 1 && (
                            <span className="absolute top-3 right-3 bg-sage text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap">
                              {item.discount}
                            </span>
                          )}
                          <div className="font-display font-bold text-lg mb-1 whitespace-nowrap">{item.label}</div>
                          <div className="text-xs text-white/45 font-light whitespace-nowrap">{item.note}</div>
                        </button>
                      ))}
                    </div>

                    {sessionsCount >= 4 && (
                      <div className="mt-5 p-5 rounded-2xl bg-white/5 border border-white/10 animate-fade-in space-y-3">
                        <label className="flex flex-col gap-2">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-sage px-1">
                            Specify Exact Number of Sessions
                          </span>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min={4}
                              max={20}
                              value={sessionsCount}
                              onChange={(e) => setSessionsCount(Math.max(4, parseInt(e.target.value) || 4))}
                              className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 outline-none focus:border-sage transition-colors w-32"
                            />
                            <span className="text-xs text-white/50 font-light">
                              Choose the total number of bundled sessions (5% for 2, 10% for 3, 15% for 4+).
                            </span>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Frequency of bookings */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-2">
                      <RefreshCw className="h-5 w-5 text-sage" /> Booking Frequency
                    </h3>
                    <p className="text-white/60 text-xs tracking-wider uppercase mb-5">
                      Select if this is a one-time session or if you'd like to hold this recurring schedule.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                          <div className="font-display font-semibold text-sm mb-1 whitespace-nowrap">{freq.label}</div>
                          <div className="text-[11px] text-white/45 font-light whitespace-nowrap">{freq.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Persons / Quantities at same location */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-soft-blue flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-sage" /> Number of Persons
                    </h3>
                    <p className="text-white/60 text-xs tracking-wider uppercase mb-5">
                      Save by booking back-to-back sessions at the same address. Group rate: $125/person (60m) or $165/person (90m).
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { count: 1, label: "1 Person", note: "Standard single rate" },
                        { count: 2, label: "2 Persons", note: "Group rates apply" },
                        { count: 3, label: "3 Persons", note: "Group rates apply" },
                        { count: 4, label: "4+ Persons", note: "Group rates apply" },
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
                          {item.count > 1 && (
                            <span className="absolute top-3 right-3 bg-sage text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap">
                              Discounted Rate
                            </span>
                          )}
                          <div className="font-display font-bold text-lg mb-1 whitespace-nowrap">{item.label}</div>
                          <div className="text-xs text-white/45 font-light whitespace-nowrap">{item.note}</div>
                        </button>
                      ))}
                    </div>

                    {personsCount >= 4 && (
                      <div className="mt-5 p-5 rounded-2xl bg-white/5 border border-white/10 animate-fade-in space-y-3">
                        <label className="flex flex-col gap-2">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-sage px-1">
                            Specify Exact Number of Attendees
                          </span>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min={4}
                              max={100}
                              value={personsCount}
                              onChange={(e) => setPersonsCount(Math.max(4, parseInt(e.target.value) || 4))}
                              className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 outline-none focus:border-sage transition-colors w-32"
                            />
                            <span className="text-xs text-white/50 font-light">
                              Specify the total number of people scheduling back-to-back.
                            </span>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* STEP 5: LOCATION & ADDRESS MAP PICKER */}
              {step === 5 && (
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
                        className="bg-white/10 border border-white/15 hover:bg-white/20 text-white rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest shrink-0 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
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
                        <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Client Contact</span>
                        <span className="text-white font-bold block">{name} {isReturning && <span className="text-sage text-[10px] uppercase font-bold">(Returning)</span>}</span>
                        <span className="text-white/60 text-xs block">{email} | {countryCode} {phone}</span>
                      </div>
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Booking frequency</span>
                          <span className="text-white capitalize">{frequency === "one-time" ? "One-time session" : `Regular (${frequency})`}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Package Size</span>
                          <span className="text-white font-bold">{sessionsCount} Session{sessionsCount > 1 ? "s" : ""}</span>
                        </div>
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
                          <span>Base Rate ({personsCount > 1 ? "Group Rate" : "Single Rate"})</span>
                          <span>${basePrice}.00 CAD</span>
                        </div>
                        <div className="flex justify-between text-xs text-white/60 font-light">
                          <span>Group Size</span>
                          <span>x {personsCount} person{personsCount > 1 ? "s" : ""}</span>
                        </div>
                        <div className="flex justify-between text-xs text-white/60 font-light">
                          <span>Number of Sessions (Package)</span>
                          <span>x {sessionsCount} session{sessionsCount > 1 ? "s" : ""}</span>
                        </div>
                        <div className="flex justify-between text-xs text-white/60 font-light border-b border-white/5 pb-2">
                          <span>Raw Subtotal</span>
                          <span>${rawSubtotal.toFixed(2)} CAD</span>
                        </div>
                        {sessionsCount > 1 && (
                          <div className="flex justify-between text-xs text-sage font-bold">
                            <span>Package Discount ({packageDiscountRate * 100}%)</span>
                            <span>-$${packageDiscountAmount.toFixed(2)} CAD</span>
                          </div>
                        )}
                        {directBilling && (
                          <div className="flex flex-col gap-1 text-[11px] text-soft-blue font-semibold bg-white/5 p-2.5 rounded-lg border border-white/5">
                            <div className="flex justify-between">
                              <span>Direct Claim Carrier</span>
                              <span>{insurer === "Other" ? (otherInsurer || "Other Provider") : insurer}</span>
                            </div>
                            <div className="flex justify-between text-[9px] text-white/40">
                              <span>DOB: {dob} | ID: {memberId}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-white/10 pt-4 mt-4">
                        <div className="flex justify-between items-baseline mb-2">
                          <span className="text-xs uppercase tracking-wider text-white/40 font-bold">Estimated Total</span>
                          <span className="font-display font-bold text-2xl text-soft-blue">${totalAmount.toFixed(2)} CAD</span>
                        </div>
                        <p className="text-[10px] leading-relaxed text-white/35 font-light">
                          *Tax included. Final pricing is confirmed on check-in. Coverage details subject to insurance limits.
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
                    className="group flex items-center gap-2 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors py-2 whitespace-nowrap"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                )}
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-white/40 hover:text-white/70 text-[10px] font-bold uppercase tracking-widest transition-colors px-3 py-2 whitespace-nowrap"
                >
                  Start Over
                </button>
                
                {step < 6 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canGoNext()}
                    className="group inline-flex items-center gap-2 bg-sage hover:bg-sage-hover disabled:bg-white/10 disabled:text-white/30 disabled:border-white/5 text-white px-7 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:shadow-premium whitespace-nowrap"
                  >
                    Next Step <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="group inline-flex items-center gap-2 bg-sage hover:bg-sage-hover text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all shadow-premium whitespace-nowrap"
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
