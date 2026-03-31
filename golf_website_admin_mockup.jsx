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

function GolfWebsiteAdminDashboard() {
  const [pages, setPages] = useState(initialPages);
  const [activePage, setActivePage] = useState("Membership");
  const [activeTopLevel, setActiveTopLevel] = useState("Dashboard");
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
    setActiveTopLevel(item);
  };

  const selectFlyoutItem = (item) => {
    setActiveFlyoutSelections((prev) => ({
      ...prev,
      [activeTopLevel]: item,
    }));
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
                      {hasChildren ? <ChevronIcon open={isActive} /> : null}
                    </button>

                    {hasChildren ? (
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          isActive ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"
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
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GolfWebsiteAdminDashboard />);
