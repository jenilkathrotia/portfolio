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
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

document.getElementById("year").textContent = String(new Date().getFullYear());

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
