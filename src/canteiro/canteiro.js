import { enxadaSelecionada, regadorSelecionado } from '../menu/ferramentas.js';

const canteiro = document.querySelector('.canteiro');
const gridSize = 12;
const TEMPO_SECA = 30000; //30 segundos

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
        if(!enxadaSelecionada() && !regadorSelecionado()) {
            if (espacoClicado.classList.contains('pedras')) {
                espacoClicado.classList.remove('pedras');
            } else if (espacoClicado.classList.contains('ervas-daninhas')) {
                espacoClicado.classList.remove('ervas-daninhas');
            }
        }
    });
}

export function preparaSolo() {
    canteiro.addEventListener('click', (e) => {
        const espacoClicado = e.target;
        if (enxadaSelecionada() &&
            espacoClicado.classList.contains('espaco') &&
            !espacoClicado.classList.contains('pedras') &&
            !espacoClicado.classList.contains('ervas-daninhas') &&
            !espacoClicado.classList.contains('terra-arada') &&
            !espacoClicado.classList.contains('terra-regada')
        ) {
            espacoClicado.classList.add('terra-arada');
            secaSolo(espacoClicado);
        }
    }); 
}

export function regaSolo() {
    canteiro.addEventListener('click', (e) => {
        const espacoClicado = e.target;
        if (regadorSelecionado() && espacoClicado.classList.contains('terra-arada')) {
            espacoClicado.classList.add('terra-regada');
            espacoClicado.classList.remove('terra-arada');
            secaSolo(espacoClicado);
        }
    });
}

function secaSolo(espaco) {
    setTimeout(() => {
        if (espaco.classList.contains('terra-regada')) {
            espaco.classList.remove('terra-regada');
            espaco.classList.add('terra-arada');
            setTimeout(() => {
                if (espaco.classList.contains('terra-arada')) {
                    espaco.classList.remove('terra-arada');
                }
            }, TEMPO_SECA);
        } else if (espaco.classList.contains('terra-arada')) {
            espaco.classList.remove('terra-arada');
            setTimeout(() => {
                if (espaco.classList.contains('terra-arada')) {
                    espaco.classList.remove('terra-arada');
                }
            }, TEMPO_SECA);
        }
    }, TEMPO_SECA);
    
}