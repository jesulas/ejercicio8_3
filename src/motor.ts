import { Carta, Tablero, baraja, tablero } from "./modelo"
import { intentosActualizados, parejaNoEncontrada, revelarCarta } from "./ui";

let contador = 0;
let parejasEncontradas = 0;


export const barajarCartas = (cartas : Carta[]): Carta[] => {
    let currentIndex = cartas.length,  randomIndex; //randomIndex se inicializa, no tiene valor aqui

    // Siempre que queden indices sin barajear continuara
    while (currentIndex != 0) {
  
      //Escoge un indice aleatorio...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // Y lo cambia con el actual
      [cartas[currentIndex], cartas[randomIndex]] = [
        cartas[randomIndex], cartas[currentIndex]];
    }
  
    return cartas;
}

  const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    
    if (tablero.cartas[indice].estaVuelta === false || tablero.cartas[indice].encontrada === false){
      return true
    }
    alert("Can't flip that card!")
    return false
  }

  //mover a UI


    //recortar
  export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    if (sePuedeVoltearLaCarta(tablero, indice)){
        if (tablero.estadoPartida != "PartidaNoIniciada" && tablero.estadoPartida != "PartidaCompleta"){
            let sacada = tablero.cartas[indice].imagen
            let elemento = document.getElementById("slot" + (indice)) as HTMLImageElement
            revelarCarta(elemento, sacada)
            contador++
            if (contador === 1){
                tablero.indiceCartaVolteadaA = indice;
                tablero.estadoPartida = "UnaCartaLevantada"
            }
            if (contador === 2){
                intentosActualizados();
                tablero.estadoPartida = "DosCartasLevantadas"
                //resetear el contador
                contador = 0;
                if(sonPareja(indice,tablero.indiceCartaVolteadaA!,tablero) === true){
                    parejaEncontrada(tablero,indice,tablero.indiceCartaVolteadaA!);
                } 
                else {
                parejaNoEncontrada(indice,tablero.indiceCartaVolteadaA!);
                };
            }
        }
  } }
  /*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {

    if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto && tablero.estadoPartida === "DosCartasLevantadas"){
        return true;
    }
    return false;
  }

/*
Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceB].encontrada = true;
    tablero.cartas[indiceA].estaVuelta = true;
    tablero.cartas[indiceB].estaVuelta = true;
    parejasEncontradas++
    esPartidaCompleta(tablero)
}
  

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/

export const esPartidaCompleta = (tablero: Tablero) : boolean => {
    
    if (parejasEncontradas === 6){
        tablero.estadoPartida= "PartidaCompleta"
        alert("Partida Completada")
        return true
    } else {
    return false;
    }
  }

/*
Iniciar partida
*/

const startGame = document.getElementById("startGame");
if ((startGame != null && startGame != undefined && startGame)){
    startGame.addEventListener("click", () => iniciaPartida(tablero))
}

export const iniciaPartida = (tablero: Tablero): void => {
    tablero.estadoPartida = "CeroCartasLevantadas";
    tablero.cartas = barajarCartas(baraja);
  };
