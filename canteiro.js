const canteiro = document.querySelector('.canteiro');
const gridSize = 12;

function inicializaCanteiro() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const espaco = document.createElement('div');
        espaco.classList.add('espaco');
        espaco.setAttribute('data-posicao', i);
        canteiro.appendChild(espaco);
    }
}