/**
 * Smoothly scrolls to a CSS selector target,
 * accounting for the fixed announcement bar + nav pill height.
 */
export function scrollToSection(selector: string, offset = 130) {
  const target = document.querySelector(selector);
  if (!target) return;
  const rect = target.getBoundingClientRect();
  window.scrollTo({ top: window.scrollY + rect.top - offset, behavior: "smooth" });
}
