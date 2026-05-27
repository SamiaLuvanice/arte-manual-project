import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook to register GSAP plugins (ScrollTrigger) once per mounted component tree.
 * Call `useGsap()` at the top of components that use GSAP/ScrollTrigger.
 */
export default function useGsap() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
}
