import { baraja, Tablero, tablero } from "./modelo";
import { barajarCartas, voltearLaCarta } from "./motor";
let intentos = 0;
const startGame = document.getElementById("startGame");
if ((startGame != null && startGame != undefined)){
startGame.addEventListener("click",  () => gameStart(tablero))
}

function gameStart(tablero:Tablero){
tablero.estadoPartida = "CeroCartasLevantadas";
tablero.cartas = barajarCartas(baraja);
}



export function revelarCarta(elemento:HTMLImageElement, imagenString: string){
elemento.src= imagenString
}

export function resetearCarta(elemento: HTMLImageElement,elemento2: HTMLImageElement){
    setTimeout(() =>{
        elemento.src= "unflipped.png";
        elemento2.src= "unflipped.png"
    }, 1000
    )
    }

for (let i=0; i<12 ; i++){
    const botonSlot1 = document.getElementById("slot"+i);
    if ((botonSlot1 != null && botonSlot1 != undefined && botonSlot1 instanceof HTMLImageElement)){
        botonSlot1.addEventListener("click", () => voltearLaCarta(tablero, i))
    } 
}

export const parejaNoEncontrada = ( indiceA :number, indiceB : number) : void => {
    let elemento = document.getElementById("slot" + indiceA);
    let elemento2 = document.getElementById("slot" + indiceB);
    if (elemento != null && elemento != undefined && elemento instanceof HTMLImageElement){
        if(elemento2 != null && elemento2 != undefined && elemento2 instanceof HTMLImageElement)
    resetearCarta(elemento, elemento2)}
}

export const intentosActualizados = ()=> {
    intentos++
    const elemento = document.getElementById("intentosActuales") 
    if (elemento != null && elemento != undefined){
    elemento.innerHTML = intentos.toString()
    }
}
//Animacion al elegir las imagenes
/*const imgElemnt = document.querySelector("img");
if (imgElemnt != null && imgElemnt != undefined){
    
imgElemnt.addEventListener("click", showHide);

function showHide(){
    if (imgElemnt!.classList[0] === "fade-in") {
        imgElemnt!.classList.remove("fade-in");
        imgElemnt!.classList.add("fade-out");
      } else {
        imgElemnt!.classList.remove("fade-out");
        imgElemnt!.classList.add("fade-in");
      }
    }
}
*/
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