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

// 2. Evento para fechar o modal
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


// =================== LÓGICA DO CARROSSEL ===================

const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (track) {
    let currentIndex = 0;
    const items = document.querySelectorAll('.cardapio .item');
    const totalItems = items.length;
    
    if (totalItems === 0) return;

    function getItemFullWidth() {
        const itemWidth = items[0].offsetWidth; 
        const gap = 30; // Gap definido no CSS
        return itemWidth + gap;
    }

    function getItemsVisible() {
        const containerWidth = track.parentElement.offsetWidth;
        const itemWidth = getItemFullWidth();
        return Math.floor(containerWidth / itemWidth);
    }

    function updateButtons() {
        const itemsVisible = getItemsVisible();
        
        prevBtn.disabled = currentIndex === 0;
        
        // Desabilita "Próximo" se estivermos no último slide possível
        nextBtn.disabled = currentIndex >= totalItems - itemsVisible;
    }

    function moveToSlide(newIndex) {
        const itemsVisible = getItemsVisible();
        
        // Limita o índice para que o carrossel não deslize para o vazio
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex > totalItems - itemsVisible) {
            newIndex = totalItems - itemsVisible;
        }

        currentIndex = newIndex;
        
        // Calcula o deslocamento total
        const offset = -currentIndex * getItemFullWidth();
        track.style.transform = `translateX(${offset}px)`;
        
        updateButtons();
    }
    
    // Configuração inicial
    updateButtons();

    // Eventos de clique
    nextBtn.addEventListener('click', () => {
        // Avança apenas 1 item por clique
        moveToSlide(currentIndex + 1); 
    });

    prevBtn.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });
    
    // Recalcula o carrossel ao redimensionar a tela
    window.addEventListener('resize', () => {
        moveToSlide(currentIndex); 
    });
}
