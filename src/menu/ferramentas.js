import { itemSelecionado, selecionaItem, desselecionaTodosItens } from '../jogo/regras.js';

const enxada = document.getElementById('ferramenta-enxada');
const regador = document.getElementById('ferramenta-regador');
const ferramentas = [enxada, regador];

export function ferramentaSelecionada() {
    return ferramentas.find(f => itemSelecionado(f));
}

function selecionaFerramenta(ferramenta) {
    desselecionaTodosItens();
    selecionaItem(ferramenta);
}

export function selecaoFerramentas() {
    ferramentas.forEach(f => {
        f.addEventListener('click', () => {
            if (itemSelecionado(f)) {
                desselecionaTodosItens();
            } else {
                selecionaFerramenta(f);
            }
        });
    });
}
