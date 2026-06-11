let solo = 70;
let agua = 70;
let bio = 10;
let pontos = 0;

let modo = "plantar";

const grid = document.getElementById("grid");

// cria mapa
for (let i = 0; i < 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.state = "vazio";
  cell.innerHTML = "🌱";

  cell.addEventListener("click", () => usarCelula(cell));

  grid.appendChild(cell);
}

function usarCelula(cell) {
  if (modo === "plantar") plantar(cell);
  if (modo === "cortar") cortar(cell);
}

function plantar(cell) {
  if (cell.dataset.state === "arvore") return;

  if (solo <= 0 || agua <= 0) {
    msg("Recursos baixos! regenere o sistema 🌿");
    return;
  }

  cell.dataset.state = "arvore";
  cell.innerHTML = "🌳";

  solo -= 3;
  agua -= 2;
  bio += 1;
  pontos += 2;

  msg("Árvore plantada 🌳");
  atualizar();
}

function cortar(cell) {
  if (cell.dataset.state === "arvore") {
    cell.dataset.state = "vazio";
    cell.innerHTML = "🌱";

    solo += 2;
    bio -= 1;
    pontos -= 1;

    msg("Árvore removida 🪓");
    atualizar();
  }
}

function eventoClima() {
  const eventos = [
    "chuva",
    "seca",
    "equilibrio"
  ];

  const ev = eventos[Math.floor(Math.random() * eventos.length)];

  if (ev === "chuva") {
    agua += 15;
    msg("🌧️ Chuva forte aumentou a água!");
  }

  if (ev === "seca") {
    agua -= 20;
    solo -= 10;
    msg("🔥 Seca reduziu recursos!");
  }

  if (ev === "equilibrio") {
    solo += 5;
    agua += 5;
    bio += 2;
    msg("🌿 Natureza em equilíbrio!");
  }

  atualizar();
}

function atualizar() {
  solo = Math.max(0, solo);
  agua = Math.max(0, agua);
  bio = Math.max(0, bio);

  document.getElementById("solo").textContent = solo;
  document.getElementById("agua").textContent = agua;
  document.getElementById("bio").textContent = bio;
  document.getElementById("pontos").textContent = pontos;
}

function msg(texto) {
  document.getElementById("msg").textContent = texto;
}
