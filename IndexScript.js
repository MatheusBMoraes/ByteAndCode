// CRIA AS CASAS DO TABULEIRO
for (let i = 0; i <= 30; i++) {
  let casa = document.createElement("div");
  casa.className = "casa";
  casa.id = "casa" + i;
  casa.textContent = i;
  document.getElementById("tabuleiro").appendChild(casa);
}

// CASAS DE INICIO E FIM
const start = document.getElementById("casa0");
start.innerHTML = '<span class="casa-label">START</span>';
start.style.boxShadow = "0 0 25px orange";
start.style.border = "3px solid orange";

const finish = document.getElementById("casa30");
finish.innerHTML = '<span class="casa-label">FINISH</span>';
finish.style.boxShadow = "0 0 25px orange";
finish.style.border = "3px solid orange";

// CASAS COM CHEFES
const casasChefes = [5, 10, 19, 23, 29];
casasChefes.forEach((casa) => {
  const casaElement = document.getElementById("casa" + casa);
  casaElement.style.boxShadow = "0 0 25px red";
  casaElement.style.border = "3px solid red";
  casaElement.textContent = "👹";
});

// CASAS COM PRÊMIOS
const casasPremios = [3, 7, 12, 15, 20, 25];
casasPremios.forEach((casa) => {
  const casaElement = document.getElementById("casa" + casa);
  casaElement.style.boxShadow = "0 0 25px blue";
  casaElement.style.border = "3px solid blue";
  casaElement.textContent = "🛡️";
});

// CASAS COM PENALIDADES
const casasPenalidades = [2, 8, 14, 18, 22, 27];
casasPenalidades.forEach((casa) => {
  const casaElement = document.getElementById("casa" + casa);
  casaElement.style.boxShadow = "0 0 25px yellow";
  casaElement.style.border = "3px solid yellow";
  casaElement.textContent = "⚠️";
});

// CASAS SEM EFEITO
const casasSemEfeito = [1, 4, 6, 9, 11, 13, 16, 17, 21, 24, 26, 28];
casasSemEfeito.forEach((casa) => {
  const casaElement = document.getElementById("casa" + casa);
  casaElement.style.boxShadow = "0 0 25px lightgray";
  casaElement.style.border = "3px solid lightgray";
});

// Jogadores
const jogadores = [
  { cor: 'red', pos: 0, nome: 'Jogador 1' },
  { cor: 'blue', pos: 0, nome: 'Jogador 2' },
  { cor: 'green', pos: 0, nome: 'Jogador 3' },
  { cor: 'yellow', pos: 0, nome: 'Jogador 4' }
];

// Cria peões dos jogadores
jogadores.forEach((jogador, idx) => {
  const peao = document.createElement('div');
  peao.className = 'peao';
  peao.style.background = jogador.cor;
  peao.id = 'peao' + idx;
  peao.title = jogador.nome;
  // Adiciona peão DEPOIS do label, mas EM UMA DIV container
  let casa0 = document.getElementById('casa0');
  let containerPeoes = casa0.querySelector('.peoes-container');
  if (!containerPeoes) {
    containerPeoes = document.createElement('div');
    containerPeoes.className = 'peoes-container';
    containerPeoes.style.display = 'flex';
    containerPeoes.style.justifyContent = 'center';
    containerPeoes.style.alignItems = 'flex-end';
    containerPeoes.style.gap = '6px';
    containerPeoes.style.width = '100%';
    containerPeoes.style.position = 'absolute';
    containerPeoes.style.bottom = '18px';
    containerPeoes.style.left = '0';
    casa0.appendChild(containerPeoes);
  }
  containerPeoes.appendChild(peao);
});

// Cria botão e dado
const infDiv = document.querySelector('.inf') || document.body;

// Seleciona ou cria a div do usuário (nome do jogador)
let userDiv = document.querySelector('.inf .user');
if (!userDiv) {
  userDiv = document.createElement('div');
  userDiv.className = 'user';
  infDiv.appendChild(userDiv);
}

// Cria a div do dado
let dadoDiv = document.createElement('div');
dadoDiv.className = 'dado';

let btn = document.createElement('button');
btn.className = 'dado-botao';
btn.innerHTML = '🎲';
btn.title = 'Jogar Dado';
btn.onpointerdown = () => btn.classList.add('ativo');
btn.onpointerup = btn.onmouseleave = () => btn.classList.remove('ativo');
dadoDiv.appendChild(btn);
// Mostra valor do dado
let valorDadoSpan = document.createElement('span');
valorDadoSpan.className = 'valor-dado';
dadoDiv.appendChild(valorDadoSpan);

// Remove dadoDiv antigo se houver
const dadoAntigo = document.querySelector('.inf .dado');
if (dadoAntigo) dadoAntigo.remove();
// Adiciona dadoDiv ao final da barra inferior
infDiv.appendChild(dadoDiv);

const facesDado = ['⚀','⚁','⚂','⚃','⚄','⚅'];

let vez = 0;
let animando = false;

// Atualiza o nome do jogador atual
function atualizarJogadorAtual() {
  const h1Jogador = document.querySelector('.inf .user h1');
  if (h1Jogador) {
    h1Jogador.innerHTML = `Vez de: <span style="color:${jogadores[vez].cor};text-shadow:1px 1px 2px #000;">${jogadores[vez].nome}</span>`;
  }
}
atualizarJogadorAtual();

// No movimento, sempre mantém o label como primeiro filho e peões no container
function garantirLabelCasa(pos, label) {
  const casa = document.getElementById('casa' + pos);
  if (!casa) return;
  let labelEl = casa.querySelector('.casa-label');
  if (!labelEl) {
    labelEl = document.createElement('span');
    labelEl.className = 'casa-label';
    labelEl.textContent = label;
    casa.insertBefore(labelEl, casa.firstChild);
  }
  let containerPeoes = casa.querySelector('.peoes-container');
  if (!containerPeoes) {
    containerPeoes = document.createElement('div');
    containerPeoes.className = 'peoes-container';
    containerPeoes.style.display = 'flex';
    containerPeoes.style.justifyContent = 'center';
    containerPeoes.style.alignItems = 'flex-end';
    containerPeoes.style.gap = '6px';
    containerPeoes.style.width = '100%';
    containerPeoes.style.position = 'absolute';
    containerPeoes.style.bottom = '18px';
    containerPeoes.style.left = '0';
    casa.appendChild(containerPeoes);
  }
}

btn.onclick = function() {
  if (animando) return;
  animando = true;
  btn.style.transform = 'scale(1.18) rotate(-10deg)';
  setTimeout(() => btn.style.transform = '', 200);
  const valor = Math.floor(Math.random() * 6) + 1;
  btn.innerHTML = facesDado[valor-1];
  btn.title = `Dado: ${valor}`;
  valorDadoSpan.innerHTML = `<span style=\"font-size:1.2rem;font-family:inherit;vertical-align:middle;\">Você tirou </span><span style=\"font-family:'PT Serif',serif;font-size:3rem;\">${valor}</span>`;
  let jogador = jogadores[vez];
  let peao = document.getElementById('peao' + vez);
  let posAntiga = jogador.pos;
  let novaPos = Math.min(jogador.pos + valor, 30);
  jogador.pos = novaPos;
  setTimeout(() => {
    // Remove peão da casa antiga
    let casaAntiga = document.getElementById('casa' + posAntiga);
    let containerAntigo = casaAntiga ? casaAntiga.querySelector('.peoes-container') : null;
    if (containerAntigo && containerAntigo.contains(peao)) {
      containerAntigo.removeChild(peao);
    }
    // Se for casa0 ou casa30, garante o label e container
    if (posAntiga === 0) garantirLabelCasa(0, 'START');
    if (posAntiga === 30) garantirLabelCasa(30, 'FINISH');
    // Adiciona peão na nova casa
    let casaNova = document.getElementById('casa' + novaPos);
    let containerNovo = casaNova.querySelector('.peoes-container');
    if (!containerNovo) {
      containerNovo = document.createElement('div');
      containerNovo.className = 'peoes-container';
      containerNovo.style.display = 'flex';
      containerNovo.style.justifyContent = 'center';
      containerNovo.style.alignItems = 'flex-end';
      containerNovo.style.gap = '6px';
      containerNovo.style.width = '100%';
      containerNovo.style.position = 'absolute';
      containerNovo.style.bottom = '18px';
      containerNovo.style.left = '0';
      casaNova.appendChild(containerNovo);
    }
    // Animação de chegada
    peao.animate([
      { transform: 'scale(1.2)', filter: 'brightness(1.2)' },
      { transform: 'scale(1)', filter: 'brightness(1)' }
    ], { duration: 350, easing: 'cubic-bezier(.4,2,.6,1)' });
    containerNovo.appendChild(peao);
    vez = (vez + 1) % jogadores.length;
    atualizarJogadorAtual();
    animando = false;
    // Volta o botão para emoji de dado
    setTimeout(() => {
      btn.innerHTML = '🎲';
      btn.title = 'Jogar Dado';
      valorDadoSpan.textContent = '';
    }, 900);
  }, 600);
};
