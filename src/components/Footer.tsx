import Link from "next/link";

const footerLinks = {
  Navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/work", label: "Work" },
    { href: "/design-system", label: "DS Lab" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Research: [
    { href: "/research/forma", label: "Forma" },
    { href: "/research/lokul", label: "Lokul.club" },
  ],
  Social: [
    {
      href: "https://www.linkedin.com/in/vivekanand-choudhari-817829118/",
      label: "LinkedIn",
    },
    { href: "https://dribbble.com/VivekanandChoudhari", label: "Dribbble" },
    { href: "https://www.behance.net/vivekanand6f29C", label: "Behance" },
    { href: "https://github.com/vivekanandchoudhari", label: "GitHub" },
  ],
  Contact: [
    { href: "mailto:vivekanand.design@gmail.com", label: "Email" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl tracking-tight font-mono text-accent">
                &#9670;
              </span>
              <span className="font-heading font-bold text-lg tracking-tight text-foreground">
                VC
              </span>
            </Link>
            <p className="text-muted max-w-sm leading-relaxed">
              Designer. Builder. Product Scaler. I design systems, build
              products, and scale them to millions.
            </p>
            <p className="text-muted mt-4 text-sm">
              Currently leading design at{" "}
              <span className="text-foreground font-medium">Moving Walls</span>
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-foreground transition-colors text-sm"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-center">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
