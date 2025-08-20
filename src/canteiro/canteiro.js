import { ferramentaSelecionada } from '../menu/ferramentas.js';
import { sementes } from "../menu/sementes.js";

const gridSize = 12;
const canteiro = document.querySelector('.canteiro');
const tempoSeca = 30000;

const classesRemoviveis = ['pedras', 'ervas-daninhas', 'planta-morta'];
const classesBloqueioArar = ['pedras', 'ervas-daninhas', 'terra-arada', 'terra-regada'];

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

        if (!ferramentaSelecionada()) {
            const temClasseRemovivel = classesRemoviveis.some(c => espacoClicado.classList.contains(c));
            if (temClasseRemovivel) {
                espacoClicado.classList.remove(...classesRemoviveis);
            }
        }
    });
}


export function preparaSolo() {
    canteiro.addEventListener('click', (e) => {
        const espacoClicado = e.target;
        const ferramenta = ferramentaSelecionada();

        if (ferramenta && ferramenta.id === 'ferramenta-enxada' &&
            espacoClicado.classList.contains('espaco') &&
            !classesBloqueioArar.some(c => espacoClicado.classList.contains(c))
        ) {
            espacoClicado.classList.add('terra-arada');
        }
    });
}

export function regaSolo() {
    canteiro.addEventListener('click', (e) => {
        const espacoClicado = e.target;
        const ferramenta = ferramentaSelecionada();

        if (ferramenta && ferramenta.id === 'ferramenta-regador' &&
            espacoClicado.classList.contains('terra-arada')
        ) {
            espacoClicado.classList.add('terra-regada');
            espacoClicado.classList.remove('terra-arada');
            espacoClicado.dispatchEvent(new CustomEvent('solo-regado', {
                bubbles: true,
                detail: { posicao: espacoClicado.getAttribute('data-posicao') }
            }));

            secaSolo(espacoClicado);
        }
    });
}

function secaSolo(espaco) {
    setTimeout(() => {
        if (espaco.classList.contains('terra-regada')) {
            espaco.classList.remove('terra-regada');
            espaco.classList.add('terra-arada');
            espaco.dispatchEvent(new CustomEvent('solo-secou', {
                bubbles: true,
                detail: { posicao: espaco.getAttribute('data-posicao') }
            }));
        }
    }, tempoSeca);
}

export function terraFertil(espaco){
    return espaco.classList.contains('terra-arada') || espaco.classList.contains('terra-regada');
}

export function terraRegada(espaco) {
    return espaco.classList.contains('terra-regada');
}

export function espacoOcupado(espaco) {
    const ocupadoPorPlanta = Object.values(sementes).some(semente =>
        semente.estagios.some(estagio => espaco.classList.contains(estagio))
    );

    const ocupadoPorClasseFixa = classesRemoviveis.some(c => espaco.classList.contains(c));

    return ocupadoPorPlanta || ocupadoPorClasseFixa;
}