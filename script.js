const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const revealEls = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

function syncNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", syncNavbar, { passive: true });
syncNavbar();

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((element) => observer.observe(element));

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const message = [
    "Olá, Hevellyn! Quero fazer um orçamento.",
    `Nome: ${data.get("name")}`,
    `WhatsApp: ${data.get("phone")}`,
    `Serviço: ${data.get("service")}`,
    `Mensagem: ${data.get("message") || "Não informado"}`,
  ].join("\n");

  successMsg.hidden = false;
  window.open(`https://wa.me/5562982192375?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
  contactForm.reset();
});
