/**
 * Page motion (docs/identity.md, dial 5): Lenis for the scroll, GSAP for the rest.
 * The hero wipe lives in hero.ts and only listens to the scroll, so it works with or without Lenis.
 * Progressive enhancement: without JavaScript everything is visible; with
 * prefers-reduced-motion nothing moves and the scroll stays native.
 */
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** easeOutQuint, the same curve as the app's sheets: cubic-bezier(0.22, 1, 0.36, 1). */
const EASE = "power4.out";
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

/** Photos and the app card uncover from the bottom up: the same gesture as the hero wipe. */
function unveil(): void {
  if (reduce) return;
  $$("[data-unveil]").forEach((box) => {
    const image = box.querySelector("img");
    /* The dot scales in; the button around it keeps its own CSS hover transform. */
    const spots = $$(".spot-dot", box);
    const timeline = gsap.timeline({ scrollTrigger: { trigger: box, start: "top 82%", once: true } });
    timeline.fromTo(box, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE });
    if (image) timeline.fromTo(image, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: EASE }, 0);
    if (spots.length) timeline.from(spots, { autoAlpha: 0, scale: 0.6, duration: 0.5, ease: "power3.out", stagger: 0.05 }, 0.7);
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

/** The footer wordmark spans the content width, capped at 75 % of the viewport height. */
function fit(): void {
  $$("[data-fit]").forEach((node) => {
    const box = node.parentElement;
    if (!box) return;
    const target = box.clientWidth * parseFloat(node.dataset.fit ?? "1");
    const byHeight = (window.innerHeight * 0.75) / 0.8;
    /* Text width is not quite linear in font size (hinting at small sizes), so measure twice. */
    let size = 100;
    for (let pass = 0; pass < 2; pass++) {
      node.style.fontSize = `${size}px`;
      size = (size * target) / (node.getBoundingClientRect().width || 1);
    }
    node.style.fontSize = `${Math.max(48, Math.min(size, byHeight))}px`;
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
    fit();
    lines();
    unveil();
    reveals();
    ScrollTrigger.refresh();
  };
  if (document.fonts?.ready) document.fonts.ready.then(start);
  else start();
  let frame = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      fit();
      ScrollTrigger.refresh();
    });
  });
}

boot();
