// =================== LÓGICA DO MODAL (IMAGEM EXPANDIDA) ===================

const modal = document.getElementById("imagem-expandida");
const modalImg = document.getElementById("imagem-conteudo");
const fecharBtn = document.querySelector(".fechar");
const cardapioImgs = document.querySelectorAll('.cardapio .item img');

function abrirModal(elemento) {
    if (modal.style.display !== "block") {
        modal.style.display = "block";
        modalImg.src = elemento.src;
        modalImg.alt = elemento.alt;
    }
}

function fecharModal() {
    modal.style.display = "none";
}

// 1. Evento para abrir o modal ao clicar em qualquer imagem do cardápio
cardapioImgs.forEach(img => {
    img.addEventListener('click', function() {
        abrirModal(img);
    });
});

// 2. Evento para fechar o modal (clique no fundo ou no botão 'x')
if (modal) {
    modal.addEventListener('click', function(event) {
        if (event.target === modal || event.target === fecharBtn) {
            fecharModal();
        }
    });
}

// 3. Fechar com a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        fecharModal();
    }
});


// =================== LÓGICA DO CARROSSEL (CLIQUE/NAVEGAÇÃO) ===================
// Usa scrollBy para navegação por clique e detecta a posição de rolagem nativa.

const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (track) {
    const items = document.querySelectorAll('.cardapio .item');
    
    if (items.length === 0) return;

    // A função para rolar o carrossel (nativa)
    function scrollCarousel(direction) {
        // Define o quanto rolar: 300px ou a largura do contêiner
        const scrollAmount = 300; 
        
        track.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    // Função para checar e desabilitar os botões (agora que eles estão visíveis)
    function updateButtons() {
        // Usa um pequeno delay para garantir que o navegador calculou a rolagem
        setTimeout(() => {
            // Verifica se está no início
            prevBtn.disabled = track.scrollLeft === 0;
            
            // Verifica se está no fim (com uma margem de erro de 5 pixels)
            const isEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
            nextBtn.disabled = isEnd;
        }, 100); 
    }

    // Eventos de clique para os botões
    nextBtn.addEventListener('click', () => {
        scrollCarousel(1); // Rola para a direita
    });

    prevBtn.addEventListener('click', () => {
        scrollCarousel(-1); // Rola para a esquerda
    });
    
    // Atualiza os botões sempre que a rolagem for finalizada (incluindo o swipe nativo)
    track.addEventListener('scroll', updateButtons);
    
    // Inicializa o estado dos botões ao carregar a página e redimensionar
    window.addEventListener('load', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons(); 
}
