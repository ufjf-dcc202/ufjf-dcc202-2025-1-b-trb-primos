import { itemSelecionado, selecionaItem, desselecionaTodosItens } from '../jogo/regras.js';

export const ferramentas = {
    enxada: { nome: "Enxada", img: "assets/ferramentas/enxada.png" },
    regador: { nome: "Regador", img: "assets/ferramentas/regador.png" }
};

export function criaFerramentas(ferramentaId, ferramenta) {
    const div = document.createElement("div");
    div.classList.add("ferramenta");
    div.id = `ferramenta-${ferramentaId}`;
    div.innerHTML = `<img src="${ferramenta.img}" alt="${ferramenta.nome}">`;
    return div;
}

export function ferramentaSelecionada() {
    const ferramentas = document.querySelectorAll(".ferramenta");
    return Array.from(ferramentas).find(f => itemSelecionado(f));
}

function selecionaFerramenta(ferramenta) {
    desselecionaTodosItens();
    selecionaItem(ferramenta);
}

export function selecaoFerramentas() {
    const ferramentas = document.querySelectorAll(".ferramenta");

    ferramentas.forEach(ferramenta => {
        ferramenta.addEventListener('click', () => {
            if (itemSelecionado(ferramenta)) {
                desselecionaTodosItens();
            } else {
                selecionaFerramenta(ferramenta);
            }
        });
    });
}
