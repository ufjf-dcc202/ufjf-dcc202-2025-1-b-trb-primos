import { itemSelecionado, selecionaItem, desselecionaTodosItens } from '../jogo/regras.js';
import { dinheiro, operacaoDinheiro, atualizaDinheiro } from '../menu/loja.js';

export const sementes = {
    batata: {
        quantidade: 0,
        preco: 50,
        precoVenda: 75,
        nome: "Batata",
        img: "assets/plantacoes/batata/semente_batata.png",
        estagios: ["batata1", "batata2", "batata3"],
        tempoCrescimento: 10000
    },
    cenoura: {
        quantidade: 0,
        preco: 20,
        precoVenda: 30,
        nome: "Cenoura",
        img: "assets/plantacoes/cenoura/semente_cenoura.png",
        estagios: ["cenoura1", "cenoura2", "cenoura3"],
        tempoCrescimento: 15000
    },
    rabanete: {
        quantidade: 0,
        preco: 35,
        precoVenda: 50,
        nome: "Rabanete",
        img: "assets/plantacoes/rabanete/semente_rabanete.png",
        estagios: ["rabanete1", "rabanete2", "rabanete3"],
        tempoCrescimento: 20000
    }
    // tomate: {
    //     quantidade: 0,
    //     preco: 45,
    //     precoVenda: 70,
    //     nome: "Tomate",
    //     img: "assets/plantacoes/rabanete/semente_rabanete.png",
    //     estagios: ["tomate1", "tomate2", "tomate3"],
    //     tempoCrescimento: 15000
    // }
};

export function selecionaUltimoEstagio(semente) {
    return sementes[semente].estagios[sementes[semente].estagios.length - 1];
}

export function selecionaTempoCrescimento(semente) {
    return sementes[semente].tempoCrescimento;
}

export function selecionaPrecoVenda(semente) {
    return sementes[semente].precoVenda;
}


export function criaSementes(sementeId, semente) {
    const div = document.createElement("div");
    div.classList.add("semente-loja");

    div.innerHTML = `
        <div class="img-semente" id="semente-${sementeId}">
            <img src="${semente.img}" alt="Semente de ${semente.nome}">
        </div>
        <div class="info-semente">
            <p class="semente-nome">${semente.nome}</p>
            <p>(Possui: <span id="qtd-${sementeId}"></span>)</p>
            <p class="preco">Preço: <span id="preco-${sementeId}"></span></p>
            <p class="preco">Venda: <span id="venda-${sementeId}"></span></p>
        </div>
        <div class="compra-semente">
            <input type="number" id="compra-qtd-${sementeId}" value="1" min="1">
            <button id="btn-comprar-${sementeId}">Comprar</button>
        </div>
    `;
    return div;
}

export function selecionaSemente() {
    const sementes = document.querySelectorAll(".img-semente");

    sementes.forEach(semente => {
        semente.addEventListener("click", () => {
            if (itemSelecionado(semente)) {
                desselecionaTodosItens();
            } else {
                desselecionaTodosItens();
                selecionaItem(semente);
            }
        });
    });
}

export function compraSementes() {
    const botoesCompra = document.querySelectorAll(".compra-semente button");

    botoesCompra.forEach(botao => {
        botao.addEventListener("click", () => {
            const sementeId = botao.id.replace("btn-comprar-", "");
            const semente = sementes[sementeId];
            const inputQtd = document.querySelector(`#compra-qtd-${sementeId}`);
            const qtdComprada = parseInt(inputQtd.value);
            const total = semente.preco * qtdComprada;

            if (dinheiro >= total) {
                operacaoDinheiro(-total);
                semente.quantidade += qtdComprada;
                atualizaDinheiro();
                document.getElementById(`qtd-${sementeId}`).textContent = semente.quantidade;
            } else {
                alert("Dinheiro insuficiente!");
            }
        });
    });
}

export function quantidadeSementes(semente) {
    if (sementes[semente]) {
        return sementes[semente].quantidade;
    }
    return 0;
}

export function gastaSemente(semente) {
    if (sementes[semente] && sementes[semente].quantidade > 0) {
        sementes[semente].quantidade--;
        document.getElementById(`qtd-${semente}`).textContent = sementes[semente].quantidade;
    }
}

export function sementeSelecionada() {
    for (const [chave, valor] of Object.entries(sementes)) {
        const elemento = document.getElementById(`semente-${chave}`);
        if (elemento?.classList.contains('selecionado')) {
            return chave;
        }
    }
    return null;
}