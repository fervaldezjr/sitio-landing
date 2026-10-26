const DESKTOP = { rest: 0.5, lean: 0.08, end: 0.92 };
const MOBILE = { rest: 0.4, lean: 0.12, end: 0.9 };

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function profile() {
  return window.matchMedia("(max-width: 760px)").matches ? MOBILE : DESKTOP;
}

export function initHero(): void {
  const runway = document.querySelector<HTMLElement>("[data-hero-runway]");
  const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
  const line = document.querySelector<HTMLElement>("[data-wipe-line]");
  const handle = document.querySelector<HTMLButtonElement>("[data-wipe-handle]");
  const espejo = document.querySelectorAll<HTMLElement>("[data-espejo]");
  if (!runway || !stage || !line || !handle || espejo.length === 0) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let override: number | null = null;
  let visible = true;
  let ticking = false;
  let dragging = false;

  const place = (p: number) => {
    const { lean } = profile();
    const top = Math.min(0.97, Math.max(0.03, p + lean / 2));
    const bottom = Math.min(0.97, Math.max(0.03, p - lean / 2));
    stage.style.setProperty("--split-top", top.toFixed(4));
    stage.style.setProperty("--split-bottom", bottom.toFixed(4));
    const clip = `polygon(${top * 100}% 0, 100% 0, 100% 100%, ${bottom * 100}% 100%)`;
    espejo.forEach((node) => {
      node.style.clipPath = clip;
    });
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    const dx = (bottom - top) * width;
    const length = Math.hypot(dx, height);
    const angle = Math.atan2(dx, height);
    line.style.left = `${top * 100}%`;
    line.style.height = `${length}px`;
    line.style.transform = `translateX(-50%) rotate(${angle}rad)`;
    handle.style.left = `${((top + bottom) / 2) * 100}%`;
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

  handle.addEventListener("pointerdown", (event) => {
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
