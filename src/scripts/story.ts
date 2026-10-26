/**
 * The pinned first screen (docs/identity.md, dial 5). One GSAP timeline, scrubbed by the scroll
 * through `.story`: the intro leaves, the phone takes the photo, generates the mirror, wipes to it,
 * shows its card while the removed things drift away, and ends on the list with the proposals.
 * The scene-0 state lives in CSS under `html.motion`, so the first paint already matches the
 * timeline's start. Without `html.motion` (no JavaScript or reduced motion) the stage is a still.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStory(): void {
  const story = document.querySelector<HTMLElement>("[data-story]");
  if (!story || !document.documentElement.classList.contains("motion")) return;

  const q = <T extends Element = HTMLElement>(selector: string) => story.querySelector<T>(selector);
  const qa = <T extends Element = HTMLElement>(selector: string) => [...story.querySelectorAll<T>(selector)];

  const intro = q("[data-story-intro]");
  const steps = qa("[data-story-step]");
  const phone = q("[data-phone]");
  const camera = qa("[data-screen-camera]");
  const flash = q("[data-screen-flash]");
  const status = q("[data-screen-status]");
  const scan = q("[data-screen-scan]");
  const espejo = q("[data-screen-espejo]");
  const edge = q("[data-screen-edge]");
  const antesPill = q("[data-screen-antes]");
  const espejoPill = q("[data-screen-espejo-pill]");
  const card = q("[data-screen-card]");
  const skeleton = q("[data-screen-skeleton]");
  const sheet = q("[data-screen-sheet]");
  const add = q("[data-screen-button-add]");
  const added = q("[data-screen-button-added]");
  const removed = qa("[data-story-removed] li");
  const products = qa("[data-story-products] li");
  const progress = qa("[data-story-progress] li");
  if (!intro || !phone || !camera.length || !flash || !status || !scan || !espejo || !edge || !card || !sheet) return;

  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const show = { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" };
  const hide = { autoAlpha: 0, y: -16, duration: 0.4, ease: "power2.in" };

  /* Step i is on screen from at(i) until the next one replaces it. */
  const at = [0.9, 2.1, 4.5, 6.5, 8.3];
  const active = (time: number) => at.reduce((index, start, i) => (time >= start ? i : index), -1);

  const timeline = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: story,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: () => {
        const index = active(timeline.time());
        progress.forEach((bar, i) => bar.classList.toggle("is-on", i <= index));
      },
    },
  });

  // 0 · the intro leaves; on a phone the device rises into place
  timeline.to(intro, { autoAlpha: 0, y: -40, duration: 0.8, ease: "power2.in" }, 0.1);
  if (mobile) timeline.to(phone, { y: 0, duration: 1, ease: "power2.out" }, 0);
  timeline.to(steps[0], show, at[0]);

  // 1 · the photo: a flash and the camera interface goes away
  timeline
    .to(flash, { autoAlpha: 1, duration: 0.12, ease: "none" }, 1.3)
    .to(flash, { autoAlpha: 0, duration: 0.45, ease: "power2.out" }, 1.42)
    .to(camera, { autoAlpha: 0, duration: 0.2 }, 1.35);

  // 2 · generating, then the wipe from the photo to its mirror
  timeline
    .to(steps[0], hide, at[1] - 0.35)
    .to(steps[1], show, at[1])
    .to(status, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" }, 2.1)
    .to(skeleton, { autoAlpha: 1, duration: 0.3 }, 2.1)
    .fromTo(scan, { autoAlpha: 1, yPercent: -100 }, { yPercent: 1000, duration: 1.2, ease: "none" }, 2.3)
    .to(scan, { autoAlpha: 0, duration: 0.2 }, 3.4)
    .to(status, { autoAlpha: 0, duration: 0.25 }, 3.5)
    .to(edge, { autoAlpha: 1, duration: 0.1 }, 3.5)
    .to(espejo, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, 3.55)
    .to(edge, { left: "0%", duration: 1, ease: "power2.inOut" }, 3.55)
    .to(edge, { autoAlpha: 0, duration: 0.2 }, 4.5)
    .to(antesPill, { autoAlpha: 0, duration: 0.3 }, 3.6)
    .to(espejoPill, { autoAlpha: 1, duration: 0.3 }, 4.3);

  // 3 · the mirror's card, while what is removed drifts away from the phone
  timeline
    .to(steps[1], hide, at[2] - 0.35)
    .to(steps[2], show, at[2])
    .to(skeleton, { autoAlpha: 0, duration: 0.25 }, 4.6)
    .fromTo(card, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 4.7);
  removed.forEach((chip, i) => {
    const start = 4.8 + i * 0.12;
    timeline
      .fromTo(chip, { autoAlpha: 0, x: 0, y: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3.out" }, start)
      .to(chip, { x: () => parseFloat(chip.dataset.dx ?? "0"), y: () => parseFloat(chip.dataset.dy ?? "0"), duration: 1.1, ease: "power1.out" }, start)
      .to(chip, { autoAlpha: 0, duration: 0.4 }, start + 0.9);
  });

  // 4 · the list with what is missing, and its proposals around the phone
  timeline
    .to(steps[2], hide, at[3] - 0.35)
    .to(steps[3], show, at[3])
    .to(card, { autoAlpha: 0, y: -24, duration: 0.4 }, 6.3)
    .to(espejoPill, { autoAlpha: 0, duration: 0.3 }, 6.3)
    /* y: 0 drops the px that GSAP reads from the CSS translateY(105%), so only yPercent moves it. */
    .fromTo(sheet, { y: 0, yPercent: 105 }, { y: 0, yPercent: 0, duration: 0.7, ease: "power3.out" }, 6.5);
  products.forEach((tile, i) => {
    timeline.fromTo(tile, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 6.8 + i * 0.18);
  });

  // 5 · added to a list
  timeline.to(steps[3], hide, at[4] - 0.35).to(steps[4], show, at[4]);
  if (add && added) timeline.to(add, { autoAlpha: 0, y: -8, duration: 0.25 }, 8.6).fromTo(added, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 8.75);
  timeline.to({}, { duration: 0.9 }, 9.1);

  /* Where each removed thing drifts to: out of the phone towards the empty side (the right on a
     wide screen, both sides on a phone), measured from the phone so it works at any size. */
  const spread = () => {
    const box = phone.getBoundingClientRect();
    removed.forEach((chip, i) => {
      if (mobile) {
        const side = i % 2 === 0 ? -1 : 1;
        chip.dataset.dx = String(side * box.width * (0.62 + (i % 3) * 0.06));
        chip.dataset.dy = String((Math.floor(i / 2) - 1.5) * 46);
        return;
      }
      const column = i % 2;
      const row = Math.floor(i / 2);
      chip.dataset.dx = String(box.width / 2 + 90 + column * 150 + (row % 2) * 40);
      chip.dataset.dy = String((row - 1.5) * 92 + column * 30);
    });
  };
  spread();
  ScrollTrigger.addEventListener("refreshInit", spread);
}
