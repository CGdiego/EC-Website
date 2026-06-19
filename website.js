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

// ── Comprar ──
function comprar(produto, preco) {
    alert('🛒 Adicionado ao carrinho!\n\n' + produto + '\nR$ ' + preco.toFixed(2) + '\n\n(Loja real em breve, por enquanto é só o Pablo aqui 😅)');
}

// ── Formulário ──
function enviarForm() {
    const nome  = document.getElementById('campo-nome').value.trim();
    const email = document.getElementById('campo-email').value.trim();
    const msg   = document.getElementById('campo-msg').value.trim();

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
setTimeout(function() {
    document.getElementById('barra-estoque').style.width = '23%';
}, 600);

// ── Konami Code ──
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;

function fecharKonami() {
    document.getElementById('konami-msg').style.display = 'none';
}

// ── Slideshow ──
const slides = [
    {
        src: 'https://preview.redd.it/pablo-album-art-v0-zytgyqz2y8yf1.jpeg?width=1080&crop=smart&auto=webp&s=228464cd4f8d2ca7454959e54d210149cc8eacba',
        caption: 'Tela Título'
    },
    {
        src: 'https://img.itch.zone/aW1hZ2UvNDQ1NTk3NS8yNjU4MDI5MC5wbmc=/original/z8o%2FOl.png',
        caption: 'Gameplay'
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHP3w4doDILCjb8HBfhw1ww2dlm8-WWuw9ZA&s',
        caption: 'Boss Fight'
    },
    {
        src: 'https://preview.redd.it/how-does-everyone-feel-about-hollow-knight-pablos-combat-v0-xh0ywv9atzqf1.png?auto=webp&s=77ef23121871df8e6c3455e2a5cf48c094d1dc75',
        caption: 'Combate — mais Gameplay'
    },
    {
        src: 'https://images.cults3d.com/cdBtHDVY7ukn4iH89-gBBBrw8PI=/516x516/filters:no_upscale()/https://fbi.cults3d.com/uploaders/17154805/illustration-file/2bafd89a-f1fe-4490-94ab-6d0c796ef2a7/00.png',
        caption: 'Pablo 3D'
    }
];
let slideAtual = 0;

function renderSlide() {
    const img = document.getElementById('slide-img');
    img.style.opacity = '0';
    setTimeout(function() {
        img.src = slides[slideAtual].src;
        img.alt = slides[slideAtual].caption;
        img.style.opacity = '1';
    }, 180);
    document.getElementById('slide-caption').textContent = slides[slideAtual].caption;
    document.getElementById('slide-contador').textContent = (slideAtual + 1) + ' / ' + slides.length;
    document.querySelectorAll('.slide-thumb').forEach(function(t, i) {
        t.classList.toggle('ativo', i === slideAtual);
    });
}

function moverSlide(dir) {
    slideAtual = (slideAtual + dir + slides.length) % slides.length;
    renderSlide();
}

// Miniaturas geradas dinamicamente
(function buildThumbs() {
    const container = document.getElementById('slide-thumbs');
    slides.forEach(function(s, i) {
        const img = document.createElement('img');
        img.src = s.src;
        img.alt = s.caption;
        img.className = 'slide-thumb' + (i === 0 ? ' ativo' : '');
        img.onclick = function() { slideAtual = i; renderSlide(); };
        container.appendChild(img);
    });
})();

// Teclado global: Esc, setas do slideshow, Konami
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape')       { fecharLightbox(); fecharKonami(); }
    if (e.key === 'ArrowLeft')    { moverSlide(-1); }
    if (e.key === 'ArrowRight')   { moverSlide(1); }

    // Konami Code
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
