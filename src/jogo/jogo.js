import { inicializaCanteiro, limpaCanteiro, preparaSolo, regaSolo } from '../canteiro/canteiro.js';
import { inicializaMenu } from '../menu/loja.js';
import { cultivar } from '../plantacao/plantacao.js';

export function inicializaJogo() {
    inicializaCanteiro();
    inicializaMenu();
    limpaCanteiro(); 
    preparaSolo();
    regaSolo();
    cultivar();
    reiniciaJogo();
}

function reiniciaJogo() {
    const btnReiniciar = document.querySelector("#btn-reiniciar");

    btnReiniciar.addEventListener("click", () => {
        location.reload();
    });
}