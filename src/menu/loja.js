import { ferramentas, criaFerramentas, selecaoFerramentas } from '../menu/ferramentas.js';
import { sementes, criaSementes, selecionaSemente, compraSementes } from '../menu/sementes.js';

export let dinheiro = 500;

const contadorDinheiro = document.getElementById("contador-dinheiro");

export function atualizaDinheiro() {
    contadorDinheiro.textContent = `$${dinheiro}`;
}

function atualizaLoja() {
    Object.keys(sementes).forEach(sementeId => {
        const semente = sementes[sementeId];
        document.getElementById(`preco-${sementeId}`).textContent = `$${semente.preco}`;
        document.getElementById(`venda-${sementeId}`).textContent = `$${semente.precoVenda}`;
        document.getElementById(`qtd-${sementeId}`).textContent = semente.quantidade;
    });
}

function renderizaLoja() { 
    const prateleiraFerramentas = document.getElementById("prateleira-ferramentas");
    const prateleiraSementes = document.getElementById("prateleira-sementes");
    
    Object.keys(ferramentas).forEach(ferramentaId => {
        const ferramenta = criaFerramentas(ferramentaId, ferramentas[ferramentaId]);
        prateleiraFerramentas.appendChild(ferramenta);
    });
    Object.keys(sementes).forEach(sementeId => {
        const semente = criaSementes(sementeId, sementes[sementeId]);
        prateleiraSementes.appendChild(semente);
    });
}

export function operacaoDinheiro(valor) {
    dinheiro += valor;
    atualizaDinheiro();
}

export function inicializaMenu() {
    renderizaLoja();
    atualizaDinheiro();
    atualizaLoja();
    selecaoFerramentas();
    selecionaSemente();
    compraSementes();
}
