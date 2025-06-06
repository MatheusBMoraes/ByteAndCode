for (let i = 0; i <= 30; i++) {
  let casa = document.createElement("div");
  casa.className = "casa";
  casa.id = "casa" + i;
  casa.textContent = i;
  document.getElementById("tabuleiro").appendChild(casa);
}

const start = document.getElementById("casa0");
start.innerHTML = '<span class="casa-label">START</span>';
start.style.boxShadow = "0 0 25px orange";
start.style.border = "3px solid orange";

const finish = document.getElementById("casa30");
finish.innerHTML = '<span class="casa-label">FINISH</span>';
finish.style.boxShadow = "0 0 25px orange";
finish.style.border = "3px solid orange";

const casasChefes = [5, 10, 19, 23, 29];
casasChefes.forEach((casa) => {
  const casaElement = document.getElementById("casa" + casa);
  casaElement.style.boxShadow = "0 0 25px red";
  casaElement.style.border = "3px solid red";
  casaElement.textContent = "👹";
});

const casasPremios = [3, 7, 12, 15, 20, 25];
casasPremios.forEach((casa) => {
  const casaElement = document.getElementById("casa" + casa);
  casaElement.style.boxShadow = "0 0 25px blue";
  casaElement.style.border = "3px solid blue";
  casaElement.textContent = "🛡️";
});

const casasPenalidades = [2, 8, 14, 18, 22, 27];
casasPenalidades.forEach((casa) => {
  const casaElement = document.getElementById("casa" + casa);
  casaElement.style.boxShadow = "0 0 25px yellow";
  casaElement.style.border = "3px solid yellow";
  casaElement.textContent = "⚠️";
});

const casasSemEfeito = [1, 4, 6, 9, 11, 13, 16, 17, 21, 24, 26, 28];
casasSemEfeito.forEach((casa) => {
  const casaElement = document.getElementById("casa" + casa);
  casaElement.style.boxShadow = "0 0 25px lightgray";
  casaElement.style.border = "3px solid lightgray";
});

const jogadores = [
  { cor: "red", pos: 0, nome: "Player 1", firewall: false },
  { cor: "blue", pos: 0, nome: "Player 2", firewall: false },
  { cor: "green", pos: 0, nome: "Player 3", firewall: false },
  { cor: "yellow", pos: 0, nome: "Player 4", firewall: false },
];

jogadores.forEach((jogador, idx) => {
  const peao = document.createElement("div");
  peao.className = "peao";
  peao.style.background = jogador.cor;
  peao.id = "peao" + idx;
  peao.title = jogador.nome;
  let casa0 = document.getElementById("casa0");
  let containerPeoes = casa0.querySelector(".peoes-container");
  if (!containerPeoes) {
    containerPeoes = document.createElement("div");
    containerPeoes.className = "peoes-container";
    containerPeoes.style.display = "flex";
    containerPeoes.style.justifyContent = "center";
    containerPeoes.style.alignItems = "flex-end";
    containerPeoes.style.gap = "6px";
    containerPeoes.style.width = "100%";
    containerPeoes.style.position = "absolute";
    containerPeoes.style.bottom = "18px";
    containerPeoes.style.left = "0";
    casa0.appendChild(containerPeoes);
  }
  containerPeoes.appendChild(peao);
});

const infDiv = document.querySelector(".inf") || document.body;

let userDiv = document.querySelector(".inf .user");
if (!userDiv) {
  userDiv = document.createElement("div");
  userDiv.className = "user";
  infDiv.appendChild(userDiv);
}

let dadoDiv = document.createElement("div");
dadoDiv.className = "dado";

let btn = document.createElement("button");
btn.className = "dado-botao";
btn.innerHTML = "🎲";
btn.title = "Roll Dice";
btn.onpointerdown = () => btn.classList.add("ativo");
btn.onpointerup = btn.onmouseleave = () => btn.classList.remove("ativo");
dadoDiv.appendChild(btn);
let valorDadoSpan = document.createElement("span");
valorDadoSpan.className = "valor-dado";
dadoDiv.appendChild(valorDadoSpan);

const dadoAntigo = document.querySelector(".inf .dado");
if (dadoAntigo) dadoAntigo.remove();
infDiv.appendChild(dadoDiv);

const facesDado = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

let vez = 0;
let animando = false;

function atualizarJogadorAtual() {
  const h1Jogador = document.querySelector(".inf .user h1");
  if (h1Jogador) {
    h1Jogador.innerHTML = `Turn: <span style="color:${jogadores[vez].cor};text-shadow:1px 1px 2px #000;">${jogadores[vez].nome}</span>`;
  }
}
atualizarJogadorAtual();

function garantirLabelCasa(pos, label) {
  const casa = document.getElementById("casa" + pos);
  if (!casa) return;
  let labelEl = casa.querySelector(".casa-label");
  if (!labelEl) {
    labelEl = document.createElement("span");
    labelEl.className = "casa-label";
    labelEl.textContent = label;
    casa.insertBefore(labelEl, casa.firstChild);
  }
  let containerPeoes = casa.querySelector(".peoes-container");
  if (!containerPeoes) {
    containerPeoes = document.createElement("div");
    containerPeoes.className = "peoes-container";
    containerPeoes.style.display = "flex";
    containerPeoes.style.justifyContent = "center";
    containerPeoes.style.alignItems = "flex-end";
    containerPeoes.style.gap = "6px";
    containerPeoes.style.width = "100%";
    containerPeoes.style.position = "absolute";
    containerPeoes.style.bottom = "18px";
    containerPeoes.style.left = "0";
    casa.appendChild(containerPeoes);
  }
}

btn.onclick = function () {
  if (animando) return;
  animando = true;
  btn.style.transform = "scale(1.18) rotate(-10deg)";
  setTimeout(() => (btn.style.transform = ""), 200);
  const valor = Math.floor(Math.random() * 6) + 1;
  btn.innerHTML = facesDado[valor - 1];
  btn.title = `Dice: ${valor}`;
  valorDadoSpan.innerHTML = `<span style="font-size:1.2rem;font-family:inherit;vertical-align:middle;">You rolled </span><span style="font-family:'PT Serif',serif;font-size:3rem;">${valor}</span>`;
  let jogador = jogadores[vez];
  let peao = document.getElementById("peao" + vez);
  let posAntiga = jogador.pos;

  // Prevent passing boss spaces without defeating the boss
  const bossSpaces = [5, 10, 19, 23, 29];
  let nextBoss = bossSpaces.find((boss) => boss > posAntiga);
  let maxAdvance = nextBoss !== undefined ? nextBoss : 30;
  let tentativaPos = Math.min(jogador.pos + valor, 30);
  // If player would pass a boss space without being exactly on it, stop at the boss
  let novaPos = tentativaPos;
  if (nextBoss !== undefined && tentativaPos > nextBoss && posAntiga < nextBoss) {
    novaPos = nextBoss;
  }
  jogador.pos = novaPos;
  setTimeout(() => {
    let casaAntiga = document.getElementById("casa" + posAntiga);
    let containerAntigo = casaAntiga
      ? casaAntiga.querySelector(".peoes-container")
      : null;
    if (containerAntigo && containerAntigo.contains(peao)) {
      containerAntigo.removeChild(peao);
    }
    if (posAntiga === 0) garantirLabelCasa(0, "START");
    if (posAntiga === 30) garantirLabelCasa(30, "FINISH");
    let casaNova = document.getElementById("casa" + novaPos);
    let containerNovo = casaNova.querySelector(".peoes-container");
    if (!containerNovo) {
      containerNovo = document.createElement("div");
      containerNovo.className = "peoes-container";
      containerNovo.style.display = "flex";
      containerNovo.style.justifyContent = "center";
      containerNovo.style.alignItems = "flex-end";
      containerNovo.style.gap = "6px";
      containerNovo.style.width = "100%";
      containerNovo.style.position = "absolute";
      containerNovo.style.bottom = "18px";
      containerNovo.style.left = "0";
      casaNova.appendChild(containerNovo);
    }
    peao.animate(
      [
        { transform: "scale(1.2)", filter: "brightness(1.2)" },
        { transform: "scale(1)", filter: "brightness(1)" },
      ],
      { duration: 350, easing: "cubic-bezier(.4,2,.6,1)" }
    );
    containerNovo.appendChild(peao);

    if ([3, 7, 12, 15, 20, 25].includes(novaPos)) {
      jogador.firewall = true;
      alert(
        `${jogador.nome} received a FIREWALL! You will be protected in your next boss battle.`
      );
    }

    if ([5, 10, 19, 23, 29].includes(novaPos)) {
      // Open boss fight popup or window
      window.open(`chefes/chefe1/chefe.html?player=${encodeURIComponent(jogador.nome)}&color=${encodeURIComponent(jogador.cor)}&firewall=${jogador.firewall ? 1 : 0}&boss=${novaPos}`, '_blank', 'width=700,height=700');
      // Pause turn advancement until boss fight is resolved
      animando = false;
      return;
    }

    if ([2, 8, 14, 18, 22, 27].includes(novaPos)) {
      const penalidade = Math.floor(Math.random() * 6) + 1;
      let posPenal = Math.max(0, jogador.pos - penalidade);
      setTimeout(() => {
        let containerAtual = casaNova.querySelector(".peoes-container");
        if (containerAtual && containerAtual.contains(peao)) {
          containerAtual.removeChild(peao);
        }
        let casaPenal = document.getElementById("casa" + posPenal);
        let containerPenal = casaPenal.querySelector(".peoes-container");
        if (!containerPenal) {
          containerPenal = document.createElement("div");
          containerPenal.className = "peoes-container";
          containerPenal.style.display = "flex";
          containerPenal.style.justifyContent = "center";
          containerPenal.style.alignItems = "flex-end";
          containerPenal.style.gap = "6px";
          containerPenal.style.width = "100%";
          containerPenal.style.position = "absolute";
          containerPenal.style.bottom = "18px";
          containerPenal.style.left = "0";
          casaPenal.appendChild(containerPenal);
        }
        containerPenal.appendChild(peao);
        jogador.pos = posPenal;
        alert(
          `You were attacked by a virus! ${jogador.nome} must go back ${penalidade} spaces.`
        );
        vez = (vez + 1) % jogadores.length;
        atualizarJogadorAtual();
        animando = false;
        setTimeout(() => {
          btn.innerHTML = "🎲";
          btn.title = "Roll Dice";
          valorDadoSpan.textContent = "";
        }, 1200);
      }, 800);
    } else {
      vez = (vez + 1) % jogadores.length;
      atualizarJogadorAtual();
      animando = false;
      setTimeout(() => {
        btn.innerHTML = "🎲";
        btn.title = "Roll Dice";
        valorDadoSpan.textContent = "";
      }, 900);
    }
  }, 600);
};

window.addEventListener('message', function(event) {
  if (event.data && event.data.bossDefeated) {
    vez = (vez + 1) % jogadores.length;
    atualizarJogadorAtual();
    animando = false;
    setTimeout(() => {
      btn.innerHTML = "🎲";
      btn.title = "Roll Dice";
      valorDadoSpan.textContent = "";
    }, 900);
  }
});
