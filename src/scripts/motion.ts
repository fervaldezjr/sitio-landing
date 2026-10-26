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
/* the mobile address bar resizes the viewport while scrolling; re-measuring then is what jumps */
ScrollTrigger.config({ ignoreMobileResize: true });

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

/** Lazy images fade in once decoded instead of painting in pieces. */
function images(): void {
  $$<HTMLImageElement>('img[loading="lazy"]').forEach((image) => {
    if (image.complete && image.naturalWidth) return;
    image.classList.add("is-waiting");
    const ready = () => {
      image.classList.add("is-ready");
      image.classList.remove("is-waiting");
    };
    image.addEventListener("load", () => void (image.decode?.() ?? Promise.resolve()).catch(() => undefined).then(ready), { once: true });
    image.addEventListener("error", ready, { once: true });
  });
}

/**
 * First load: a short white screen with the wordmark until the fonts and the stage's images are
 * decoded (2.5 s at most), then the intro enters. Nothing on the stage paints half-loaded.
 */
async function preload(): Promise<void> {
  const overlay = document.querySelector<HTMLElement>("[data-preload]");
  if (!overlay) return;
  if (reduce) {
    overlay.remove();
    return;
  }
  lenis?.stop();
  const bar = overlay.querySelector<HTMLElement>("[data-preload-bar]");
  const pictures = $$<HTMLImageElement>("[data-story] img");
  const total = pictures.length + 1;
  let done = 0;
  const tick = () => {
    done += 1;
    if (bar) bar.style.transform = `scaleX(${done / total})`;
  };
  const loaded = (image: HTMLImageElement) =>
    (image.complete
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        })
    )
      .then(() => image.decode?.())
      .catch(() => undefined)
      .then(tick);
  await Promise.race([
    Promise.all([(document.fonts?.ready ?? Promise.resolve()).then(tick), ...pictures.map(loaded)]),
    new Promise((resolve) => setTimeout(resolve, 2500)),
  ]);
  gsap.to(overlay, { autoAlpha: 0, duration: 0.5, ease: "power2.out", onComplete: () => overlay.remove() });
  const intro = $$("[data-story-intro] > *");
  if (intro.length) gsap.from(intro, { y: 24, autoAlpha: 0, duration: 0.9, ease: EASE, stagger: 0.08, delay: 0.15 });
  const phone = document.querySelector("[data-phone]");
  if (phone) gsap.from(phone, { autoAlpha: 0, duration: 0.9, ease: EASE, delay: 0.3 });
  lenis?.start();
}

function faq(): void {
  $$<HTMLDetailsElement>(".qa").forEach((item) => item.addEventListener("toggle", () => ScrollTrigger.refresh()));
}

function boot(): void {
  smoothScroll();
  anchors();
  faq();
  images();
  void preload();
  const start = () => {
    lines();
    reveals();
    ScrollTrigger.refresh();
  };
  if (document.fonts?.ready) document.fonts.ready.then(start);
  else start();
}

boot();
