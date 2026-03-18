const { useMemo, useState } = React;

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

const navItems = [
  "Website Setup",
  "Brand Settings",
  "Page Controls",
  "AI Content Engine",
  "SEO and AI Audit",
  "Publishing",
];

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
    Published: "bg-emerald-100 text-emerald-800",
    Draft: "bg-amber-100 text-amber-800",
    "Not Enabled": "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || styles.Draft}`}>
      {status}
    </span>
  );
}

function Toggle({ enabled, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
        enabled ? "justify-end bg-emerald-600" : "justify-start bg-slate-300"
      }`}
    >
      <div className="h-5 w-5 rounded-full bg-white" />
    </button>
  );
}

function SectionCard({ title, subtitle, right, children }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
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
      <span className="mb-2 block text-sm font-medium text-slate-800">{label}</span>
      {multiline ? (
        <textarea
          className="min-h-[96px] w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
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
      <span className="mb-2 block text-sm font-medium text-slate-800">{label}</span>
      <select
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
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
      <div className="w-[340px] rounded-[2.5rem] border-[10px] border-slate-950 bg-slate-950 p-2 shadow-2xl">
        <div className="mb-2 flex justify-center">
          <div className="h-1.5 w-20 rounded-full bg-slate-700" />
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
          <div className="space-y-4 px-5 py-5 text-sm text-slate-600">
            {Object.entries(fields).slice(0, 3).map(([key, value]) => (
              <div key={key} className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{key}</div>
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
  const [activeModule, setActiveModule] = useState("Page Controls");
  const [brand, setBrand] = useState({
    courseName: "Demo Golf Club",
    fontFamily: "'Inter', sans-serif",
    accentColor: "#15803D",
    buttonTextColor: "#ffffff",
    logoName: "demo-logo.svg",
    heroBackground:
      "url('https://images.unsplash.com/photo-1513553404607-988d4cce98f3?q=80&w=1200&auto=format&fit=crop') center / cover",
  });
  const [auditItems] = useState([
    { title: "Add stronger FAQ coverage to Membership page", type: "Content", priority: "High" },
    { title: "Improve internal links from Home to Outings and Membership", type: "SEO", priority: "Medium" },
    { title: "Check Google Business Profile phone and hours consistency", type: "Local", priority: "High" },
    { title: "Add schema enhancements for organization, local business, and FAQ", type: "Structured Data", priority: "Medium" },
  ]);

  const enabledCount = useMemo(() => Object.values(pages).filter((page) => page.enabled).length, [pages]);
  const publishedCount = useMemo(() => Object.values(pages).filter((page) => page.status === "Published").length, [pages]);
  const activePageData = pages[activePage];

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

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <aside className="w-full border-b border-slate-200 bg-slate-950 text-white xl:w-72 xl:border-b-0 xl:border-r">
          <div className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-bold text-slate-950">
                GB
              </div>
              <div>
                <div className="text-sm text-slate-400">Website Builder</div>
                <div className="text-lg font-semibold">GolfBack Admin</div>
              </div>
            </div>
          </div>

          <nav className="px-3 pb-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveModule(item)}
                className={`mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
                  activeModule === item ? "bg-white text-slate-950 shadow" : "text-slate-300 hover:bg-slate-900"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="px-3 pb-5">
            <div className="rounded-3xl bg-slate-900 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Project Snapshot</div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-800 p-3">
                  <div className="text-slate-400">Enabled</div>
                  <div className="mt-1 text-xl font-semibold text-white">{enabledCount}</div>
                </div>
                <div className="rounded-2xl bg-slate-800 p-3">
                  <div className="text-slate-400">Published</div>
                  <div className="mt-1 text-xl font-semibold text-white">{publishedCount}</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{activeModule}</h1>
              <p className="mt-1 text-sm text-slate-600">
                Manage the website template system, structured page inputs, and mobile-first preview experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm">
                Save Draft
              </button>
              <button className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm">
                Publish Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 2xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <SectionCard
                title="Brand Settings"
                subtitle="Control the global visual system used by the standardized templates."
                right={<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Theme Ready</span>}
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
                right={<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Clickable Navigation</span>}
              >
                <div className="grid gap-3 lg:grid-cols-2">
                  {Object.entries(pages).map(([pageName, data]) => (
                    <div
                      key={pageName}
                      className={`rounded-3xl border p-4 transition ${
                        activePage === pageName ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <button className="text-left" onClick={() => setActivePage(pageName)}>
                          <div className="text-lg font-semibold">
                            <span className="mr-2 text-xs text-slate-400">{data.icon}</span>
                            {pageName}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">{pageDescriptions[pageName]}</div>
                        </button>
                        <Toggle enabled={data.enabled} onClick={() => togglePage(pageName)} />
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <StatusPill status={data.status} />
                        <button
                          onClick={() => setActivePage(pageName)}
                          className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium"
                        >
                          Edit Page
                        </button>
                        {data.enabled ? (
                          <button
                            onClick={() => setPageStatus(pageName, data.status === "Published" ? "Draft" : "Published")}
                            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium"
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
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
                    This page is currently disabled. Turn it on in Website Pages to activate its template and content inputs.
                  </div>
                ) : (
                  <>
                    <PageFieldEditor activePage={activePage} pageData={activePageData} onFieldChange={updatePageField} />
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white">
                        Generate {activePage} Page
                      </button>
                      <button className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium">
                        View AI Inputs
                      </button>
                    </div>
                  </>
                )}
              </SectionCard>

              <SectionCard
                title="Weekly SEO and AI Optimization Agent"
                subtitle="The agent scans content quality, local consistency, schema coverage, and internal linking opportunities."
                right={<span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Next Scan: Sunday 2:00 AM</span>}
              >
                <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-800">Focus Areas</div>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      <div>Search visibility</div>
                      <div>AI-answer readiness</div>
                      <div>Google Business Profile consistency</div>
                      <div>Internal links and schema opportunities</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {auditItems.map((item) => (
                      <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.type}</span>
                          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">{item.priority}</span>
                        </div>
                        <div className="mt-3 text-sm text-slate-700">{item.title}</div>
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
                right={<div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">iPhone Width</div>}
              >
                <MobilePreview activePage={activePage} brand={brand} fields={activePageData.fields} />
              </SectionCard>

              <SectionCard title="Publish Workflow" subtitle="An example of how this app could guide operators from input to live website.">
                <div className="space-y-3 text-sm text-slate-600">
                  {[
                    "1. Operator enables the page they want on the website.",
                    "2. Structured inputs replace open-ended page building.",
                    "3. AI applies approved templates, brand settings, and images.",
                    "4. Team reviews the live mobile preview before publishing.",
                    "5. Weekly audits suggest ranking, AI, and GBP improvements.",
                  ].map((step) => (
                    <div key={step} className="rounded-2xl bg-slate-50 px-4 py-3">
                      {step}
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Prototype Notes" subtitle="This version is ready to demo visually and can be hosted on GitHub Pages.">
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">Single-file React prototype for quick sharing with your team.</div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">Clickable page navigation and editable page-level inputs.</div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">Good next step: connect this UI to JSON page schemas and an AI generation service.</div>
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
