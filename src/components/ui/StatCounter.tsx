import { useEffect, useRef } from "react";
import gsap from "gsap";
import useGsap from "@/hooks/useGsap";
import { StatItem } from "@/lib/constants";

export type StatCounterProps = { stat: StatItem; delay?: number };

export default function StatCounter({ stat, delay = 1.4 }: StatCounterProps) {
  const { number: target, suffix, label } = stat;
  useGsap();
  const numRef = useRef<HTMLParagraphElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    const anim = gsap.to(obj, {
      val: target,
      duration: 1.4,
      ease: "power2.out",
      delay,
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = Math.floor(obj.val).toString() + suffix;
        }
      },
    });
    return () => {
      anim.kill();
    };
  }, [target, suffix, delay]);

  return (
    <div ref={wrapRef} role="listitem" aria-label={label}>
      <p ref={numRef} className="font-display text-3xl font-bold text-primary" aria-live="polite">
        0{suffix}
      </p>
      <p className="mt-1 font-body text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
