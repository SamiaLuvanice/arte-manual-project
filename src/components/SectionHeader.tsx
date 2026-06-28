import { type ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  titleId?: string;
  align?: "left" | "center";
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  align = "center",
  eyebrowClassName = "text-primary",
  titleClassName = "text-foreground",
  descriptionClassName = "text-muted-foreground",
}: SectionHeaderProps) {
  const alignClassName = align === "left" ? "text-left" : "text-center";

  return (
    <div className={alignClassName}>
      <div
        className={
          align === "left"
            ? "flex items-baseline gap-4"
            : "flex items-baseline justify-center gap-4"
        }
      >
        <span
          className={`font-body text-xs font-semibold uppercase tracking-[0.3em] ${eyebrowClassName}`}
        >
          {eyebrow}
        </span>
      </div>

      <h2
        id={titleId}
        className={`mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl ${titleClassName}`}
      >
        {title}
      </h2>

      <p className={`mx-auto mt-6 max-w-lg font-body text-base ${descriptionClassName}`}>
        {description}
      </p>
    </div>
  );
}
