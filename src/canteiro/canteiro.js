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
        }
    });
}

export function preparaSolo() {
    //com enxada selecionada se não tiver pedras ou ervas daninhas e se não estiver regado
}

export function regaSolo() {
    //com regador selecionado se o solo estiver preparado
}

export function secaSolo() {
    //com o tempo se não regar o solo seca
}