export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  focus: string[];
  style: string;
}

export interface PricingOption {
  min: number;
  priceSingle: number;
  priceMultiple: number;
  description: string;
  rec: string;
  recommended?: boolean;
  restricted?: boolean; // e.g. for 30m
}

export interface PackageDiscount {
  sessions: number;
  discountRate: number; // e.g., 0.05, 0.10, 0.15
}

export interface Availability {
  weekdays: string; // e.g., "4:00 PM - 8:00 PM"
  weekends: string; // e.g., "All day"
}

export interface GeneralContent {
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
}

// Initial Blog Posts
const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "5-ways-mobile-massage-helps-calgary-professionals",
    title: "5 Ways Mobile Massage Helps Busy Calgary Professionals Recover Faster",
    slug: "5-ways-mobile-massage-helps-calgary-professionals",
    summary: "Modern Calgary life is fast-paced. Discover how mobile RMT treatments optimize recovery time, eliminate travel stress, and fit into a packed executive schedule.",
    date: "June 8, 2026",
    readTime: "4 min read",
    author: "Mary Ann Rebosura, RMT",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800",
    content: `
Calgary is a city of high-achievers. Between corporate desks in the downtown core, weekend mountain sports in Banff, and family life, time is a premium commodity. For many busy professionals, chronic neck and shoulder tension is a constant companion—yet finding the time to drive across the city, find parking, and visit a clinic often adds more stress than it relieves.

Here are five key ways mobile massage therapy changes the recovery game for busy Calgarians:

### 1. Eliminating the Post-Massage Commute Stress
After a traditional clinic massage, your nervous system is in a deeply relaxed, parasympathetic state. Stepping out into Calgary winter wind or fighting rush-hour traffic on Crowchild Trail instantly triggers your fight-or-flight response, undoing much of the therapist's work. With mobile massage, you transition directly from the massage table to your couch or bed, locking in the therapeutic benefits.

### 2. Time-Efficient Executive Scheduling
A 90-minute clinic visit actually takes 2.5 to 3 hours out of your day when counting travel, parking, and waiting rooms. Mobile massage fits cleanly into your life. The therapist arrives, sets up in under 10 minutes, delivers your custom treatment, and departs. It is wellness engineered to respect your calendar.

### 3. Comfortable, Familiar Environment
When you are in your own home, your body naturally feels safer and more secure. This environment allows you to relax more quickly, meaning the RMT can target deep muscle tension sooner in the session rather than spending the first 20 minutes easing a guarded nervous system.

### 4. Customizable Setup & Privacy
At home, you control the lighting, room temperature, and music. If you need a completely quiet session to decompress from back-to-back Zoom calls, or if you prefer a specific ambient playlist, it is entirely under your control.

### 5. Seamless Team or Partner Bookings
Mobile massage makes it easy to schedule back-to-back treatments for you and your partner, or even for your office team. By booking multiple people at the same location, you not only save travel time for everyone but also take advantage of multi-person group discounts.

Mobile RMT care isn't just about luxury; it is about smart recovery that works on your terms.
    `.trim()
  },
  {
    id: "expectations-first-prenatal-mobile-massage",
    title: "What to Expect During Your First Prenatal Mobile Massage",
    slug: "expectations-first-prenatal-mobile-massage",
    summary: "Expecting mothers in Calgary deserve premium, stress-free care. Learn how we set up safe, side-lying relaxation sessions directly in the comfort of your home.",
    date: "June 6, 2026",
    readTime: "5 min read",
    author: "Mico Yang",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    content: `
Pregnancy is a beautiful journey, but it also brings significant physical changes. Lower back soreness, heavy legs, swelling, and hip pressure are incredibly common as your body adapts to support your growing baby. 

A prenatal mobile massage offers expecting mothers in Calgary a safe, comforting, and highly convenient way to find relief. If you are booking your first home session, here is a detailed guide on what to expect:

### Complete Safety & Licensed Care
First and foremost, your session is conducted by a certified Registered Massage Therapist trained in prenatal safety protocols. Before starting, we review your health history, current trimester, and any guidance from your doctor or midwife. 

### Side-Lying Comfort Setup
While some clinics use belly-cutout tables, clinical guidelines strongly recommend a side-lying position supported by specialized pillows for the safety of both mother and baby. We set up our professional table with extra cushioning, bolstering your head, belly, and knees to ensure you feel weightless and completely secure.

### Tailored Focus Areas
Your therapist will customize the session to target your specific discomforts:
*   **Lower Back & Hips:** Easing pressure from changes in posture and center of gravity.
*   **Legs & Ankles:** Gentle techniques to improve circulation and reduce fluid retention.
*   **Shoulders & Neck:** Relieving the tension caused by physical compensation.

### No Travel or Parking Stress
As pregnancy progresses, simple tasks like driving and walking long distances can become exhausting. By bringing the clinical experience directly to your home, you avoid Calgary parking struggles and can rest immediately after your treatment.

Whether you are in your first trimester or preparing for delivery, prenatal mobile massage provides the physical and mental space to slow down and nurture your body.
    `.trim()
  },
  {
    id: "understanding-direct-billing-benefits",
    title: "Understanding Direct Billing: How to Maximize Your Benefits with Avion",
    slug: "understanding-direct-billing-benefits",
    summary: "Don't let your employer health benefits go to waste. A clear guide on how Avion's direct billing works with major insurers like Blue Cross, Sun Life, and Cooperators.",
    date: "May 28, 2026",
    readTime: "3 min read",
    author: "Avion Billing Team",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    content: `
Did you know that millions of dollars in employer-sponsored health benefits go unclaimed in Calgary every single year? Massage therapy is one of the most widely covered services, yet many professionals avoid booking because they dislike dealing with insurance claims, portals, and receipts.

At Avion Mobile Massage, we make prioritizing your health seamless by offering direct billing to the majority of extended health insurance providers in Alberta. Here is how you can maximize your coverage with ease:

### What is Direct Billing?
Instead of you paying out-of-pocket, waiting for receipts, and manually submitting claims to your insurer, we submit the invoice directly to your insurance company at the time of your appointment. You only pay the remaining co-pay balance (if any).

### Supported Insurance Providers
We support direct billing to a wide variety of carriers, including:
*   **Alberta Blue Cross**
*   **Sun Life Financial**
*   **Manulife Financial**
*   **Canada Life**
*   **Desjardins Insurance**
*   **Cooperators**
*   **Medavie Blue Cross**
*   And many other smaller insurers under major clearinghouse networks.

### What Information We Need
To file claims on your behalf, our booking form securely collects your direct billing preferences, including:
1.  **Group / Policy / Plan / Contract Number**
2.  **Member ID / Certificate Number**
3.  **Patient Code** (identifies your status, e.g., primary member, spouse, or child)
4.  **Date of Birth** (required by insurance systems for verification)
5.  **Optional Benefit Card Photo** (to verify spelling and numbers)

### Key Tips to Maximize Your Benefits
*   **Check Your Renewal Date:** Most plans run on a calendar year (January to December), meaning unused coverage expires on December 31st and does not roll over.
*   **Understand Your Co-Pay:** Some plans cover 100% of massage costs, while others cover 80% or have a set dollar cap per session.
*   **Know Your Doctor's Note Requirements:** A few select plans require a doctor's referral for massage therapy. Check your online portal to verify if yours does.

Invest in your wellness today without the administrative headache—let Avion take care of the details.
    `.trim()
  },
  {
    id: "neck-shoulder-relief-desk-workers",
    title: "Neck & Shoulder Relief for Desk Workers in Calgary",
    slug: "neck-shoulder-relief-desk-workers",
    summary: "Hours at a laptop take a toll on your neck and shoulders. Read about the causes of 'tech neck' and how targeted therapeutic massage releases muscle tension.",
    date: "May 15, 2026",
    readTime: "4 min read",
    author: "Mico Yang",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800",
    content: `
If you sit at a computer for eight hours a day in a Calgary office or home study, you are likely familiar with the dull ache at the base of your neck and tightness across your shoulders. 

This condition, often referred to as "tech neck" or postural syndrome, is caused by repetitive forward-head positioning. For every inch your head tilts forward, it adds an extra 10 pounds of pressure on your cervical spine. Over time, this strains your muscles and causes chronic discomfort.

Here is how targeted therapeutic RMT treatments help desk workers recover:

### Releasing the Upper Trapezius and Levator Scapulae
These muscles run along the back of your neck and top of your shoulders. When your head moves forward, they work constantly to keep it upright. Your therapist uses deep compression and slow, focused strokes to release trigger points in these chronically overworked tissues.

### Opening the Pectoral Muscles
Prolonged typing pulls your shoulders forward, shortening and tightening your chest (pectoral) muscles. By opening the chest, we allow your shoulder blades to return to their natural position, immediately relieving the strain on your upper back.

### Releasing Jaw and Suboccipital Tension
Did you know that clenching your jaw or looking up at a screen causes tightness in the suboccipital muscles (located at the very base of your skull)? This tightness is a primary cause of tension headaches. Gentle, precise release of these areas can provide immediate clarity and relief.

### Ergonomic Tips for Daily Maintenance
To support the work done in your massage sessions, we recommend:
1.  **The 20-20-20 Rule:** Every 20 minutes, look at an object 20 feet away for 20 seconds to reset your posture and visual focus.
2.  **Chest Opener Stretch:** Place your hands on a doorway and step forward gently to stretch your chest muscles.
3.  **Adjust Screen Height:** Ensure the top of your monitor is at eye level so you do not tilt your chin down or forward.

By combining professional mobile RMT sessions with conscious daily adjustments, you can break the cycle of desk-induced pain.
    `.trim()
  }
];

// Initial Therapist Profiles
const DEFAULT_THERAPISTS: Therapist[] = [
  {
    id: "mico-yang",
    name: "Mico Yang",
    title: "Licensed Massage Therapist",
    photo: "/therapist-mico.png",
    bio: "Mico Yang is a skilled massage therapist with several years of hands-on experience. She offers personalized treatments focused on comfort, relaxation, and effective muscle tension relief. Each session is tailored to the client’s condition to help reduce stress and improve overall wellbeing.",
    focus: [
      "Neck & shoulder tension relief",
      "Facial & head stress relaxation",
      "Jaw and related muscle release",
      "Gluteal & prolonged sitting discomfort relief",
      "Full-body relaxation and stress reduction"
    ],
    style: "Gentle, consistent, and comfort-focused — perfect for first-time clients and regular maintenance."
  },
  {
    id: "mary-ann-rebosura",
    name: "Mary Ann Rebosura",
    title: "Registered Massage Therapist",
    photo: "",
    bio: "As a Registered Massage Therapist, Mary Ann is passionate about helping clients improve their overall health, mobility, and wellbeing through personalized massage therapy. She works alongside physiotherapists and chiropractors in a multidisciplinary clinic in Calgary, collaborating with other healthcare professionals to support recovery, pain management, and wellness goals.",
    focus: [
      "Therapeutic and rehabilitation massage",
      "Deep tissue and trigger point release",
      "Myofascial release & joint mobilization",
      "Prenatal and postnatal support",
      "Collaborative wellness & home exercises"
    ],
    style: "Patient-centered, clinical, and collaborative. Outside the clinic, she stays active playing lawn tennis and pickleball."
  }
];

// Initial Pricing Tiers
const DEFAULT_PRICING: PricingOption[] = [
  {
    min: 30,
    priceSingle: 80,
    priceMultiple: 80,
    description: "Available only as part of family or bulk booking",
    rec: "Short targeted relief",
    restricted: true
  },
  {
    min: 45,
    priceSingle: 100,
    priceMultiple: 100,
    description: "Focused session for specific tension relief",
    rec: "Ideal for spot treatments",
    restricted: true
  },
  {
    min: 60,
    priceSingle: 130,
    priceMultiple: 125,
    description: "Standard full body or comprehensive single area treatment",
    rec: "Standard RMT Session"
  },
  {
    min: 90,
    priceSingle: 175,
    priceMultiple: 165,
    description: "Highly recommended sweet spot for relaxation and deep work",
    rec: "Highly Recommended Sweet Spot",
    recommended: true
  }
];

const DEFAULT_DISCOUNTS: PackageDiscount[] = [
  { sessions: 1, discountRate: 0.00 },
  { sessions: 2, discountRate: 0.05 },
  { sessions: 3, discountRate: 0.10 },
  { sessions: 4, discountRate: 0.15 }
];

const DEFAULT_AVAILABILITY: Availability = {
  weekdays: "4:00 PM - 8:00 PM only",
  weekends: "All day"
};

const DEFAULT_CONTACT: GeneralContent = {
  phone: "+1 (403) 923-0323",
  email: "avionmobilemassage@outlook.com",
  whatsapp: "+1 (403) 923-0323",
  instagram: "https://www.instagram.com/avionmobilemassage"
};

// Database utility class
const DB_VERSION = "2.2.0";

class LocalDb {
  private getStorageItem<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;
    const val = localStorage.getItem(key);
    if (!val) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    try {
      return JSON.parse(val);
    } catch {
      return defaultValue;
    }
  }

  private setStorageItem<T>(key: string, value: T): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // Version check — resets all data if app version has changed
  init(): void {
    if (typeof window === "undefined") return;
    const storedVersion = localStorage.getItem("avion_db_version");
    if (storedVersion !== DB_VERSION) {
      localStorage.setItem("avion_therapists", JSON.stringify(DEFAULT_THERAPISTS));
      localStorage.setItem("avion_blog_posts", JSON.stringify(DEFAULT_POSTS));
      localStorage.setItem("avion_pricing_tiers", JSON.stringify(DEFAULT_PRICING));
      localStorage.setItem("avion_package_discounts", JSON.stringify(DEFAULT_DISCOUNTS));
      localStorage.setItem("avion_db_version", DB_VERSION);
    }
  }

  // Blog Posts API
  getBlogPosts(): BlogPost[] {
    return this.getStorageItem<BlogPost[]>("avion_blog_posts", DEFAULT_POSTS);
  }

  saveBlogPost(post: BlogPost): void {
    const posts = this.getBlogPosts();
    const idx = posts.findIndex((p) => p.id === post.id);
    if (idx >= 0) {
      posts[idx] = post;
    } else {
      posts.push(post);
    }
    this.setStorageItem("avion_blog_posts", posts);
  }

  deleteBlogPost(id: string): void {
    const posts = this.getBlogPosts().filter((p) => p.id !== id);
    this.setStorageItem("avion_blog_posts", posts);
  }

  // Therapists API
  getTherapists(): Therapist[] {
    return this.getStorageItem<Therapist[]>("avion_therapists", DEFAULT_THERAPISTS);
  }

  saveTherapists(therapists: Therapist[]): void {
    this.setStorageItem("avion_therapists", therapists);
  }

  // Pricing API
  getPricing(): PricingOption[] {
    return this.getStorageItem<PricingOption[]>("avion_pricing_tiers", DEFAULT_PRICING);
  }

  savePricing(pricing: PricingOption[]): void {
    this.setStorageItem("avion_pricing_tiers", pricing);
  }

  getPackageDiscounts(): PackageDiscount[] {
    return this.getStorageItem<PackageDiscount[]>("avion_package_discounts", DEFAULT_DISCOUNTS);
  }

  savePackageDiscounts(discounts: PackageDiscount[]): void {
    this.setStorageItem("avion_package_discounts", discounts);
  }

  // Availability API
  getAvailability(): Availability {
    return this.getStorageItem<Availability>("avion_availability_hours", DEFAULT_AVAILABILITY);
  }

  saveAvailability(availability: Availability): void {
    this.setStorageItem("avion_availability_hours", availability);
  }

  // General Contact API
  getGeneralContact(): GeneralContent {
    return this.getStorageItem<GeneralContent>("avion_general_contact", DEFAULT_CONTACT);
  }

  saveGeneralContact(contact: GeneralContent): void {
    this.setStorageItem("avion_general_contact", contact);
  }

  // Reset to default settings
  resetToDefaults(): void {
    this.setStorageItem("avion_blog_posts", DEFAULT_POSTS);
    this.setStorageItem("avion_therapists", DEFAULT_THERAPISTS);
    this.setStorageItem("avion_pricing_tiers", DEFAULT_PRICING);
    this.setStorageItem("avion_package_discounts", DEFAULT_DISCOUNTS);
    this.setStorageItem("avion_availability_hours", DEFAULT_AVAILABILITY);
    this.setStorageItem("avion_general_contact", DEFAULT_CONTACT);
  }
}

export const db = new LocalDb();
