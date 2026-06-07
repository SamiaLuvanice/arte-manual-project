import logoImg from "@/assets/logo-arte-manual.png";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/contact";
import { type ReactElement } from "react";

const FOOTER_LINKS = [
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "WhatsApp", href: WHATSAPP_URL },
] as const;

export default function Footer(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <img
            src={logoImg}
            alt="Arte Manual logo"
            width={32}
            height={32}
            className="h-8 w-8"
            loading="lazy"
          />
          <p className="font-display text-lg font-bold text-foreground">
            Arte <span className="text-primary">Manual</span>
          </p>
        </div>
        <p className="font-body text-xs text-muted-foreground">
          © {year} Arte Manual. Todos os direitos reservados.
        </p>

        <nav aria-label="Footer navigation">
          <ul role="list" className="flex gap-5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${link.label} (opens in a new tab)`}
                  className="font-body text-xs font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
