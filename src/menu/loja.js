import { itemSelecionado, selecionaItem, desselecionaTodosItens } from '../jogo/regras.js';

let dinheiro = 500;

const plantas = {
    batata: {
        quantidade: 0,
        preco: 50,
        nome: "Batata"
    },
    cenoura: {
        quantidade: 0,
        preco: 20,
        nome: "Cenoura"
    },
    rabanete: {
        quantidade: 0,
        preco: 35,
        nome: "Rabanete"
    }
};

const contadorDinheiro = document.getElementById("contador-dinheiro");

function atualizaDinheiro() {
    contadorDinheiro.textContent = `$${dinheiro}`;
}

function atualizaLoja() {
    Object.keys(plantas).forEach(plantaId => {
        const planta = plantas[plantaId];
        document.getElementById(`preco-${plantaId}`).textContent = `$${planta.preco}`;
        document.getElementById(`qtd-${plantaId}`).textContent = planta.quantidade;
    });
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
            const plantaId = botao.id.replace("btn-comprar-", "");
            const planta = plantas[plantaId];
            const inputQtd = document.querySelector(`#compra-qtd-${plantaId}`);
            const qtdComprada = parseInt(inputQtd.value);
            const total = planta.preco * qtdComprada;

            if (dinheiro >= total) {
                dinheiro -= total;
                planta.quantidade += qtdComprada;
                atualizaDinheiro();
                document.getElementById(`qtd-${plantaId}`).textContent = planta.quantidade;
            } else {
                alert("Dinheiro insuficiente!");
            }
        });
    });
}

export function adicionaDinheiro(valor) {
    dinheiro += valor;
    atualizaDinheiro();
}

export function inicializaMenu() {
    atualizaDinheiro();
    atualizaLoja();
    inicializaSelecaoSementes();
    inicializaCompraSementes();
}