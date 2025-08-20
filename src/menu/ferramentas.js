import { itemSelecionado, desselecionaItem, selecionaItem, desselecionaTodosItens } from '../jogo/regras.js';

const enxada = document.getElementById('ferramenta-enxada');
const regador = document.getElementById('ferramenta-regador');
const ferramentas = [enxada, regador];

export function ferramentaSelecionada() {
    return ferramentas.find(f => itemSelecionado(f));
}

function selecionaFerramenta(ferramenta) {
    desselecionaTodosItens(ferramentas);
    selecionaItem(ferramenta);
}

export function selecaoFerramentas() {
    ferramentas.forEach(f => {
        f.addEventListener('click', () => {
            if (itemSelecionado(f)) {
                desselecionaItem(f);
            } else {
                selecionaFerramenta(f);
            }
        });
    });
}
