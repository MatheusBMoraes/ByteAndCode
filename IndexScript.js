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
start.textContent = "START";
start.style.boxShadow = "0 0 25px orange";
start.style.border = "3px solid orange";

const finish = document.getElementById("casa30");
finish.textContent = "FINISH";
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
