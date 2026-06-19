// ── Som ──
const audio = document.getElementById('audio-trilha');
const btnSom = document.getElementById('btn-som-label');
let somTocando = false;

function toggleSom() {
    if (somTocando) {
        audio.pause();
        btnSom.textContent = '▶ Tocar Trilha';
    } else {
        audio.play().catch(() => {});
        btnSom.textContent = '■ Pausar Trilha';
    }
    somTocando = !somTocando;
}

// ── Lightbox ──
function abrirLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('aberto');
    document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
    document.getElementById('lightbox').classList.remove('aberto');
    document.body.style.overflow = '';
}

// Teclado: Esc fecha lightbox e easter egg
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { fecharLightbox(); fecharKonami(); }
});

// Galeria: teclado Enter/Espaço abre lightbox
document.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') item.click();
    });
});

// ── Comprar ──
function comprar(produto, preco) {
    alert(`🛒 Adicionado ao carrinho!\n\n${produto}\nR$ ${preco.toFixed(2)}\n\n(Loja real em breve, por enquanto é só o Pablo aqui 😅)`);
}

// ── Formulário ──
function enviarForm() {
    const nome = document.getElementById('campo-nome').value.trim();
    const email = document.getElementById('campo-email').value.trim();
    const msg = document.getElementById('campo-msg').value.trim();

    if (!nome || !email || !msg) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    if (!email.includes('@')) {
        alert('Insira um e-mail válido!');
        return;
    }

    document.getElementById('form-contato').style.display = 'none';
    document.getElementById('msg-enviado').style.display = 'block';
}

// ── Barra de estoque animada ──
setTimeout(() => {
    document.getElementById('barra-estoque').style.width = '23%';
}, 600);

// ── Konami Code ──
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;

document.addEventListener('keydown', e => {
    if (e.key === KONAMI[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) {
            document.getElementById('konami-msg').style.display = 'block';
            konamiIdx = 0;
        }
    } else {
        konamiIdx = 0;
    }
});

function fecharKonami() {
    document.getElementById('konami-msg').style.display = 'none';
}
