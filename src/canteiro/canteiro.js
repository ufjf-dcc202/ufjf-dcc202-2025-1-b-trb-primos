//import { prepararSolo } from './plantacao.js';

const canteiro = document.querySelector('.canteiro');
const gridSize = 12;

const probabilidades = {
    pedra: 0.15,
    ervaDaninha: 0.20
};

export function inicializaCanteiro() {
    canteiro.innerHTML = '';

    for (let i = 0; i < gridSize * gridSize; i++) {
        const espaco = document.createElement('div');
        espaco.classList.add('espaco');
        espaco.setAttribute('data-posicao', i);

        const random = Math.random();

        if (random < probabilidades.pedra) {
            espaco.classList.add('pedras');
        } else if (random < probabilidades.pedra + probabilidades.ervaDaninha) {
            espaco.classList.add('ervas-daninhas');
        }

        canteiro.appendChild(espaco);
    }
}

export function limpaCanteiro() {
    canteiro.addEventListener('click', (e) => {
        const espacoClicado = e.target;

        if (espacoClicado.classList.contains('pedras')) {
            espacoClicado.classList.remove('pedras');
        } else if (espacoClicado.classList.contains('ervas-daninhas')) {
            espacoClicado.classList.remove('ervas-daninhas');
        } else if (espacoClicado.classList.contains('espaco')) {
            prepararSolo();
        }
    });
}