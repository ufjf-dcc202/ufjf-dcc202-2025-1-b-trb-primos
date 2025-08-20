import { itemSelecionado, selecionaItem, desselecionaTodosItens } from '../jogo/regras.js';

let dinheiro = 500;

const valorBatata = 50;
const valorCenoura = 20;
const valorRabanete = 35;

const contadorDinheiro = document.getElementById("contador-dinheiro");

const precos = {
    batata: valorBatata,
    cenoura: valorCenoura,
    rabanete: valorRabanete
};

function atualizaDinheiro() {
    contadorDinheiro.textContent = `$ ${dinheiro}`;
}

export function inicializaSelecaoSementes() {
    const sementes = document.querySelectorAll(".semente-loja");

    sementes.forEach(semente => {
        semente.addEventListener("click", (event) => {
            if (event.target.closest('.compra-semente')) {
                return;
            }

            if (itemSelecionado(semente)) {
                desselecionaTodosItens(sementes);
            } else {
                desselecionaTodosItens(sementes);
                selecionaItem(semente);
            }
        });
    });
}

export function inicializaCompraSementes() {
    const botoesCompra = document.querySelectorAll(".compra-semente button");

    botoesCompra.forEach(botao => {
        botao.addEventListener("click", () => {
            const id = botao.id.replace("btn-comprar-", "");
            const precoUnitario = precos[id];
            const inputQtd = document.querySelector(`#compra-qtd-${id}`);
            const qtd = parseInt(inputQtd.value);
            const total = precoUnitario * qtd;

            if (dinheiro >= total) {
                dinheiro -= total;
                atualizaDinheiro();

                const spanQtd = document.querySelector(`#qtd-${id}`);
                spanQtd.textContent = parseInt(spanQtd.textContent) + qtd;
            } else {
                alert("Dinheiro insuficiente!");
            }
        });
    });
}

export function inicializaMenu() {
    atualizaDinheiro();
    inicializaSelecaoSementes();
    inicializaCompraSementes();
}