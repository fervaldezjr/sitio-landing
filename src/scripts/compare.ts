import { DESKTOP, MOBILE, wipeFrame } from "../lib/wipe";

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function profile() {
  return window.matchMedia("(max-width: 760px)").matches ? MOBILE : DESKTOP;
}

/** The full-screen before/mirror wipe: scroll drives it, the handle overrides it. */
export function initCompare(): void {
  const runway = document.querySelector<HTMLElement>("[data-hero-runway]");
  const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
  const stroke = document.querySelector<SVGLineElement>("[data-wipe-stroke]");
  const handle = document.querySelector<HTMLButtonElement>("[data-wipe-handle]");
  const espejo = document.querySelectorAll<HTMLElement>("[data-espejo]");
  if (!runway || !stage || !stroke || !handle || espejo.length === 0) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let override: number | null = null;
  let visible = true;
  let ticking = false;
  let dragging = false;

  const place = (p: number) => {
    const frame = wipeFrame(p, profile().lean);
    stage.style.setProperty("--split-top", String(frame.top));
    stage.style.setProperty("--split-bottom", String(frame.bottom));
    espejo.forEach((node) => {
      node.style.clipPath = frame.clip;
    });
    stroke.setAttribute("x1", String(frame.line.x1));
    stroke.setAttribute("y1", String(frame.line.y1));
    stroke.setAttribute("x2", String(frame.line.x2));
    stroke.setAttribute("y2", String(frame.line.y2));
    handle.style.left = `${frame.handle.x * 100}%`;
    handle.style.top = `${frame.handle.y * 100}%`;
    handle.setAttribute("aria-valuenow", String(Math.round(p * 100)));
  };

  const fromScroll = () => {
    if (reduced || override !== null || !visible) return;
    const total = runway.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(-runway.getBoundingClientRect().top, 0), Math.max(total, 0));
    const t = total <= 0 ? 0 : scrolled / total;
    const { rest, end } = profile();
    place(rest + (end - rest) * easeInOutSine(t));
  };

  const schedule = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      fromScroll();
    });
  };

  place(profile().rest);

  if (!reduced) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  const pointToP = (clientX: number) => {
    const rect = stage.getBoundingClientRect();
    return Math.min(0.94, Math.max(0.06, (clientX - rect.left) / rect.width));
  };

  /* The pulse around the handle says «drag me» until someone does. */
  const touched = () => handle.classList.add("is-touched");
  handle.addEventListener("keydown", touched, { once: true });

  handle.addEventListener("pointerdown", (event) => {
    touched();
    dragging = true;
    handle.setPointerCapture(event.pointerId);
    override = pointToP(event.clientX);
    place(override);
  });

  handle.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    override = pointToP(event.clientX);
    place(override);
  });

  const endDrag = () => {
    dragging = false;
  };
  handle.addEventListener("pointerup", endDrag);
  handle.addEventListener("pointercancel", endDrag);

  handle.addEventListener("keydown", (event) => {
    const current = Number(handle.getAttribute("aria-valuenow") ?? "50") / 100;
    let next = current;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = current - 0.04;
    else if (event.key === "ArrowRight" || event.key === "ArrowUp") next = current + 0.04;
    else if (event.key === "Home") next = 0.06;
    else if (event.key === "End") next = 0.94;
    else return;
    event.preventDefault();
    override = Math.min(0.94, Math.max(0.06, next));
    place(override);
  });

  window.addEventListener(
    "scroll",
    () => {
      if (!dragging && override !== null) override = null;
    },
    { passive: true },
  );
}
