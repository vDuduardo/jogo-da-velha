const currentPlayer = document.querySelector(".currentPlayer");
const vencedor = document.querySelector(".vencedor");
let singleBoolean = false


function single(){
  init();
  document.getElementById("menu").style.display = "none"
  document.getElementById("game").style.display = "block"
  singleBoolean = true

}

function multi(){
  init();
  document.getElementById("menu").style.display = "none"
  document.getElementById("game").style.display = "block"
  singleBoolean = false

}

function sobre(){
  document.getElementById("menu").style.display = "none"
  document.getElementById("sobre").style.display = "block"
}

function voltar(){
  document.getElementById("menu").style.display = "block"
  document.getElementById("sobre").style.display = "none"
  document.getElementById("game").style.display = "none"
  document.getElementById("vencedor").style.display = "none"
  singleBoolean = false
}

function restart(){
  document.getElementById("game").style.display = "block"
  player = "X"
  init();
}

let selected;
let player = "X";

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
  selected = [];
  document.getElementById("vencedor").style.display = "none"
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;




  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

function bot(){
  const posicoesDisponiveis = [];
  document.querySelectorAll(".game button").forEach((item) => {
    if(item.innerHTML == ""){
      posicoesDisponiveis.push(item)
    }

  });

  const posicaoBot = Math.floor(
    Math.random() * posicoesDisponiveis.length

  );

  const index = posicoesDisponiveis[posicaoBot]
  index.innerHTML = player;
  index.removeEventListener("click", newMove);
  selected[index.getAttribute("data-i")] = player;
  
  
  setTimeout(() => {
    check();
  }, [100]);
  
  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

}


function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove);
  selected[index] = player;


  setTimeout(() => {
    check();
  }, [100]);

  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

}

function check() {
  let playerLastMove = player === "X" ? "O" : "X";
  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      document.getElementById("game").style.display = "none"
      document.getElementById("vencedor").style.display = "block"
      vencedor.innerHTML = "O JOGADOR '" + playerLastMove + "' GANHOU!";
   
      //  init();
      // voltar();
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    vencedor.innerHTML = "DEU EMPATE";
    document.getElementById("game").style.display = "none"
    document.getElementById("vencedor").style.display = "block"
    return;
  }

  if(player == "O" && singleBoolean == true){
    bot();
  }

}


function theme(a){
  if(a == 1){
    document.getElementById("page").style.color = "white"
    document.getElementById("page").style.backgroundColor = "black"
    document.getElementById("light").style.display = "inline"
    document.getElementById("night").style.display = "none"
    document.getElementById("link").style.display = "white"

  }

  if(a == 2){
    document.getElementById("page").style.color = "black"
    document.getElementById("page").style.backgroundColor = "white"
    document.getElementById("light").style.display = "none"
    document.getElementById("night").style.display = "inline"
    document.getElementById("link").style.color = "black"
  }

}
