import logoImg from "@/assets/logo-arte-manual.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Arte Manual logo" width={32} height={32} className="h-8 w-8" loading="lazy" />
          <p className="font-display text-lg font-bold text-foreground">
            Arte <span className="text-primary">Manual</span>
          </p>
        </div>
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Arte Manual. Todos os direitos reservados.
        </p>
        <div className="flex gap-5">
          {["Instagram", "WhatsApp", "Pinterest"].map((s) => (
            <a
              key={s}
              href="#"
              className="font-body text-xs font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
