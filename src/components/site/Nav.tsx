import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/avion-logo.png";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#areas", label: "Areas We Serve" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);

    // Determine initial theme
    const activeTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(activeTheme);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const renderThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-muted hover:border-sage transition-all shadow-sm cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        // Moon icon
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.9999 8.52667C13.8951 9.66147 13.4692 10.7429 12.7721 11.6445C12.075 12.5461 11.1356 13.2305 10.0637 13.6177C8.99188 14.0049 7.83192 14.0787 6.7196 13.8307C5.60728 13.5827 4.5886 13.023 3.78275 12.2172C2.97691 11.4113 2.41723 10.3927 2.16921 9.28033C1.92118 8.16801 1.99508 7.00806 2.38224 5.9362C2.7694 4.86434 3.45382 3.92491 4.35541 3.22784C5.257 2.53076 6.33847 2.10487 7.47327 2C6.80888 2.89884 6.48917 4.0063 6.57229 5.12094C6.65541 6.23559 7.13584 7.28337 7.9262 8.07373C8.71656 8.86409 9.76435 9.34452 10.879 9.42765C11.9936 9.51077 13.1011 9.19106 13.9999 8.52667Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          />
        </svg>
      ) : (
        // Sun icon
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M7.99984 11.3334C9.84079 11.3334 11.3332 9.84097 11.3332 8.00002C11.3332 6.15907 9.84079 4.66669 7.99984 4.66669C6.15889 4.66669 4.6665 6.15907 4.6665 8.00002C4.6665 9.84097 6.15889 11.3334 7.99984 11.3334Z"
            stroke="#43E8E8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 0.666687V2.00002"
            stroke="#43E8E8"
            stroke-width="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 14V15.3333"
            stroke="#43E8E8"
            stroke-width="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.81348 2.81335L3.76014 3.76002"
            stroke="#43E8E8"
            stroke-width="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.2402 12.24L13.1869 13.1867"
            stroke="#43E8E8"
            stroke-width="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.666504 8H1.99984"
            stroke="#43E8E8"
            stroke-width="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 8H15.3333"
            stroke="#43E8E8"
            stroke-width="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.81348 13.1867L3.76014 12.24"
            stroke="#43E8E8"
            stroke-width="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.2402 3.76002L13.1869 2.81335"
            stroke="#43E8E8"
            stroke-width="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-background/80 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <a href="#home" className="flex items-center gap-2" aria-label="Avion Mobile Massage">
          <img src={logo} alt="Avion" className="h-9 w-auto dark:brightness-125" />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/75 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {renderThemeToggle()}
          <a href="#book" className="btn-pill btn-charcoal hover:btn-charcoal-hover">
            Book Now
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          {renderThemeToggle()}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background transition-all">
          <div className="container-page py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/80 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="btn-pill btn-charcoal mt-2 w-full text-center"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
