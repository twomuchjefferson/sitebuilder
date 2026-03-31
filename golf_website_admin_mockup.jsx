const { useState } = React;

const initialPages = {
  Home: {
    enabled: true,
    status: "Published",
    icon: "HM",
    fields: {
      heroHeadline: "A better golf day starts here",
      heroSubheadline:
        "Book tee times, explore memberships, plan outings, and discover everything your course offers.",
      primaryCta: "Book Tee Times",
      secondaryCta: "Plan Your Round",
      highlights:
        "Championship golf, member options, outings, dining, and a welcoming club atmosphere.",
    },
  },
  Membership: {
    enabled: true,
    status: "Draft",
    icon: "MB",
    fields: {
      audience:
        "Golfers who play regularly, families who want club access, and local players looking for value and a home course.",
      classes: "Individual, Family, Weekday, Junior",
      pricing:
        "Individual $2,499/year | Family $3,899/year | Weekday $1,799/year",
      contactMethod: "Lead Form",
      sellingPoints:
        "No initiation fee, preferred tee times, member events, and practice access.",
      faq: "What is included? | How do I join? | Can I request more details?",
    },
  },
  Golf: {
    enabled: true,
    status: "Published",
    icon: "GF",
    fields: {
      courseSummary:
        "A fun, fair test with memorable holes, strong conditions, and a layout designed for repeat play.",
      amenities: "Practice area, pro shop, GPS carts, online booking",
      ratesMessage: "Exact rates are shown at booking",
      bookingLinkStyle: "Primary CTA",
      paceInfo:
        "Arrive early, check in before your round, and help keep play moving.",
    },
  },
  Dining: {
    enabled: false,
    status: "Not Enabled",
    icon: "DN",
    fields: {
      restaurantName: "The Grille",
      diningSummary:
        "Casual dining before or after your round with approachable favorites and a relaxed setting.",
      hours: "Daily 11 AM-8 PM",
      menuStyle: "American Grill",
      diningCta: "View Menu",
    },
  },
  Outings: {
    enabled: true,
    status: "Draft",
    icon: "OT",
    fields: {
      outingSummary:
        "Host golf outings, charity events, and corporate tournaments with planning support from start to finish.",
      groupSizes: "16-144 players",
      packages: "Golf only, golf + food, custom package",
      leadMethod: "Lead Form",
      eventBenefits:
        "Tournament setup, scoring help, food and beverage options, and flexible event coordination.",
    },
  },
  Weddings: {
    enabled: false,
    status: "Not Enabled",
    icon: "WD",
    fields: {
      venueSummary:
        "A scenic setting for weddings and celebrations with indoor and outdoor event options.",
      capacity: "Up to 180 guests",
      bookingType: "Inquiry Form",
      highlights: "Course views, reception space, on-site coordination",
    },
  },
  Contact: {
    enabled: true,
    status: "Published",
    icon: "CT",
    fields: {
      phone: "(800) 555-1212",
      email: "info@golfcourse.com",
      address: "123 Golf Street, Louisville, KY 40018",
      mapEmbed: "Enabled",
      contactForm: "Enabled",
    },
  },
};

const topLevelNavItems = [
  "Dashboard",
  "Revenue Engine",
  "Marketing",
  "Website Admin",
  "AI Chat",
  "Reports",
  "Business Scanner",
  "Help",
];

const flyoutNavItems = {
  "Revenue Engine": [
    "Booking Engine",
    "Smart Pricing AI",
    "Promo Codes",
    "Gift Cards",
    "Wait List",
    "Lottery",
    "Checkout Upsells",
  ],
  Marketing: ["Automation", "Campaigns", "Email Marketing", "Contacts", "Segments"],
  "Website Admin": ["Brand Settings", "Page Controls", "AI Content Engine", "SEO and AI Audit", "Publishing"],
  "AI Chat": ["Chat History", "Official Answers", "FAQ Builder", "Chat Flows", "Settings"],
  Reports: ["Booking", "Website", "Marketing", "Search", "Ads"],
  "Business Scanner": ["Business Listings", "Reviews", "Settings"],
};

const bottomMenuItems = ["Account", "Settings", "Live Booking", "Support", "Sign Out"];

const bookingEngineTabs = ["Setup", "Rate Management", "Smart Pricing AI", "Tee Time Manager", "Booking Manager"];
const accountTabs = ["Users", "Course Info", "Booking Messages", "Tee Time Policy"];
const settingsTabs = ["Bookings", "Payments", "Smart AI Pricing", "No Show", "Data Feed", "Email", "Members", "Lottery", "3rd Party", "Other", "Plan"];

const theme = {
  background: "#F5F5F5",
  ink: "#000000",
  accent: "#2563EB",
  white: "#FFFFFF",
  surface: "#FDFDFD",
  border: "#F5F5F5",
  muted: "#787878",
  subtle: "#787878",
  soft: "#F5F5F5",
  softAccent: "rgba(87, 135, 239, 0.16)",
  strongAccent: "rgba(87, 135, 239, 0.28)",
};

const topLevelDescriptions = {
  Dashboard: "Track portfolio activity, operational health, and recent website changes from one overview.",
  "Revenue Engine": "Monitor tee sheet conversion, offer performance, and pricing initiatives across the platform.",
  Marketing: "Coordinate campaigns, audience segments, and content workflows tied to golf course growth.",
  "Website Admin": "Manage brand settings, page controls, AI content generation, audits, and publishing.",
  "AI Chat": "Review AI-assisted recommendations, request updates, and coordinate with guided workflows.",
  Reports: "Review performance reporting across bookings, website activity, marketing, search, and ads.",
  "Business Scanner":
    "Monitor local listing consistency, reviews, business details, and location-level optimization tasks.",
  Help: "Browse walkthroughs, support resources, and product guidance for your operating team.",
};

const pageDescriptions = {
  Home: "Build the homepage hero, CTAs, and key course highlights.",
  Membership:
    "Create a membership page from structured sales inputs and pricing.",
  Golf: "Control course details, booking messaging, and round-planning content.",
  Dining: "Manage restaurant messaging, hours, and menu-focused call to action.",
  Outings: "Set up event lead capture, outing details, and package messaging.",
  Weddings: "Configure venue details, event highlights, and inquiry flow.",
  Contact:
    "Show contact details, map, form options, and direct conversion paths.",
};

function StatusPill({ status }) {
  const styles = {
    Published: { backgroundColor: theme.softAccent, color: theme.ink },
    Draft: { backgroundColor: theme.soft, color: theme.ink },
    "Not Enabled": { backgroundColor: theme.soft, color: theme.subtle },
  };

  return (
    <span className="rounded-full px-3 py-1 text-xs font-semibold" style={styles[status] || styles.Draft}>
      {status}
    </span>
  );
}

function Toggle({ enabled, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-7 w-12 items-center rounded-full p-1 transition ${enabled ? "justify-end" : "justify-start"}`}
      style={{ backgroundColor: enabled ? theme.accent : theme.border }}
    >
      <div className="h-5 w-5 rounded-full" style={{ backgroundColor: theme.white }} />
    </button>
  );
}

function SectionCard({ title, subtitle, right, children }) {
  return (
    <section
      className="rounded-3xl p-5 shadow-sm"
      style={{
        backgroundColor: theme.surface,
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.04)",
        border: `1px solid ${theme.border}`,
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-sm" style={{ color: theme.muted }}>
              {subtitle}
            </p>
          ) : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

function TextField({ label, value, onChange, multiline = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium" style={{ color: theme.ink }}>
        {label}
      </span>
      {multiline ? (
        <textarea
          className="min-h-[96px] w-full rounded-2xl px-4 py-3 text-sm outline-none transition"
          style={{ border: `1px solid ${theme.border}`, color: theme.ink }}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className="w-full rounded-2xl px-4 py-3 text-sm outline-none transition"
          style={{ border: `1px solid ${theme.border}`, color: theme.ink }}
          value={value}
          onChange={onChange}
        />
      )}
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium" style={{ color: theme.ink }}>
        {label}
      </span>
      <select
        className="w-full rounded-2xl px-4 py-3 text-sm outline-none transition"
        style={{ border: `1px solid ${theme.border}`, color: theme.ink }}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function MenuIcon({ item, active = false }) {
  const stroke = active ? theme.white : theme.subtle;
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-[18px] w-[18px]",
  };

  const icons = {
    Dashboard: (
      <svg {...props}>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="5" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="11" width="7" height="9" rx="1.5" />
      </svg>
    ),
    "Revenue Engine": (
      <svg {...props}>
        <path d="M5 17V7" />
        <path d="M12 17V10" />
        <path d="M19 17V5" />
        <path d="M4 19h16" />
      </svg>
    ),
    Marketing: (
      <svg {...props}>
        <path d="M4 13h3l9 4V7l-9 4H4z" />
        <path d="M7 13v4a2 2 0 0 0 2 2h1" />
        <path d="M19 9a3 3 0 0 1 0 6" />
      </svg>
    ),
    "Website Admin": (
      <svg {...props}>
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M3.5 9.5h17" />
        <path d="M8 15h4" />
      </svg>
    ),
    "AI Chat": (
      <svg {...props}>
        <path d="M7 18l-3 2v-5.5A4.5 4.5 0 0 1 8.5 10h7A4.5 4.5 0 0 1 20 14.5v0A4.5 4.5 0 0 1 15.5 19H9" />
        <path d="M9 6h.01" />
        <path d="M12 4l.8 1.7L14.5 6.5l-1.7.8L12 9l-.8-1.7-1.7-.8 1.7-.8z" />
      </svg>
    ),
    Reports: (
      <svg {...props}>
        <path d="M5 19V9" />
        <path d="M10 19V5" />
        <path d="M15 19v-7" />
        <path d="M20 19v-4" />
      </svg>
    ),
    "Business Scanner": (
      <svg {...props}>
        <circle cx="11" cy="11" r="5.5" />
        <path d="M20 20l-4.2-4.2" />
        <path d="M11 8.5v5" />
        <path d="M8.5 11H13.5" />
      </svg>
    ),
    Help: (
      <svg {...props}>
        <circle cx="12" cy="12" r="8" />
        <path d="M9.75 9.25a2.5 2.5 0 1 1 4 2c-.8.6-1.75 1.2-1.75 2.5" />
        <path d="M12 16.75h.01" />
      </svg>
    ),
  };

  return icons[item] || icons.Dashboard;
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function BrandLogo() {
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-2xl"
      style={{ backgroundColor: theme.strongAccent, color: theme.accent }}
    >
      <svg viewBox="0 0 20 20" fill="none" className="h-7 w-7">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7L9 10L12 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function MobilePreview({ activePage, brand, fields }) {
  const accentStyle = { backgroundColor: brand.accentColor };
  const buttonTextStyle = { color: brand.buttonTextColor };
  const titles = {
    Home: fields.heroHeadline,
    Membership: "Find the membership that fits your game",
    Golf: "Plan your round",
    Dining: fields.restaurantName,
    Outings: "Host your next golf event",
    Weddings: "Celebrate in a scenic setting",
    Contact: "Get in touch",
  };
  const summaries = {
    Home: fields.heroSubheadline,
    Membership: fields.audience,
    Golf: fields.courseSummary,
    Dining: fields.diningSummary,
    Outings: fields.outingSummary,
    Weddings: fields.venueSummary,
    Contact: "Call, email, or visit us to plan your next round.",
  };

  return (
    <div className="flex justify-center">
      <div
        className="w-[340px] rounded-[2.5rem] border-[10px] p-2 shadow-2xl"
        style={{ borderColor: theme.ink, backgroundColor: theme.ink }}
      >
        <div className="mb-2 flex justify-center">
          <div className="h-1.5 w-20 rounded-full" style={{ backgroundColor: theme.accent }} />
        </div>
        <div className="overflow-hidden rounded-[2rem] bg-white" style={{ fontFamily: brand.fontFamily }}>
          <div
            className="px-5 pb-6 pt-12 text-white"
            style={{
              background: `linear-gradient(180deg, rgba(0,0,0,.28), rgba(0,0,0,.6)), ${brand.heroBackground}`,
            }}
          >
            <div className="text-xs uppercase tracking-[0.25em] text-white/80">{activePage}</div>
            <h3 className="mt-3 text-3xl font-bold leading-tight">{titles[activePage]}</h3>
            <p className="mt-3 text-sm leading-6 text-white/90">{summaries[activePage]}</p>
            <button className="mt-5 rounded-2xl px-4 py-3 text-sm font-semibold" style={{ ...accentStyle, ...buttonTextStyle }}>
              {activePage === "Home" ? fields.primaryCta : `Open ${activePage}`}
            </button>
          </div>
          <div className="space-y-4 px-5 py-5 text-sm" style={{ color: theme.muted }}>
            {Object.entries(fields).slice(0, 3).map(([key, value]) => (
              <div key={key} className="rounded-2xl p-4" style={{ backgroundColor: theme.background }}>
                <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: theme.subtle }}>
                  {key}
                </div>
                <div className="mt-2">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageFieldEditor({ activePage, pageData, onFieldChange }) {
  return (
    <div className="grid gap-4">
      {Object.entries(pageData.fields).map(([fieldName, value]) => {
        const multiline = String(value).length > 55;

        if (fieldName === "contactMethod" || fieldName === "leadMethod") {
          return (
            <SelectField
              key={fieldName}
              label={fieldName}
              value={value}
              onChange={(e) => onFieldChange(fieldName, e.target.value)}
              options={["Lead Form", "Phone Call", "Email"]}
            />
          );
        }

        if (fieldName === "bookingType") {
          return (
            <SelectField
              key={fieldName}
              label={fieldName}
              value={value}
              onChange={(e) => onFieldChange(fieldName, e.target.value)}
              options={["Inquiry Form", "Phone Call", "Email"]}
            />
          );
        }

        if (fieldName === "mapEmbed" || fieldName === "contactForm") {
          return (
            <SelectField
              key={fieldName}
              label={fieldName}
              value={value}
              onChange={(e) => onFieldChange(fieldName, e.target.value)}
              options={["Enabled", "Disabled"]}
            />
          );
        }

        if (fieldName === "bookingLinkStyle") {
          return (
            <SelectField
              key={fieldName}
              label={fieldName}
              value={value}
              onChange={(e) => onFieldChange(fieldName, e.target.value)}
              options={["Primary CTA", "Secondary CTA", "Sticky CTA"]}
            />
          );
        }

        return (
          <TextField
            key={fieldName}
            label={fieldName}
            value={value}
            onChange={(e) => onFieldChange(fieldName, e.target.value)}
            multiline={multiline}
          />
        );
      })}
    </div>
  );
}

function ScenarioSandboxWorkspace() {
  const [scenarioPreset, setScenarioPreset] = useState("Balanced");

  const scenarioData = {
    Conservative: {
      controls: {
        bookingPace: 42,
        weather: 28,
        traffic: 36,
        elasticity: 34,
        history: 62,
        yield: 40,
      },
      summary: {
        currentAvg: "$62",
        proposedAvg: "$64",
        lift: "+3.1%",
        occupancy: "-0.3%",
        highDemand: "9",
        confidence: "Medium",
      },
      rows: [
        { time: "7:30 AM", current: 74, proposed: 78, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Favorable", confidence: "High", why: "Prime morning slot with low inventory" },
        { time: "7:40 AM", current: 74, proposed: 78, inventory: "3 left", pace: "Ahead", traffic: "High", weather: "Favorable", confidence: "High", why: "Ahead of normal pace + strong traffic" },
        { time: "8:00 AM", current: 78, proposed: 82, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Neutral", confidence: "High", why: "Historical high-demand hour" },
        { time: "8:20 AM", current: 82, proposed: 85, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Neutral", confidence: "High", why: "Low inventory with stable weather" },
        { time: "9:00 AM", current: 84, proposed: 86, inventory: "4 left", pace: "On Track", traffic: "Medium", weather: "Neutral", confidence: "Medium", why: "Steady pace with modest pressure" },
        { time: "10:10 AM", current: 76, proposed: 77, inventory: "6 left", pace: "On Track", traffic: "Medium", weather: "Favorable", confidence: "Medium", why: "Mild weather supports a small lift" },
        { time: "11:30 AM", current: 68, proposed: 68, inventory: "8 left", pace: "On Track", traffic: "Medium", weather: "Neutral", confidence: "Low", why: "Signals are balanced and unchanged" },
        { time: "1:10 PM", current: 58, proposed: 56, inventory: "12 left", pace: "Behind", traffic: "Low", weather: "Neutral", confidence: "Medium", why: "Weak pace and softer demand" },
      ],
      drivers: [
        "Morning tee times are booking 11% ahead of typical pace.",
        "Website traffic is elevated across 7:30 AM-9:30 AM slots.",
        "Historical Saturday demand supports moderate upward pressure.",
        "Afternoon demand remains soft with higher available inventory.",
      ],
      factorWeights: [
        ["Booking Pace", 72],
        ["Historical Demand", 64],
        ["Website Traffic", 58],
        ["Weather", 36],
      ],
    },
    Balanced: {
      controls: {
        bookingPace: 58,
        weather: 44,
        traffic: 52,
        elasticity: 49,
        history: 68,
        yield: 54,
      },
      summary: {
        currentAvg: "$62",
        proposedAvg: "$66",
        lift: "+6.4%",
        occupancy: "-0.8%",
        highDemand: "14",
        confidence: "Medium-High",
      },
      rows: [
        { time: "7:30 AM", current: 74, proposed: 82, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Favorable", confidence: "High", why: "Ahead of normal pace + strong traffic" },
        { time: "7:40 AM", current: 74, proposed: 83, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Favorable", confidence: "High", why: "Prime morning slot with strong intent signals" },
        { time: "7:50 AM", current: 76, proposed: 84, inventory: "3 left", pace: "Ahead", traffic: "High", weather: "Favorable", confidence: "High", why: "Historical high-demand hour" },
        { time: "8:00 AM", current: 78, proposed: 87, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Neutral", confidence: "High", why: "Low inventory and elevated booking pace" },
        { time: "8:20 AM", current: 82, proposed: 90, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Neutral", confidence: "High", why: "High demand compression in premium morning band" },
        { time: "8:40 AM", current: 82, proposed: 89, inventory: "3 left", pace: "Ahead", traffic: "High", weather: "Neutral", confidence: "High", why: "Strong views and above-normal pace" },
        { time: "9:10 AM", current: 84, proposed: 88, inventory: "4 left", pace: "On Track", traffic: "Medium", weather: "Neutral", confidence: "Medium", why: "Steady pace with premium willingness-to-pay" },
        { time: "10:10 AM", current: 76, proposed: 79, inventory: "6 left", pace: "On Track", traffic: "Medium", weather: "Favorable", confidence: "Medium", why: "Mild weather supports upward pricing pressure" },
        { time: "11:30 AM", current: 68, proposed: 69, inventory: "8 left", pace: "On Track", traffic: "Medium", weather: "Neutral", confidence: "Low", why: "Signals are stable with minimal adjustment" },
        { time: "1:10 PM", current: 58, proposed: 54, inventory: "12 left", pace: "Behind", traffic: "Low", weather: "Neutral", confidence: "Medium", why: "Weak pace and softer demand" },
        { time: "2:20 PM", current: 52, proposed: 49, inventory: "14 left", pace: "Behind", traffic: "Low", weather: "Weak", confidence: "Medium", why: "Weather headwind offset by low intent" },
        { time: "3:40 PM", current: 46, proposed: 44, inventory: "18 left", pace: "Behind", traffic: "Low", weather: "Weak", confidence: "Low", why: "Late-day softness and lighter conversion signals" },
      ],
      drivers: [
        "Morning tee times are booking 18% ahead of typical pace.",
        "Tee-sheet views are elevated for 8:00 AM-11:00 AM.",
        "Saturday demand patterns suggest premium willingness-to-pay.",
        "Mild weather supports upward pricing pressure.",
        "Afternoon shoulder hours remain soft and mostly unchanged.",
      ],
      factorWeights: [
        ["Booking Pace", 82],
        ["Historical Demand", 71],
        ["Website Traffic", 67],
        ["Weather", 46],
      ],
    },
    Aggressive: {
      controls: {
        bookingPace: 74,
        weather: 56,
        traffic: 68,
        elasticity: 66,
        history: 78,
        yield: 72,
      },
      summary: {
        currentAvg: "$62",
        proposedAvg: "$69",
        lift: "+9.8%",
        occupancy: "-1.6%",
        highDemand: "18",
        confidence: "Medium",
      },
      rows: [
        { time: "7:30 AM", current: 74, proposed: 85, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Favorable", confidence: "High", why: "Strong pace with aggressive demand capture" },
        { time: "7:40 AM", current: 74, proposed: 86, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Favorable", confidence: "High", why: "Prime slot with elevated intent and low supply" },
        { time: "7:50 AM", current: 76, proposed: 88, inventory: "3 left", pace: "Ahead", traffic: "High", weather: "Favorable", confidence: "High", why: "Historical high-demand hour" },
        { time: "8:00 AM", current: 78, proposed: 91, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Neutral", confidence: "High", why: "Low inventory plus strong booking velocity" },
        { time: "8:20 AM", current: 82, proposed: 94, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Neutral", confidence: "High", why: "Premium morning slot with compressed supply" },
        { time: "8:40 AM", current: 82, proposed: 93, inventory: "3 left", pace: "Ahead", traffic: "High", weather: "Neutral", confidence: "High", why: "Intent signals justify more assertive lift" },
        { time: "9:10 AM", current: 84, proposed: 90, inventory: "4 left", pace: "Ahead", traffic: "Medium", weather: "Neutral", confidence: "Medium", why: "Pace remains stronger than historical average" },
        { time: "10:10 AM", current: 76, proposed: 81, inventory: "6 left", pace: "On Track", traffic: "Medium", weather: "Favorable", confidence: "Medium", why: "Weather and elasticity learning encourage a lift" },
        { time: "11:30 AM", current: 68, proposed: 70, inventory: "8 left", pace: "On Track", traffic: "Medium", weather: "Neutral", confidence: "Low", why: "Small move with moderate confidence" },
        { time: "1:10 PM", current: 58, proposed: 53, inventory: "12 left", pace: "Behind", traffic: "Low", weather: "Neutral", confidence: "Medium", why: "Weak pace and lower demand confidence" },
        { time: "2:20 PM", current: 52, proposed: 47, inventory: "14 left", pace: "Behind", traffic: "Low", weather: "Weak", confidence: "Medium", why: "Soft pace and weather pressure" },
        { time: "3:40 PM", current: 46, proposed: 42, inventory: "18 left", pace: "Behind", traffic: "Low", weather: "Weak", confidence: "Low", why: "Late-day softness with lower booking intent" },
      ],
      drivers: [
        "Morning demand is materially above historical norms and inventory is tightening.",
        "Website traffic and booking intent are peaking across prime tee times.",
        "Elasticity learning suggests golfers remain tolerant of moderate upward moves.",
        "Yield pressure is elevated due to strong Saturday compression.",
        "Afternoon slots still soften due to weaker pace and weather drag.",
      ],
      factorWeights: [
        ["Booking Pace", 90],
        ["Historical Demand", 79],
        ["Website Traffic", 74],
        ["Weather", 52],
      ],
    },
    Custom: {
      controls: {
        bookingPace: 61,
        weather: 38,
        traffic: 57,
        elasticity: 48,
        history: 63,
        yield: 59,
      },
      summary: {
        currentAvg: "$62",
        proposedAvg: "$65",
        lift: "+5.7%",
        occupancy: "-0.6%",
        highDemand: "13",
        confidence: "Medium",
      },
      rows: [
        { time: "7:30 AM", current: 74, proposed: 81, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Favorable", confidence: "High", why: "Strong pace and low inventory" },
        { time: "7:40 AM", current: 74, proposed: 82, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Favorable", confidence: "High", why: "Prime slot with strong traffic" },
        { time: "8:00 AM", current: 78, proposed: 86, inventory: "2 left", pace: "Ahead", traffic: "High", weather: "Neutral", confidence: "High", why: "Historical demand plus current pace" },
        { time: "8:20 AM", current: 82, proposed: 88, inventory: "3 left", pace: "Ahead", traffic: "High", weather: "Neutral", confidence: "Medium", why: "High intent, but smaller elasticity influence" },
        { time: "9:10 AM", current: 84, proposed: 87, inventory: "4 left", pace: "On Track", traffic: "Medium", weather: "Neutral", confidence: "Medium", why: "Balanced signals support a modest lift" },
        { time: "10:10 AM", current: 76, proposed: 78, inventory: "6 left", pace: "On Track", traffic: "Medium", weather: "Favorable", confidence: "Medium", why: "Weather supports a small increase" },
        { time: "11:30 AM", current: 68, proposed: 68, inventory: "8 left", pace: "On Track", traffic: "Medium", weather: "Neutral", confidence: "Low", why: "No strong pricing pressure" },
        { time: "1:10 PM", current: 58, proposed: 55, inventory: "12 left", pace: "Behind", traffic: "Low", weather: "Neutral", confidence: "Medium", why: "Weak pace and softer afternoon demand" },
      ],
      drivers: [
        "Morning pace remains above trend, but settings moderate the upward response.",
        "Traffic contributes meaningfully to prime-time price lifts.",
        "Historical demand still anchors the strongest morning recommendations.",
        "Afternoon slots remain mostly stable or slightly softer.",
      ],
      factorWeights: [
        ["Booking Pace", 78],
        ["Historical Demand", 66],
        ["Website Traffic", 69],
        ["Weather", 34],
      ],
    },
  };

  const currentScenario = scenarioData[scenarioPreset];
  const priceRows = currentScenario.rows;
  const chartWidth = 620;
  const chartHeight = 220;
  const padding = 24;
  const currentValues = priceRows.map((row) => row.current);
  const proposedValues = priceRows.map((row) => row.proposed);
  const maxValue = Math.max(...currentValues, ...proposedValues) + 6;
  const minValue = Math.min(...currentValues, ...proposedValues) - 6;
  const xForIndex = (index) => padding + (index * (chartWidth - padding * 2)) / Math.max(priceRows.length - 1, 1);
  const yForValue = (value) =>
    chartHeight - padding - ((value - minValue) / Math.max(maxValue - minValue, 1)) * (chartHeight - padding * 2);
  const currentLine = priceRows.map((row, index) => `${xForIndex(index)},${yForValue(row.current)}`).join(" ");
  const proposedLine = priceRows.map((row, index) => `${xForIndex(index)},${yForValue(row.proposed)}`).join(" ");
  const pricingSubnav = ["Overview", "Rules / Profiles", "Scenario Sandbox", "History / Change Log"];
  const scenarioCards = ["Conservative", "Balanced", "Aggressive", "Custom"];
  const guardrails = [
    "Max increase per refresh: +8%",
    "Max decrease per refresh: -10%",
    "Rate floor: $38",
    "Rate ceiling: $110",
    "Weather can reduce price by no more than 12%",
    "Low-confidence slots default to smaller changes",
  ];

  const renderSignalPill = (label, tone = "neutral") => {
    const styles = {
      positive: { backgroundColor: theme.softAccent, color: theme.ink },
      warning: { backgroundColor: theme.soft, color: theme.ink },
      neutral: { backgroundColor: theme.white, color: theme.muted, border: `1px solid ${theme.border}` },
    };

    return (
      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={styles[tone] || styles.neutral}>
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <SectionCard
        title="Scenario Sandbox"
        subtitle="Preview how pricing may shift based on pace, weather, traffic, and demand sensitivity before publishing live rates."
        right={
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.ink }}>
              Preview Only
            </span>
            <button className="rounded-2xl px-4 py-2 text-sm font-medium" style={{ border: `1px solid ${theme.border}`, color: theme.ink }}>
              Reset
            </button>
            <button className="rounded-2xl px-4 py-2 text-sm font-medium" style={{ border: `1px solid ${theme.border}`, color: theme.ink }}>
              Save Scenario
            </button>
            <button className="rounded-2xl px-4 py-2 text-sm font-medium" style={{ border: `1px solid ${theme.border}`, color: theme.ink }}>
              Preview Tomorrow
            </button>
            <button className="rounded-2xl px-4 py-2 text-sm font-medium" style={{ backgroundColor: theme.soft, color: theme.muted }}>
              Publish Prices
            </button>
          </div>
        }
      >
        <div className="mt-2 flex flex-wrap gap-2">
          {pricingSubnav.map((item) => (
            <span
              key={item}
              className="rounded-full px-3 py-2 text-xs font-semibold"
              style={item === "Scenario Sandbox" ? { backgroundColor: theme.accent, color: theme.white } : { backgroundColor: theme.soft, color: theme.muted }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: theme.border, backgroundColor: theme.white, color: theme.muted }}>
          Current published pricing remains unchanged until you publish. This sandbox is a safe preview area for testing tomorrow's pricing logic.
        </div>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {scenarioCards.map((preset) => {
          const isActive = scenarioPreset === preset;
          const presetSummary = scenarioData[preset].summary;

          return (
            <button
              key={preset}
              onClick={() => setScenarioPreset(preset)}
              className="rounded-3xl border p-4 text-left transition"
              style={
                isActive
                  ? { borderColor: theme.accent, backgroundColor: theme.softAccent }
                  : { borderColor: theme.border, backgroundColor: theme.surface }
              }
            >
              <div className="font-semibold">{preset}</div>
              <div className="mt-2 text-sm" style={{ color: theme.muted }}>
                Avg {presetSummary.proposedAvg} | Lift {presetSummary.lift}
              </div>
              <div className="mt-3 text-xs font-semibold" style={{ color: theme.subtle }}>
                {preset === "Custom" ? "Sliders active" : "Compare to current"}
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 2xl:grid-cols-[320px_1fr_320px]">
        <div className="space-y-6">
          <SectionCard title="Scenario Controls" subtitle="Adjust how aggressively the system responds to tomorrow's signals.">
            <div className="space-y-4">
              <SelectField label="Profile Preset" value={scenarioPreset} onChange={(e) => setScenarioPreset(e.target.value)} options={scenarioCards} />
              <SelectField label="Date" value="Tomorrow" onChange={() => {}} options={["Tomorrow", "Saturday", "Sunday", "Custom Date"]} />
              <SelectField label="Course" value="Demo Golf Club" onChange={() => {}} options={["Demo Golf Club", "North Course", "South Course"]} />
              <SelectField label="Rate Type" value="Public Rates" onChange={() => {}} options={["Public Rates", "Member Guest", "Twilight", "Replay"]} />
              <SelectField label="Time Band" value="Full Day" onChange={() => {}} options={["Full Day", "Morning Prime", "Midday", "Afternoon"]} />
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["Booking Pace Sensitivity", currentScenario.controls.bookingPace, "Conservative", "Aggressive"],
                ["Weather Sensitivity", currentScenario.controls.weather, "Low", "High"],
                ["Website Traffic Sensitivity", currentScenario.controls.traffic, "Low", "High"],
                ["Elasticity Learning Influence", currentScenario.controls.elasticity, "Low", "High"],
                ["Historical Demand Weight", currentScenario.controls.history, "Low", "High"],
                ["Yield Pressure Weight", currentScenario.controls.yield, "Low", "High"],
              ].map(([label, value, left, right]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{label}</span>
                    <span style={{ color: theme.muted }}>{value}</span>
                  </div>
                  <input key={`${scenarioPreset}-${label}`} type="range" min="0" max="100" defaultValue={value} className="w-full accent-[#2563EB]" />
                  <div className="mt-1 flex justify-between text-xs" style={{ color: theme.subtle }}>
                    <span>{left}</span>
                    <span>{right}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.background }}>
              <div className="text-sm font-semibold">Smart Base Rate Inputs</div>
              <div className="mt-3 space-y-3 text-sm" style={{ color: theme.muted }}>
                <div className="flex items-center justify-between"><span>Base Rate Strategy</span><span>Historical</span></div>
                <div className="flex items-center justify-between"><span>Season</span><span>Peak</span></div>
                <div className="flex items-center justify-between"><span>Known High Demand Inputs</span><span>On</span></div>
                <div className="flex items-center justify-between"><span>Historical High Demand Detection</span><span>On</span></div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              ["Current Avg Rate", currentScenario.summary.currentAvg],
              ["Proposed Avg Rate", currentScenario.summary.proposedAvg],
              ["Projected Revenue Lift", currentScenario.summary.lift],
              ["Projected Occupancy Impact", currentScenario.summary.occupancy],
              ["High Demand Slots Identified", currentScenario.summary.highDemand],
              ["Confidence Level", currentScenario.summary.confidence],
            ].map(([label, value]) => (
              <SectionCard key={label} title={label}>
                <div className="text-3xl font-bold">{value}</div>
              </SectionCard>
            ))}
          </div>

          <SectionCard
            title="Current vs Proposed Price by Tee Time"
            subtitle="Compare current published pricing against the scenario preview for the selected date."
            right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.muted }}>Preview generated successfully</span>}
          >
            <div className="overflow-x-auto">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-[260px] w-full min-w-[620px]">
                {[0, 1, 2, 3].map((step) => {
                  const value = minValue + ((maxValue - minValue) / 3) * step;
                  const y = yForValue(value);

                  return (
                    <g key={step}>
                      <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke={theme.border} strokeWidth="1" />
                      <text x="2" y={y + 4} fontSize="11" fill={theme.muted}>{`$${Math.round(value)}`}</text>
                    </g>
                  );
                })}
                <polyline fill="none" stroke={theme.subtle} strokeWidth="3" points={currentLine} />
                <polyline fill="none" stroke={theme.accent} strokeWidth="3" points={proposedLine} />
                {priceRows.map((row, index) => (
                  <g key={row.time}>
                    <circle cx={xForIndex(index)} cy={yForValue(row.current)} r="4" fill={theme.surface} stroke={theme.subtle} strokeWidth="2" />
                    <circle cx={xForIndex(index)} cy={yForValue(row.proposed)} r="4" fill={theme.white} stroke={theme.accent} strokeWidth="2" />
                    <text x={xForIndex(index)} y={chartHeight - 6} fontSize="10" textAnchor="middle" fill={theme.muted}>{row.time}</text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theme.subtle }} />Current Price</div>
              <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theme.accent }} />Proposed Price</div>
            </div>
          </SectionCard>

          <SectionCard title="Tee Time Preview" subtitle="Review how tomorrow's prices may move before anything goes live.">
            <div className="overflow-x-auto">
              <table className="min-w-[1180px] w-full text-left text-sm">
                <thead>
                  <tr style={{ color: theme.subtle }}>
                    {["Tee Time", "Current Price", "Proposed Price", "Change", "Inventory Left", "Booking Pace", "Traffic / Views", "Weather Impact", "Demand Confidence", "Why It Moved"].map((heading) => (
                      <th key={heading} className="border-b px-3 py-3 font-semibold" style={{ borderColor: theme.border }}>{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => {
                    const delta = row.proposed - row.current;
                    const deltaLabel = delta === 0 ? "$0" : `${delta > 0 ? "+" : "-"}$${Math.abs(delta)}`;
                    const deltaStyle =
                      delta > 0
                        ? { backgroundColor: theme.softAccent, color: theme.ink }
                        : delta < 0
                        ? { backgroundColor: theme.soft, color: theme.ink }
                        : { backgroundColor: theme.white, color: theme.muted, border: `1px solid ${theme.border}` };

                    return (
                      <tr key={row.time}>
                        <td className="border-b px-3 py-4 font-semibold" style={{ borderColor: theme.border }}>{row.time}</td>
                        <td className="border-b px-3 py-4" style={{ borderColor: theme.border }}>${row.current}</td>
                        <td className="border-b px-3 py-4 font-semibold" style={{ borderColor: theme.border }}>${row.proposed}</td>
                        <td className="border-b px-3 py-4" style={{ borderColor: theme.border }}>
                          <span className="rounded-full px-3 py-1 text-xs font-semibold" style={deltaStyle}>{deltaLabel}</span>
                        </td>
                        <td className="border-b px-3 py-4" style={{ borderColor: theme.border }}>{row.inventory}</td>
                        <td className="border-b px-3 py-4" style={{ borderColor: theme.border }}>
                          {renderSignalPill(row.pace, row.pace === "Ahead" ? "positive" : row.pace === "Behind" ? "warning" : "neutral")}
                        </td>
                        <td className="border-b px-3 py-4" style={{ borderColor: theme.border }}>
                          {renderSignalPill(row.traffic, row.traffic === "High" ? "positive" : "neutral")}
                        </td>
                        <td className="border-b px-3 py-4" style={{ borderColor: theme.border }}>
                          {renderSignalPill(row.weather, row.weather === "Favorable" ? "positive" : row.weather === "Weak" ? "warning" : "neutral")}
                        </td>
                        <td className="border-b px-3 py-4" style={{ borderColor: theme.border }}>
                          {renderSignalPill(row.confidence, row.confidence === "High" ? "positive" : row.confidence === "Low" ? "warning" : "neutral")}
                        </td>
                        <td className="border-b px-3 py-4" style={{ borderColor: theme.border, color: theme.muted }}>{row.why}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard title="Workflow" subtitle="Use this page to safely evaluate tomorrow's pricing before anything changes live.">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {[
                "1. Choose scenario inputs",
                "2. Preview pricing changes",
                "3. Review chart and table",
                "4. Review pricing drivers",
                "5. Save scenario or publish",
              ].map((step) => (
                <div key={step} className="rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: theme.soft, color: theme.ink }}>
                  {step}
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: theme.border, backgroundColor: theme.white, color: theme.muted }}>
                Saving a scenario stores this setup for review without changing live pricing.
              </div>
              <div className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: theme.border, backgroundColor: theme.white, color: theme.muted }}>
                Publishing applies the proposed prices to the selected date and course based on your current pricing rails.
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Why Prices Changed" subtitle="Plain-language explanation designed to help operators trust the pricing logic.">
            <div className="space-y-3">
              {currentScenario.drivers.map((driver, index) => (
                <div key={driver} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
                  <div className="font-semibold">{`${index + 1}. ${driver}`}</div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <div className="mb-3 text-sm font-semibold">Signal Breakdown</div>
              <div className="space-y-3">
                {currentScenario.factorWeights.map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>{label}</span>
                      <span style={{ color: theme.muted }}>{value}</span>
                    </div>
                    <div className="h-3 rounded-full" style={{ backgroundColor: theme.soft }}>
                      <div className="h-3 rounded-full" style={{ width: `${value}%`, backgroundColor: theme.accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Pricing Safety Rails" subtitle="Operators remain in control and suggestions stay within bounded limits.">
            <div className="space-y-3">
              {guardrails.map((rule) => (
                <div key={rule} className="rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: theme.soft, color: theme.ink }}>
                  {rule}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: theme.border, backgroundColor: theme.white, color: theme.muted }}>
              82% of suggested price changes fall within normal expected adjustment ranges.
            </div>
          </SectionCard>

          <SectionCard title="Scenario Notes" subtitle="Optional notes area for internal review and leadership demos.">
            <TextField
              label="Internal Notes"
              value="Balanced profile recommended by system. Morning demand is strong, while afternoon slots remain soft and controlled by existing rails."
              onChange={() => {}}
              multiline
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function BookingEngineWorkspace({ activeTab, onTabChange }) {
  const ratePlans = [
    { name: "Public Prime", window: "Fri-Sun", logic: "Rack Rate", status: "Live" },
    { name: "Member Guest", window: "Daily", logic: "Member Linked", status: "Live" },
    { name: "Twilight Saver", window: "After 3:00 PM", logic: "Auto Discount", status: "Draft" },
  ];
  const timeSlots = [
    { season: "Peak Season", dates: "Apr 1 - Oct 31", slots: "6:30 AM - 6:40 PM", interval: "10 minutes" },
    { season: "Shoulder Season", dates: "Mar 1 - Mar 31", slots: "7:10 AM - 5:50 PM", interval: "10 minutes" },
    { season: "Winter Season", dates: "Nov 1 - Feb 28", slots: "8:00 AM - 4:20 PM", interval: "12 minutes" },
  ];
  const highDemandDays = [4, 5, 11, 12, 18, 19, 25, 26];
  const teeSheet = [
    { time: "7:10 AM", inventory: "4 open", rule: "Public Prime", note: "Starter block removed" },
    { time: "8:20 AM", inventory: "2 open", rule: "Smart Pricing +12%", note: "Weekend demand applied" },
    { time: "9:40 AM", inventory: "Waitlist only", rule: "Lottery Hold", note: "Member event release at 3 PM" },
  ];
  const reservations = [
    { name: "Jordan Reed", teeTime: "8:20 AM", source: "Website", spend: "$132", status: "Confirmed" },
    { name: "Alex Chen", teeTime: "9:10 AM", source: "Call Center", spend: "$88", status: "Pending Payment" },
    { name: "Mia Torres", teeTime: "10:30 AM", source: "Widget", spend: "$164", status: "Modified" },
  ];

  const renderSetup = () => (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <SectionCard
        title="Rate Plans"
        subtitle="Define the pricing frameworks available to the booking engine."
        right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.ink }}>3 Active Plans</span>}
      >
        <div className="space-y-3">
          {ratePlans.map((plan) => (
            <div key={plan.name} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.background }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{plan.name}</div>
                  <div className="mt-1 text-sm" style={{ color: theme.muted }}>{plan.window} | {plan.logic}</div>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: plan.status === "Live" ? theme.softAccent : theme.soft, color: theme.ink }}>
                  {plan.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="space-y-6">
        <SectionCard title="Seasons and Time Slots" subtitle="Control the operating windows that shape available inventory.">
          <div className="space-y-3">
            {timeSlots.map((item) => (
              <div key={item.season} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
                <div className="font-semibold">{item.season}</div>
                <div className="mt-2 grid gap-2 text-sm" style={{ color: theme.muted }}>
                  <div>{item.dates}</div>
                  <div>{item.slots}</div>
                  <div>{item.interval} tee interval</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="High Demand Day Calendar" subtitle="Flag peak demand dates for pricing and inventory rules.">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium" style={{ color: theme.subtle }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="pb-2">{day}</div>
            ))}
            {Array.from({ length: 35 }, (_, index) => {
              const dayNumber = index - 1;
              const isRealDay = dayNumber > 0 && dayNumber <= 31;
              const isHot = highDemandDays.includes(dayNumber);

              return (
                <div
                  key={index}
                  className="flex h-11 items-center justify-center rounded-2xl border text-sm"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: isHot ? theme.softAccent : theme.white,
                    color: isHot ? theme.ink : isRealDay ? theme.ink : theme.subtle,
                  }}
                >
                  {isRealDay ? dayNumber : ""}
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  );

  const renderRateManagement = () => (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {[
        { label: "Average Rack Rate", value: "$84", note: "Across next 14 days" },
        { label: "Weekend Premium", value: "+18%", note: "Against weekday baseline" },
        { label: "Pending Overrides", value: "7", note: "Awaiting manager approval" },
      ].map((item) => (
        <SectionCard key={item.label} title={item.label} subtitle={item.note}>
          <div className="text-3xl font-bold">{item.value}</div>
        </SectionCard>
      ))}
    </div>
  );

  const renderSmartPricing = () => <ScenarioSandboxWorkspace />;

  const renderTeeTimeManager = () => (
    <SectionCard title="Tee Time Manager" subtitle="Monitor inventory releases, holds, and pacing throughout the day.">
      <div className="space-y-3">
        {teeSheet.map((slot) => (
          <div key={slot.time} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{slot.time}</div>
                <div className="mt-1 text-sm" style={{ color: theme.muted }}>{slot.rule} | {slot.note}</div>
              </div>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.ink }}>
                {slot.inventory}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );

  const renderBookingManager = () => (
    <SectionCard title="Booking Manager" subtitle="Review reservation flow, modifications, and checkout status.">
      <div className="space-y-3">
        {reservations.map((reservation) => (
          <div key={reservation.name} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{reservation.name}</div>
                <div className="mt-1 text-sm" style={{ color: theme.muted }}>
                  {reservation.teeTime} | {reservation.source} | {reservation.spend}
                </div>
              </div>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.ink }}>
                {reservation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <SectionCard
        title="Booking Engine"
        subtitle="Mock control center for tee sheet configuration, pricing rules, and reservation operations."
        right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.muted }}>TailAdmin-Style Tabs</span>}
      >
        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-6 border-b" style={{ borderColor: theme.border }}>
            {bookingEngineTabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className="relative pb-4 pt-1 text-sm font-medium transition"
                  style={{ color: isActive ? theme.ink : theme.muted }}
                >
                  {tab}
                  <span
                    className="absolute bottom-0 left-0 h-0.5 w-full rounded-full"
                    style={{ backgroundColor: isActive ? theme.ink : "transparent" }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </SectionCard>

      {activeTab === "Setup" ? renderSetup() : null}
      {activeTab === "Rate Management" ? renderRateManagement() : null}
      {activeTab === "Smart Pricing AI" ? renderSmartPricing() : null}
      {activeTab === "Tee Time Manager" ? renderTeeTimeManager() : null}
      {activeTab === "Booking Manager" ? renderBookingManager() : null}
    </div>
  );
}

function RevenueEngineModuleWorkspace({ module }) {
  const moduleContent = {
    "Promo Codes": {
      subtitle: "Create, segment, and monitor promotional codes tied to booking conversion.",
      badge: "12 Live Codes",
      stats: [
        ["Attributed Revenue", "$4,820"],
        ["Redemption Rate", "18.4%"],
        ["Next Expiration", "Friday"],
      ],
      items: [
        { title: "SPRING18", detail: "18% off weekday public rounds | Expires Apr 30", status: "Live" },
        { title: "TWILIGHT2X", detail: "2-for-1 after 4 PM | Member guest excluded", status: "Scheduled" },
        { title: "WELCOME9", detail: "$9 off first online booking | Widget + website", status: "Testing" },
      ],
    },
    "Gift Cards": {
      subtitle: "Manage digital and clubhouse gift card inventory, balances, and fulfillment flow.",
      badge: "324 Sold YTD",
      stats: [
        ["Outstanding Balance", "$12,460"],
        ["Avg Card Value", "$78"],
        ["Digital Delivery", "94%"],
      ],
      items: [
        { title: "Spring Collection", detail: "Email-first gift card design with same-day scheduling", status: "Primary" },
        { title: "Corporate Packs", detail: "Bulk purchase flow for tournaments and outings", status: "Active" },
        { title: "Balance Reminder", detail: "Automated reminder at 60 and 14 days", status: "Enabled" },
      ],
    },
    "Wait List": {
      subtitle: "Track open demand and automate replacement booking for sold-out tee times.",
      badge: "28 Guests Waiting",
      stats: [
        ["Open Requests", "28"],
        ["Auto-Fills Today", "9"],
        ["Peak Window", "8:00-10:30 AM"],
      ],
      items: [
        { title: "Saturday Morning Queue", detail: "12 foursomes requesting openings before 10 AM", status: "Hot" },
        { title: "Twosome Backfill Rule", detail: "Pair partial inventory with singles after 2 PM", status: "Active" },
        { title: "SMS Confirmation Flow", detail: "10-minute claim window before queue advances", status: "Live" },
      ],
    },
    Lottery: {
      subtitle: "Configure high-demand drawing windows, allocation logic, and release controls.",
      badge: "2 Draws This Week",
      stats: [
        ["Pending Entries", "146"],
        ["Release Window", "3:00 PM"],
        ["Member Events", "4"],
      ],
      items: [
        { title: "Saturday Member Draw", detail: "Weighted for full-season members with guest cap of 1", status: "Open" },
        { title: "Holiday Release Rule", detail: "Unclaimed inventory moves to wait list after draw close", status: "Ready" },
        { title: "Audit Trail", detail: "Store draw seed, participants, and fulfillment outcomes", status: "Enabled" },
      ],
    },
    "Checkout Upsells": {
      subtitle: "Merchandise add-ons, replay offers, and booking-path upgrades at checkout.",
      badge: "22% Attach Rate",
      stats: [
        ["Avg Upsell Order", "$18"],
        ["Top Offer", "Replay 9"],
        ["A/B Tests", "3 Active"],
      ],
      items: [
        { title: "Replay 9 Add-On", detail: "Offer second loop after 1 PM with same-day discount", status: "Top Performer" },
        { title: "Range Bucket Bundle", detail: "Attach practice balls to public prime rounds", status: "Live" },
        { title: "Cart Upgrade Prompt", detail: "Premium cart message shown on high-heat days", status: "Testing" },
      ],
    },
  };

  const config = moduleContent[module];

  if (!config) {
    return null;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <SectionCard
        title={module}
        subtitle={config.subtitle}
        right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.ink }}>{config.badge}</span>}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {config.stats.map(([label, value]) => (
            <div key={label} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.background }}>
              <div className="text-sm" style={{ color: theme.subtle }}>{label}</div>
              <div className="mt-2 text-3xl font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={`${module} Workspace`} subtitle="Mock operational modules and status cards for this revenue tool.">
        <div className="space-y-3">
          {config.items.map((item) => (
            <div key={item.title} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-1 text-sm" style={{ color: theme.muted }}>{item.detail}</div>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.ink }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

const nestedModuleConfigs = {
  Marketing: {
    Automation: {
      title: "Automation",
      subtitle: "Build triggered journeys for abandoned bookings, replay offers, and lifecycle retention.",
      badge: "8 Active Flows",
      stats: [["Triggered Today", "184"], ["Conversion Rate", "12.6%"], ["Paused Flows", "2"]],
      items: [
        { title: "Abandoned Tee Time Recovery", detail: "Send SMS + email within 20 minutes of a dropped checkout.", status: "Live" },
        { title: "Twilight Replay Journey", detail: "Promote same-day replay offers to guests who finish before 3 PM.", status: "Testing" },
        { title: "Membership Lead Nurture", detail: "Three-step sequence for membership inquiry follow-up.", status: "Ready" },
      ],
    },
    Campaigns: {
      title: "Campaigns",
      subtitle: "Coordinate seasonal pushes, event promotions, and local growth campaigns.",
      badge: "5 Campaigns Running",
      stats: [["Reach", "42.8K"], ["CTR", "4.1%"], ["Attributed Bookings", "96"]],
      items: [
        { title: "Spring Kickoff Weekend", detail: "Homepage hero, email drop, and GBP post all aligned for April 12.", status: "Running" },
        { title: "Corporate Outings Push", detail: "Lead-gen ads and landing page updates for weekday groups.", status: "Scheduled" },
        { title: "Junior Golf Enrollment", detail: "Local awareness campaign targeting family audiences.", status: "Draft" },
      ],
    },
    "Email Marketing": {
      title: "Email Marketing",
      subtitle: "Manage sends, templates, and engagement trends across booking and retention programs.",
      badge: "22 Templates",
      stats: [["Open Rate", "38%"], ["Click Rate", "8.9%"], ["Next Send", "Tomorrow 9 AM"]],
      items: [
        { title: "Weekend Inventory Alert", detail: "Dynamic send based on tee-sheet gaps for the next 72 hours.", status: "Queued" },
        { title: "Member Newsletter", detail: "Monthly update featuring events, leagues, and dining specials.", status: "Live" },
        { title: "Win-Back Series", detail: "Re-engage guests inactive for 45+ days with smart offers.", status: "Optimizing" },
      ],
    },
    Contacts: {
      title: "Contacts",
      subtitle: "View audience growth, lead sources, and player profile enrichment.",
      badge: "18,420 Contacts",
      stats: [["New This Week", "248"], ["Known Golfers", "71%"], ["Duplicates Flagged", "34"]],
      items: [
        { title: "High-Frequency Golfers", detail: "Guests with 4+ rounds in the last 60 days and high replay intent.", status: "Segmented" },
        { title: "Outings Leads", detail: "Corporate and charity event prospects from paid + organic channels.", status: "Tracked" },
        { title: "Membership Prospects", detail: "Contacts scored above 80 based on inquiry behavior and spend.", status: "Scored" },
      ],
    },
    Segments: {
      title: "Segments",
      subtitle: "Build reusable audiences for campaigns, automations, and reporting.",
      badge: "31 Saved Segments",
      stats: [["Largest Segment", "5.2K"], ["Auto-Updated", "26"], ["Synced Audiences", "7"]],
      items: [
        { title: "Weekend Public Players", detail: "Guests who book Friday through Sunday at least twice per quarter.", status: "Live" },
        { title: "Lapsed Membership Leads", detail: "Past inquiries with no activity in the last 90 days.", status: "Ready" },
        { title: "High-Spend Event Buyers", detail: "Tournament organizers and gift-card purchasers above $500.", status: "Synced" },
      ],
    },
  },
  "AI Chat": {
    "Chat History": {
      title: "Chat History",
      subtitle: "Review prior AI-assisted conversations, prompts, and operator follow-up.",
      badge: "184 Conversations",
      stats: [["Resolved", "82%"], ["Escalated", "14"], ["Avg Response Time", "22 sec"]],
      items: [
        { title: "Membership Questions", detail: "Recent AI answers focused on pricing, guest rules, and family plans.", status: "Recent" },
        { title: "Outings Lead Intake", detail: "Conversation trail tied to tournament planning and catering questions.", status: "Flagged" },
        { title: "Booking Support Queue", detail: "Past chats filtered by payment, refunds, and booking changes.", status: "Reviewed" },
      ],
    },
    "Official Answers": {
      title: "Official Answers",
      subtitle: "Approve canonical responses the AI can reuse across chat and content workflows.",
      badge: "46 Approved",
      stats: [["Needs Review", "7"], ["Most Used", "Booking Policy"], ["Last Approved", "Today"]],
      items: [
        { title: "Rain Check Policy", detail: "Standardized response for weather interruptions and cart-path-only days.", status: "Approved" },
        { title: "Dress Code Guidance", detail: "Operator-reviewed wording for golfers and event guests.", status: "Approved" },
        { title: "Membership Waitlist", detail: "Updated answer reflecting current application timeline.", status: "Pending" },
      ],
    },
    "FAQ Builder": {
      title: "FAQ Builder",
      subtitle: "Draft, score, and organize FAQs for website, chat, and search-answer surfaces.",
      badge: "63 FAQs",
      stats: [["Published", "41"], ["In Draft", "12"], ["SEO Opportunities", "9"]],
      items: [
        { title: "What if weather changes my tee time?", detail: "Expanded answer with rain-check and cancellation guidance.", status: "Published" },
        { title: "Do you offer junior pricing?", detail: "Awaiting final pricing review from operations team.", status: "Draft" },
        { title: "Can I host a shotgun start?", detail: "FAQ linked to outings page and AI answers.", status: "Optimized" },
      ],
    },
    "Chat Flows": {
      title: "Chat Flows",
      subtitle: "Map conversational sales funnels from intent capture through booking or lead handoff.",
      badge: "6 Funnel Paths",
      stats: [["Top Funnel", "Booking Intent"], ["Completion", "34%"], ["Human Hand-Offs", "12"]],
      items: [
        { title: "Membership Discovery Funnel", detail: "Qualify interest, collect household info, and route to sales.", status: "Live" },
        { title: "Event Booking Funnel", detail: "Guide users into outings or weddings based on event type.", status: "Testing" },
        { title: "General Booking Funnel", detail: "Move players from course questions into tee-time checkout.", status: "Optimizing" },
      ],
    },
    Settings: {
      title: "AI Chat Settings",
      subtitle: "Control response behavior, escalation thresholds, and approved data sources.",
      badge: "Policy Synced",
      stats: [["Confidence Floor", "82%"], ["Escalation Rules", "9"], ["Knowledge Sources", "14"]],
      items: [
        { title: "Escalation Threshold", detail: "Route low-confidence pricing and refund questions to staff.", status: "Enabled" },
        { title: "Knowledge Source Priority", detail: "Official Answers and FAQ Builder rank above scraped content.", status: "Locked" },
        { title: "Conversation Retention", detail: "Store chat history for 180 days with role-based access.", status: "Applied" },
      ],
    },
  },
  Reports: {
    Booking: {
      title: "Booking Report",
      subtitle: "Track tee sheet conversion, booking sources, and realized revenue trends.",
      badge: "Updated 5 min ago",
      stats: [["Rounds Booked", "612"], ["Online Mix", "74%"], ["RevPAR", "$91"]],
      items: [
        { title: "Source Mix", detail: "Website 54%, widget 20%, phone 18%, clubhouse 8%.", status: "Live" },
        { title: "Sell-Through Heatmap", detail: "Strongest pickup on Saturday mornings and Thursday twilight.", status: "Stable" },
        { title: "Cancellation Trend", detail: "7-day cancellation rate down 1.8 points week over week.", status: "Improving" },
      ],
    },
    Website: {
      title: "Website Report",
      subtitle: "Monitor traffic, conversion paths, and landing-page performance tied to golf revenue.",
      badge: "GA4 Synced",
      stats: [["Sessions", "18.2K"], ["CVR", "3.8%"], ["Top Landing Page", "/golf"]],
      items: [
        { title: "Homepage Conversion", detail: "Hero CTA producing the most booking-engine entries.", status: "Healthy" },
        { title: "Membership Page Engagement", detail: "Average time on page up 22% after FAQ refresh.", status: "Rising" },
        { title: "Outings Funnel", detail: "Lead form completion strongest from campaign traffic.", status: "Tracked" },
      ],
    },
    Marketing: {
      title: "Marketing Report",
      subtitle: "Review campaign efficiency, automation influence, and audience growth across channels.",
      badge: "Weekly Snapshot",
      stats: [["Attributed Revenue", "$13.4K"], ["ROAS", "4.7x"], ["Net New Contacts", "248"]],
      items: [
        { title: "Email Performance", detail: "Weekend inventory email delivered the strongest assisted bookings.", status: "Leading" },
        { title: "Paid Campaign Blend", detail: "Search and retargeting driving the majority of qualified traffic.", status: "Balanced" },
        { title: "Lifecycle Influence", detail: "Automations assisted 19% of all replay bookings this month.", status: "Verified" },
      ],
    },
    Search: {
      title: "Search Report",
      subtitle: "Track rankings, local visibility, and query coverage across organic and AI-answer surfaces.",
      badge: "Search Console Synced",
      stats: [["Clicks", "9.4K"], ["Impressions", "182K"], ["Avg Position", "9.8"]],
      items: [
        { title: "Local Pack Coverage", detail: "Branded tee-time queries remain dominant in top-3 placements.", status: "Strong" },
        { title: "Non-Branded Growth", detail: "Visibility increased for 'golf outings near me' and related terms.", status: "Growing" },
        { title: "FAQ Query Wins", detail: "Structured FAQs now contributing to long-tail answer visibility.", status: "Expanded" },
      ],
    },
    Ads: {
      title: "Ads Report",
      subtitle: "Measure paid channel performance, spend efficiency, and booking contribution.",
      badge: "Spend Pacing On Track",
      stats: [["Spend", "$3,280"], ["CPA", "$34"], ["Bookings", "97"]],
      items: [
        { title: "Search Campaign Core", detail: "High-intent branded and tee-time terms driving lowest CPA.", status: "Top Performer" },
        { title: "Meta Retargeting", detail: "Replay and twilight offers performing best with past bookers.", status: "Stable" },
        { title: "Creative Rotation", detail: "Three new event ad variants ready for April launch.", status: "Queued" },
      ],
    },
  },
  "Business Scanner": {
    "Business Listings": {
      title: "Business Listings",
      subtitle: "Manage business profile coverage, location consistency, and listing health signals.",
      badge: "14 Listings Synced",
      stats: [["Accurate Listings", "93%"], ["Pending Fixes", "4"], ["Duplicate Risk", "2"]],
      items: [
        { title: "Primary Course Listing", detail: "Hours, phone, and booking URL all aligned with website source.", status: "Healthy" },
        { title: "Outings Venue Listing", detail: "Needs category update and refreshed event imagery.", status: "Needs Update" },
        { title: "Dining Listing", detail: "Secondary listing tied to grille hours and menu link.", status: "Synced" },
      ],
    },
    Reviews: {
      title: "Reviews",
      subtitle: "Track sentiment, response coverage, and trends across recent guest feedback.",
      badge: "4.6 Avg Rating",
      stats: [["New Reviews", "18"], ["Response Rate", "89%"], ["Open Escalations", "3"]],
      items: [
        { title: "Greens Condition Feedback", detail: "Positive trend after recent maintenance messaging.", status: "Improving" },
        { title: "Pace of Play Complaints", detail: "Weekend mornings still producing the most negative mentions.", status: "Watch" },
        { title: "Food & Beverage Praise", detail: "Dining reviews boosting cross-sell confidence.", status: "Strong" },
      ],
    },
    Settings: {
      title: "Business Scanner Settings",
      subtitle: "Control sync cadence, alert thresholds, and listing ownership preferences.",
      badge: "Scanner Active",
      stats: [["Scan Frequency", "Daily"], ["Alert Rules", "11"], ["Owners", "3"]],
      items: [
        { title: "Hours Consistency Alert", detail: "Notify ops when website and listing hours drift apart.", status: "Enabled" },
        { title: "Review SLA Rule", detail: "Flag reviews without a response after 48 hours.", status: "Applied" },
        { title: "Category Change Approval", detail: "Require admin approval before listing taxonomy updates.", status: "Protected" },
      ],
    },
  },
};

function NestedModuleWorkspace({ config }) {
  if (!config) {
    return null;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <SectionCard
        title={config.title}
        subtitle={config.subtitle}
        right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.ink }}>{config.badge}</span>}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {config.stats.map(([label, value]) => (
            <div key={label} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.background }}>
              <div className="text-sm" style={{ color: theme.subtle }}>{label}</div>
              <div className="mt-2 text-3xl font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={`${config.title} Workspace`} subtitle="Mock operational modules, queues, and status cards for this area.">
        <div className="space-y-3">
          {config.items.map((item) => (
            <div key={item.title} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-1 text-sm" style={{ color: theme.muted }}>{item.detail}</div>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.ink }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function DashboardWorkspace() {
  const overviewCards = [
    { label: "Total Revenue", value: "$218,420", delta: "+6.2% vs last month" },
    { label: "Rounds Booked", value: "1,482", delta: "+9.4% vs last month" },
    { label: "Marketing ROAS", value: "4.8x", delta: "+0.6 vs last month" },
    { label: "Business Scanner Score", value: "91", delta: "+3 point lift" },
  ];
  const funnelSteps = [
    { label: "Website Visitors", value: "24.7K", width: "100%" },
    { label: "Booking Intent", value: "6.3K", width: "76%" },
    { label: "Checkout Started", value: "2.1K", width: "52%" },
    { label: "Completed Bookings", value: "1.4K", width: "34%" },
  ];
  const modules = [
    { title: "Revenue Engine", detail: "Booking Engine and Smart Pricing AI are driving the biggest lift this week.", value: "$38.4K" },
    { title: "Marketing", detail: "Automation and email are producing the strongest replay booking influence.", value: "248 net new contacts" },
    { title: "AI Chat", detail: "Official Answers coverage improved confidence on booking and membership flows.", value: "82% resolved" },
    { title: "Business Scanner", detail: "Listing accuracy remains high, with a few response SLA alerts still open.", value: "4 fixes needed" },
  ];
  const activities = [
    "Smart Pricing AI raised Saturday morning rates by 9% based on sell-through.",
    "Spring Kickoff campaign launched across email, homepage hero, and paid search.",
    "Business Scanner flagged one listing with mismatched holiday hours.",
    "AI Chat approved a new rain-check policy answer for guest support.",
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <SectionCard key={card.label} title={card.label} subtitle={card.delta}>
            <div className="text-3xl font-bold">{card.value}</div>
          </SectionCard>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard
          title="Performance Snapshot"
          subtitle="A blended view of booking, website, and growth momentum inspired by analytics-style dashboards."
          right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.muted }}>Last 30 Days</span>}
        >
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border p-5" style={{ borderColor: theme.border, backgroundColor: theme.background }}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-sm font-medium" style={{ color: theme.subtle }}>Revenue + Traffic Trend</div>
                  <div className="mt-2 text-2xl font-semibold">$72.8K Influenced</div>
                </div>
                <div className="text-sm" style={{ color: theme.muted }}>Booking, web, and campaign blended view</div>
              </div>
              <div className="mt-6 flex h-52 items-end gap-3">
                {[42, 55, 51, 68, 73, 66, 84, 79, 92, 88, 96, 90].map((height, index) => (
                  <div key={index} className="flex-1 rounded-t-2xl" style={{ height: `${height}%`, backgroundColor: index % 3 === 0 ? theme.accent : theme.softAccent }} />
                ))}
              </div>
              <div className="mt-4 flex justify-between text-xs" style={{ color: theme.subtle }}>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border p-5" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
                <div className="text-sm font-medium" style={{ color: theme.subtle }}>User Growth</div>
                <div className="mt-2 text-3xl font-bold">3,768</div>
                <div className="mt-2 text-sm" style={{ color: theme.muted }}>New signups across website, widget, and local funnels.</div>
              </div>
              <div className="rounded-3xl border p-5" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
                <div className="text-sm font-medium" style={{ color: theme.subtle }}>Churn Risk</div>
                <div className="mt-2 text-3xl font-bold">4.26%</div>
                <div className="mt-2 text-sm" style={{ color: theme.muted }}>Downgrade-to-free style benchmark adapted to lapsed golfers and quiet segments.</div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Conversion Funnel" subtitle="Website to checkout progression across the booking path.">
          <div className="space-y-4">
            {funnelSteps.map((step) => (
              <div key={step.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span style={{ color: theme.ink }}>{step.label}</span>
                  <span style={{ color: theme.muted }}>{step.value}</span>
                </div>
                <div className="h-3 rounded-full" style={{ backgroundColor: theme.soft }}>
                  <div className="h-3 rounded-full" style={{ width: step.width, backgroundColor: theme.accent }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Module Health" subtitle="A creative rollup of the main workspaces inside this admin portal.">
          <div className="grid gap-3">
            {modules.map((module) => (
              <div key={module.title} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{module.title}</div>
                    <div className="mt-1 text-sm" style={{ color: theme.muted }}>{module.detail}</div>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.ink }}>
                    {module.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Activity" subtitle="A SaaS-style activity stream for operators and AI systems.">
          <div className="space-y-3">
            {activities.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
                <div className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: index % 2 === 0 ? theme.accent : theme.softAccent }} />
                <div className="text-sm" style={{ color: theme.muted }}>{item}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function AccountWorkspace({ activeTab, onTabChange }) {
  const tabContent = {
    Users: {
      subtitle: "Manage admin users, permissions, and notification preferences for the golf business.",
      cards: [
        { title: "Jefferson Admin", detail: "Platform Owner | Full access | Last active 8 mins ago", status: "Owner" },
        { title: "Brent Ops", detail: "Operations | Revenue + Website Admin access", status: "Active" },
        { title: "Course GM", detail: "Manager | Reporting, reviews, and policy editing", status: "Invited" },
      ],
    },
    "Course Info": {
      subtitle: "Control the core business identity used across booking, listings, and AI systems.",
      fields: ["Course Name", "Address", "Phone", "Primary Email", "Website URL", "Hours"],
    },
    "Booking Messages": {
      subtitle: "Set the default messages surfaced through the booking engine and confirmation flows.",
      cards: [
        { title: "Checkout Banner", detail: "Cart pricing subject to weather, pace, and occupancy rules.", status: "Live" },
        { title: "Confirmation Message", detail: "Arrive 20 minutes early and check in at the pro shop.", status: "Live" },
        { title: "Twilight Notice", detail: "Replay availability depends on daily sunset and demand.", status: "Draft" },
      ],
    },
    "Tee Time Policy": {
      subtitle: "Edit tee time policy content and connect operators to deeper policy pages.",
      cards: [
        { title: "Cancellation Policy", detail: "24-hour notice required for full refund eligibility.", status: "Published" },
        { title: "Rain Check Policy", detail: "Linked to website FAQ and AI Chat official answers.", status: "Synced" },
        { title: "No Show Policy", detail: "References fee handling and replay restrictions.", status: "Needs Review" },
      ],
    },
  };

  const current = tabContent[activeTab];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <SectionCard
        title="Account"
        subtitle="Account setup, course identity, user access, and core booking communication settings."
        right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.ink }}>Account Setup</span>}
      >
        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-6 border-b" style={{ borderColor: theme.border }}>
            {accountTabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className="relative pb-4 pt-1 text-sm font-medium transition"
                  style={{ color: isActive ? theme.ink : theme.muted }}
                >
                  {tab}
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full" style={{ backgroundColor: isActive ? theme.ink : "transparent" }} />
                </button>
              );
            })}
          </div>
        </div>
      </SectionCard>

      <SectionCard title={activeTab} subtitle={current.subtitle}>
        {current.fields ? (
          <div className="grid gap-4 md:grid-cols-2">
            {current.fields.map((field) => (
              <div key={field} className="rounded-2xl border px-4 py-3" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
                <div className="text-sm font-medium" style={{ color: theme.subtle }}>{field}</div>
                <div className="mt-2" style={{ color: theme.ink }}>Sample value for {field}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {current.cards.map((card) => (
              <div key={card.title} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{card.title}</div>
                    <div className="mt-1 text-sm" style={{ color: theme.muted }}>{card.detail}</div>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.ink }}>
                    {card.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function SettingsWorkspace({ activeTab, onTabChange }) {
  const tabContent = {
    Bookings: {
      subtitle: "Rate settings, Tee Sheet Connect, and core booking behavior.",
      items: ["Rate Settings", "Tee Sheet Connect", "Booking Settings"],
    },
    Payments: {
      subtitle: "Configure merchant connections, payment gateways, and settlement handling.",
      items: ["Connect to Merchants", "Gateway Routing", "Refund Controls"],
    },
    "Smart AI Pricing": {
      subtitle: "Global controls for pricing rules, confidence thresholds, and override behavior.",
      items: ["General Settings", "Margin Guardrails", "Operator Overrides"],
    },
    "No Show": {
      subtitle: "Set no-show automation, fees, and guest communication preferences.",
      items: ["Penalty Settings", "Grace Periods", "Auto-Flags"],
    },
    "Data Feed": {
      subtitle: "Manage POS and transaction data connections that inform revenue and AI systems.",
      items: ["POS Data Feed", "Data Mapping", "Sync Windows"],
    },
    Email: {
      subtitle: "Control send settings, limits, and system-wide delivery rules.",
      items: ["Email Settings", "Email Send Limits", "Domain Health"],
    },
    Members: {
      subtitle: "Membership defaults, eligibility rules, and communication preferences.",
      items: ["Membership Settings", "Guest Rules", "Benefits Sync"],
    },
    Lottery: {
      subtitle: "Configure draw windows, allocation logic, and post-draw handling.",
      items: ["Lottery Setup", "Priority Rules", "Release Timing"],
    },
    "3rd Party": {
      subtitle: "Connect external tools and marketing platforms used across the business.",
      items: ["Reserve with Google", "Facebook Pixel", "Google GA4"],
    },
    Other: {
      subtitle: "Miscellaneous platform settings for mobile, seasonality, and business behavior.",
      items: ["Enable Mobile PWA App", "Seasonality Settings", "Operational Defaults"],
    },
    Plan: {
      subtitle: "Set which modules and capabilities are enabled under the account plan.",
      items: ["Account Plan Settings", "Feature Flags", "Usage Limits"],
    },
  };

  const current = tabContent[activeTab];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <SectionCard
        title="Settings"
        subtitle="Platform-wide controls using a vertical tab layout inspired by the TailAdmin tabs demo."
        right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.ink }}>Vertical Tabs</span>}
      >
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="space-y-2">
            {settingsTabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition"
                  style={
                    isActive
                      ? { backgroundColor: theme.accent, color: theme.white }
                      : { backgroundColor: theme.soft, color: theme.ink }
                  }
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border p-5" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
              <div className="text-lg font-semibold">{activeTab}</div>
              <div className="mt-2 text-sm" style={{ color: theme.muted }}>{current.subtitle}</div>
            </div>

            <div className="grid gap-3">
              {current.items.map((item) => (
                <div key={item} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
                  <div className="font-semibold">{item}</div>
                  <div className="mt-1 text-sm" style={{ color: theme.muted }}>Mock settings surface for {item.toLowerCase()}.</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function SupportWorkspace() {
  const thread = [
    { author: "Jordan Mills", role: "Course Operator", time: "Today, 9:18 AM", body: "We need help updating the booking confirmation wording for replay offers and weather delays." },
    { author: "GolfBack Support", role: "Support Team", time: "Today, 9:42 AM", body: "We can help with that. Please confirm whether the messaging should apply to website, widget, and call-center bookings." },
    { author: "Jordan Mills", role: "Course Operator", time: "Today, 10:01 AM", body: "Yes, and we want a separate note for twilight rounds that may be shortened by daylight." },
  ];
  const details = [
    ["Customer", "Jordan Mills"],
    ["Email", "jordan@golfcourse.com"],
    ["Ticket ID", "#GB-20481"],
    ["Category", "Booking Engine"],
    ["Status", "In Progress"],
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="grid gap-6 2xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard
          title="Support Request"
          subtitle="A TailAdmin-style form layout adapted for admin support intake."
          right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.ink }}>Priority Queue</span>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="First Name" value="Jordan" onChange={() => {}} />
            <TextField label="Last Name" value="Mills" onChange={() => {}} />
            <TextField label="Email" value="jordan@golfcourse.com" onChange={() => {}} />
            <TextField label="Subject" value="Update booking confirmation messages" onChange={() => {}} />
            <SelectField label="Category" value="Booking Engine" onChange={() => {}} options={["Booking Engine", "Marketing", "AI Chat", "Billing"]} />
            <SelectField label="Priority" value="High" onChange={() => {}} options={["Low", "Medium", "High", "Urgent"]} />
            <div className="md:col-span-2">
              <TextField
                label="Message"
                value="Please help us update replay and weather messaging shown in the booking engine checkout flow."
                onChange={() => {}}
                multiline
              />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-2xl px-4 py-2 text-sm font-medium" style={{ backgroundColor: theme.accent, color: theme.white }}>
              Send Request
            </button>
            <button className="rounded-2xl px-4 py-2 text-sm font-medium" style={{ border: `1px solid ${theme.border}`, color: theme.ink }}>
              Save Draft
            </button>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard
            title="Support Reply"
            subtitle="A support-ticket reply layout inspired by TailAdmin's threaded reply page."
            right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.muted }}>Ticket #GB-20481</span>}
          >
            <div className="space-y-4">
              {thread.map((entry) => (
                <div key={`${entry.author}-${entry.time}`} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold">{entry.author}</div>
                      <div className="mt-1 text-sm" style={{ color: theme.muted }}>{entry.role}</div>
                    </div>
                    <div className="text-xs" style={{ color: theme.subtle }}>{entry.time}</div>
                  </div>
                  <div className="mt-3 text-sm" style={{ color: theme.muted }}>{entry.body}</div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <TextField
                label="Reply"
                value="We'll update the confirmation templates and add a twilight-specific notice for shortened rounds."
                onChange={() => {}}
                multiline
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="rounded-2xl px-4 py-2 text-sm font-medium" style={{ backgroundColor: theme.accent, color: theme.white }}>
                  Send Reply
                </button>
                <button className="rounded-2xl px-4 py-2 text-sm font-medium" style={{ border: `1px solid ${theme.border}`, color: theme.ink }}>
                  Attach Reply
                </button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Ticket Details" subtitle="Quick context for the assigned support issue.">
            <div className="grid gap-3 sm:grid-cols-2">
              {details.map(([label, value]) => (
                <div key={label} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
                  <div className="text-sm" style={{ color: theme.subtle }}>{label}</div>
                  <div className="mt-2 font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function HelpWorkspace() {
  const collections = [
    { title: "Getting Started", detail: "Launch checklist, onboarding, and first-booking setup.", count: "12 Articles" },
    { title: "Revenue Engine", detail: "Pricing, promo codes, lottery, and tee sheet operations.", count: "18 Articles" },
    { title: "Marketing + AI", detail: "Campaigns, chat answers, FAQ builder, and automations.", count: "14 Articles" },
    { title: "Business Scanner", detail: "Listings, reviews, sync settings, and local visibility tips.", count: "9 Articles" },
  ];
  const featuredArticles = [
    "How to connect Tee Sheet Connect and validate live inventory",
    "Best practices for Smart Pricing AI guardrails and overrides",
    "Setting up FAQ Builder content for both Help and AI Chat",
    "Responding to reviews and fixing listing inconsistencies quickly",
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <SectionCard
        title="Help Center"
        subtitle="Mock knowledge base setup for operators, marketers, and support teams."
        right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.ink }}>Knowledge Base</span>}
      >
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border p-5" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
            <div className="text-sm font-medium" style={{ color: theme.subtle }}>Search the Knowledge Base</div>
            <div className="mt-4 rounded-2xl border px-4 py-3" style={{ borderColor: theme.border, backgroundColor: theme.white, color: theme.muted }}>
              Search articles, guides, FAQs, and operator playbooks...
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {collections.map((item) => (
                <div key={item.title} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-2 text-sm" style={{ color: theme.muted }}>{item.detail}</div>
                  <div className="mt-3 text-xs font-semibold" style={{ color: theme.subtle }}>{item.count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border p-5" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
              <div className="text-sm font-medium" style={{ color: theme.subtle }}>Quick Actions</div>
              <div className="mt-4 space-y-2">
                {["Open Support Ticket", "View Release Notes", "See Training Videos", "Download Setup Checklist"].map((item) => (
                  <div key={item} className="rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: theme.soft, color: theme.ink }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border p-5" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
              <div className="text-sm font-medium" style={{ color: theme.subtle }}>Featured Articles</div>
              <div className="mt-4 space-y-3">
                {featuredArticles.map((article) => (
                  <div key={article} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
                    <div className="font-semibold">{article}</div>
                    <div className="mt-2 text-sm" style={{ color: theme.muted }}>Mock summary content for a searchable help article.</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function GolfWebsiteAdminDashboard() {
  const [pages, setPages] = useState(initialPages);
  const [activePage, setActivePage] = useState("Membership");
  const [activeTopLevel, setActiveTopLevel] = useState("Dashboard");
  const [expandedTopLevel, setExpandedTopLevel] = useState(null);
  const [activeBookingEngineTab, setActiveBookingEngineTab] = useState("Setup");
  const [activeBottomMenu, setActiveBottomMenu] = useState(null);
  const [activeAccountTab, setActiveAccountTab] = useState("Users");
  const [activeSettingsTab, setActiveSettingsTab] = useState("Bookings");
  const [activeFlyoutSelections, setActiveFlyoutSelections] = useState({
    "Revenue Engine": "Booking Engine",
    Marketing: "Automation",
    "Website Admin": "Page Controls",
    "AI Chat": "Chat History",
    Reports: "Booking",
    "Business Scanner": "Business Listings",
  });
  const [brand, setBrand] = useState({
    courseName: "Demo Golf Club",
    fontFamily: "'Inter', sans-serif",
    accentColor: theme.accent,
    buttonTextColor: "#ffffff",
    logoName: "demo-logo.svg",
    heroBackground:
      "url('https://images.unsplash.com/photo-1513553404607-988d4cce98f3?q=80&w=1200&auto=format&fit=crop') center / cover",
  });
  const [auditItems] = useState([
    { title: "Add stronger FAQ coverage to Membership page", type: "Content", priority: "High" },
    { title: "Improve internal links from Home to Outings and Membership", type: "SEO", priority: "Medium" },
    { title: "Check Business Scanner phone and hours consistency", type: "Local", priority: "High" },
    { title: "Add schema enhancements for organization, local business, and FAQ", type: "Structured Data", priority: "Medium" },
  ]);

  const activePageData = pages[activePage];
  const activeFlyoutItems = flyoutNavItems[activeTopLevel] || [];
  const hasActiveFlyout = activeFlyoutItems.length > 0;
  const activeNestedItem = hasActiveFlyout ? activeFlyoutSelections[activeTopLevel] : null;
  const activeNestedModuleConfig = nestedModuleConfigs[activeTopLevel]?.[activeNestedItem];
  const bottomMenuDescriptions = {
    Account: "Manage account setup, course identity, user permissions, and booking policies.",
    Settings: "Configure platform-wide booking, payment, integrations, and plan settings.",
    Support: "Create and manage support requests with threaded replies and ticket details.",
  };
  const isBookingEngineView =
    activeTopLevel === "Revenue Engine" && (activeNestedItem === "Booking Engine" || activeNestedItem === "Smart Pricing AI");
  const isRevenueEngineModuleView =
    activeTopLevel === "Revenue Engine" &&
    ["Promo Codes", "Gift Cards", "Wait List", "Lottery", "Checkout Upsells"].includes(activeNestedItem);
  const activeModuleTitle = activeBottomMenu || activeNestedItem || activeTopLevel;
  const activeModuleDescription = activeBottomMenu
    ? bottomMenuDescriptions[activeBottomMenu]
    : hasActiveFlyout
    ? `${topLevelDescriptions[activeTopLevel]} Secondary navigation is available in the expanded accordion menu.`
    : `${topLevelDescriptions[activeTopLevel]} The main canvas remains focused on Website Admin tools in this prototype.`;

  const updatePageField = (fieldName, value) => {
    setPages((prev) => ({
      ...prev,
      [activePage]: {
        ...prev[activePage],
        fields: {
          ...prev[activePage].fields,
          [fieldName]: value,
        },
        status: prev[activePage].enabled ? "Draft" : prev[activePage].status,
      },
    }));
  };

  const togglePage = (pageName) => {
    setPages((prev) => {
      const current = prev[pageName];
      const enabled = !current.enabled;

      return {
        ...prev,
        [pageName]: {
          ...current,
          enabled,
          status: enabled ? (current.status === "Not Enabled" ? "Draft" : current.status) : "Not Enabled",
        },
      };
    });
  };

  const setPageStatus = (pageName, status) => {
    setPages((prev) => ({
      ...prev,
      [pageName]: {
        ...prev[pageName],
        status,
      },
    }));
  };

  const selectTopLevelItem = (item) => {
    const hasChildren = Boolean(flyoutNavItems[item]);

    setActiveTopLevel(item);
    setActiveBottomMenu(null);

    if (hasChildren) {
      setExpandedTopLevel((prev) => (prev === item ? null : item));
    } else {
      setExpandedTopLevel(null);
    }
  };

  const selectFlyoutItem = (item) => {
    if (activeTopLevel === "Revenue Engine") {
      if (item === "Smart Pricing AI") {
        setActiveBookingEngineTab("Smart Pricing AI");
      } else if (item === "Booking Engine") {
        setActiveBookingEngineTab("Setup");
      }
    }

    setActiveFlyoutSelections((prev) => ({
      ...prev,
      [activeTopLevel]: item,
    }));
    setExpandedTopLevel(activeTopLevel);
    setActiveBottomMenu(null);
  };

  const handleBookingEngineTabChange = (tab) => {
    setActiveBookingEngineTab(tab);

    if (activeTopLevel === "Revenue Engine") {
      setActiveFlyoutSelections((prev) => ({
        ...prev,
        "Revenue Engine": tab === "Smart Pricing AI" ? "Smart Pricing AI" : "Booking Engine",
      }));
    }
  };

  const handleBottomMenuClick = (item) => {
    if (item === "Account" || item === "Settings" || item === "Support") {
      setActiveBottomMenu(item);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.ink }}>
      <div className="flex min-h-screen flex-col xl:flex-row">
        <aside
          className="relative w-full border-b xl:w-72 xl:border-b-0 xl:border-r"
          style={{ backgroundColor: theme.surface, borderColor: theme.border, color: theme.ink }}
        >
          <div className="flex h-full flex-col xl:min-h-screen">
            <div className="p-5">
              <div className="flex items-center gap-3">
                <BrandLogo />
                <div>
                  <div className="text-sm" style={{ color: theme.subtle }}>
                    Golf Business AI
                  </div>
                  <div className="text-lg font-semibold">GolfBack AI</div>
                </div>
              </div>
            </div>

            <nav className="px-3">
              <div className="mb-3 px-2 text-xs uppercase tracking-[0.24em]" style={{ color: theme.subtle }}>
                Platform
              </div>
              {topLevelNavItems.map((item) => {
                const hasChildren = Boolean(flyoutNavItems[item]);
                const isActive = activeTopLevel === item;
                const isExpanded = expandedTopLevel === item;

                return (
                  <div key={item} className="mb-2">
                    <button
                      onClick={() => selectTopLevelItem(item)}
                      className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition"
                      style={
                        isActive
                          ? { backgroundColor: theme.accent, color: theme.white }
                          : { color: theme.muted }
                      }
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-2xl"
                          style={isActive ? { backgroundColor: "rgba(255,255,255,0.08)" } : { backgroundColor: theme.soft }}
                        >
                          <MenuIcon item={item} active={isActive} />
                        </span>
                        <span>{item}</span>
                      </span>
                      {hasChildren ? <ChevronIcon open={isExpanded} /> : null}
                    </button>

                    {hasChildren ? (
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          isExpanded ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="space-y-2 px-3 py-1">
                          {flyoutNavItems[item].map((nestedItem) => (
                            <button
                              key={nestedItem}
                              onClick={() => selectFlyoutItem(nestedItem)}
                              className="w-full rounded-2xl px-4 py-3 text-left text-sm transition"
                              style={
                                activeNestedItem === nestedItem
                                  ? { backgroundColor: theme.softAccent, color: theme.ink, fontWeight: 600 }
                                  : { color: theme.muted }
                              }
                            >
                              {nestedItem}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="flex-1" />

            <div
              className="border-t px-3 py-4 xl:sticky xl:bottom-0 xl:mt-auto"
              style={{ borderColor: theme.border, backgroundColor: theme.surface }}
            >
              <div className="mb-3 px-2 text-xs uppercase tracking-[0.24em]" style={{ color: theme.subtle }}>
                Account
              </div>
              {bottomMenuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleBottomMenuClick(item)}
                  className="mb-1 w-full rounded-2xl px-4 py-3 text-left text-sm transition"
                  style={
                    activeBottomMenu === item
                      ? { backgroundColor: theme.softAccent, color: theme.ink, fontWeight: 600 }
                      : item === "Sign Out"
                      ? { color: theme.ink }
                      : { color: theme.muted }
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div
            className="flex flex-col gap-4 border-b px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
            style={{ backgroundColor: theme.surface, borderColor: theme.border }}
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: theme.subtle }}>
                {activeBottomMenu || activeTopLevel}
              </div>
              <h1 className="text-2xl font-bold tracking-tight">{activeModuleTitle}</h1>
              <p className="mt-1 max-w-3xl text-sm" style={{ color: theme.muted }}>
                {activeModuleDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-2xl px-4 py-2 text-sm font-medium shadow-sm"
                style={{ border: `1px solid ${theme.border}`, backgroundColor: theme.white, color: theme.ink }}
              >
                Save Draft
              </button>
              <button
                className="rounded-2xl px-4 py-2 text-sm font-medium text-white shadow-sm"
                style={{ backgroundColor: theme.accent, color: theme.white }}
              >
                Publish Changes
              </button>
            </div>
          </div>

          {activeBottomMenu === "Account" ? (
            <AccountWorkspace activeTab={activeAccountTab} onTabChange={setActiveAccountTab} />
          ) : activeBottomMenu === "Settings" ? (
            <SettingsWorkspace activeTab={activeSettingsTab} onTabChange={setActiveSettingsTab} />
          ) : activeBottomMenu === "Support" ? (
            <SupportWorkspace />
          ) : activeTopLevel === "Help" ? (
            <HelpWorkspace />
          ) : activeTopLevel === "Dashboard" ? (
            <DashboardWorkspace />
          ) : isBookingEngineView ? (
            <BookingEngineWorkspace activeTab={activeBookingEngineTab} onTabChange={handleBookingEngineTabChange} />
          ) : isRevenueEngineModuleView ? (
            <RevenueEngineModuleWorkspace module={activeNestedItem} />
          ) : activeNestedModuleConfig ? (
            <NestedModuleWorkspace config={activeNestedModuleConfig} />
          ) : (
            <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 2xl:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <SectionCard
                  title="Brand Settings"
                  subtitle="Control the global visual system used by the standardized templates."
                  right={
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: theme.softAccent, color: theme.ink }}
                    >
                      Theme Ready
                    </span>
                  }
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField label="Course name" value={brand.courseName} onChange={(e) => setBrand((b) => ({ ...b, courseName: e.target.value }))} />
                    <SelectField
                      label="Primary font"
                      value={brand.fontFamily}
                      onChange={(e) => setBrand((b) => ({ ...b, fontFamily: e.target.value }))}
                      options={["'Inter', sans-serif", "'Montserrat', sans-serif", "'DM Sans', sans-serif"]}
                    />
                    <TextField label="Accent color" value={brand.accentColor} onChange={(e) => setBrand((b) => ({ ...b, accentColor: e.target.value }))} />
                    <TextField label="Button text color" value={brand.buttonTextColor} onChange={(e) => setBrand((b) => ({ ...b, buttonTextColor: e.target.value }))} />
                    <TextField label="Logo file" value={brand.logoName} onChange={(e) => setBrand((b) => ({ ...b, logoName: e.target.value }))} />
                    <TextField label="Hero background source" value={brand.heroBackground} onChange={(e) => setBrand((b) => ({ ...b, heroBackground: e.target.value }))} />
                  </div>
                </SectionCard>

                <SectionCard
                  title="Website Pages"
                  subtitle="Enable pages, jump into their settings, and control page-level status."
                  right={
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: theme.soft, color: theme.muted }}
                    >
                      Clickable Navigation
                    </span>
                  }
                >
                  <div className="grid gap-3 lg:grid-cols-2">
                    {Object.entries(pages).map(([pageName, data]) => (
                      <div
                        key={pageName}
                        className="rounded-3xl border p-4 transition"
                        style={
                          activePage === pageName
                            ? { borderColor: theme.accent, backgroundColor: theme.softAccent }
                            : { borderColor: theme.border, backgroundColor: theme.white }
                        }
                      >
                        <div className="flex items-start justify-between gap-3">
                          <button className="text-left" onClick={() => setActivePage(pageName)}>
                            <div className="text-lg font-semibold">
                              <span className="mr-2 text-xs" style={{ color: theme.subtle }}>
                                {data.icon}
                              </span>
                              {pageName}
                            </div>
                            <div className="mt-1 text-sm" style={{ color: theme.muted }}>
                              {pageDescriptions[pageName]}
                            </div>
                          </button>
                          <Toggle enabled={data.enabled} onClick={() => togglePage(pageName)} />
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <StatusPill status={data.status} />
                          <button
                            onClick={() => setActivePage(pageName)}
                            className="rounded-full px-3 py-1 text-xs font-medium"
                            style={{ border: `1px solid ${theme.border}` }}
                          >
                            Edit Page
                          </button>
                          {data.enabled ? (
                            <button
                              onClick={() => setPageStatus(pageName, data.status === "Published" ? "Draft" : "Published")}
                              className="rounded-full px-3 py-1 text-xs font-medium"
                              style={{ border: `1px solid ${theme.border}` }}
                            >
                              {data.status === "Published" ? "Move to Draft" : "Publish Page"}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard
                  title={`${activePage} Page Settings`}
                  subtitle={pageDescriptions[activePage]}
                  right={<StatusPill status={activePageData.status} />}
                >
                  {!activePageData.enabled ? (
                    <div
                      className="rounded-3xl border border-dashed p-6 text-sm"
                      style={{ borderColor: theme.border, backgroundColor: theme.background, color: theme.muted }}
                    >
                      This page is currently disabled. Turn it on in Website Pages to activate its template and content inputs.
                    </div>
                  ) : (
                    <>
                      <PageFieldEditor activePage={activePage} pageData={activePageData} onFieldChange={updatePageField} />
                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          className="rounded-2xl px-4 py-2 text-sm font-medium text-white"
                          style={{ backgroundColor: theme.accent, color: theme.white }}
                        >
                          Generate {activePage} Page
                        </button>
                        <button
                          className="rounded-2xl px-4 py-2 text-sm font-medium"
                          style={{ border: `1px solid ${theme.border}` }}
                        >
                          View AI Inputs
                        </button>
                      </div>
                    </>
                  )}
                </SectionCard>

                <SectionCard
                  title="Weekly SEO and AI Optimization Agent"
                  subtitle="The agent scans content quality, local consistency, schema coverage, and internal linking opportunities."
                  right={
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: theme.softAccent, color: theme.ink }}
                    >
                      Next Scan: Sunday 2:00 AM
                    </span>
                  }
                >
                  <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
                    <div className="rounded-3xl p-4" style={{ backgroundColor: theme.background }}>
                      <div className="text-sm font-semibold" style={{ color: theme.ink }}>
                        Focus Areas
                      </div>
                      <div className="mt-3 space-y-2 text-sm" style={{ color: theme.muted }}>
                        <div>Search visibility</div>
                        <div>AI-answer readiness</div>
                        <div>Business Scanner consistency</div>
                        <div>Internal links and schema opportunities</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {auditItems.map((item) => (
                        <div key={item.title} className="rounded-3xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="rounded-full px-3 py-1 text-xs font-semibold"
                              style={{ backgroundColor: theme.soft, color: theme.ink }}
                            >
                              {item.type}
                            </span>
                            <span
                              className="rounded-full px-3 py-1 text-xs font-semibold"
                              style={{ backgroundColor: theme.softAccent, color: theme.ink }}
                            >
                              {item.priority}
                            </span>
                          </div>
                          <div className="mt-3 text-sm" style={{ color: theme.ink }}>
                            {item.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>
              </div>

              <div className="space-y-6">
                <SectionCard
                  title="Live Mobile Preview"
                  subtitle="See the active page render in a mobile-first layout using your template system and current inputs."
                  right={
                    <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: theme.soft, color: theme.muted }}>
                      iPhone Width
                    </div>
                  }
                >
                  <MobilePreview activePage={activePage} brand={brand} fields={activePageData.fields} />
                </SectionCard>

                <SectionCard title="Publish Workflow" subtitle="An example of how this app could guide operators from input to live website.">
                  <div className="space-y-3 text-sm" style={{ color: theme.muted }}>
                    {[
                      "1. Operator enables the page they want on the website.",
                      "2. Structured inputs replace open-ended page building.",
                      "3. AI applies approved templates, brand settings, and images.",
                      "4. Team reviews the live mobile preview before publishing.",
                      "5. Weekly audits suggest ranking, AI, and Business Scanner improvements.",
                    ].map((step) => (
                      <div key={step} className="rounded-2xl px-4 py-3" style={{ backgroundColor: theme.background }}>
                        {step}
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Prototype Notes" subtitle="This version is ready to demo visually and can be hosted on GitHub Pages.">
                  <div className="space-y-3 text-sm" style={{ color: theme.muted }}>
                    <div className="rounded-2xl px-4 py-3" style={{ backgroundColor: theme.background }}>Single-file React prototype for quick sharing with your team.</div>
                    <div className="rounded-2xl px-4 py-3" style={{ backgroundColor: theme.background }}>Clickable page navigation and editable page-level inputs.</div>
                    <div className="rounded-2xl px-4 py-3" style={{ backgroundColor: theme.background }}>Good next step: connect this UI to JSON page schemas and an AI generation service.</div>
                  </div>
                </SectionCard>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GolfWebsiteAdminDashboard />);
