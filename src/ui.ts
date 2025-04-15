import { baraja, Tablero, tablero } from "./modelo";
import { barajarCartas, voltearLaCarta, sePuedeVoltearLaCarta, sonPareja, parejaEncontrada, parejaNoEncontrada, esPartidaCompleta} from "./motor";

let intentos = 0;
const startGame = document.getElementById("startGame");
if ((startGame != null && startGame != undefined)){
startGame.addEventListener("click",  () => gameStart(tablero))
}

function gameStart(tablero:Tablero){
tablero.estadoPartida = "CeroCartasLevantadas";
tablero.cartas = barajarCartas(baraja);
}



export function revelarCarta(indice:number, imagenString: string){
const elemento = document.getElementById("slot" + (indice));

if (elemento != null && elemento instanceof HTMLImageElement){
elemento.src= imagenString
}}

export function resetearCarta(elemento: HTMLImageElement,elemento2: HTMLImageElement){
    setTimeout(() =>{
        elemento.src= "unflipped.png";
        elemento2.src= "unflipped.png";
    }, 1000
    )
    }

const funcionClickCarta = (tablero:Tablero, indice: number ) => {
if (sePuedeVoltearLaCarta(tablero, indice)) {
  voltearLaCarta(tablero, indice);
  const urlImagen = tablero.cartas[indice].imagen
  revelarCarta(indice, urlImagen)
  mirarSiEsLaSegundaCarta(tablero)
  intentosActualizados()
}
}
    
const mirarSiEsLaSegundaCarta = (tablero:Tablero) => {
  
  const indiceCartaA = tablero.indiceCartaVolteadaA
  const indiceCartaB = tablero.indiceCartaVolteadaB

if (indiceCartaA !== undefined && indiceCartaB !== undefined){
  intentos++
if (sonPareja(indiceCartaA, indiceCartaB, tablero)){

parejaEncontrada(tablero,indiceCartaA,indiceCartaB)
    if (esPartidaCompleta(tablero)){
      alert("Partida completa");
    }
} else {
  parejaNoEncontrada(tablero,indiceCartaA,indiceCartaB)
  mostrarCartasBocaAbajo(indiceCartaA, indiceCartaB)
}
}
}

for (let i=0; i<12 ; i++){
    const botonSlot1 = document.getElementById("slot"+i);
    if ((botonSlot1 != null && botonSlot1 != undefined && botonSlot1 instanceof HTMLImageElement)){
        botonSlot1.addEventListener("click", () => funcionClickCarta(tablero, i))
    } 
}

const mostrarCartasBocaAbajo = ( indiceA :number, indiceB : number) : void => {
    let elemento = document.getElementById("slot" + indiceA);
    let elemento2 = document.getElementById("slot" + indiceB);
    if (elemento != null && elemento != undefined && elemento instanceof HTMLImageElement){
        if(elemento2 != null && elemento2 != undefined && elemento2 instanceof HTMLImageElement)
    resetearCarta(elemento, elemento2)}
}

const intentosActualizados = ()=> {
    const elemento = document.getElementById("intentosActuales") 
    if (elemento != null && elemento != undefined){
    elemento.innerHTML = intentos.toString()
    }
}

const imgElements = document.querySelectorAll("img");

imgElements.forEach(imgElement => {
  imgElement.addEventListener("click", showHide);
});

function showHide(event: { target: any; }) {
  const imgElement = event.target;  // Get the clicked img element

  if (imgElement.classList.contains("fade-in")) {
    imgElement.classList.remove("fade-in");
    imgElement.classList.add("fade-out");
  } else {
    imgElement.classList.remove("fade-out");
    imgElement.classList.add("fade-in");
  }
}
