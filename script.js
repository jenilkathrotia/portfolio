// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.tagName === "A") {
    navLinks.classList.remove("show");
    menuBtn?.setAttribute("aria-expanded", "false");
  }
});

// ---------- Footer year ----------
document.getElementById("year").textContent = String(new Date().getFullYear());

// ---------- Copy email ----------
const copyBtn = document.getElementById("copyEmailBtn");
const copyHint = document.getElementById("copyHint");
const emailText = document.getElementById("emailText");

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailText.textContent.trim());
    copyHint.textContent = "Copied!";
    setTimeout(() => (copyHint.textContent = ""), 1200);
  } catch {
    copyHint.textContent = "Couldn’t copy—please select and copy manually.";
  }
});

// ---------- Contact form -> mailto ----------
const form = document.getElementById("contactForm");
const formHint = document.getElementById("formHint");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();

  const to = "jenil.kathrotia@sjsu.edu";
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  formHint.textContent = "Opening your email app…";
  setTimeout(() => (formHint.textContent = ""), 2000);
});

// ---------- Dark mode (saved) ----------
const themeToggle = document.getElementById("themeToggle");

function setTheme(mode) {
  document.documentElement.dataset.theme = mode; // "dark" or "light"
  localStorage.setItem("theme", mode);
  if (themeToggle) themeToggle.textContent = mode === "dark" ? "LIGHT MODE" : "DARK MODE";
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme;
  setTheme(current === "dark" ? "light" : "dark");
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObs.observe(el));

// ---------- Active section highlight ----------
const navAnchors = Array.from(document.querySelectorAll(".nav-links a"))
  .filter((a) => a.getAttribute("href")?.startsWith("#"));

const sections = navAnchors
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const activeObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  },
  { rootMargin: "-30% 0px -60% 0px", threshold: 0.01 }
);

sections.forEach((s) => activeObs.observe(s));

// ---------- Back to top button ----------
const toTopBtn = document.getElementById("toTop");

function onScroll() {
  if (!toTopBtn) return;
  const show = window.scrollY > 500;
  toTopBtn.classList.toggle("show", show);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Project search filter ----------
const search = document.getElementById("projectSearch");
const projectCards = Array.from(document.querySelectorAll("#projects .card"));

search?.addEventListener("input", () => {
  const q = search.value.toLowerCase().trim();
  projectCards.forEach((card) => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? "" : "none";
  });
});
