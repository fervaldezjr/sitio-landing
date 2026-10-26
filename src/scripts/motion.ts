/**
 * Page motion (docs/identity.md, dial 5): Lenis for the scroll, GSAP for the rest.
 * The pinned first screen lives in story.ts and the full-screen wipe in compare.ts; both only
 * listen to the scroll, so they work with or without Lenis.
 * Progressive enhancement: without JavaScript everything is visible; with
 * prefers-reduced-motion nothing moves and the scroll stays native.
 */
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** easeOutCubic, the same curve as the app's pills: cubic-bezier(0.33, 1, 0.68, 1). */
const EASE = "power3.out";
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $$ = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) => [...root.querySelectorAll<T>(selector)];

let lenis: Lenis | null = null;

function smoothScroll(): void {
  if (reduce) return;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.addEventListener("sitio:scroll-lock", (event) => {
    const locked = (event as CustomEvent<{ locked: boolean }>).detail.locked;
    if (locked) lenis?.stop();
    else lenis?.start();
  });
}

/** In-page links glide with Lenis; sections stop below the sticky masthead through their CSS scroll-margin-top, which Lenis reads. */
function anchors(): void {
  $$<HTMLAnchorElement>('a[href*="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const url = new URL(link.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
      else target.scrollIntoView();
      history.pushState(null, "", url.hash);
    });
  });
}

/** Headlines enter line by line from behind a mask. */
function lines(): void {
  $$("[data-lines]").forEach((heading) => {
    if (reduce) {
      heading.classList.add("is-split");
      return;
    }
    SplitText.create(heading, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
      onSplit(self) {
        heading.classList.add("is-split");
        return gsap.from(self.lines, {
          yPercent: 105,
          duration: 1.1,
          ease: EASE,
          stagger: 0.09,
          scrollTrigger: { trigger: heading, start: "top 86%", once: true },
        });
      },
    });
  });
}

function reveals(): void {
  if (reduce) return;
  $$("[data-reveal]").forEach((node) => {
    gsap.from(node, { y: 24, autoAlpha: 0, duration: 1, ease: EASE, scrollTrigger: { trigger: node, start: "top 90%", once: true } });
  });
  $$("[data-reveal-group]").forEach((group) => {
    gsap.from([...group.children], {
      y: 24,
      autoAlpha: 0,
      duration: 1,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: "top 88%", once: true },
    });
  });
}

function faq(): void {
  $$<HTMLDetailsElement>(".qa").forEach((item) => item.addEventListener("toggle", () => ScrollTrigger.refresh()));
}

function boot(): void {
  smoothScroll();
  anchors();
  faq();
  const start = () => {
    lines();
    reveals();
    ScrollTrigger.refresh();
  };
  if (document.fonts?.ready) document.fonts.ready.then(start);
  else start();
}

boot();
