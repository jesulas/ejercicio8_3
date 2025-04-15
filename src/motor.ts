import { Carta, Tablero } from "./modelo"

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

  export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    
    if (tablero.cartas[indice].estaVuelta === false || tablero.cartas[indice].encontrada === false){
      return true
    }
    alert("Can't flip that card!")
    return false
  }


  export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    tablero.cartas[indice].estaVuelta = true;

    if(tablero.estadoPartida === "CeroCartasLevantadas"){
      tablero.indiceCartaVolteadaA = indice,
      tablero.estadoPartida = "UnaCartaLevantada"
    } else if (tablero.estadoPartida === "UnaCartaLevantada"){
      tablero.indiceCartaVolteadaB = indice;
      tablero.estadoPartida = "DosCartasLevantadas"
    }
  }


// Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id


export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {

    if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto && tablero.estadoPartida === "DosCartasLevantadas"){
        return true;
    }
    return false;
  }

/*
Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y 
comprobar si la partida esta completa.
*/

export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceB].encontrada = true;
    tablero.cartas[indiceA].estaVuelta = true;
    tablero.cartas[indiceB].estaVuelta = true;
    tablero.estadoPartida = "CeroCartasLevantadas";
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    esPartidaCompleta(tablero)
}
  
export const parejaNoEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  tablero.cartas[indiceA].encontrada = false;
  tablero.cartas[indiceB].encontrada = false;
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
}

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/

export const esPartidaCompleta = (tablero: Tablero) : boolean => {
    return tablero.cartas.every((carta ) => carta.encontrada && carta.estaVuelta);
  }

/*
Iniciar partida
*/

