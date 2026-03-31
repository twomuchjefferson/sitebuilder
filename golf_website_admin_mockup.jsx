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

const bottomMenuItems = ["Account", "Live Booking", "Support", "Sign Out"];

const bookingEngineTabs = ["Setup", "Rate Management", "Smart Pricing AI", "Tee Time Manager", "Booking Manager"];

const theme = {
  background: "#f7f7f7",
  ink: "#000000",
  accent: "#262626",
  white: "#ffffff",
  border: "#eeeeee",
  muted: "rgba(0, 0, 0, 0.64)",
  subtle: "rgba(38, 38, 38, 0.56)",
  soft: "#f7f7f7",
  softAccent: "rgba(38, 38, 38, 0.08)",
  strongAccent: "rgba(38, 38, 38, 0.12)",
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
    Published: { backgroundColor: theme.softAccent, color: theme.accent },
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
        backgroundColor: theme.white,
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
      style={{ backgroundColor: theme.softAccent, color: theme.accent }}
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
        right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.accent }}>3 Active Plans</span>}
      >
        <div className="space-y-3">
          {ratePlans.map((plan) => (
            <div key={plan.name} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.background }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{plan.name}</div>
                  <div className="mt-1 text-sm" style={{ color: theme.muted }}>{plan.window} | {plan.logic}</div>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: plan.status === "Live" ? theme.softAccent : theme.soft, color: theme.accent }}>
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
                    color: isHot ? theme.accent : isRealDay ? theme.ink : theme.subtle,
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

  const renderSmartPricing = () => (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <SectionCard title="Smart Pricing AI" subtitle="Suggested pricing adjustments based on pace, weather, and booking velocity.">
        <div className="space-y-3">
          {[
            "Raise Saturday 8:00 AM-11:00 AM inventory by 9% based on sell-through.",
            "Release unused lottery holds after 2:00 PM on member event days.",
            "Reduce after-4 PM pricing by 6% on Tuesdays to improve twilight utilization.",
          ].map((item) => (
            <div key={item} className="rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: theme.background, color: theme.muted }}>
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Model Inputs" subtitle="Mock signals feeding the pricing engine.">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["7-Day Pace", "82%"],
            ["Weather Confidence", "High"],
            ["Local Demand", "Strong"],
            ["Comp Set Delta", "+$6"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border p-4" style={{ borderColor: theme.border, backgroundColor: theme.white }}>
              <div className="text-sm" style={{ color: theme.subtle }}>{label}</div>
              <div className="mt-2 text-2xl font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );

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
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.accent }}>
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
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.accent }}>
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
        right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.accent }}>{config.badge}</span>}
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
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.accent }}>
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
        right={<span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.accent }}>{config.badge}</span>}
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
                <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.soft, color: theme.accent }}>
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
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: theme.softAccent, color: theme.accent }}>
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

function GolfWebsiteAdminDashboard() {
  const [pages, setPages] = useState(initialPages);
  const [activePage, setActivePage] = useState("Membership");
  const [activeTopLevel, setActiveTopLevel] = useState("Dashboard");
  const [expandedTopLevel, setExpandedTopLevel] = useState(null);
  const [activeBookingEngineTab, setActiveBookingEngineTab] = useState("Setup");
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
  const isBookingEngineView =
    activeTopLevel === "Revenue Engine" && (activeNestedItem === "Booking Engine" || activeNestedItem === "Smart Pricing AI");
  const isRevenueEngineModuleView =
    activeTopLevel === "Revenue Engine" &&
    ["Promo Codes", "Gift Cards", "Wait List", "Lottery", "Checkout Upsells"].includes(activeNestedItem);
  const activeModuleTitle = activeNestedItem || activeTopLevel;
  const activeModuleDescription = hasActiveFlyout
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background, color: theme.ink }}>
      <div className="flex min-h-screen flex-col xl:flex-row">
        <aside
          className="relative w-full border-b xl:w-72 xl:border-b-0 xl:border-r"
          style={{ backgroundColor: theme.white, borderColor: theme.border, color: theme.ink }}
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
                                  ? { backgroundColor: theme.softAccent, color: theme.accent, fontWeight: 600 }
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
              style={{ borderColor: theme.border, backgroundColor: theme.white }}
            >
              <div className="mb-3 px-2 text-xs uppercase tracking-[0.24em]" style={{ color: theme.subtle }}>
                Account
              </div>
              {bottomMenuItems.map((item) => (
                <button
                  key={item}
                  className="mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm transition"
                  style={item === "Sign Out" ? { color: theme.accent } : { color: theme.muted }}
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
            style={{ backgroundColor: theme.white, borderColor: theme.border }}
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: theme.subtle }}>
                {activeTopLevel}
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

          {activeTopLevel === "Dashboard" ? (
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
                      style={{ backgroundColor: theme.softAccent, color: theme.accent }}
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
                      style={{ backgroundColor: theme.softAccent, color: theme.accent }}
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
                              style={{ backgroundColor: theme.softAccent, color: theme.accent }}
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
