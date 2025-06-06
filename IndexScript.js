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
let dadoDiv = document.createElement('div');
dadoDiv.className = 'dado';
dadoDiv.style.margin = '2rem';
dadoDiv.style.fontSize = '2.5rem';
dadoDiv.style.fontWeight = 'bold';
dadoDiv.style.color = '#fff';
let btn = document.createElement('button');
btn.textContent = 'Jogar Dado';
btn.style.fontSize = '2rem';
btn.style.margin = '1rem';
btn.style.padding = '0.5rem 2rem';
btn.style.borderRadius = '10px';
btn.style.border = 'none';
btn.style.background = '#59189a';
btn.style.color = '#fff';
btn.style.cursor = 'pointer';
dadoDiv.appendChild(btn);
infDiv.appendChild(dadoDiv);

let vez = 0;
let animando = false;

// Atualiza o nome do jogador atual
function atualizarJogadorAtual() {
  const h1Jogador = document.querySelector('.inf .user h1');
  if (h1Jogador) {
    h1Jogador.textContent = `Vez de: ${jogadores[vez].nome}`;
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
  const valor = Math.floor(Math.random() * 6) + 1;
  dadoDiv.textContent = `Dado: ${valor}`;
  dadoDiv.appendChild(btn);
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
    containerNovo.appendChild(peao);
    vez = (vez + 1) % jogadores.length;
    atualizarJogadorAtual();
    animando = false;
  }, 600);
};
