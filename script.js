const header = document.querySelector(".site-header");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

function syncHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const message = [
    "Olá, Agência Alvix! Quero fazer um orçamento.",
    `Nome: ${data.get("nome")}`,
    `WhatsApp: ${data.get("telefone")}`,
    `Serviço: ${data.get("servico")}`,
    `Mensagem: ${data.get("mensagem") || "Não informado"}`,
  ].join("\n");

  formStatus.textContent = "Abrindo o WhatsApp com seu briefing.";
  window.open(`https://wa.me/5562982192375?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
  contactForm.reset();
});
