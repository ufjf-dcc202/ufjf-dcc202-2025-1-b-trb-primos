import { itemSelecionado, selecionaItem, desselecionaTodosItens } from './src/utils/seleciona.js';

let dinheiro = 500;
const contadorDinheiro = document.getElementById("contador-dinheiro");

function atualizaDinheiro() {
    contadorDinheiro.textContent = `$ ${dinheiro}`;
}

export function inicializaSelecaoSementes() {
    const sementes = document.querySelectorAll(".semente-loja");

    sementes.forEach(semente => {
        semente.addEventListener("click", () => {
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
            const container = botao.closest(".semente-loja");
            const precoTexto = container.querySelector(".preco").textContent;
            const precoUnitario = parseInt(precoTexto.replace(/\D/g, ""));
            const inputQtd = container.querySelector("input[type='number']");
            const qtd = parseInt(inputQtd.value);
            const total = precoUnitario * qtd;

            if (dinheiro >= total) {
                dinheiro -= total;

                atualizaDinheiro();
                
                const spanQtd = container.querySelector("span[id^='qtd-']");
                spanQtd.textContent = parseInt(spanQtd.textContent) + qtd;
            } else {
                alert("Dinheiro insuficiente!");
            }
        });
    });
}

// Inicialização
export function inicializaMenu() {
    atualizaDinheiro();
    inicializaSelecaoSementes();
    inicializaCompraSementes();
}