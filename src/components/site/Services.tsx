import React from "react";
import { ArrowRight, Clock, ShieldCheck, Heart, User, Building } from "lucide-react";

interface ServiceItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  benefits: string[];
  duration: string;
}

const services: ServiceItem[] = [
  {
    name: "Therapeutic Massage",
    icon: Heart,
    description:
      "Personalized treatment that targets your specific tension patterns, improves mobility, and supports recovery from the physical demands of daily life in Calgary.",
    benefits: ["Targeted tension relief", "Joint mobility improvement", "Musculoskeletal recovery"],
    duration: "60 or 90 Minutes",
  },
  {
    name: "Deep Tissue Massage",
    icon: ShieldCheck,
    description:
      "Focused work on deeper muscle layers to release chronic tightness, stubborn knots, and long-held stress. Ideal after long workdays or active weekends.",
    benefits: ["Connective tissue release", "Post-workout recovery", "Chronic strain reduction"],
    duration: "60 or 90 Minutes",
  },
  {
    name: "Relaxation Massage",
    icon: SparklesIcon,
    description:
      "A calming, flowing session designed to quiet the nervous system, reduce stress, and leave you feeling grounded and recharged.",
    benefits: [
      "Nervous system soothing",
      "Stress and anxiety reduction",
      "Circulation enhancement",
    ],
    duration: "60 or 90 Minutes",
  },
  {
    name: "Prenatal Massage",
    icon: User,
    description:
      "Safe, supportive care tailored for pregnancy. We help ease common discomforts while keeping you comfortable and relaxed in your own home.",
    benefits: ["Pregnancy comfort setup", "Lower back stress offload", "Leg swelling comfort"],
    duration: "60 or 90 Minutes",
  },
  {
    name: "Corporate Wellness Massage",
    icon: Building,
    description:
      "On-site massage for workplaces, team events, and employee wellness programs. A thoughtful way to support your team without anyone leaving the office.",
    benefits: ["Desk posture correction", "Workplace stress reduction", "Team wellness support"],
    duration: "15 to 30 mins per person",
  },
];

// Simple Sparkles SVG replacement since Sparkles icon is in lucide but let's make sure it loads
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
    </svg>
  );
}

export function Services() {
  const handleBookService = (serviceName: string) => {
    const event = new CustomEvent("select-service", { detail: serviceName });
    window.dispatchEvent(event);
  };

  return (
    <section id="services" className="w-full py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-semibold text-sage uppercase tracking-wider block mb-3">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal tracking-tight">
            Tailored Care For Your Body & Mind
          </h2>
          <p className="mt-4 text-charcoal-muted text-md sm:text-lg leading-relaxed font-light">
            Skip the travel and receive focused clinical expertise in the comfort of your own space.
            Choose the treatment that aligns with your wellness goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => {
            const IconComponent = s.icon;
            return (
              <div
                key={s.name}
                className="flex flex-col justify-between bg-card p-8 rounded-2xl shadow-soft hover:shadow-premium transition-all duration-300 border border-border"
              >
                <div>
                  {/* Top Row: Icon & Duration */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-soft-blue-light flex items-center justify-center text-sage">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border text-[11px] font-medium text-charcoal-muted">
                      <Clock className="h-3 w-3" />
                      {s.duration}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-medium text-charcoal mb-4">{s.name}</h3>

                  {/* Description */}
                  <p className="text-charcoal-muted text-sm leading-relaxed mb-6 font-light">
                    {s.description}
                  </p>

                  {/* Key Benefits Checklist */}
                  <ul className="space-y-2 mb-8">
                    {s.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-xs text-charcoal-muted font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => handleBookService(s.name)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-sage hover:bg-sage-hover text-white text-xs font-semibold rounded-full shadow-soft transition-all duration-200 uppercase tracking-wider"
                >
                  Book This Service
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
