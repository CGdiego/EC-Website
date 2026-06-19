// ════════════════════════════════════════════
// VARIÁVEIS GLOBAIS E ESTADO
// ════════════════════════════════════════════
const audio = document.getElementById('audio-trilha');
const btnSom = document.getElementById('btn-som-label');
let somTocando = false;

let carrinho = []; // { produto, preco }
let cupomAplicado = null; // { codigo, desconto }

// ════════════════════════════════════════════
// TOAST (notificação flutuante)
// ════════════════════════════════════════════
let toastTimeout = null;
function mostrarToast(texto) {
    const toast = document.getElementById('toast');
    toast.textContent = texto;
    toast.classList.add('visivel');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function() {
        toast.classList.remove('visivel');
    }, 2600);
}

// ════════════════════════════════════════════
// TEMA (CRT Azul / CRT Verde)
// ════════════════════════════════════════════
function alternarTema() {
    document.body.classList.toggle('tema-verde');
    const ativo = document.body.classList.contains('tema-verde');
    mostrarToast(ativo ? '🎨 Tema CRT Verde ativado' : '🎨 Tema Neon Azul ativado');
}

// ════════════════════════════════════════════
// SOM
// ════════════════════════════════════════════
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

function ajustarVolume(valor) {
    audio.volume = valor / 100;
}
audio.volume = 0.6; // valor inicial sincronizado com o slider (60)

// ════════════════════════════════════════════
// LIGHTBOX
// ════════════════════════════════════════════
function abrirLightbox(src, legenda) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox-img').alt = legenda || 'Imagem ampliada';
    document.getElementById('lightbox-caption').textContent = legenda || '';
    document.getElementById('lightbox').classList.add('aberto');
    document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
    document.getElementById('lightbox').classList.remove('aberto');
    // Só libera o scroll se nenhum outro modal estiver aberto
    if (!document.getElementById('modal-carrinho').classList.contains('aberto')) {
        document.body.style.overflow = '';
    }
}

// Impede que clicar na imagem (dentro do lightbox) feche o modal por engano
document.getElementById('lightbox-img').addEventListener('click', function(e) {
    e.stopPropagation();
});

// ════════════════════════════════════════════
// CARRINHO DE COMPRAS
// ════════════════════════════════════════════
function adicionarCarrinho(produto, preco) {
    carrinho.push({ produto: produto, preco: preco });
    atualizarContadorCarrinho();
    mostrarToast('🛒 ' + produto + ' adicionado ao carrinho!');
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarContadorCarrinho();
    renderizarCarrinho();
}

function atualizarContadorCarrinho() {
    document.getElementById('carrinho-contador').textContent = carrinho.length;
}

function calcularTotal() {
    let total = carrinho.reduce(function(soma, item) { return soma + item.preco; }, 0);
    if (cupomAplicado) {
        total = total * (1 - cupomAplicado.desconto);
    }
    return total;
}

function renderizarCarrinho() {
    const container = document.getElementById('carrinho-itens');
    const vazio = document.getElementById('carrinho-vazio');
    const btnFinalizar = document.getElementById('btn-finalizar');
    container.innerHTML = '';

    if (carrinho.length === 0) {
        vazio.style.display = 'block';
        btnFinalizar.style.display = 'none';
    } else {
        vazio.style.display = 'none';
        btnFinalizar.style.display = 'block';
        carrinho.forEach(function(item, i) {
            const div = document.createElement('div');
            div.className = 'carrinho-item';
            div.innerHTML =
                '<span class="carrinho-item-info">' + item.produto + '</span>' +
                '<span class="carrinho-item-preco">R$ ' + item.preco.toFixed(2).replace('.', ',') + '</span>' +
                '<button class="carrinho-item-remover" aria-label="Remover ' + item.produto + '">✕</button>';
            div.querySelector('.carrinho-item-remover').addEventListener('click', function() {
                removerDoCarrinho(i);
            });
            container.appendChild(div);
        });
    }

    const total = calcularTotal();
    document.getElementById('carrinho-total-valor').textContent =
        'R$ ' + total.toFixed(2).replace('.', ',');
}

function abrirCarrinho() {
    renderizarCarrinho();
    document.getElementById('modal-carrinho').classList.add('aberto');
    document.body.style.overflow = 'hidden';
}

function fecharCarrinho() {
    document.getElementById('modal-carrinho').classList.remove('aberto');
    if (!document.getElementById('lightbox').classList.contains('aberto')) {
        document.body.style.overflow = '';
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) return;
    const total = calcularTotal();
    mostrarToast('✓ Pedido confirmado! Total: R$ ' + total.toFixed(2).replace('.', ','));
    carrinho = [];
    cupomAplicado = null;
    atualizarContadorCarrinho();
    fecharCarrinho();
}

// Fecha modal do carrinho clicando fora do conteúdo
document.getElementById('modal-carrinho').addEventListener('click', function(e) {
    if (e.target.id === 'modal-carrinho') fecharCarrinho();
});

// ════════════════════════════════════════════
// CUPOM DE DESCONTO
// ════════════════════════════════════════════
const CUPONS_VALIDOS = {
    'PABLO10': 0.10,
    'HOLLOW20': 0.20,
    'N64RETRO': 0.15
};

function aplicarCupom() {
    const campo = document.getElementById('campo-cupom');
    const msg = document.getElementById('cupom-msg');
    const codigo = campo.value.trim().toUpperCase();

    if (!codigo) {
        msg.textContent = 'Digite um código de cupom.';
        msg.className = 'erro';
        return;
    }

    if (CUPONS_VALIDOS[codigo]) {
        cupomAplicado = { codigo: codigo, desconto: CUPONS_VALIDOS[codigo] };
        msg.textContent = '✓ Cupom aplicado: ' + (CUPONS_VALIDOS[codigo] * 100) + '% de desconto!';
        msg.className = 'sucesso';
        mostrarToast('🎟 Cupom ' + codigo + ' aplicado!');
    } else {
        cupomAplicado = null;
        msg.textContent = '✕ Cupom inválido. Tente PABLO10, HOLLOW20 ou N64RETRO.';
        msg.className = 'erro';
    }
}

// ════════════════════════════════════════════
// FORMULÁRIO DE CONTATO (com validação visual)
// ════════════════════════════════════════════
const campoMsg = document.getElementById('campo-msg');
const contadorMsg = document.getElementById('contador-msg');

campoMsg.addEventListener('input', function() {
    contadorMsg.textContent = campoMsg.value.length;
});

function limparErros() {
    ['nome', 'email', 'msg'].forEach(function(id) {
        document.getElementById('erro-' + id).textContent = '';
        document.getElementById('campo-' + id).classList.remove('campo-invalido');
    });
}

function enviarForm() {
    limparErros();

    const nomeEl = document.getElementById('campo-nome');
    const emailEl = document.getElementById('campo-email');
    const msgEl = document.getElementById('campo-msg');

    const nome = nomeEl.value.trim();
    const email = emailEl.value.trim();
    const msg = msgEl.value.trim();

    let valido = true;

    if (!nome) {
        document.getElementById('erro-nome').textContent = 'Por favor, informe seu nome.';
        nomeEl.classList.add('campo-invalido');
        valido = false;
    }

    // Regex simples para validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('erro-email').textContent = 'Por favor, informe seu e-mail.';
        emailEl.classList.add('campo-invalido');
        valido = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('erro-email').textContent = 'Insira um e-mail válido (ex: nome@email.com).';
        emailEl.classList.add('campo-invalido');
        valido = false;
    }

    if (!msg) {
        document.getElementById('erro-msg').textContent = 'Escreva uma mensagem antes de enviar.';
        msgEl.classList.add('campo-invalido');
        valido = false;
    }

    if (!valido) return;

    document.getElementById('form-contato').style.display = 'none';
    document.getElementById('msg-enviado').style.display = 'block';
    mostrarToast('✓ Mensagem enviada com sucesso!');
}

// ════════════════════════════════════════════
// BARRA DE ESTOQUE ANIMADA
// ════════════════════════════════════════════
setTimeout(function() {
    document.getElementById('barra-estoque').style.width = '23%';
}, 600);

// ════════════════════════════════════════════
// CONTADORES ANIMADOS (estatísticas do jogo)
// ════════════════════════════════════════════
function animarContadores() {
    const numeros = document.querySelectorAll('.stat-numero');
    numeros.forEach(function(el) {
        const alvo = parseInt(el.dataset.target, 10);
        let atual = 0;
        const incremento = Math.max(1, Math.ceil(alvo / 40));
        const intervalo = setInterval(function() {
            atual += incremento;
            if (atual >= alvo) {
                atual = alvo;
                clearInterval(intervalo);
            }
            el.textContent = atual;
        }, 30);
    });
}

// Dispara a animação quando a seção de estatísticas entra na tela
const statsSection = document.querySelector('.stats-grid');
if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animarContadores();
                observer.disconnect();
            }
        });
    }, { threshold: 0.4 });
    observer.observe(statsSection);
} else if (statsSection) {
    // Fallback para navegadores sem suporte a IntersectionObserver
    animarContadores();
}

// ════════════════════════════════════════════
// KONAMI CODE
// ════════════════════════════════════════════
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;

function fecharKonami() {
    document.getElementById('konami-msg').style.display = 'none';
}

// ════════════════════════════════════════════
// SLIDESHOW
// ════════════════════════════════════════════
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
let autoplayAtivo = false;
let autoplayIntervalo = null;

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

function toggleAutoplay() {
    const btn = document.getElementById('btn-autoplay');
    autoplayAtivo = !autoplayAtivo;

    if (autoplayAtivo) {
        btn.textContent = '⏸ Auto';
        btn.classList.add('ativo');
        autoplayIntervalo = setInterval(function() { moverSlide(1); }, 3500);
    } else {
        btn.textContent = '⏵ Auto';
        btn.classList.remove('ativo');
        clearInterval(autoplayIntervalo);
    }
}

// Pausa o autoplay automaticamente se o usuário navegar manualmente pelas setas/teclado
function pausarAutoplaySeAtivo() {
    if (autoplayAtivo) toggleAutoplay();
}

// Miniaturas geradas dinamicamente
(function buildThumbs() {
    const container = document.getElementById('slide-thumbs');
    slides.forEach(function(s, i) {
        const img = document.createElement('img');
        img.src = s.src;
        img.alt = s.caption;
        img.className = 'slide-thumb' + (i === 0 ? ' ativo' : '');
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'Ver imagem: ' + s.caption);
        img.onclick = function() { slideAtual = i; renderSlide(); pausarAutoplaySeAtivo(); };
        img.onkeydown = function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                slideAtual = i;
                renderSlide();
                pausarAutoplaySeAtivo();
            }
        };
        container.appendChild(img);
    });
})();

// ════════════════════════════════════════════
// QUIZ "QUAL INSETO POLIGONAL VOCÊ É?"
// ════════════════════════════════════════════
const respostasQuiz = [];

const RESULTADOS_QUIZ = {
    guerreiro: {
        titulo: '🗡 Você é um Cavaleiro de Combate!',
        texto: 'Direto, corajoso e sempre pronto pra luta. Você encara os chefões de frente e não foge do perigo. Hallownest precisa de guerreiros como você.'
    },
    estrategista: {
        titulo: '📖 Você é um Sábio Estudioso!',
        texto: 'Observador e paciente, você prefere entender os padrões antes de agir. Sua inteligência é sua maior arma em Hallownest.'
    },
    fujao: {
        titulo: '🌑 Você é um Andarilho das Sombras!',
        texto: 'Discreto e ágil, você prefere evitar o confronto direto e encontrar outros caminhos. As sombras de Hallownest são seu verdadeiro lar.'
    }
};

function atualizarDotsQuiz(perguntaAtual) {
    document.querySelectorAll('.quiz-dot').forEach(function(dot, i) {
        dot.classList.remove('ativo', 'completo');
        if (i < perguntaAtual) dot.classList.add('completo');
        else if (i === perguntaAtual) dot.classList.add('ativo');
    });
}

function responderQuiz(pergunta, tipo) {
    respostasQuiz[pergunta] = tipo;

    const proxima = pergunta + 1;
    document.querySelector('[data-pergunta="' + pergunta + '"]').classList.add('oculto');

    if (proxima < 3) {
        document.querySelector('[data-pergunta="' + proxima + '"]').classList.remove('oculto');
        atualizarDotsQuiz(proxima);
    } else {
        // Calcula o tipo mais frequente entre as respostas
        const contagem = {};
        respostasQuiz.forEach(function(r) { contagem[r] = (contagem[r] || 0) + 1; });
        let tipoFinal = respostasQuiz[0];
        let maior = 0;
        Object.keys(contagem).forEach(function(k) {
            if (contagem[k] > maior) { maior = contagem[k]; tipoFinal = k; }
        });

        const resultado = RESULTADOS_QUIZ[tipoFinal];
        document.getElementById('quiz-resultado-titulo').textContent = resultado.titulo;
        document.getElementById('quiz-resultado-texto').textContent = resultado.texto;
        document.getElementById('quiz-resultado').classList.remove('oculto');
        document.querySelectorAll('.quiz-dot').forEach(function(dot) {
            dot.classList.remove('ativo');
            dot.classList.add('completo');
        });
    }
}

function reiniciarQuiz() {
    respostasQuiz.length = 0;
    document.getElementById('quiz-resultado').classList.add('oculto');
    document.querySelectorAll('.quiz-pergunta').forEach(function(p, i) {
        p.classList.toggle('oculto', i !== 0);
    });
    atualizarDotsQuiz(0);
}

atualizarDotsQuiz(0);

// ════════════════════════════════════════════
// BOTÃO VOLTAR AO TOPO
// ════════════════════════════════════════════
const btnTopo = document.getElementById('btn-topo');

window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
        btnTopo.classList.add('visivel');
    } else {
        btnTopo.classList.remove('visivel');
    }
});

function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ════════════════════════════════════════════
// TECLADO GLOBAL: Esc, setas do slideshow, Konami
// ════════════════════════════════════════════
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharLightbox();
        fecharKonami();
        fecharCarrinho();
    }

    // Setas só controlam o slideshow quando nenhum modal está aberto
    // e o foco não está em um campo de formulário (evita conflito com inputs)
    const tag = document.activeElement ? document.activeElement.tagName : '';
    const modalAberto = document.getElementById('lightbox').classList.contains('aberto') ||
                         document.getElementById('modal-carrinho').classList.contains('aberto');

    if (!modalAberto && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        if (e.key === 'ArrowLeft')  { moverSlide(-1); pausarAutoplaySeAtivo(); }
        if (e.key === 'ArrowRight') { moverSlide(1); pausarAutoplaySeAtivo(); }
    }

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
