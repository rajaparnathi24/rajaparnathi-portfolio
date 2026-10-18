document.documentElement.classList.add("js-motion");

const revealItems = document.querySelectorAll("[data-reveal]");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isCurrent = link.hash === `#${entry.target.id}`;
        link.classList.toggle("is-active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-30% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const lockBodyScroll = (lock) => {
  document.body.style.overflow = lock ? "hidden" : "";
  document.documentElement.style.overflow = lock ? "hidden" : "";
};

const closeMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  siteNav?.classList.remove("is-open");
  lockBodyScroll(false);
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  const opening = !isOpen;
  siteNav?.classList.toggle("is-open", opening);
  lockBodyScroll(opening);
});

siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 640) closeMenu();
});

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
