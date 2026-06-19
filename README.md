<h1 align="center">Hollow Knight 3: Pablo — Edição N64</h1>

<p align="center">
  <img src="https://img.shields.io/badge/HTML-Structure-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML">
  <img src="https://img.shields.io/badge/CSS-Retro_UI-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS">
  <img src="https://img.shields.io/badge/JavaScript-Interactive-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Responsive-Mobile_Ready-00C853?style=flat" alt="Responsive">
  <img src="https://img.shields.io/badge/Accessibility-Keyboard_%26_ARIA-7B61FF?style=flat" alt="Accessibility">
  <img src="https://img.shields.io/badge/Status-Finished-success?style=flat" alt="Status">
</p>

<p align="center">
Um projeto web temático inspirado em <b>Hollow Knight</b> com estética retrô de Nintendo 64, recursos multimídia e interações desenvolvidas com HTML, CSS e JavaScript puro.
</p>

---

## Sobre o projeto

**Hollow Knight 3: Pablo — Edição N64** é uma página web criada como projeto acadêmico para demonstrar conceitos de desenvolvimento front-end utilizando apenas tecnologias base da web.

> ⚠️ **Projeto fictício e educacional.** "Hollow Knight 3: Pablo" não é um jogo real nem um produto oficial da Team Cherry — é uma paródia/conceito criado para fins de aprendizado. Como não existe gameplay real para capturar, as imagens da galeria foram reunidas de fan art, edições de comunidade e memes públicos sobre o "Pablo" (ver seção de [Créditos das imagens](#créditos-das-imagens)).

A proposta foi criar uma página com identidade visual forte, navegação simples e recursos interativos que deixassem a experiência mais divertida do que um site estático tradicional. Tudo foi construído separando estrutura (**HTML**), estilo (**CSS**) e comportamento (**JavaScript**).

---

## Recursos implementados

### Estrutura
- Header com identidade visual e skip link de acessibilidade
- Navegação por âncoras
- Organização semântica com `header`, `nav`, `main`, `section`, `footer`

### Visual
- Tema retrô inspirado em Nintendo 64
- Scanlines estilo CRT
- Sombras pixeladas e neon glow
- **Novo:** alternância entre tema Neon Azul e tema CRT Verde
- Responsividade para desktop e mobile

### Interatividade
- Galeria com slideshow (setas, teclado, miniaturas)
- **Novo:** avanço automático (autoplay) no slideshow, pausável
- Lightbox para ampliar imagens, com legenda
- Trilha sonora com play/pause
- **Novo:** controle de volume da trilha sonora
- Trailer incorporado via YouTube
- Barra de estoque animada
- **Novo:** carrinho de compras funcional (adicionar, remover, ver total, finalizar)
- **Novo:** sistema de cupom de desconto (`PABLO10`, `HOLLOW20`, `N64RETRO`)
- **Novo:** quiz "Qual inseto poligonal você é?" com resultado dinâmico
- **Novo:** contadores numéricos animados (estatísticas do jogo) que disparam ao entrar na tela
- **Novo:** botão flutuante "voltar ao topo"
- **Novo:** notificações toast para ações do usuário (compra, cupom, envio de formulário, troca de tema)
- Formulário com validação em tempo real e mensagens de erro por campo
- **Novo:** contador de caracteres na mensagem do formulário
- Easter Egg do Konami Code

### Acessibilidade
- `aria-label`, `role`, `aria-live`
- Navegação por teclado em toda a página (incluindo miniaturas da galeria)
- Skip link para pular direto ao conteúdo
- `prefers-reduced-motion`
- Textos alternativos em todas as imagens

---

## Tecnologias utilizadas

```txt
HTML5
CSS3
JavaScript (Vanilla)
GitHub Pages
VS Code
```

---

## Estrutura do projeto

```plaintext
EC-Website/
│
├── index.html
├── website.css
├── website.js
└── README.md
```

---

## Funcionalidades favoritas

🕹 Código Konami escondido
🎵 Trilha sonora retrô com controle de volume
🖼 Lightbox na galeria com autoplay
🛒 Carrinho de compras com cupom de desconto
📺 Trailer incorporado
📦 Estoque animado
🧠 Quiz de personalidade do inseto poligonal
🎨 Troca de tema CRT Verde / Neon Azul

---

## Como executar

1. Clone o repositório

```bash
git clone https://github.com/CGdiego/EC-Website.git
```

2. Abra:

```plaintext
index.html
```

ou publique usando GitHub Pages.

---

## Objetivo acadêmico

Este projeto foi desenvolvido para demonstrar:

- Estruturação de páginas web
- Separação entre HTML, CSS e JS
- Manipulação do DOM
- Interatividade no navegador
- Boas práticas básicas de acessibilidade
- Experiência do usuário

Seguindo os critérios da **Parte 1** — construir uma página web simples no Visual Studio Code, estudando os princípios de uma aplicação front-end — e da **Parte 2** — incrementar essa página com mais recursos (interação, imagens, som, vídeo) e estética visual, publicando o resultado no GitHub Pages.

---

## Créditos das imagens

Como "Pablo" é um conceito fictício sem gameplay real, as imagens usadas na galeria, capa e amiibo vêm de fan art e posts de comunidade encontrados publicamente em Reddit, itch.io e Cults3D. Elas são usadas **exclusivamente para fins educacionais e não comerciais**, sem nenhuma reivindicação de autoria por parte deste projeto. Os direitos pertencem aos respectivos criadores originais.

| Imagem | Fonte |
|---|---|
| Capa / Tela título | Reddit (r/HollowKnight, post sobre "Pablo") |
| Gameplay | itch.zone |
| Boss Fight | Google Images (cache) |
| Combate | Reddit (r/HollowKnight) |
| Pablo 3D / Amiibo | Cults3D — modelo de fã |

Se você é o autor de alguma dessas imagens e prefere que ela seja removida ou creditada de outra forma, abra uma *issue* no repositório.

---

## Créditos

Projeto desenvolvido por **Diego**.

*"↑↑↓↓←→←→BA"*
