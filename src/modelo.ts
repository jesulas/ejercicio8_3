
export interface Carta {
    idFoto: number; // id del 1 al 6 para 12 cartas, así identificamos rápido si es un gatito ,un perrito...
    // el ID se repete 2 veces en el array de cartas (hay dos cartas de un perro, hay dos cartas de un gato)
    imagen: string; // por comodidad repetimos la url de la imagen
    estaVuelta: boolean;
    encontrada: boolean;
  }
  
  interface InfoCarta {
    idFoto: number;
    imagen: string;
}

const infoCartas: InfoCarta[] = [
{
    idFoto: 1,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png"
},
{
    idFoto: 2,
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png"
},
{
    idFoto: 3,
    imagen: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/3.png?raw=true"
},
{
    idFoto: 4,
    imagen: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/4.png?raw=true"
},
{
    idFoto: 5,
    imagen: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/5.png?raw=true"
},
{
    idFoto: 6,
    imagen: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/6.png?raw=true"
}]
  
  const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
    idFoto,
    imagen,
    estaVuelta: false,
    encontrada: false,
  });
  
  const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
    /* Aquí crearemos un array de cartas a partir de un array de infoCartas
       y duplicaremos las cartas para que haya dos de cada tipo.
    */
   /*let result : Carta[] = [];*/

   let result : Carta[] = infoCartas.map(function(infoCarta){
        return crearCartaInicial(infoCarta.idFoto,infoCarta.imagen)
        })
        
    return [...result, ...result]

    }
    
  export const baraja = crearColeccionDeCartasInicial(infoCartas);
  

  export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);
  
  /*
    Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
    EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
  */
  
  type EstadoPartida =
    | "PartidaNoIniciada"
    | "CeroCartasLevantadas"
    | "UnaCartaLevantada"
    | "DosCartasLevantadas"
    | "PartidaCompleta";
  
  export interface Tablero {
    cartas: Carta[];
    estadoPartida: EstadoPartida;
    indiceCartaVolteadaA?: number;
    indiceCartaVolteadaB?: number;
  }
  
  const crearTableroInicial = (): Tablero => ({
    cartas: cartas,
    estadoPartida: "PartidaNoIniciada",
  });
  
  export let tablero: Tablero = crearTableroInicial();