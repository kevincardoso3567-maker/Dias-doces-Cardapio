// Obtém referências aos elementos do DOM
const modal = document.getElementById("imagem-expandida");
const modalImg = document.getElementById("imagem-conteudo");
const fecharBtn = document.querySelector(".fechar");

/**
 * Abre o modal e carrega a imagem clicada.
 * @param {HTMLImageElement} elemento - A imagem do cardápio que foi clicada.
 */
function abrirModal(elemento) {
  modal.style.display = "block";
  modalImg.src = elemento.src;
  modalImg.alt = elemento.alt; // Define o alt da imagem expandida
}

/**
 * Fecha o modal.
 */
function fecharModal() {
  modal.style.display = "none";
}

// Event Listeners:
// 1. Fechar o modal ao clicar no botão 'X'
if (fecharBtn) {
    fecharBtn.onclick = fecharModal;
}

// 2. Fechar o modal ao clicar fora da imagem (no overlay)
if (modal) {
    modal.onclick = function(event) {
        // Verifica se o clique foi diretamente no modal (overlay), e não na imagem
        if (event.target === modal || event.target.className === 'fechar') {
            fecharModal();
        }
    };
}

// 3. Fechar com a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        fecharModal();
    }
});