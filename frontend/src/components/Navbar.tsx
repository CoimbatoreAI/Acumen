import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

const productsDropdown = [
  {
    label: "Security",
    children: [
      { label: "CCTV Surveillance", href: "/products#cctv" },
      { label: "AMC (Annual Maintenance Contract)", href: "/products#amc" },
      { label: "Best Solar CCTV Camera for Farms", href: "/products#solar-cctv" },
    ],
  },
  { label: "Access Control System", href: "/products#access-control" },
  {
    label: "Automations",
    children: [
      { label: "Automatic Sliding Glass Door Operator", href: "/products#sliding-door" },
      { label: "Electric Gate Motors", href: "/products#gate-motors" },
      { label: "Swing Door Operators", href: "/products#swing-door" },
      { label: "Automatic Boom Barrier", href: "/products#boom-barrier" },
      { label: "Emergency Lighting", href: "/products#emergency-lighting" },
    ],
  },
  {
    label: "Fire",
    children: [
      { label: "Fire Alarm System", href: "/products#fire-alarm" },
      { label: "Wireless Fire Alarm System", href: "/products#wireless-fire" },
    ],
  },
];

const downloadsDropdown = [
  { label: "Catalogue", href: "/downloads#catalogue" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", dropdown: productsDropdown },
  { label: "Downloads", href: "/downloads", dropdown: downloadsDropdown },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

interface DropdownItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

function DesktopDropdown({ items, isOpen }: { items: DropdownItem[]; isOpen: boolean }) {
  const [openSub, setOpenSub] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-1 w-72 bg-card rounded-lg shadow-xl border border-border z-50 py-2 animate-fade-up">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.children && setOpenSub(item.label)}
          onMouseLeave={() => setOpenSub(null)}
        >
          {item.children ? (
            <div className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-accent cursor-pointer transition-colors">
              <span>{item.label}</span>
              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
            </div>
          ) : (
            <Link
              to={item.href!}
              className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
            >
              {item.label}
            </Link>
          )}
          {item.children && openSub === item.label && (
            <div className="absolute left-full top-0 w-72 bg-card rounded-lg shadow-xl border border-border py-2 ml-1">
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  to={child.href}
                  className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-0"}`}
    >
      <div className={`container mx-auto px-4 lg:px-8 transition-all duration-500 ${scrolled
        ? "bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl mt-2 h-16 md:h-20"
        : "bg-white h-16 md:h-20"
        } flex items-center justify-between`}>
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Acumen Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-[#38A149] leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
              ACUMEN SECURITY SOLUTIONS
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-[#8BC34A] tracking-[0.25em] uppercase mt-1.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
              a perfect automation
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={link.href}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname === link.href
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
                  }`}
              >
                {link.label}
                {link.dropdown && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>
              {link.dropdown && (
                <DesktopDropdown
                  items={link.dropdown}
                  isOpen={openDropdown === link.label}
                />
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://wa.me/917200552551"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform shadow-sm"
            aria-label="Contact on WhatsApp"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.label} className="border-b border-border last:border-0">
              {link.dropdown ? (
                <>
                  <button
                    className="flex items-center justify-between w-full px-6 py-3.5 text-sm font-medium text-foreground"
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                    }
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileExpanded === link.label ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {mobileExpanded === link.label && (
                    <div className="bg-muted pb-2">
                      {link.dropdown.map((item) => (
                        <div key={item.label}>
                          {item.children ? (
                            <>
                              <button
                                className="flex items-center justify-between w-full px-8 py-2.5 text-sm text-muted-foreground"
                                onClick={() =>
                                  setMobileSubExpanded(
                                    mobileSubExpanded === item.label ? null : item.label
                                  )
                                }
                              >
                                {item.label}
                                <ChevronDown
                                  className={`w-3.5 h-3.5 transition-transform ${mobileSubExpanded === item.label ? "rotate-180" : ""
                                    }`}
                                />
                              </button>
                              {mobileSubExpanded === item.label &&
                                item.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={child.href}
                                    className="block px-12 py-2 text-sm text-muted-foreground hover:text-primary"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                            </>
                          ) : (
                            <Link
                              to={item.href!}
                              className="block px-8 py-2.5 text-sm text-muted-foreground hover:text-primary"
                            >
                              {item.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={link.href}
                  className="block px-6 py-3.5 text-sm font-medium text-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <div className="p-6 border-t border-border mt-auto space-y-4">
            <a
              href="https://wa.me/917200552551"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              className="block text-center px-5 py-3.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
